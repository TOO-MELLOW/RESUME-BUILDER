#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const ROOT = path.resolve(__dirname, '..');
const templatesSource = fs.readFileSync(path.join(ROOT, 'src/data/templates.js'), 'utf8');
const registry = fs.readFileSync(path.join(ROOT, 'public/js/template-system.js'), 'utf8');
const engine = fs.readFileSync(path.join(ROOT, 'src/engine/ResumeDocument.jsx'), 'utf8');
const main = fs.readFileSync(path.join(ROOT, 'src/main.jsx'), 'utf8');
const script = fs.readFileSync(path.join(ROOT, 'public/js/script.js'), 'utf8');
const match = templatesSource.match(/export const templates\s*=\s*(\[[\s\S]*?\])\s*;\s*export const templateById/);
if (!match) throw new Error('Canonical template array could not be parsed');
const definitions = Function(`return ${match[1]}`)();
const premiumDefs = definitions.filter(d => d.category === 'premium' || d.category === 'premium-sidebar');
const failures=[];
for (const d of premiumDefs) {
  if (!d.templateMarkup) failures.push(`canonical templates.js missing templateMarkup for ${d.id}`);
  if (!registry.includes(`"id":"${d.id}"`)) failures.push(`runtime registry missing ${d.id}`);
}
if (premiumDefs.length !== 40) failures.push(`expected 40 premium/premium-sidebar records, found ${premiumDefs.length}`);
if (definitions.length !== 83) failures.push(`expected 83 canonical definitions, found ${definitions.length}`);
if (templatesSource.includes('"rendererKind": "html-shell"')) failures.push('React registry still contains html-shell renderer kinds');
if (registry.includes('"rendererKind":"html-shell"')) failures.push('runtime registry still contains html-shell renderer kinds');
if (engine.includes("from '../data/shells'")) failures.push('React engine still imports shells');
if (engine.includes("rendererKind === 'html-shell'")) failures.push('React engine still branches on html-shell');
if (main.includes('premiumTemplates')) failures.push('main.jsx still depends on a separate premium runtime registry');
if (script.includes('__RF_PREMIUM_TEMPLATES__')) failures.push('legacy script still depends on a separate premium runtime registry');
if (fs.existsSync(path.join(ROOT,'src/data/premiumTemplates.js'))) failures.push('obsolete premium registry file still exists');
if (fs.existsSync(path.join(ROOT,'src/data/shells.js'))) failures.push('obsolete shell registry still present');
if (fs.existsSync(path.join(ROOT,'public/templates-html'))) failures.push('obsolete HTML-shell directory still present');
if (failures.length) { failures.forEach(f=>console.error(`FAIL: ${f}`)); process.exit(1); }
console.log(`PASS: ${premiumDefs.length} premium/premium-sidebar templates use the canonical template registry with no separate premium runtime registry`);
