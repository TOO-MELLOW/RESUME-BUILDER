/*
 * Resume Factory — Phase 4 editor history.
 * Lightweight, dependency-free undo/redo for the structured CV model.
 * History is intentionally kept in memory; the existing autosave remains
 * the persistence layer, so browser refresh behaviour is unchanged.
 */
(function (global) {
  'use strict';

  const MAX_HISTORY = 60;
  const GROUP_WINDOW = 900;
  let past = [];
  let future = [];
  let lastMutationAt = 0;
  let activeGroup = false;

  function clone(value) {
    return value == null ? value : JSON.parse(JSON.stringify(value));
  }

  function same(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  function getState() {
    return typeof global.cvData !== 'undefined' ? global.cvData : null;
  }

  function notify() {
    const undo = document.getElementById('undo-btn');
    const redo = document.getElementById('redo-btn');
    if (undo) undo.disabled = past.length === 0;
    if (redo) redo.disabled = future.length === 0;
    document.documentElement.dataset.editorUndo = String(past.length > 0);
    document.documentElement.dataset.editorRedo = String(future.length > 0);
  }

  function begin(force) {
    const state = getState();
    if (!state) return;
    const now = Date.now();
    if (force || !activeGroup || now - lastMutationAt > GROUP_WINDOW) {
      past.push(clone(state));
      if (past.length > MAX_HISTORY) past.shift();
      future = [];
      activeGroup = true;
    }
    lastMutationAt = now;
    notify();
  }

  function boundary() {
    activeGroup = false;
  }

  function apply(snapshot, direction) {
    const state = getState();
    if (!state || !snapshot) return;
    if (direction === 'undo') future.push(clone(state));
    else past.push(clone(state));
    const replacement = clone(snapshot);
    global.cvData = replacement;
    if (typeof global.applyEditorHistoryState === 'function') {
      global.applyEditorHistoryState(replacement);
    }
    activeGroup = false;
    lastMutationAt = Date.now();
    if (typeof global.renderPreview === 'function') global.renderPreview();
    if (typeof global.setStep === 'function') global.setStep(typeof global.getEditorStep === 'function' ? global.getEditorStep() : 0);
    if (typeof global.updatePaLabel === 'function') global.updatePaLabel();
    if (typeof global.autoSave === 'function') global.autoSave();
    notify();
  }

  function undo() {
    if (!past.length) return false;
    const snapshot = past.pop();
    apply(snapshot, 'undo');
    return true;
  }

  function redo() {
    if (!future.length) return false;
    const snapshot = future.pop();
    apply(snapshot, 'redo');
    return true;
  }

  // Called by commitEditorMutation() in script.js right after a mutation
  // runs, to close out the checkpoint that begin() opened beforehand. If
  // the mutation didn't actually change anything (e.g. re-typing the same
  // value), drop the no-op checkpoint instead of leaving a dead undo step.
  // Returns true when a real change was committed, false otherwise.
  function commit() {
    const state = getState();
    if (!state) return true;
    if (past.length && same(past[past.length - 1], state)) {
      past.pop();
      notify();
      return false;
    }
    notify();
    return true;
  }

  function clear() {
    past = [];
    future = [];
    activeGroup = false;
    lastMutationAt = 0;
    notify();
  }

  function flushBoundary() {
    activeGroup = false;
    lastMutationAt = 0;
  }

  document.addEventListener('keydown', function (event) {
    const modifier = event.ctrlKey || event.metaKey;
    if (!modifier || event.altKey) return;
    const target = event.target;
    const tag = target && target.tagName ? target.tagName.toLowerCase() : '';
    const editing = tag === 'input' || tag === 'textarea' || target?.isContentEditable;
    if (event.key.toLowerCase() === 'z') {
      event.preventDefault();
      if (event.shiftKey) redo(); else undo();
    } else if (event.key.toLowerCase() === 'y' && !editing) {
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
  global.editorHistoryFlushBoundary = flushBoundary;
  global.editorHistoryState = function () { return { undo: past.length, redo: future.length }; };
  notify();
})(window);
