#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const ROOT = path.resolve(__dirname, '..');
const css = fs.readFileSync(path.join(ROOT, 'public/css/styles.css'), 'utf8');
const js = fs.readFileSync(path.join(ROOT, 'public/js/script.js'), 'utf8');
const failures = [];
const pass = msg => console.log(`PASS: ${msg}`);
const fail = msg => failures.push(msg);

if (/\.page\s*\.\s*entry-header\s*\{\s*flex-direction:\s*column/.test(css)) fail('mobile CSS still reflows resume entry headers');
else pass('mobile CSS does not reflow resume entry headers');

for (const selector of [
  '.page[data-template^="facet-"] { grid-template-columns: 1fr }',
  '.page[data-template^="duo-"] { grid-template-columns: 1fr }',
  '.page[data-template^="split-"] { grid-template-columns: 1fr }'
]) if (css.includes(selector)) fail(`mobile CSS still contains A4 layout collapse: ${selector}`);
if (!failures.length) pass('mobile CSS keeps A4 template column geometry intact');

if (!/function renderMobilePreview\(\)/.test(js)) fail('mobile preview renderer is missing');
else pass('mobile preview renderer exists');
if (!/const canonicalStack = document\.querySelector\('#cv-root \.resume-pages'\)/.test(js)) fail('mobile preview does not clone the complete page stack');
else pass('mobile preview clones the complete A4 page stack');
if (/scaleMobilePreviewToFit/.test(js)) fail('mobile preview references an undefined legacy scaler');
else pass('no undefined legacy mobile preview scaler remains');
if (!/function fitMobilePreviewToFit\(\)/.test(js) || !/function changeMobilePreviewZoom\(/.test(js)) fail('mobile preview fit/zoom controls are incomplete');
else pass('mobile preview fit and zoom controls are wired');

const premiumCss = fs.readFileSync(path.join(ROOT, 'public/css/premium-templates.css'), 'utf8');
if (/@media\s+screen\s+and\s+\(max-width:850px\)/.test(premiumCss)) fail('compiled premium templates contain viewport-dependent A4 shrinking');
else pass('compiled premium templates have no viewport-dependent A4 shrinking rules');

if (failures.length) {
  for (const f of failures) console.error(`FAIL: ${f}`);
  process.exit(1);
}
console.log('Mobile A4 preview regression checks passed');
