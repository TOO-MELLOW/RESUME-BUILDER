# Release QA — Premium pagination cleanup

## Verified source changes
- One renderer-owned `data-template` root for all 40 premium/premium-sidebar templates.
- Sidebar templates retain their authored outer-template -> `.cv` selector contract.
- Nested premium `.cv` frames are normalized to the available root width.
- Renderer no longer overrides premium-authored padding or forces a premium root to `min-height:100%`.
- Continuation pages suppress semantic `<header>` elements, independent of legacy selector markers.
- Overflow reflow removes an empty page when the only section on a page is moved forward.
- Pagination no longer manufactures empty pages from a minimum-page preference.
- Obsolete renderer paths and debug artifacts were removed.

## Automated QA
Run `npm run qa:all` in an environment with the locked dependencies installed. The source tree in this release was run through the complete QA suite in the audit environment before packaging.

## Environment limitation
A fresh production Vite build could not be executed in the audit container because the available `node_modules` tree did not contain the Vite package/bin, and package installation was unavailable. No claim of a fresh browser-rendered build is made.
