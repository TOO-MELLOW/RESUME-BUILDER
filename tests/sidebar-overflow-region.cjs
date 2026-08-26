const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const src = fs.readFileSync(path.join(root, 'src/engine/ResumeDocument.jsx'), 'utf8');

// Sidebar and main render as parallel CSS Grid columns (page height = max of
// the two, not a sum). The overflow-reflow safety net must know which column
// is actually too tall before it trims anything - otherwise it always trims
// whichever column happens to sit last in the flat sections array (main),
// even when the sidebar is the one overflowing.
const must = [
  ['overflowing-region detector exists', /function findOverflowingRegion\(/],
  ['region-aware last-index lookup exists', /function lastIndexOfRegion\(/],
  ['moveOverflowFromPage accepts a region', /function moveOverflowFromPage\(plan, pageIndex, templateId, region/],
  ['splitLastSectionForOverflow accepts a region', /function splitLastSectionForOverflow\(data, templateId, page, firstPage, available, region/],
  ['reflow computes the overflowing region before trimming', /const region = findOverflowingRegion\(/],
  ['split call is region-aware', /splitLastSectionForOverflow\(data, templateId, page, firstPage, available, region\)/],
  ['move call is region-aware', /moveOverflowFromPage\(plan, overflowed\.pageIndex, templateId, region\)/],
];

for (const [name, re] of must) {
  if (!re.test(src)) throw new Error(`Missing sidebar-overflow-region requirement: ${name}`);
}

// Guard against regressing back to the old "always trim page.sections.length - 1"
// behaviour inside the two overflow-trimming functions specifically.
const moveFn = src.slice(src.indexOf('function moveOverflowFromPage'), src.indexOf('function splitLastSectionForOverflow'));
if (/const moveIndex = page\.sections\.length - 1;/.test(moveFn)) {
  throw new Error('moveOverflowFromPage still unconditionally trims the last section regardless of column');
}

console.log('PASS: overflow reflow trims the column that is actually overflowing, not just the last section');
