const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const s = fs.readFileSync(path.join(root, 'src/engine/ResumeDocument.jsx'), 'utf8');
if (!s.includes('const A4_HEIGHT_PX = 1122.5')) throw new Error('Stable A4 height missing');
if (/Math\.max\(900|setAvailableHeight\(nextAvailable\)|availableHeight - Math\.min/.test(s)) throw new Error('Found old shrink-to-fit pagination logic');
if (!s.includes('splitOversizedItem')) throw new Error('Oversized item splitter missing');
if (!s.includes('__rfContinuationChunk')) throw new Error('Continuation chunk marker missing');
console.log('PASS: pagination does not shrink A4 to mask overflow');

// Rendered-overflow reflow guardrails.
const resumeDocument = fs.readFileSync(path.join(root, 'src/engine/ResumeDocument.jsx'), 'utf8');
if (!resumeDocument.includes('waitForVisualStabilization')) throw new Error('Pagination does not wait for fonts/images before overflow decisions');
if (!resumeDocument.includes('reflowRenderedOverflow')) throw new Error('Pagination does not reflow real DOM overflow');
if (!resumeDocument.includes('moveOverflowFromPage')) throw new Error('Pagination cannot move overflow to a continuation page');
if (!resumeDocument.includes('splitLastSectionForOverflow')) throw new Error('Pagination cannot split an overflowing section');
