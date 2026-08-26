(function () {
  // ---- TEMP MOBILE DEBUG PANEL ------------------------------------------
  // Shows errors and key log lines directly on the page so they can be read
  // on a phone with no DevTools access. Safe to delete this whole block
  // (down to the "END TEMP MOBILE DEBUG PANEL" marker) once the bug is found.
  const dbg = document.createElement('div');
  dbg.id = 'mellow-debug-panel';
  dbg.style.cssText = `
    position: fixed; left: 8px; right: 8px; bottom: 8px; z-index: 999999;
    max-height: 45vh; overflow-y: auto; background: rgba(20,20,20,0.95);
    color: #7CFC9A; font: 11px/1.4 monospace; padding: 10px;
    border-radius: 8px; border: 1px solid #444; white-space: pre-wrap;
    word-break: break-word; display: none;
  `;
  const dbgHeader = document.createElement('div');
  dbgHeader.style.cssText = 'display:flex;justify-content:space-between;color:#fff;font-weight:bold;margin-bottom:6px;';
  dbgHeader.innerHTML = '<span>DEBUG LOG (tap to copy)</span><span id="mellow-debug-close" style="color:#f88;">[hide]</span>';
  const dbgBody = document.createElement('div');
  dbgBody.id = 'mellow-debug-body';
  dbg.appendChild(dbgHeader);
  dbg.appendChild(dbgBody);
  document.addEventListener('DOMContentLoaded', () => document.body.appendChild(dbg));
  if (document.body) document.body.appendChild(dbg);

  function dbgLog(label, ...args) {
    dbg.style.display = 'block';
    const line = document.createElement('div');
    line.style.borderTop = '1px solid #333';
    line.style.padding = '4px 0';
    const parts = args.map(a => {
      try { return typeof a === 'string' ? a : JSON.stringify(a); }
      catch (e) { return String(a); }
    });
    line.textContent = `[${new Date().toLocaleTimeString()}] ${label}: ${parts.join(' ')}`;
    dbgBody.appendChild(line);
    dbg.scrollTop = dbg.scrollHeight;
  }
  document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'mellow-debug-close') {
      dbg.style.display = 'none';
    } else if (e.target === dbg || e.target === dbgBody) {
      try {
        navigator.clipboard.writeText(dbgBody.innerText);
        dbgLog('INFO', 'Copied log to clipboard');
      } catch (err) {}
    }
  });
  window.mellowDebugLog = dbgLog;
  // ---- END TEMP MOBILE DEBUG PANEL SETUP (logging calls added below) ----

  window.addEventListener('error', e => { console.error('JS ERROR:', e.message, e.error); dbgLog('JS ERROR', e.message); });
  window.addEventListener('unhandledrejection', e => { console.error('PROMISE ERROR:', e.reason); dbgLog('PROMISE ERROR', e.reason && e.reason.message || e.reason); });

  const SUPABASE_URL = "https://mlhuidtekecxgeizgmyr.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_vNUa__bfq0gHRIObYNe0rQ_MgI8s09r";

  
  // By default supabase-js serializes every auth call (getSession,
  // verifyOtp, etc.) behind a navigator.locks mutex so multiple tabs don't
  // race on the same session. That lock has a well-documented class of bugs
  // where it gets acquired and never released (e.g. right after an OTP
  // verification), after which every future `await supabase.auth.getSession()`
  // — including the one at the top of attemptDownload() below — hangs
  // forever with no error, until the page is reloaded and a fresh client
  // (and fresh lock) is created. This is a single-tab resume builder with
  // no real need for cross-tab session coordination, so the lock is
  // replaced with a no-op that just runs the callback immediately.
  //
  // Built lazily (on first actual use) rather than at script-load time.
  // The supabase-js library itself is loaded from a CDN <script> tag, and
  // if that request is slow/blocked/offline (common on the older dev
  // laptop this gets tested on), `window.supabase` is undefined at the
  // point this file runs. Building the client eagerly here meant that
  // single failed CDN fetch threw inside this top-level IIFE and aborted
  // the whole file — including the `window.attemptDownload = ...` /
  // `window.requestOtp = ...` assignments at the bottom, which never ran,
  // producing "attemptDownload is not defined" even though the real
  // problem was upstream. Deferring construction means a CDN hiccup only
  // breaks the paid/OTP paths (which genuinely need Supabase), not the
  // whole script — and local-dev downloads, which bypass Supabase
  // entirely, keep working even with no internet at all.
  function getSupabaseClient() {
    if (window.mellowSupabase) return window.mellowSupabase;
    if (!window.supabase || typeof window.supabase.createClient !== "function") {
      throw new Error("Supabase library failed to load (CDN script missing/blocked/offline)");
    }
    const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { lock: async (name, acquireTimeout, fn) => fn() },
    });
    window.mellowSupabase = client;
    return client;
  }
  window.MELLOW_SUPABASE_URL = SUPABASE_URL;
  window.MELLOW_SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;

  // Device id: a stable per-browser id sent alongside free-download checks so
  // the backend can use it as a secondary signal next to IP (IP alone means
  // shared networks look "already used" while VPN switching looks unlimited).
  // NOTE: the download-free Edge Function must also be updated to read and
  // store this field — this only prepares the frontend side of that fix.
  const DEVICE_ID_KEY = "mellow_device_id";
  function getCookie(name) {
    const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : null;
  }
  function setCookie(name, value) {
    document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${400 * 24 * 60 * 60}; path=/; SameSite=Lax`;
  }
  function getDeviceId() {
    let id = null;
    try { id = window.localStorage.getItem(DEVICE_ID_KEY); } catch (e) {}
    if (!id) id = getCookie(DEVICE_ID_KEY);
    if (!id) {
      id = (window.crypto && crypto.randomUUID)
        ? crypto.randomUUID()
        : ('dev_' + Date.now() + '_' + Math.random().toString(36).slice(2));
    }
    try { window.localStorage.setItem(DEVICE_ID_KEY, id); } catch (e) {}
    setCookie(DEVICE_ID_KEY, id);
    return id;
  }
  window.getMellowDeviceId = getDeviceId;

  // Local-dev paywall bypass: skip credit/paywall checks entirely when
  // running on localhost/127.0.0.1/0.0.0.0/::1 or opened directly via
  // file://, so PDF export can be iterated on without burning credits or
  // hitting the paywall modal. Reads window.location at call time, so it
  // can never evaluate true on a real deployed domain.
  function isLocalDev() {
    const { hostname, protocol } = window.location;
    if (protocol === 'file:') return true;
    return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0' || hostname === '::1';
  }
  window.isMellowLocalDev = isLocalDev;

  async function attemptDownload(documentType, templateId) {
    dbgLog('attemptDownload', documentType, templateId);
    if (typeof window.pwTrack === "function") {
      try { window.pwTrack("cv_download_attempted", { document_type: documentType, template_id: templateId }); }
      catch (e) { console.error("pwTrack failed", e); }
    }

    if (isLocalDev()) {
      dbgLog('attemptDownload', 'local dev — bypassing paywall/credit check');
      return renderAndDownload(documentType, templateId, { paid: false, devBypass: true });
    }

    let session = null;
    try {
      const { data } = await getSupabaseClient().auth.getSession();
      session = data.session;
    } catch (e) {
      console.error("getSession failed", e);
      showToastSafe("Something went wrong checking your account. Please try again.", "error");
      return;
    }

    dbgLog('session', session ? 'logged in' : 'no session (free path)');

    if (session) {
      const paidResult = await tryPaidDownload(documentType, templateId, session.access_token);
      dbgLog('paidResult', paidResult);
      if (paidResult.allowed) {
        if (window.updateGlobalCreditBadge) window.updateGlobalCreditBadge();
        return renderAndDownload(documentType, templateId, { paid: true });
      }
      if (paidResult.reason === "no_credits") {
        showToastSafe("You're out of credits — grab more to keep downloading", "info");
        if (window.pwOpenForBuy) window.pwOpenForBuy(documentType, templateId);
        else showPaywall();
        return;
      }
      // Any other outcome — including a server-side error response like
      // {error:"internal_error"} that has neither `allowed` nor a
      // recognized `reason` — used to fall straight through to the
      // free-download path below. For a logged-in, paid user that's always
      // wrong: the free download then fails too (already used), which
      // reopens the paid "unlocked" screen and loops forever. Treat any
      // unrecognized paid result as a hard error instead.
      console.error("paid download not allowed", paidResult);
      showToastSafe("Something went wrong — please try again.", "error");
      return;
    }

    const freeResult = await tryFreeDownload(documentType, templateId);
    dbgLog('freeResult', freeResult);
    if (freeResult.allowed) {
      return renderAndDownload(documentType, templateId, { paid: false });
    }
    if (freeResult.reason === "error") {
      showToastSafe("Something went wrong — please try again.", "error");
      return;
    }
    if (window.pwOpenForDownload) {
      window.pwOpenForDownload(documentType, templateId);
    } else {
      showPaywall();
    }
  }

  function showToastSafe(msg, type) {
    if (typeof window.showToast === "function") window.showToast(msg, type);
    else console.error(msg);
  }

  // The client refers to cover letters as "coverletter" everywhere
  // internally (attemptDownload, renderAndDownload's dispatch, etc.), but
  // the backend functions validate against "cover_letter" (with an
  // underscore) and reject anything else with a 400. That mismatch meant
  // every single cover letter download request was being rejected before
  // it ever reached the credit-check logic — translate at the API boundary
  // instead of touching every internal "coverletter" reference.
  function toApiDocumentType(documentType) {
    return documentType === "coverletter" ? "cover_letter" : documentType;
  }

  async function tryPaidDownload(documentType, templateId, accessToken) {
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/download-paid`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}`, apikey: SUPABASE_ANON_KEY },
        body: JSON.stringify({ document_type: toApiDocumentType(documentType), template_used: templateId }),
      });
      return await res.json();
    } catch (e) {
      console.error("paid download check failed", e);
      return { allowed: false, reason: "error" };
    }
  }

  async function tryFreeDownload(documentType, templateId) {
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/download-free`, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY },
        body: JSON.stringify({ document_type: toApiDocumentType(documentType), template_used: templateId, device_id: getDeviceId() }),
      });
      return await res.json();
    } catch (e) {
      console.error("free download check failed", e);
      return { allowed: false, reason: "error" };
    }
  }

  async function checkSessionStatus(accessToken) {
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/session-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}`, apikey: SUPABASE_ANON_KEY },
      });
      if (!res.ok) return null;
      return await res.json();
    } catch (e) {
      console.error("session status check failed", e);
      return null;
    }
  }

  function showPaywall() {
    const modal = document.getElementById("paywall-modal");
    if (modal) modal.style.display = "flex";
  }

  function hidePaywall() {
    const modal = document.getElementById("paywall-modal");
    if (modal) modal.style.display = "none";
  }

  async function requestOtp(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmed = email.trim();
    if (!emailRegex.test(trimmed)) {
      return { ok: false, error: "Enter a valid email address." };
    }
    const { error } = await getSupabaseClient().auth.signInWithOtp({
      email: trimmed,
      options: { shouldCreateUser: true },
    });
    if (error) {
      console.error("OTP request failed", error);
      return { ok: false, error: "Could not send code. Please try again shortly." };
    }
    return { ok: true, normalizedEmail: trimmed };
  }

  async function confirmOtp(email, code) {
    const { data, error } = await getSupabaseClient().auth.verifyOtp({ email: email, token: code, type: "email" });
    if (error || !data.session) {
      console.error("OTP confirm failed", error);
      return { ok: false, error: "Invalid or expired code." };
    }
    if (typeof posthog !== "undefined") {
      posthog.identify(data.session.user.id);
    }
    const status = await checkSessionStatus(data.session.access_token);
    if (window.updateGlobalCreditBadge) window.updateGlobalCreditBadge();
    if (status && status.credits_remaining > 0) {
      return { ok: true, unlocked: true };
    }
    return { ok: true, unlocked: false };
  }

  async function renderAndDownload(documentType, templateId, meta) {
    dbgLog('renderAndDownload start', documentType, meta);
    try {
      if (documentType === "cv") {
        if (typeof window.exportPDFDirect !== "function") throw new Error("exportPDFDirect is not loaded");
        await window.exportPDFDirect();
        return;
      }
      
 else if (documentType === "coverletter") {
        if (typeof window.exportCoverLetterPDFDirect !== "function") {
          throw new Error("exportCoverLetterPDFDirect is not loaded (script.js missing or failed to load)");
        }
        await window.exportCoverLetterPDFDirect();
      }
      dbgLog('renderAndDownload success');
    } catch (e) {
      console.error("renderAndDownload failed after credit was already spent", e);
      dbgLog('renderAndDownload FAILED', e && e.message || e);
      showToastSafe(
        "Your download was approved but the PDF failed to generate. Please try again — if this keeps happening, contact support so we can restore your credit.",
        "error"
      );
    }
  }

  window.attemptDownload = attemptDownload;
  window.requestOtp = requestOtp;
  window.confirmOtp = confirmOtp;
  window.showPaywall = showPaywall;
  window.hidePaywall = hidePaywall;
  window.checkSessionStatus = checkSessionStatus;
})();
