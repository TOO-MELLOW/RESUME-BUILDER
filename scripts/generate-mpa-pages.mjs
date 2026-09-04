import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const sourcePath = path.join(root, 'scripts', 'mpa-source.html');
const source = fs.readFileSync(sourcePath, 'utf8');

function blockById(id) {
  const start = source.indexOf(`<div id="${id}"`);
  if (start < 0) throw new Error(`Missing ${id} in ${sourcePath}`);
  let depth = 0;
  let i = start;
  const tag = /<\/?div\b[^>]*>/gi;
  tag.lastIndex = start;
  let match;
  let opened = false;
  while ((match = tag.exec(source))) {
    const text = match[0];
    if (/^<div\b/i.test(text) && !/\/\s*>$/.test(text)) { depth++; opened = true; }
    else if (/^<\/div>/i.test(text)) depth--;
    if (opened && depth === 0) return source.slice(start, tag.lastIndex);
  }
  throw new Error(`Could not balance ${id}`);
}

function commentBlock(startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker);
  if (start < 0 || end < 0 || end < start) throw new Error(`Missing block ${startMarker}`);
  return source.slice(start, end);
}

const head = source.slice(source.indexOf('<head>'), source.indexOf('</head>') + 7)
  .replace(/<base\b[^>]*>/gi, '')
  .replace(/<link rel="canonical"[^>]*>/gi, '');

const globalPrefix = `
  <div id="toast-container"></div>
  <div class="quick-fab-wrap" id="quick-fab-wrap">
    <div class="quick-fab-menu" id="quick-fab-menu">
      <button class="qf-item" onclick="closeQuickFab();navigate('builder')">📄 Create CV</button>
      <button class="qf-item" onclick="closeQuickFab();openImportModal()">📥 Import CV</button>
      <button class="qf-item" onclick="closeQuickFab();createNewCoverLetter()">✉️ Cover Letter</button>
    </div>
    <button class="quick-fab" id="quick-fab" onclick="toggleQuickFab()" aria-label="Quick actions">+</button>
  </div>
`;

const commonTail = source.slice(source.indexOf('<!-- TIPS MODAL -->'), source.indexOf('<!-- PAYWALL MODAL -->')) + source.slice(source.indexOf('<!-- PAYWALL MODAL -->'), source.indexOf('<!-- ============================================================\n       SCRIPTS'));
const dataScripts = source.slice(source.indexOf('  <script id="cv-data"'), source.indexOf('  <script src="/vendor/html2canvas.min.js"'));
const runtimeScripts = source.slice(source.indexOf('  <script src="/vendor/html2canvas.min.js"'), source.indexOf('</body>'))
  .replace(/<!--\s*=+\n\s*SAFE NAVIGATE OVERRIDE[\s\S]*?<\/script>\s*/m, '');

const pages = {
  landing: { file: 'index.html', id: 'view-landing', bodyView: 'landing', title: 'MellowCV Factory | Professional Resume Builder', description: 'Build a professional, ATS-ready resume in minutes with expert templates and AI-powered writing assistance. Free, no account needed.', path: '/' },
  gallery: { file: 'gallery.html', id: 'view-gallery', bodyView: 'gallery', title: 'Resume Templates | MellowCV Factory', description: 'Browse professional resume templates and choose a design for your next application.', path: '/gallery' },
  manager: { file: 'manager.html', id: 'view-manager', bodyView: 'manager', title: 'My Resumes | MellowCV Factory', description: 'View, edit, and manage your saved resumes and cover letters.', path: '/manager' },
  builder: { file: 'builder.html', id: 'view-builder', bodyView: 'builder', title: 'Build Your Resume | MellowCV Factory', description: 'Create a polished, ATS-ready resume with live preview, editing tools and PDF export.', path: '/builder' },
  clbuilder: { file: 'cover-letter.html', id: 'view-clbuilder', bodyView: 'clbuilder', title: 'Cover Letter Builder | MellowCV Factory', description: 'Write and edit a professional cover letter with a live preview.', path: '/cover-letter' },
};

for (const page of Object.values(pages)) {
  const view = blockById(page.id);
  let styles = head;
  styles = styles.replace(/<title>[^<]*<\/title>/i, `<title>${page.title}</title>`);
  styles = styles.replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="${page.description}">`);
  styles = styles.replace(/<meta property="og:url"[^>]*>/i, `<meta property="og:url" content="${page.path}">`);
  const body = `${globalPrefix}\n${view}\n${commonTail}\n${dataScripts}\n${runtimeScripts}`;
  const html = `<!DOCTYPE html>\n<html lang="en">\n<head>${styles.slice(styles.indexOf('<head>') + 6, -7)}</head>\n<body data-view="${page.bodyView}">\n${body}\n</body>\n</html>\n`;
  fs.writeFileSync(path.join(root, page.file), html);
}

console.log('Generated MPA entry documents:', Object.values(pages).map(p => p.file).join(', '));
