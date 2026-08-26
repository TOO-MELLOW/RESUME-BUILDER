const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const files = [
  'src/main.jsx',
  'src/engine/ResumeDocument.jsx',
  'src/engine/pdfExport.js',
  'vite.config.js',
  'public/js/script.js',
  'public/js/procv-download-gate.js',
  'api/ai-generate.js',
  'api/export-pdf.js'
];
for (const rel of files) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) throw new Error(`Missing ${rel}`);
  const source = fs.readFileSync(file, 'utf8');
  if (/^<<<<<<< |^>>>>>>> /m.test(source)) throw new Error(`Merge markers in ${rel}`);
}
for (const rel of ['src/engine/ResumeDocument.jsx','src/main.jsx']) {
  const source = fs.readFileSync(path.join(root, rel), 'utf8');
  if (!source.includes('React') || !source.includes('createRoot') && rel.includes('main')) throw new Error(`Unexpected React engine source: ${rel}`);
}
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const needle of ['/vendor/html2canvas.min.js','/vendor/jspdf.umd.min.js','/src/main.jsx']) {
  if (!index.includes(needle)) throw new Error(`index.html missing ${needle}`);
}
console.log('static React/Vite engine checks passed');
