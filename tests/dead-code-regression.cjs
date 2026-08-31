const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const engine = fs.readFileSync(path.join(root, 'src/engine/ResumeDocument.jsx'), 'utf8');
const css = fs.readFileSync(path.join(root, 'src/styles/react-engine.css'), 'utf8');
const forbiddenEngine = [
  'makeInitialPages(',
  'fillRenderedFrame(',
  'availableHeight',
  'setAvailableHeight(',
  'padding:var(--pad, 0) !important',
  'min-height:100% !important',
  'pageIndex > 0 && page.sections.length === 0'
];
for (const token of forbiddenEngine) {
  if (engine.includes(token) || css.includes(token)) throw new Error(`Legacy/contradictory renderer code remains: ${token}`);
}
for (const file of ['geometry-harness.html','browsercheck.html','outdom.html','test-sidebar.html']) {
  if (fs.existsSync(path.join(root,file))) throw new Error(`Debug artifact remains in release tree: ${file}`);
}
if (fs.existsSync(path.join(root,'node_modules'))) throw new Error('node_modules must not be shipped');
if (!css.includes('[data-rf-template-root="true"] .cv {')) throw new Error('Sidebar geometry normalization is missing');
console.log('PASS: dead/legacy renderer code and audit artifacts are absent');
