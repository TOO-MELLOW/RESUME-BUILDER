const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const engine = fs.readFileSync(path.join(root, 'src/engine/ResumeDocument.jsx'), 'utf8');
if (/rf-resume-document[^\n]*data-template=\{templateId\}/.test(engine)) {
  throw new Error('Outer resume document still owns data-template; premium root CSS would be applied twice');
}
if (/aria-busy="true"[^\n]*data-template=\{templateId\}/.test(engine)) {
  throw new Error('Loading resume document still owns data-template');
}
if (!engine.includes('const pageDataAttr = premium ? \'\' : ` data-template="${escapeAttr(templateId)}"`;')) {
  throw new Error('Premium/legacy page template identity split is missing');
}
if (!engine.includes("root.setAttribute('data-template', templateId);")) {
  throw new Error('Premium template root no longer owns data-template');
}
console.log('PASS: template identity is scoped only to the actual template/page shell; outer document cannot double-apply root CSS');
