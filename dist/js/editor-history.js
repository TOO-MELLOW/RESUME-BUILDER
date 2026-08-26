/*
 * Resume Factory — canonical editor history.
 *
 * The editor owns one canonical cvData object. History stores an
 * immutable checkpoints for explicit editor mutations. The editor calls
 * editorHistoryBegin() before a mutation and editorHistoryCommit() only after
 * the mutation succeeds. Rendering never creates history entries.
 */
(function (global) {
  'use strict';

  const MAX_HISTORY = 60;
  const GROUP_WINDOW = 900;

  let past = [];
  let future = [];
  let groupSnapshot = null;
  let groupOpen = false;
  let checkpointCommitted = false;
  let lastMutationAt = 0;
  let applyingHistory = false;

  function clone(value) {
    return value == null ? value : JSON.parse(JSON.stringify(value));
  }

  function same(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  function getState() {
    return typeof global.getEditorState === 'function'
      ? global.getEditorState()
      : null;
  }

  function notify() {
    const undo = document.getElementById('undo-btn');
    const redo = document.getElementById('redo-btn');

    if (undo) {
      undo.disabled = past.length === 0;
      undo.setAttribute('aria-disabled', String(past.length === 0));
    }

    if (redo) {
      redo.disabled = future.length === 0;
      redo.setAttribute('aria-disabled', String(future.length === 0));
    }

    document.documentElement.dataset.editorUndo = String(past.length > 0);
    document.documentElement.dataset.editorRedo = String(future.length > 0);
  }

  function begin(force = false) {
    const state = getState();
    if (!state || applyingHistory) return false;

    const now = Date.now();
    const startNewGroup =
      force ||
      !groupOpen ||
      now - lastMutationAt > GROUP_WINDOW;

    if (startNewGroup) {
      groupSnapshot = clone(state);
      groupOpen = true;
      checkpointCommitted = false;
    }

    lastMutationAt = now;
    notify();
    return true;
  }

  function commit() {
    const state = getState();
    if (!state || applyingHistory || !groupOpen || !groupSnapshot) return false;

    if (!checkpointCommitted) {
      if (same(groupSnapshot, state)) {
        // A button/input caused no data change. Do not create a fake undo step.
        groupSnapshot = null;
        groupOpen = false;
        checkpointCommitted = false;
        lastMutationAt = 0;
        notify();
        return false;
      }

      past.push(groupSnapshot);
      if (past.length > MAX_HISTORY) past.shift();
      future = [];
      checkpointCommitted = true;
    }

    lastMutationAt = Date.now();
    notify();
    return true;
  }

  function boundary() {
    groupSnapshot = null;
    groupOpen = false;
    checkpointCommitted = false;
    lastMutationAt = 0;
    notify();
  }

  function apply(snapshot, direction) {
    const state = getState();
    if (!state || !snapshot) return false;

    applyingHistory = true;

    if (direction === 'undo') {
      future.push(clone(state));
    } else {
      past.push(clone(state));
    }

    const restored = clone(snapshot);
    if (typeof global.setEditorState === 'function') global.setEditorState(restored);
    else global.cvData = restored;
    groupSnapshot = null;
    groupOpen = false;
    checkpointCommitted = false;
    lastMutationAt = 0;

    if (typeof global.applyEditorHistoryState === 'function') {
      global.applyEditorHistoryState(restored);
    }

    if (typeof global.renderPreview === 'function') {
      global.renderPreview();
    }
    if (typeof global.setStep === 'function') {
      global.setStep(
        typeof global.getEditorStep === 'function'
          ? global.getEditorStep()
          : 0
      );
    }
    if (typeof global.updatePaLabel === 'function') {
      global.updatePaLabel();
    }
    if (typeof global.autoSave === 'function') {
      global.autoSave();
    }

    applyingHistory = false;
    notify();
    return true;
  }

  function undo() {
    if (!past.length) return false;
    const snapshot = past.pop();
    return apply(snapshot, 'undo');
  }

  function redo() {
    if (!future.length) return false;
    const snapshot = future.pop();
    return apply(snapshot, 'redo');
  }

  function clear() {
    past = [];
    future = [];
    boundary();
  }

  document.addEventListener('keydown', function (event) {
    const modifier = event.ctrlKey || event.metaKey;
    if (!modifier || event.altKey) return;

    const target = event.target;
    const tag = target && target.tagName ? target.tagName.toLowerCase() : '';
    const editing =
      tag === 'input' ||
      tag === 'textarea' ||
      tag === 'select' ||
      target?.isContentEditable;

    // Never hijack native text undo while the user is editing a field.
    if (editing) return;

    const key = event.key.toLowerCase();

    if (key === 'z') {
      event.preventDefault();
      if (event.shiftKey) redo();
      else undo();
    } else if (key === 'y') {
      event.preventDefault();
      redo();
    }
  });

  global.editorUndo = undo;
  global.editorRedo = redo;
  global.editorHistoryBegin = begin;
  global.editorHistoryCommit = commit;
  global.editorHistoryBoundary = boundary;
  global.editorHistoryClear = clear;
  global.editorHistoryFlushBoundary = boundary;
  global.editorHistoryIsApplying = function () { return applyingHistory; };
  global.editorHistoryState = function () {
    return { undo: past.length, redo: future.length };
  };

  notify();
})(window);
