const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const doc = fs.readFileSync(path.join(root, 'src/engine/ResumeDocument.jsx'), 'utf8');
const css = fs.readFileSync(path.join(root, 'src/styles/react-engine.css'), 'utf8');
const script = fs.readFileSync(path.join(root, 'public/js/script.js'), 'utf8');
const pdf = fs.readFileSync(path.join(root, 'src/engine/pdfExport.js'), 'utf8');
const must = [
  ['resume page stack', /resume-pages/],
  ['real A4 height', /height:297mm/],
  ['no page-content transform fitting', /transform:none !important/],
  ['content-driven pagination', /function paginate\(/],
  ['page-count data attribute', /data-rf-page-count/],
  ['whole-document zoom', /function setPreviewZoom\(/],
  ['fit zoom', /function fitPreviewZoom\(/],
  ['multi-page PDF export', /a4-page\[data-rf-page=\"true\"\]/],
];
for (const [name, re] of must) if (!re.test(doc+css+script+pdf)) throw new Error(`Missing A4 stack requirement: ${name}`);
if (/pages\.length > 2/.test(pdf)) throw new Error('Client PDF export still caps resumes at two pages');
console.log('A4 page stack / zoom checks: PASS');
