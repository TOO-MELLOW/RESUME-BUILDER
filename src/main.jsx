import React, { useCallback, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import ResumeDocument from './engine/ResumeDocument.jsx';
import './styles/react-engine.css';
import { installPdfExportBridge } from './engine/pdfExport.js';


function deepClone(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

function ResumeEngineHost() {
  const [snapshot, setSnapshot] = useState(null);

  const handlePagesReady = useCallback(() => { window.requestAnimationFrame(() => window.scalePreviewToFit?.()); }, []);

  useEffect(() => {
    let mounted = true;
    const sync = (data, templateId) => {
      if (!mounted) return;
      setSnapshot({ data: deepClone(data), templateId });
    };

    window.__RF_SET_PREVIEW__ = sync;
    window.__RF_ENGINE_READY__ = true;
    installPdfExportBridge();

    const initial = window.__RF_GET_STATE__?.();
    if (initial?.data) sync(initial.data, initial.templateId);

    // A small safety sync covers the first render race between the legacy controller
    // and this React mount without adding an interval to normal operation.
    const timer = window.setTimeout(() => {
      const current = window.__RF_GET_STATE__?.();
      if (current?.data) sync(current.data, current.templateId);
    }, 120);

    return () => {
      mounted = false;
      window.clearTimeout(timer);
      delete window.__RF_SET_PREVIEW__;
      delete window.__RF_ENGINE_READY__;
    };
  }, []);

  return (
    <ResumeDocument
      data={snapshot?.data}
      templateId={snapshot?.templateId}
      onPagesReady={handlePagesReady}
    />
  );
}

const mount = document.getElementById('cv-root');
if (mount) createRoot(mount).render(<ResumeEngineHost />);
