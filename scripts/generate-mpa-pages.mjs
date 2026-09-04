import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const sourcePath = resolve(root, 'index.html');

const pages = [
  {
    file: 'gallery.html',
    view: 'gallery',
    title: 'Resume Templates | Mellow CV Factory',
    description: 'Browse professional resume templates from Mellow CV Factory.'
  },
  {
    file: 'manager.html',
    view: 'manager',
    title: 'My Resumes | Mellow CV Factory',
    description: 'View, edit, and manage your saved resumes and cover letters.'
  },
  {
    file: 'builder.html',
    view: 'builder',
    title: 'Build Your Resume | Mellow CV Factory',
    description: 'Create a polished, ATS-ready resume with live preview and writing tools.'
  },
  {
    file: 'cover-letter.html',
    view: 'clbuilder',
    title: 'Cover Letter Builder | Mellow CV Factory',
    description: 'Create a tailored cover letter with Mellow CV Factory.'
  }
];

let source = await readFile(sourcePath, 'utf8');

for (const page of pages) {
  let html = source
    .replace('<body data-view="landing">', `<body data-view="${page.view}">`)
    .replace(/<title>.*?<\/title>/s, `<title>${page.title}</title>`);

  if (/<meta name="description"[^>]*>/.test(html)) {
    html = html.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${page.description}">`);
  } else {
    html = html.replace('</head>', `    <meta name="description" content="${page.description}">\n</head>`);
  }

  await writeFile(resolve(root, page.file), html);
}

console.log(`Generated ${pages.length} MPA entry documents from index.html.`);
