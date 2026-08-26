const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const script = fs.readFileSync(path.join(root, 'public/js/script.js'), 'utf8');
const gallery = fs.readFileSync(path.join(root, 'public/js/gallery-renderer.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'public/css/styles.css'), 'utf8');
const templates = fs.readFileSync(path.join(root, 'src/data/templates.js'), 'utf8');

function fail(message) { throw new Error(message); }
function pass(message) { console.log(`PASS: ${message}`); }

if (!gallery.includes('window.renderTemplateThumbnailInto')) fail('shared thumbnail renderer API missing');
if (!gallery.includes('window.initTemplatePickerThumbs')) fail('builder thumbnail initializer missing');
if (!gallery.includes('window.initShowcaseThumbs')) fail('showcase thumbnail initializer missing');
pass('all thumbnail surfaces use the shared renderer API');

if (!/class=\"tmpl-mini-t\" data-thumb-id=\"\$\{t\.id\}/.test(script)) fail('builder template cards do not use shared template thumbnail nodes');
if (/tmpl-mini-t[^\n]*>\$\{SVGS\[t\.id\]\}/.test(script)) fail('builder still uses SVG as the primary thumbnail');
if (/sc-thumb[^\n]*>\$\{SVGS\[t\.id\]\}/.test(script)) fail('showcase still uses SVG as the primary thumbnail');
pass('builder and showcase no longer use SVG as their primary template preview');

if (!css.includes('.page.g-thumb-page, .page.template-thumb-page')) fail('thumbnail page does not share fixed A4 geometry');
if (!css.includes('width: 794px; height: 1123px;')) fail('thumbnail A4 dimensions are not fixed');
if (!css.includes('.tmpl-mini-t .template-thumb-page')) fail('builder thumbnail page styling missing');
pass('gallery, builder and showcase thumbnails share fixed A4 geometry');

const definitionCount = (templates.match(/\"id\":/g) || []).length;
if (definitionCount < 95) fail(`canonical template definition count unexpectedly low: ${definitionCount}`);
pass(`canonical registry contains ${definitionCount} template definitions`);

if (/category === ['\"]premium['\"]|category === ['\"]premium-sidebar['\"]/.test(gallery)) fail('thumbnail renderer has premium-specific category branching');
pass('thumbnail renderer has no premium-specific category branch');

console.log('Template thumbnail parity checks passed');
