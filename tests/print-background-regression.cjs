const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const styles = fs.readFileSync(path.join(root, 'public/css/styles.css'), 'utf8');
const pdfExport = fs.readFileSync(path.join(root, 'public/css/pdf-export.css'), 'utf8');

if (styles.includes('background:none')) throw new Error('A template print block is zeroing out the page background again (background:none in styles.css)');
if (!pdfExport.includes('background: var(--bg, #fff) !important')) throw new Error('pdf-export.css no longer restores the page background after per-template print rules');
if (!pdfExport.includes('.sidebar') || !pdfExport.includes('.rail') || !pdfExport.includes('.facet-sidebar')) throw new Error('pdf-export.css is missing the region-selector stretch rules for sidebar/rail columns');
if (!pdfExport.includes('min-height: 100% !important')) throw new Error('pdf-export.css no longer stretches sidebar/main regions to full page height');

console.log('PASS: print-mode PDF export preserves the page background and stretches sidebar/main regions to full height');
