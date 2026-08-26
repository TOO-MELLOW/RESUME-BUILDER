function pwTrack(event, props) {
  if (typeof posthog === "undefined") return;
  const SAFE_KEYS = ["template_id", "is_free", "package", "document_type"];
  const safeProps = {};
  if (props) {
    for (const k of SAFE_KEYS) {
      if (k in props) safeProps[k] = props[k];
    }
  }
  posthog.capture(event, safeProps);
}
window.pwTrack = pwTrack;
