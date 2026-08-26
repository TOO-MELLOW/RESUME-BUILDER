const fs = require('node:fs');
const path = require('node:path');
const ROOT = path.resolve(__dirname, '..');

function extractJson(text, regex, label) {
  const match = text.match(regex);
  if (!match) throw new Error(`Could not parse ${label}`);
  return JSON.parse(match[1]);
}

const source = fs.readFileSync(path.join(ROOT, 'src/data/templates.js'), 'utf8');
const mirror = fs.readFileSync(path.join(ROOT, 'public/js/template-system.js'), 'utf8');
const sourceDefs = extractJson(source, /export const templates = (\[.*?\]);\nexport const templateById/s, 'source template registry');
const mirrorDefs = extractJson(mirror, /const definitions = (\[.*?\]);\n\n  const seen/s, 'public template registry');

if (sourceDefs.length !== 95 || mirrorDefs.length !== 95) {
  throw new Error(`Template-system count mismatch: source=${sourceDefs.length}, mirror=${mirrorDefs.length}`);
}

for (let i = 0; i < sourceDefs.length; i += 1) {
  const a = sourceDefs[i];
  const b = mirrorDefs[i];
  if (a.id !== b.id) throw new Error(`Template order/id mismatch at index ${i}: ${a.id} vs ${b.id}`);
  if (a.name !== b.name || a.category !== b.category || a.rendererKind !== b.rendererKind) {
    throw new Error(`Template metadata mismatch for ${a.id}`);
  }
  if ((a.templateMarkup || null) !== (b.templateMarkup || null)) {
    throw new Error(`Template markup mismatch for ${a.id}`);
  }
}

if (!mirror.includes('global.TEMPLATE_CONFIGS = templateConfig;')) {
  throw new Error('TEMPLATE_CONFIGS is not exported by the synchronous registry.');
}
if ((mirror.match(/const definitions = /g) || []).length !== 1) {
  throw new Error('template-system.js contains multiple definition payloads.');
}

console.log('PASS: public/js/template-system.js is a 1:1 mirror of src/data/templates.js');
