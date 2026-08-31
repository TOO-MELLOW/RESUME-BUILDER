const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

const engine = fs.readFileSync(path.join(root, 'src/engine/ResumeDocument.jsx'), 'utf8');
const reactCss = fs.readFileSync(path.join(root, 'src/styles/react-engine.css'), 'utf8');
const canonical = fs.readFileSync(path.join(root, 'src/data/templates.js'), 'utf8');
const specs = fs.readFileSync(path.join(root, 'src/data/templatePageSpecs.js'), 'utf8');
const premiumCss = fs.readFileSync(path.join(root, 'public/css/premium-templates.css'), 'utf8');

const premiumCount = (canonical.match(/"category":\s*"premium(?:-sidebar)?"/g) || []).length;
if (premiumCount !== 40) throw new Error(`Expected 40 premium templates in canonical registry, found ${premiumCount}`);
const totalCount = (canonical.match(/"id":\s*"[^"]+"/g) || []).length;
if (totalCount !== 83) throw new Error(`Expected 83 total templates in canonical registry, found ${totalCount}`);

for (const token of [
  'function normalizePremiumFragment',
  'data-rf-template-root',
  'data-rf-template-page',
  'root.querySelectorAll(\'header\')',
  'root.setAttribute(\'data-rf-has-footer\', \'true\')',
  'const premium = isPremiumTemplate(templateId);',
  'const pageDataAttr = premium ? \'\'',
]) {
  if (!engine.includes(token)) throw new Error(`Missing pagination isolation invariant: ${token}`);
}

if (engine.includes('<div className="rf-page-content" data-template={templateId}')) {
  throw new Error('Shared page wrapper still carries template data-template state');
}

for (const id of ['burgundy-two-page-04','sand-modern-two-page-08','teal-command-two-page-10']) {
  const start = specs.indexOf(`"id": "${id}"`);
  const next = specs.indexOf('"id": "', start + 1);
  const block = specs.slice(start, next === -1 ? specs.length : next);
  if (!block.includes('"minPages": 1')) throw new Error(`${id} is still hard-forced to two pages`);
}

// Sidebar templates deliberately retain an inner .cv frame, but their source
// data-template identity must be stripped so only the renderer-owned outer
// canvas receives the template root geometry.
const sidebarIds = [
  'graphite-sidebar-01','ivory-editorial-sidebar-02','navy-vertical-rail-03',
  'burgundy-two-page-04','forest-profile-sidebar-05','black-copper-executive-06',
  'slate-portfolio-07','sand-modern-two-page-08','indigo-cards-09','teal-command-two-page-10'
];
for (const id of sidebarIds) {
  if (!premiumCss.includes(`[data-template="${id}"] .cv`)) throw new Error(`${id}: authored CSS no longer has the required outer-template -> .cv contract`);
}
if (!engine.includes("root.querySelectorAll('[data-template]').forEach(node => node.removeAttribute('data-template'));")) {
  throw new Error('Renderer does not strip nested source data-template identities');
}
if (engine.includes("elements.length === 1 && elements[0].classList.contains('cv')")) {
  throw new Error('Renderer incorrectly promotes sidebar .cv to the template root');
}
if (!engine.includes("root.className = 'rf-premium-root';")) throw new Error('Premium wrapper root is missing');

if (reactCss.includes('min-height:100% !important')) throw new Error('Renderer still forces premium roots to a full-page minimum');
if (!reactCss.includes('.rf-page-content > [data-rf-template-root="true"]')) throw new Error('Premium root normalization selector is missing');
if (reactCss.includes('padding:var(--pad, 0) !important')) throw new Error('Renderer still overrides premium authored padding');
if (!reactCss.includes('overflow:visible !important')) throw new Error('Premium root overflow-visible guardrail is missing');
if (!reactCss.includes('.rf-page-content > [data-rf-template-root="true"] .cv')) throw new Error('Sidebar inner .cv width contract is missing');
if (!reactCss.includes('width:100% !important')) throw new Error('Sidebar inner .cv is not normalized to the outer content width');
if (!engine.includes("setProperty('min-height','0','important')")) throw new Error('Premium natural-height measurement is not clearing nested page-frame minimum height');
if (!engine.includes('next.splice(pageIndex, 1);')) throw new Error('Overflow reflow can still leave an empty page behind');
if (engine.includes('if (pageIndex > 0 && page.sections.length === 0)')) throw new Error('First-page empty overflow cleanup is still missing');
if (!reactCss.includes('[data-rf-continuation="true"] header')) throw new Error('Continuation CSS safety net for real headers is missing');

console.log('PASS: pagination/header isolation regression checks');
console.log('PASS: premium roots use exactly one renderer-owned data-template canvas');
console.log('PASS: 10 sidebar .cv frames retain their authored descendant selector contract without duplicate template identity');
console.log('PASS: premium continuation headers are structurally removable');
console.log('PASS: two-page templates expand naturally instead of forcing page 2');
