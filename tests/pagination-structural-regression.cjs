const fs=require('node:fs'),path=require('node:path');
const ROOT=path.resolve(__dirname,'..');
const engine=fs.readFileSync(path.join(ROOT,'src/engine/ResumeDocument.jsx'),'utf8');
const reactCss=fs.readFileSync(path.join(ROOT,'src/styles/react-engine.css'),'utf8');
const specs=fs.readFileSync(path.join(ROOT,'src/data/templatePageSpecs.js'),'utf8');
for(const token of ['data-rf-template-page','root.querySelectorAll(','const definition = templateById[templateId]','data-template="${escapeAttr(templateId)}"'])
 if(!engine.includes(token)) throw new Error(`Missing canonical pagination invariant: ${token}`);
if(/isPremiumTemplate\(|normalizePremiumFragment|rf-premium-root/.test(engine)) throw new Error('Premium-specific pagination path still exists');
const sidebar=['graphite-sidebar-01','ivory-editorial-sidebar-02','navy-vertical-rail-03','burgundy-two-page-04','forest-profile-sidebar-05','black-copper-executive-06','slate-portfolio-07','sand-modern-two-page-08','indigo-cards-09','teal-command-two-page-10'];
for(const id of sidebar){
 const i=specs.indexOf(`"id": "${id}"`), j=specs.indexOf('"id": "',i+1);
 const b=specs.slice(i,j<0?specs.length:j);
 if(!b.includes('"frame": ".page"')) throw new Error(`${id} still uses a special page frame`);
}
console.log('PASS: every template uses the same canonical page wrapper and pagination path');
console.log('PASS: sidebar page specs no longer define a premium-only frame');
