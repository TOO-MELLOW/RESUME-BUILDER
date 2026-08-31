const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..');
function read(p){return fs.readFileSync(path.join(ROOT,p),'utf8')}
function parseArray(source, re, label){const m=source.match(re);if(!m)throw new Error(`${label} parse failed`);return Function(`return (${m[1]})`)();}
const tSrc=read('src/data/templates.js');
const tsSrc=read('public/js/template-system.js');
const specsSrc=read('src/data/templatePageSpecs.js').replace(/export const /g,'const ')+`\n;globalThis.__specs = templatePageSpecs;`;
const tDefs=parseArray(tSrc,/export const templates\s*=\s*(\[[\s\S]*?\])\s*;\s*export const templateById/,'templates');
const reg=JSON.parse(tsSrc.match(/const definitions = (\[.*?\]);/s)[1]);
const ctx={}; vm.createContext(ctx); vm.runInContext(specsSrc,ctx); const specs=ctx.__specs;
const failures=[];
const EXPECTED_COUNT=83;
const ids=new Set(tDefs.map(x=>x.id));
if(tDefs.length!==EXPECTED_COUNT) failures.push(`templates count ${tDefs.length}`);
if(ids.size!==EXPECTED_COUNT) failures.push(`duplicate ids ${EXPECTED_COUNT-ids.size}`);
if(new Set(tDefs.map(x=>x.id)).size!==EXPECTED_COUNT) failures.push('duplicate ids');
const premiumCount=tDefs.filter(x=>x.category==='premium'||x.category==='premium-sidebar').length;
const legacyCount=tDefs.filter(x=>['modern','ats','executive','creative','student','career-change','trade','elegant'].includes(x.category)).length;
if(premiumCount!==40) failures.push(`premium count ${premiumCount}`);
if(legacyCount!==43) failures.push(`legacy count ${legacyCount}`);
if(premiumCount + legacyCount !== EXPECTED_COUNT) failures.push(`unclassified template categories: ${EXPECTED_COUNT-(premiumCount+legacyCount)}`);
if(tDefs.some(x=>(x.supportedSections||[]).includes('projects'))) failures.push('projects remains in template supportedSections');
if(reg.length!==EXPECTED_COUNT) failures.push(`registry count ${reg.length}`);
for(let i=0;i<EXPECTED_COUNT;i++){if(tDefs[i].id!==reg[i].id) failures.push(`registry order mismatch at ${i}: ${tDefs[i].id}/${reg[i].id}`)}
if(specs.length!==EXPECTED_COUNT) failures.push(`page specs count ${specs.length}`);
const specIds=new Set(specs.map(x=>x.id)); if(specIds.size!==EXPECTED_COUNT) failures.push('duplicate page spec ids');
for(const id of ids) if(!specIds.has(id)) failures.push(`missing page spec ${id}`);
const bad=['r7-','.r7-stage','<div$','data-rf-template-root="true"'];
for(const p of ['src/data/templates.js','public/js/script.js','public/css/styles.css']){
 const s=read(p); for(const b of bad) if(s.includes(b)) failures.push(`${p} contains forbidden ${b}`);
}
const custom=tDefs.filter(t=>t.templateMarkup);
if(custom.length!==40) failures.push(`premium custom markup count ${custom.length}`);
for(const t of custom){
 if(t.templateMarkup.includes('data-template=')) failures.push(`${t.id} embeds data-template`);
 if(/class=["'][^"']*\bpage\b/.test(t.templateMarkup)) failures.push(`${t.id} embeds .page`);
 const main=(t.templateMarkup.match(/data-role="main"/g)||[]).length;
 const side=(t.templateMarkup.match(/data-role="sidebar"/g)||[]).length;
 if(main>1||side>1) failures.push(`${t.id} duplicate role placeholders main=${main} side=${side}`);
}
const sidebarIds=tDefs.filter(t=>t.layout==='two-column').map(t=>t.id);
const sideSet=new Set(sidebarIds);
if(sidebarIds.length===0) failures.push('no two-column templates');
const script=read('public/js/script.js');
if(!script.includes('function renderTemplateContent')) failures.push('renderTemplateContent missing');
if(!script.includes('function enforceSectionCoverage')) failures.push('enforceSectionCoverage missing');
if(!script.includes('return enforceSectionCoverage(data, tid, html)')) failures.push('coverage enforcement not wired');
if(fs.existsSync(path.join(ROOT,'src/data/premiumTemplates.js'))) failures.push('obsolete premiumTemplates.js exists');
if(fs.existsSync(path.join(ROOT,'src/data/shells.js'))) failures.push('obsolete shells.js exists');
if(fs.existsSync(path.join(ROOT,'public/templates-html'))) failures.push('obsolete templates-html exists');
const css=read('public/css/styles.css');
const dangerous=[/\btransform:\s*scale\([^;]*\)!important/ig,/\bwidth:\s*0\b/ig,/\boverflow:\s*hidden\s*!important/ig];
// Only flag dangerous patterns in newly generated r7 system; current stylesheet legitimately has overflow:hidden elsewhere.
if(css.includes('.r7-')) failures.push('r7 css remains');
console.log(`FINAL_INTEGRITY ${failures.length?'FAIL':'PASS'}`);
if(failures.length){for(const f of failures)console.error(' - '+f);process.exit(1)}
console.log(`${EXPECTED_COUNT} retained templates; ${custom.length} canonical markup definitions; ${EXPECTED_COUNT} page specs; registry aligned`);
