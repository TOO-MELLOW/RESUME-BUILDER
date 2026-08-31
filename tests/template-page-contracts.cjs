const fs = require('fs');
const path = require('path');
const source = fs.readFileSync(path.join(__dirname, '../src/data/templatePageSpecs.js'), 'utf8');
const jsonText = source.replace(/^export const templatePageSpecs = /, '').split(';\n\nexport const templatePageSpecById')[0];
const specs = Function(`return (${jsonText})`)();
const canonicalCount = (fs.readFileSync(path.join(__dirname, '../src/data/templates.js'),'utf8').match(/\"id\": \"[^\"]+\"/g) || []).length;
if (specs.length !== canonicalCount) throw new Error(`Expected ${canonicalCount} template contracts, found ${specs.length}`);
const ids = new Set();
for (const s of specs) {
  if (!s.id || ids.has(s.id)) throw new Error(`Duplicate/missing contract: ${s.id}`);
  ids.add(s.id);
  if (!s.page1 || !s.continuation || !s.pagination) throw new Error(`Incomplete contract: ${s.id}`);
  if (s.pagination.neverClip !== true) throw new Error(`Clipping is not prohibited: ${s.id}`);
  if (s.pagination.neverScaleToFitPage !== true) throw new Error(`Global fit-to-page scaling is not prohibited: ${s.id}`);
  if (s.continuation.photo === 'never on continuation unless a template explicitly declares it') {
    if (s.continuation.hidePage1ChromeSelectors === undefined && s.sourceRenderer !== 'html-shell') {
      throw new Error(`No continuation chrome suppression rule: ${s.id}`);
    }
  }
}
const sourceTemplates = fs.readFileSync(path.join(__dirname, '../src/data/templates.js'),'utf8');
const expected = (sourceTemplates.match(/\"id\": \"[^\"]+\"/g) || []).map(x => x.slice(7,-1));
const unmatched = expected.filter(id => !ids.has(id));
if (unmatched.length) throw new Error(`Missing contracts: ${unmatched.join(', ')}`);
console.log(`PASS: ${specs.length} explicit template page contracts`);
