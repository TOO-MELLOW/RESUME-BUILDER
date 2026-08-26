const fs=require('node:fs'), path=require('node:path');
const root=path.resolve(__dirname,'..');
const engine=fs.readFileSync(path.join(root,'src/engine/ResumeDocument.jsx'),'utf8');
const css=fs.readFileSync(path.join(root,'src/styles/react-engine.css'),'utf8');
const styles=fs.readFileSync(path.join(root,'public/css/styles.css'),'utf8');
const index=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const token of ['makeInitialPages(','fillRenderedFrame(','availableHeight','setAvailableHeight(','padding:var(--pad, 0) !important','min-height:100% !important','data-rf-template-root="true"','rf-premium-root','isPremiumTemplate(','normalizePremiumFragment']) {
 if(engine.includes(token)||css.includes(token)||styles.includes(token)) throw new Error(`Legacy/contradictory renderer code remains: ${token}`);
}
if(index.includes('premium-templates.css')) throw new Error('Legacy premium stylesheet is still linked');
if(fs.existsSync(path.join(root,'src/data/premiumTemplates.js'))) throw new Error('Separate premium registry remains');
if(fs.existsSync(path.join(root,'public/css/premium-templates.css'))) throw new Error('Separate premium stylesheet remains');
console.log('PASS: dead/legacy renderer code and duplicate premium systems are absent');
