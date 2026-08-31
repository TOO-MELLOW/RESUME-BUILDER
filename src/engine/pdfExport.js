async function waitForFonts() {
  if (document.fonts?.ready) await document.fonts.ready;
}

async function waitForImages(root) {
  const images = Array.from(root.querySelectorAll('img'));
  await Promise.all(images.map(async img => {
    try {
      if (!img.complete) await new Promise(resolve => {
        const done = () => { img.removeEventListener('load', done); img.removeEventListener('error', done); resolve(); };
        img.addEventListener('load', done, { once: true });
        img.addEventListener('error', done, { once: true });
      });
      if (img.decode) await img.decode().catch(() => {});
    } catch (_) {}
  }));
}

const raf = () => new Promise(resolve => requestAnimationFrame(resolve));

function getJsPdf() {
  const value = window.jspdf;
  const Ctor = value?.jsPDF || window.jsPDF;
  if (!Ctor) throw new Error('jsPDF is not available.');
  return Ctor;
}

function getCanvas() {
  if (!window.html2canvas) throw new Error('html2canvas is not available.');
  return window.html2canvas;
}

function safeName(name) {
  const value = String(name || 'Resume').trim().replace(/[^a-z0-9]+/gi, '_').replace(/^_+|_+$/g, '');
  return `${value || 'Resume'}.pdf`;
}

export async function exportResumeToPDF({ root, fileName }) {
  if (!root) throw new Error('Resume preview could not be found.');
  await waitForFonts();
  await waitForImages(root);
  await raf(); await raf();

  const pages = Array.from(root.querySelectorAll(':scope .a4-page[data-rf-page="true"]'));
  if (!pages.length) throw new Error('No A4 pages were found for export.');

  const jsPDF = getJsPdf();
  const html2canvas = getCanvas();
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true, putOnlyUsedFonts: true });

  const host = document.createElement('div');
  host.setAttribute('aria-hidden', 'true');
  host.style.cssText = 'position:fixed;left:-10000px;top:0;width:210mm;opacity:1;pointer-events:none;background:#fff;z-index:-1;overflow:visible;';
  document.body.appendChild(host);

  try {
    for (let i = 0; i < pages.length; i++) {
      if (i > 0) pdf.addPage('a4', 'portrait');
      const clone = pages[i].cloneNode(true);
      clone.style.transform = '';
      clone.style.margin = '0';
      clone.style.width = '210mm';
      clone.style.height = '297mm';
      clone.style.minHeight = '297mm';
      const viewport = pages[i].getBoundingClientRect();
      clone.style.setProperty('--rf-export-width', `${viewport.width || 794}px`);
      // Reset preview-only fit transforms/widths inside the page. The live
      // renderer may scale .rf-page-content to keep the on-screen preview
      // within A4; that scaling must never leak into the raster export.
      clone.querySelectorAll('.rf-page-content').forEach(content => {
        content.style.transform = '';
        content.style.transformOrigin = '';
        content.style.width = '';
      });
      host.replaceChildren(clone);
      await raf();
      await waitForImages(clone);

      const canvas = await html2canvas(clone, {
        scale: Math.min(3, Math.max(2, window.devicePixelRatio || 1)),
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 15000,
        scrollX: 0,
        scrollY: 0,
        windowWidth: Math.max(794, Math.round(clone.scrollWidth)),
        windowHeight: Math.max(1123, Math.round(clone.scrollHeight)),
      });
      pdf.addImage(canvas.toDataURL('image/jpeg', 0.96), 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
    }
    pdf.save(fileName || safeName('Resume'));
  } finally {
    host.remove();
  }
}

export function installPdfExportBridge() {
  window.__RF_EXPORT_CLIENT_PDF__ = async ({ fileName } = {}) => {
    const root = document.getElementById('cv-root');
    const name = fileName || (() => {
      const state = window.__RF_GET_STATE__?.();
      return safeName(state?.data?.personalDetails?.fullName || 'Resume');
    })();
    await exportResumeToPDF({ root, fileName: name.endsWith('.pdf') ? name : `${name}.pdf` });
  };
}
