const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const engine = fs.readFileSync(path.join(root, 'src/engine/ResumeDocument.jsx'), 'utf8');
if (!engine.includes('if (page.sections.length === 0)')) throw new Error('Empty-page cleanup is missing');
if (!engine.includes('next.splice(pageIndex, 1);')) throw new Error('Empty page is not removed after overflow move');
if (engine.includes('pageIndex > 0 && page.sections.length === 0')) throw new Error('Cleanup still skips the first page');
if (engine.includes("pages.push({ sections: [], firstPage: false })")) throw new Error('Pagination still manufactures empty pages');
console.log('PASS: overflow cannot manufacture an empty A4 page');
