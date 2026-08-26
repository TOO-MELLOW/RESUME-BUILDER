const fs=require('node:fs'),path=require('node:path');
const ROOT=path.resolve(__dirname,'..');
const main=fs.readFileSync(path.join(ROOT,'src/main.jsx'),'utf8');
const script=fs.readFileSync(path.join(ROOT,'public/js/script.js'),'utf8');
const engine=fs.readFileSync(path.join(ROOT,'src/engine/ResumeDocument.jsx'),'utf8');
if(main.includes('premiumTemplates')||main.includes('__RF_PREMIUM_TEMPLATES__')) throw new Error('Separate premium registry remains in React');
if(!script.includes('getTemplateDefinition(tid)')||!script.includes('definition?.templateMarkup')) throw new Error('Common renderer does not resolve canonical template markup');
if(engine.includes('isPremiumTemplate(')||engine.includes('normalizePremiumFragment')) throw new Error('Premium-specific React branch remains');
console.log('PASS: premium templates use the same synchronous registry and renderer path as every other template');
