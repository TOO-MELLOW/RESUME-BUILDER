# Resume Factory — React/Vite rebuild

This rebuild keeps the existing Resume Factory product surface intact while replacing its fragile CV preview/export layer with a canonical React A4 renderer based on the Mellow CV Builder model.

## Core architecture

- React 18 + Vite 6.
- Existing Factory homepage, template gallery, builder/editor tabs, manager, AI tools, cover-letter flow, analytics, and paywall logic are preserved.
- `src/engine/ResumeDocument.jsx` owns the canonical CV preview.
- Every CV renders into explicit `.a4-page` containers at A4 portrait dimensions.
- The same A4 DOM is used by the client PDF exporter; browser pagination is not used for CV PDF generation.
- `src/data/templates.js` contains all 40 registered templates.
- `src/data/shells.js` embeds all 83 supplied HTML template shells, eliminating async shell-fetch races.
- The 55 legacy templates continue using the original Factory renderer through a React bridge, so their existing visual designs are preserved rather than replaced by generic placeholders.
- The three registered two-page shell templates deterministically render exactly two A4 pages.
- One-page templates are automatically fit down if content exceeds the physical A4 page, preventing accidental 3–7 page browser output.
- The normal Factory CV download flow now calls the canonical React/html2canvas/jsPDF exporter instead of `window.print()`.

## Run

```bash
npm install
npm run dev
```

## QA

```bash
npm run qa:syntax
npm run qa:templates
npm run build
```
