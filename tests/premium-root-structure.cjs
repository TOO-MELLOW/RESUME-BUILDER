const fs=require('node:fs'),path=require('node:path');
const ROOT=path.resolve(__dirname,'..');
const source=fs.readFileSync(path.join(ROOT,'src/data/templates.js'),'utf8');
const engine=fs.readFileSync(path.join(ROOT,'src/engine/ResumeDocument.jsx'),'utf8');
const css=fs.readFileSync(path.join(ROOT,'public/css/styles.css'),'utf8');
const defs=JSON.parse(source.match(/export const templates = (\[.*?\]);\nexport const templateById/s)[1]);
for(const d of defs.filter(x=>x.category==='premium'||x.category==='premium-sidebar')){
 if(!d.templateMarkup) throw new Error(`${d.id}: missing markup`);
 if(!css.includes(`.page[data-template="${d.id}"]`)) throw new Error(`${d.id}: premium style not scoped to canonical page`);
}
if(engine.includes('rf-premium-root')||engine.includes('isPremiumTemplate(')||engine.includes('normalizePremiumFragment')) throw new Error('Premium-only React wrapper logic remains');
if(!engine.includes('<div class="page" data-template="${escapeAttr(templateId)}"')) throw new Error('Canonical page wrapper is missing');
console.log('PASS: premium templates use the same .page[data-template] frame');
console.log('PASS: no premium-only React root exists');
