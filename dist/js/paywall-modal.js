// paywall-modal.js — load after procv-download-gate.js
(function () {
  const PW_PACKAGES = [
    { id: "3_credits",       name: "3 downloads",  sub: "Most popular for one application round", price: "R49"  },
    { id: "5_credits",       name: "5 downloads",  sub: "Cover letter + CV, a few rounds",         price: "R79"  },
    { id: "unlimited_30d",   name: "Unlimited for 30 days", sub: "Actively job hunting",            price: "R149" },
  ];

  let pwSelectedPackage = null;
  let pwPendingEmail = null;
  let pwPendingDocType = "cv";
  let pwPendingTemplateId = null;
  let pwResendCooldownUntil = 0;

  function pwGoToStep(step) {
    document.querySelectorAll(".pw-step").forEach(el => el.classList.remove("active"));
    const target = document.querySelector(`[data-pw-step="${step}"]`);
    if (target) target.classList.add("active");
    document.querySelectorAll(".pw-err").forEach(el => el.classList.remove("show"));
  }

  function pwShowError(id, message) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = message;
    el.classList.add("show");
  }

  function pwSetLoading(btnId, loading, loadingLabel, defaultLabel) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.disabled = loading;
    btn.textContent = loading ? loadingLabel : defaultLabel;
  }

  async function pwOpenForDownload(documentType, templateId) {
    pwPendingDocType = documentType;
    pwPendingTemplateId = templateId;
    document.getElementById("pw-email").value = "";

    let session = null;
    try {
      const { data } = await window.mellowSupabase.auth.getSession();
      session = data.session;
    } catch (e) {
      console.error("getSession failed", e);
    }

    if (!session) {
      pwGoToStep("gate");
      window.showPaywall();
      return;
    }

    const status = await checkSessionStatus(session.access_token);
    if (window.updateGlobalCreditBadge) window.updateGlobalCreditBadge();
    if (status && status.credits_remaining > 0) {
      const n = status.credits_remaining;
      document.getElementById("pw-credit-badge").textContent = `${n} ${n === 1 ? "credit" : "credits"} remaining`;
      pwGoToStep("unlocked");
    } else {
      pwRenderPackages();
      pwGoToStep("buy");
    }
    window.showPaywall();
  }

  // Fast path for when we already know the user is verified but out of
  // credits (attemptDownload's paidResult.reason === "no_credits") — skip
  // the gate/otp steps entirely and go straight to purchasing.
  function pwOpenForBuy(documentType, templateId) {
    pwPendingDocType = documentType;
    pwPendingTemplateId = templateId;
    pwRenderPackages();
    pwGoToStep("buy");
    window.showPaywall();
  }

  async function pwHandleSendCode() {
    const email = document.getElementById("pw-email").value.trim();
    pwSetLoading("pw-send-btn", true, "Sending…", "Send code");
    const result = await requestOtp(email);
    pwSetLoading("pw-send-btn", false, "Sending…", "Send code");

    if (!result.ok) {
      pwShowError("pw-gate-err", result.error);
      return;
    }
    pwTrack("otp_requested");
    pwPendingEmail = result.normalizedEmail;
    document.getElementById("pw-otp-email-display").textContent = pwPendingEmail;
    document.getElementById("pw-otp").value = "";
    pwResendCooldownUntil = Date.now() + 30000;
    pwTickResendCooldown();
    pwGoToStep("otp");
  }

  function pwTickResendCooldown() {
    const btn = document.getElementById("pw-resend-btn");
    const remaining = Math.ceil((pwResendCooldownUntil - Date.now()) / 1000);
    if (remaining > 0) {
      btn.disabled = true;
      btn.textContent = `Resend code (${remaining}s)`;
      setTimeout(pwTickResendCooldown, 1000);
    } else {
      btn.disabled = false;
      btn.textContent = "Resend code";
    }
  }

  async function pwHandleResend() {
    if (Date.now() < pwResendCooldownUntil) return;
    pwSetLoading("pw-resend-btn", true, "Sending…", "Resend code");
    const result = await requestOtp(pwPendingEmail);
    pwSetLoading("pw-resend-btn", false, "Sending…", "Resend code");
    if (!result.ok) {
      pwShowError("pw-otp-err", result.error);
      return;
    }
    pwResendCooldownUntil = Date.now() + 30000;
    pwTickResendCooldown();
  }

  async function pwHandleVerifyCode() {
    const code = document.getElementById("pw-otp").value.trim();
    if (!/^\d{6}$/.test(code)) {
      pwShowError("pw-otp-err", "Enter the 6-digit code.");
      return;
    }
    pwSetLoading("pw-verify-btn", true, "Verifying…", "Verify");
    const result = await confirmOtp(pwPendingEmail, code);
    pwSetLoading("pw-verify-btn", false, "Verifying…", "Verify");

    if (!result.ok) {
      pwShowError("pw-otp-err", result.error);
      return;
    }

    pwTrack("otp_verified");

    if (result.unlocked) {
      const { data: { session } } = await window.mellowSupabase.auth.getSession();
      const status = session ? await checkSessionStatus(session.access_token) : null;
      const n = status ? status.credits_remaining : "";
      document.getElementById("pw-credit-badge").textContent = `${n} ${n === 1 ? "credit" : "credits"} remaining`;
      if (window.updateGlobalCreditBadge) window.updateGlobalCreditBadge();
      pwGoToStep("unlocked");
    } else {
      pwRenderPackages();
      pwGoToStep("buy");
    }
  }

  function pwHandleDownloadNow() {
    hidePaywall();
    attemptDownload(pwPendingDocType, pwPendingTemplateId);
  }

  function pwRenderPackages() {
    const list = document.getElementById("pw-pkg-list");
    list.innerHTML = PW_PACKAGES.map(p => `
      <div class="pw-pkg-opt ${pwSelectedPackage === p.id ? "selected" : ""}" onclick="pwSelectPackage('${p.id}')">
        <div>
          <div class="pw-pkg-name">${p.name}</div>
          <div class="pw-pkg-sub">${p.sub}</div>
        </div>
        <div class="pw-pkg-price">${p.price}</div>
      </div>
    `).join("");
    if (!pwSelectedPackage) pwSelectedPackage = PW_PACKAGES[0].id;
    pwRenderPackages_updateSelection();
  }

  function pwSelectPackage(id) {
    pwSelectedPackage = id;
    document.querySelectorAll(".pw-pkg-opt").forEach((el, i) => {
      el.classList.toggle("selected", PW_PACKAGES[i].id === id);
    });
  }

  function pwRenderPackages_updateSelection() {
    document.querySelectorAll(".pw-pkg-opt").forEach((el, i) => {
      el.classList.toggle("selected", PW_PACKAGES[i].id === pwSelectedPackage);
    });
  }

  async function pwHandleContinueToPayment() {
    if (!pwSelectedPackage) {
      pwShowError("pw-buy-err", "Choose a package first.");
      return;
    }
    pwTrack("payment_initiated", { package: pwSelectedPackage });
    pwSetLoading("pw-continue-payment-btn", true, "Redirecting…", "Continue to payment");

    const { data: { session } } = await window.mellowSupabase.auth.getSession();
    if (!session) {
      pwSetLoading("pw-continue-payment-btn", false, "Redirecting…", "Continue to payment");
      pwShowError("pw-buy-err", "Your session expired — please verify your email again.");
      pwGoToStep("gate");
      return;
    }

    try {
      const res = await fetch(`${window.MELLOW_SUPABASE_URL}/functions/v1/payment-initiate`, {
      method: "POST",
      headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session.access_token}`,
    apikey: window.MELLOW_SUPABASE_ANON_KEY,   // new line
  },
  body: JSON.stringify({
    package: pwSelectedPackage,
    return_url: window.location.origin + window.location.pathname + "?pw_return=1",
  }),
});
      const data = await res.json();
      if (!res.ok || !data.redirect_url) {
        throw new Error("status " + res.status + ": " + JSON.stringify(data));
      }
      window.location.href = data.redirect_url;
    } catch (e) {
      console.error("payment initiate failed", e);
      pwSetLoading("pw-continue-payment-btn", false, "Redirecting…", "Continue to payment");
      pwShowError("pw-buy-err", "DEBUG: " + e.message);
    }
  }

  window.pwOpenForDownload = pwOpenForDownload;
  window.pwOpenForBuy = pwOpenForBuy;
  window.pwGoToStep = pwGoToStep;
  window.pwHandleSendCode = pwHandleSendCode;
  window.pwHandleVerifyCode = pwHandleVerifyCode;
  window.pwHandleResend = pwHandleResend;
  window.pwHandleDownloadNow = pwHandleDownloadNow;
  window.pwHandleContinueToPayment = pwHandleContinueToPayment;
  window.pwSelectPackage = pwSelectPackage;
})();
