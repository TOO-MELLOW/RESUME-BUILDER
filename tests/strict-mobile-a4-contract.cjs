const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const css = fs.readFileSync(path.join(root, 'public/css/styles.css'), 'utf8');
const js = fs.readFileSync(path.join(root, 'public/js/script.js'), 'utf8');
const fail = msg => { console.error('FAIL:', msg); process.exit(1); };

// The known duplicate geometry block used percentage columns later in the cascade.
const forbiddenGeometry = [
  /\.page\[data-template="modern-01"\]\s*\{\s*grid-template-columns:\s*36%\s+1fr\s*;?/,
  /\.page\[data-template="modern-02"\]\s*\{\s*grid-template-columns:\s*36%\s+1fr\s*;?/,
  /\.page\[data-template="executive-02"\]\s*\{\s*grid-template-columns:\s*36%\s+1fr\s*;?/,
  /\.page\[data-template\^="split-"\]\s*\{\s*grid-template-columns:\s*1fr\s+30%\s*;?/,
  /\.page\[data-template\^="facet-"\]\s*\{\s*grid-template-columns:\s*36%\s+1fr\s*;?/
];
for (const re of forbiddenGeometry) if (re.test(css)) fail(`duplicate/conflicting template geometry remains: ${re}`);

// Responsive rules may style the viewer chrome, but must not mutate the CV document.
const mobileDocRules = [
  /@media[^\{]*max-width\s*:\s*767px[^\{]*\{[\s\S]*?\.split-grid\s*\{[^}]*grid-template-columns\s*:\s*1fr\s*;[\s\S]*?\}/,
  /@media[^\{]*max-width\s*:\s*767px[^\{]*\{[\s\S]*?\.cmb-v02\s*\{[^}]*grid-template-columns\s*:\s*1fr\s*;[\s\S]*?\}/,
  /@media[^\{]*max-width\s*:\s*767px[^\{]*\{[\s\S]*?\.func2-grid\s*\{[^}]*grid-template-columns\s*:\s*1fr\s*;[\s\S]*?\}/,
  /@media[^\{]*max-width\s*:\s*767px[^\{]*\{[\s\S]*?\.st3-grid\s*\{[^}]*grid-template-columns\s*:\s*1fr\s*;[\s\S]*?\}/
];
for (const re of mobileDocRules) if (re.test(css)) fail(`viewport-dependent CV reflow rule remains: ${re}`);

if (!/\.page\.pdf-export-render[^\n]*\.entry-header|\.page\.pdf-export-render \.entry-header/.test(css)) fail('PDF canonical entry-header override missing');
if (!/\.page\.pdf-export-render \.entry-date\s*\{\s*white-space:\s*nowrap/.test(css)) fail('PDF canonical entry-date override missing');
if (!/clone\.querySelectorAll\('\.rf-a4-page'\)/.test(js)) fail('mobile preview does not clone all A4 pages');
if (/scaleMobilePreviewToFit/.test(js)) fail('undefined legacy mobile scaler remains');
if (!/function fitMobilePreviewToFit\(\)/.test(js)) fail('mobile fit function missing');
if (!/function changeMobilePreviewZoom\(delta\)/.test(js)) fail('mobile zoom function missing');

console.log('Strict mobile/A4 contract checks passed');
