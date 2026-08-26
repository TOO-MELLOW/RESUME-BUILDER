const fs=require('node:fs'),path=require('node:path');
const ROOT=path.resolve(__dirname,'..');
const engine=fs.readFileSync(path.join(ROOT,'src/engine/ResumeDocument.jsx'),'utf8');
if(engine.includes('rf-premium-root')) throw new Error('Premium-only root class still exists');
if(engine.includes('data-rf-template-root')) throw new Error('Premium-only root identity still exists');
if(!engine.includes('data-template="${escapeAttr(templateId)}"')) throw new Error('Canonical page template identity is missing');
console.log('PASS: every template owns the same page-level data-template identity');
