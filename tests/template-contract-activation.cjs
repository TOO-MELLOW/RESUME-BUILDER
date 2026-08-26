const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'src/engine/ResumeDocument.jsx'), 'utf8');
const specs = fs.readFileSync(path.join(root, 'src/data/templatePageSpecs.js'), 'utf8');
if (!source.includes("import { templatePageSpecs } from '../data/templatePageSpecs';")) throw new Error('page contracts are not imported by the renderer');
for (const token of ['getPageSpec', 'applyContinuationContract', 'partitionSections', 'getActualPageOverflow']) {
  if (!source.includes(`function ${token}`)) throw new Error(`missing active contract/pagination function: ${token}`);
}
if (!source.includes("data-rf-hidden-continuation")) throw new Error('continuation chrome suppression is not active');
if (!source.includes('sectionRegion(spec,')) throw new Error('contract-driven section routing is not active');
if (!source.includes('getPageSpec(templateId)')) throw new Error('template page specs are not resolved at render time');
if (!specs.includes('export const templatePageSpecs')) throw new Error('template page specs export missing');
console.log('PASS: template page contracts are actively wired into the renderer');
