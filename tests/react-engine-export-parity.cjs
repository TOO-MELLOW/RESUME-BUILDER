// tests/react-engine-export-parity.cjs
//
// The server PDF export builds a standalone HTML document and fetches its
// stylesheets by URL (see getPdfGlobalStyles() in public/js/script.js). It
// cannot reach src/styles/react-engine.css, because that file is only ever
// loaded through `import './styles/react-engine.css'` in src/main.jsx — a
// Vite-processed import with no stable production URL.
//
// public/css/react-engine.css is the static copy that gives the export
// pipeline a fetchable path to the exact same rules the live preview uses
// (page geometry, sidebar stretch, pagination breaks, backgrounds). If the
// two files diverge, the export silently stops matching the preview again —
// the same class of bug this copy was created to fix once and for all.
//
// This test fails the build the moment they diverge, whether from an edit to
// one file only or from a merge that drops the header comment expectations.
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const sourcePath = path.join(root, 'src/styles/react-engine.css');
const exportCopyPath = path.join(root, 'public/css/react-engine.css');

const source = fs.readFileSync(sourcePath, 'utf8').trim();
const exportCopyRaw = fs.readFileSync(exportCopyPath, 'utf8');

const HEADER_END_MARKER = ' */\n';
const markerIndex = exportCopyRaw.indexOf(HEADER_END_MARKER);
if (markerIndex === -1) {
  throw new Error(
    `${path.relative(root, exportCopyPath)} is missing its "*/" header-comment terminator. ` +
    'The file must start with an explanatory block comment (see git history) followed by the ' +
    'verbatim contents of src/styles/react-engine.css.'
  );
}
const exportCopyBody = exportCopyRaw.slice(markerIndex + HEADER_END_MARKER.length).trim();

if (exportCopyBody !== source) {
  throw new Error(
    'public/css/react-engine.css has drifted from src/styles/react-engine.css. ' +
    'These must stay byte-for-byte identical (after the explanatory header comment in the ' +
    'public copy) or the server PDF export will silently stop matching the live preview again. ' +
    'Copy the full contents of src/styles/react-engine.css into public/css/react-engine.css ' +
    'below its header comment.'
  );
}

const scriptJs = fs.readFileSync(path.join(root, 'public/js/script.js'), 'utf8');
if (!/getPdfGlobalStyles[\s\S]*?react-engine\.css/.test(scriptJs)) {
  throw new Error(
    'getPdfGlobalStyles() in public/js/script.js no longer fetches /css/react-engine.css. ' +
    'The server-exported document needs the same engine stylesheet as the live preview ' +
    '(page geometry, sidebar stretch, pagination breaks) or templates will render correctly ' +
    'on screen and incorrectly in the downloaded PDF.'
  );
}

console.log('PASS: public/css/react-engine.css matches src/styles/react-engine.css and is wired into the PDF export document');
