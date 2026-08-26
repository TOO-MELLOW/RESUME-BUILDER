const fs = require('fs');
const script = fs.readFileSync('public/js/script.js', 'utf8');
const css = fs.readFileSync('src/styles/react-engine.css', 'utf8');

let failed = false;
const fail = m => { console.error(`FAIL: ${m}`); failed = true; };

for (const token of [
  'function getVisibleSections',
  'function enforceSectionCoverage',
  'function createFallbackSection',
  'data-rf-section-type',
  'fallback renderer inserted them'
]) {
  if (!script.includes(token)) fail(`missing section coverage primitive: ${token}`);
}

const required = ['experience','education','projects','skills','languages','certificates','references','interests','strengths','personal-info','custom'];
const rendererRegion = script.slice(script.indexOf('function renderTemplateContent'), script.indexOf('function renderTemplateMarkup'));
if (!rendererRegion.includes('enforceSectionCoverage(data, tid, html)')) fail('template render output bypasses section coverage');

for (const type of required) {
  const rx = new RegExp(`\\b${type.replace('-', '\\-')}\\b`);
  if (!rx.test(script)) fail(`section type is not present: ${type}`);
}

if (!css.includes('.rf-fallback-sections')) fail('fallback sections CSS is missing');
if (!css.includes('[data-rf-section-type]')) fail('section marker CSS is missing');

if (failed) process.exit(1);
console.log('PASS: visible-section coverage contract verified');
