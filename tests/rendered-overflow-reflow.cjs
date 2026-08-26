#!/usr/bin/env node
const fs=require('node:fs');
const path=require('node:path');
const ROOT=path.resolve(__dirname,'..');
function assert(c,m){if(!c){console.error(`FAIL: ${m}`);process.exitCode=1;}}
const src=fs.readFileSync(path.join(ROOT,'src/engine/ResumeDocument.jsx'),'utf8');
const css=fs.readFileSync(path.join(ROOT,'src/styles/react-engine.css'),'utf8');
assert(src.includes('waitForVisualStabilization'),'font/image stabilization is missing');
assert(src.includes('reflowRenderedOverflow'),'rendered overflow loop is missing');
assert(src.includes('moveOverflowFromPage'),'overflow does not advance to another page');
assert(src.includes('splitLastSectionForOverflow'),'overflowed sections cannot be split');
assert(css.includes('.rf-a4-page') && css.includes('overflow:hidden'),'outer A4 sheet remains the visual clipping boundary');
assert(css.includes('.rf-page-content'),'template content has a distinct measurement surface');
console.log('PASS: rendered overflow reflow guardrails');

// Template shells must not retain their own fixed A4 clipping boundary inside
// the canonical A4 page. The outer .rf-a4-page is the only clipping/export
// boundary; inner legacy .page frames must expand so the overflow detector can
// see content that needs to move to the next sheet.
const engineCss = css;
if (!engineCss.includes('[data-rf-template-page="true"]')) throw new Error('Missing legacy template page overflow override');
if (!engineCss.includes('height:auto !important')) throw new Error('Legacy template page height is still fixed');
if (!engineCss.includes('overflow:visible !important')) throw new Error('Legacy template page overflow is still clipped');
console.log('PASS: legacy template frames cannot mask overflow before A4 reflow');
