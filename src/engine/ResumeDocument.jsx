import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { templateById } from '../data/templates';
import { templatePageSpecs } from '../data/templatePageSpecs';

const SIDEBAR_TYPES = new Set(['personal-info','skills','languages','certificates','references','interests','strengths']);

function clone(value) { return JSON.parse(JSON.stringify(value)); }
function escapeAttr(value) {
  return String(value ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
function blankPersonal(data) {
  const p = data.personalDetails || {};
  return {
    ...p,
    fullName: '', jobTitle: '', email: '', phone: '', location: '', summary: '', links: [], photo: null
  };
}
function getPageSpec(templateId) {
  return templatePageSpecs.find(spec => spec.id === templateId) || null;
}

function regionTypesFromValue(value) {
  if (Array.isArray(value)) return new Set(value);
  if (typeof value !== 'string') return new Set();
  return new Set(value.split('/').map(v => v.trim()).filter(Boolean));
}

function regionAllows(spec, region, type) {
  const value = spec?.page1?.contentRegions?.[region] ?? spec?.continuation?.preserveRegions?.[region];
  const types = regionTypesFromValue(value);
  return types.has(type);
}

function sectionRegion(spec, type) {
  if (regionAllows(spec, 'sidebar', type)) return 'sidebar';
  if (regionAllows(spec, 'main', type)) return 'main';
  if (SIDEBAR_TYPES.has(type)) return 'sidebar';
  return 'main';
}

// Helper: restore sidebar-before-main ordering in two‑column layouts
function reorderTwoColumnSections(sections, templateId) {
  const spec = getPageSpec(templateId);
  const layout = spec?.layout || templateById[templateId]?.layout || 'single-column';
  if (layout !== 'two-column') return sections;
  return [
    ...sections.filter(s => sectionRegion(spec, s.type) === 'sidebar'),
    ...sections.filter(s => sectionRegion(spec, s.type) === 'main')
  ];
}

function applyContinuationContract(html, templateId, isContinuation, pageNumber, pageCount) {
  if (!isContinuation) return html;
  const spec = getPageSpec(templateId);
  if (!spec?.continuation) return html;
  const doc = new DOMParser().parseFromString(`<div id="__rf_cont_root">${html}</div>`, 'text/html');
  const root = doc.getElementById('__rf_cont_root');
  root.setAttribute('data-rf-continuation', 'true');
  root.setAttribute('data-rf-page-number', String(pageNumber));
  // Header chrome is never repeated on continuation pages. Apply the
  // contract selectors for template-specific chrome, then enforce the
  // semantic <header> rule as a final safety net so a selector typo or legacy
  // contract can never leave a header-sized blank block on page 2+.
  const selectors = spec.continuation.hidePage1ChromeSelectors || [];
  for (const selector of selectors) {
    try {
      root.querySelectorAll(selector).forEach(node => {
        node.setAttribute('data-rf-hidden-continuation', 'true');
        node.style.setProperty('display', 'none', 'important');
      });
    } catch (_) {}
  }
  root.querySelectorAll('header, [data-rf-region="header"]').forEach(node => {
    node.setAttribute('data-rf-hidden-continuation', 'true');
    node.style.setProperty('display', 'none', 'important');
  });
  root.querySelectorAll('[data-page-number]').forEach(node => { node.textContent = String(pageNumber); });
  root.querySelectorAll('[data-page-count]').forEach(node => { node.textContent = String(pageCount); });
  return Array.from(root.children).map(node => node.outerHTML || '').join('');
}


function markTemplatePageFrames(html) {
  const doc = new DOMParser().parseFromString(`<div id="__rf_frame_root">${html || ''}</div>`, 'text/html');
  const root = doc.getElementById('__rf_frame_root');
  root.querySelectorAll('.page').forEach(node => {
    node.setAttribute('data-rf-template-page', 'true');
  });
  return Array.from(root.children).map(node => node.outerHTML || '').join('');
}

function dataForSections(data, sections, firstPage) {
  const out = clone(data);
  out.sections = clone(sections).map(section => section?.__rfContinuation ? { ...section, title: '' } : section);
  if (!firstPage) out.personalDetails = blankPersonal(data);
  return out;
}
function sectionItems(section) { return Array.isArray(section?.items) ? section.items : []; }
function cloneSection(section, items, continuation = false) { return { ...clone(section), items: clone(items), ...(continuation ? { __rfContinuation: true } : {}) }; }

function measureItemChunk(data, templateId, section, itemsForSection, firstPage) {
  const candidate = cloneSection(section, itemsForSection.map(clone));
  return measureNaturalHeight(data, templateId, [candidate], firstPage);
}

function splitTextIntoMeasuredChunks(data, templateId, section, item, key, text, firstPage, available) {
  if (!text || typeof text !== 'string' || text.length < 80) return null;
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length < 12) return null;
  const chunks = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    const candidateItem = { ...clone(item), [key]: candidate };
    const h = measureItemChunk(data, templateId, section, [candidateItem], firstPage);
    if (h <= available + 1 || !current) current = candidate;
    else {
      chunks.push({ ...clone(item), [key]: current, __rfContinuationChunk: chunks.length > 0 });
      current = word;
    }
  }
  if (current) chunks.push({ ...clone(item), [key]: current, __rfContinuationChunk: chunks.length > 0 });
  return chunks.length > 1 ? chunks : null;
}

function splitOversizedItem(data, templateId, section, item, firstPage, available) {
  const base = clone(item);
  const baseHeight = measureItemChunk(data, templateId, section, [base], firstPage);
  if (baseHeight <= available + 1) return [base];

  const bullets = Array.isArray(base.bullets) ? base.bullets : [];
  if (bullets.length > 1) {
    const chunks = [];
    let current = [];
    for (const bullet of bullets) {
      const candidateBullets = [...current, bullet];
      const candidateItem = { ...clone(base), bullets: candidateBullets };
      const h = measureItemChunk(data, templateId, section, [candidateItem], firstPage);
      if (h <= available + 1 || current.length === 0) current = candidateBullets;
      else {
        chunks.push({ ...clone(base), bullets: current, __rfContinuationChunk: chunks.length > 0 });
        current = [bullet];
      }
    }
    if (current.length) chunks.push({ ...clone(base), bullets: current, __rfContinuationChunk: chunks.length > 0 });
    if (chunks.length > 1) return chunks;
  }

  for (const key of ['notes','description','summary','details']) {
    const chunks = splitTextIntoMeasuredChunks(data, templateId, section, base, key, base[key], firstPage, available);
    if (chunks) return chunks;
  }

  // Last resort: keep the item intact. The outer page reflow pass will move it
  // to the next A4 page rather than letting it be silently clipped.
  return [base];
}

function splitSectionItems(data, templateId, section, firstPage, available) {
  const items = sectionItems(section);
  if (!items.length) return [section];
  const expandedItems = [];
  for (const item of items) {
    expandedItems.push(...splitOversizedItem(data, templateId, section, item, firstPage, available));
  }
  const chunks = [];
  let chunk = [];
  for (const item of expandedItems) {
    const candidate = [...chunk, item];
    const candidateSection = cloneSection(section, candidate);
    const h = measureNaturalHeight(data, templateId, [candidateSection], firstPage);
    if (h <= available + 1 || chunk.length === 0) chunk.push(item);
    else {
      chunks.push(cloneSection(section, chunk, chunks.length > 0));
      chunk = [item];
    }
  }
  if (chunk.length) chunks.push(cloneSection(section, chunk, chunks.length > 0));
  return chunks;
}

function explodeSections(data, templateId, sections, firstPage, available) {
  const result = [];
  for (const section of sections) {
    const h = measureNaturalHeight(data, templateId, [section], firstPage);
    if (h <= available + 2) result.push(section);
    else result.push(...splitSectionItems(data, templateId, section, firstPage, available));
  }
  return result;
}

// A section that comfortably fits on an empty page (so explodeSections left
// it as one atomic block) can still be taller than what's actually left on a
// page that already has other content on it. The old greedy loop treated
// that block as unsplittable at this stage and moved it to the next page
// whole, abandoning whatever room was left behind as permanent blank space.
// Below a certain remaining space it's not worth trying (splitting off a
// single orphan line reads worse than a clean break), so MIN_SPLIT_SPACE
// guards against fragmenting a section down to slivers just to fill the last
// few pixels of a page.
const MIN_SPLIT_SPACE = 60;

function fillPageSections(data, templateId, remaining, firstPage, available) {
  const chosen = [];
  while (remaining.length) {
    const section = remaining[0];
    const candidate = [...chosen, section];
    const h = measureNaturalHeight(data, templateId, candidate, firstPage);
    if (h <= available + 2 || !chosen.length) {
      chosen.push(section);
      remaining = remaining.slice(1);
      if (h > available + 2) break;
      continue;
    }
    // Doesn't fit in what's left on this page, but earlier content already
    // fits (chosen is non-empty). Try to split this section so its leading
    // part fills the remaining space instead of leaving it blank, carrying
    // the rest forward to the next page.
    const chosenHeight = measureNaturalHeight(data, templateId, chosen, firstPage);
    const remainingSpace = Math.max(0, available - chosenHeight);
    if (remainingSpace < MIN_SPLIT_SPACE) break;
    const pieces = splitSectionItems(data, templateId, section, firstPage, remainingSpace);
    if (pieces.length > 1) {
      remaining = [...pieces, ...remaining.slice(1)];
      continue;
    }
    break;
  }
  return { chosen, remaining };
}

function partitionSections(data, templateId, sections, firstPage, available) {
  const spec = getPageSpec(templateId);
  const layout = spec?.layout || templateById[templateId]?.layout || 'single-column';
  const twoColumn = layout === 'two-column';
  if (!twoColumn) {
    const expanded = explodeSections(data, templateId, sections, firstPage, available);
    const pages = [];
    let remaining = expanded.slice();
    while (remaining.length) {
      const before = remaining.length;
      const { chosen, remaining: rest } = fillPageSections(data, templateId, remaining, firstPage, available);
      pages.push({ sections: chosen, firstPage });
      remaining = rest.length < before ? rest : rest.slice(1);
      firstPage = false;
    }
    return pages;
  }

  let side = explodeSections(data, templateId, sections.filter(s => sectionRegion(spec, s.type) === 'sidebar'), firstPage, available);
  let main = explodeSections(data, templateId, sections.filter(s => sectionRegion(spec, s.type) === 'main'), firstPage, available);
  const pages = [];
  let pageFirst = firstPage;
  while (side.length || main.length) {
    const chosenSide = [];
    const chosenMain = [];

    let progressed = true;
    while (progressed) {
      progressed = false;
      // Sidebar and main are parallel columns (page height = max, not sum),
      // so each column's own splitting budget is measured against its own
      // chosen height only - the other column's height doesn't constrain it.
      if (side.length) {
        const candidateSide = [...chosenSide, side[0]];
        const h = measureNaturalHeight(data, templateId, [...candidateSide, ...chosenMain], pageFirst);
        if (h <= available + 2 || (!chosenSide.length && !chosenMain.length)) {
          chosenSide.push(side.shift()); progressed = true;
        } else {
          const chosenSideHeight = chosenSide.length ? measureNaturalHeight(data, templateId, chosenSide, pageFirst) : 0;
          const remainingSideSpace = Math.max(0, available - chosenSideHeight);
          if (remainingSideSpace >= MIN_SPLIT_SPACE) {
            const pieces = splitSectionItems(data, templateId, side[0], pageFirst, remainingSideSpace);
            if (pieces.length > 1) { side = [...pieces, ...side.slice(1)]; progressed = true; }
          }
        }
      }
      if (main.length) {
        const candidateMain = [...chosenMain, main[0]];
        const h = measureNaturalHeight(data, templateId, [...chosenSide, ...candidateMain], pageFirst);
        if (h <= available + 2 || (!chosenSide.length && !chosenMain.length)) {
          chosenMain.push(main.shift()); progressed = true;
        } else {
          const chosenMainHeight = chosenMain.length ? measureNaturalHeight(data, templateId, chosenMain, pageFirst) : 0;
          const remainingMainSpace = Math.max(0, available - chosenMainHeight);
          if (remainingMainSpace >= MIN_SPLIT_SPACE) {
            const pieces = splitSectionItems(data, templateId, main[0], pageFirst, remainingMainSpace);
            if (pieces.length > 1) { main = [...pieces, ...main.slice(1)]; progressed = true; }
          }
        }
      }
      if (!side.length && !main.length) break;
    }

    // Never emit an empty continuation page. If a region is intrinsically too large,
    // explodeSections guarantees at least one unit can advance.
    if (!chosenSide.length && !chosenMain.length) {
      const fallback = side.shift() || main.shift();
      if (fallback) chosenMain.push(fallback);
    }

    pages.push({ sections: [...chosenSide, ...chosenMain], firstPage: pageFirst });
    pageFirst = false;
  }
  return pages;
}


function renderPageHtml(data, templateId, pageIndex, pageCount, firstPage) {
  const definition = templateById[templateId] || { rendererKind: 'legacy' };
  const spec = getPageSpec(templateId);
  if (typeof window.__RF_RENDER_TEMPLATE__ === 'function') {
    const fragment = window.__RF_RENDER_TEMPLATE__(data, templateId)
      || '<p class="empty-note">Unable to render template.</p>';
    let html = `<div class="page" data-template="${escapeAttr(templateId)}" data-rf-layout="${escapeAttr(spec?.layout || definition.layout || 'single-column')}" data-rf-template-page="true">${fragment}</div>`;
    if (data.sections.some(section => section?.__rfContinuation)) {
      // Robustly remove empty sidebar/main label elements of any tag, including
      // those containing &nbsp;, <br>, or whitespace only.
      html = html.replace(
        /<([a-z0-9]+)\s+[^>]*class="[^"]*(?:side-label|main-label)[^"]*"[^>]*>\s*(?:&nbsp;|&#160;|<br\s*\/?>)*\s*<\/\1>/gi,
        ''
      );
    }
    return markTemplatePageFrames(
      applyContinuationContract(html, templateId, !firstPage, pageIndex, pageCount)
    );
  }
  return '<p class="empty-note">Template engine is still loading…</p>';
}

function copyInheritedCssVariables(target, source) {
  if (!source) return;
  const computed = getComputedStyle(source);
  for (let i = 0; i < computed.length; i++) {
    const name = computed[i];
    if (name.startsWith('--')) target.style.setProperty(name, computed.getPropertyValue(name));
  }
  if (source.className) target.className = `${source.className} rf-measure-context`;
}

function measureNaturalHeight(data, templateId, sections, firstPage) {
  const holder = document.createElement('div');
  holder.setAttribute('aria-hidden', 'true');
  holder.className = `rf-resume-document rf-template-${templateId} rf-measure-context`;
  holder.style.cssText = 'position:fixed;left:-20000px;top:0;width:210mm;height:auto;visibility:hidden;pointer-events:none;overflow:visible;background:transparent;z-index:-1000;';
  const liveRoot = document.getElementById('cv-root');
  copyInheritedCssVariables(holder, liveRoot);

  const pageData = dataForSections(data, sections, firstPage);


  // Legacy templates retain their existing natural-height measurement path.
  const page = document.createElement('div');
  page.style.cssText = 'width:210mm;height:auto;min-height:0;max-height:none;overflow:visible;background:#fff;box-sizing:border-box;';
  page.innerHTML = renderPageHtml(pageData, templateId, firstPage ? 1 : 2, 1, firstPage);
  holder.appendChild(page);
  document.body.appendChild(holder);
  // Measurement must neutralize every synthetic page/root frame, including
  // premium roots that live one level deeper than .rf-page-content. The old
  // pass only matched the outer .page, so the premium root kept its A4-sized
  // min-height and every section could falsely measure as a full page.
  page.querySelectorAll('.page, .a4-page, [data-role="page"], [data-rf-template-page="true"], .cv').forEach(node => {
    node.style.setProperty('height','auto','important');
    node.style.setProperty('min-height','0','important');
    node.style.setProperty('max-height','none','important');
    node.style.setProperty('overflow','visible','important');
    node.style.setProperty('margin-bottom','0','important');
  });
  const candidates = [page, ...page.querySelectorAll('.page, .a4-page, [data-role="page"], .cv')];
  const height = Math.max(...candidates.map(node => Math.max(node.scrollHeight || 0, node.getBoundingClientRect().height || 0)));
  holder.remove();
  return height;
}

function paginate(data, templateId, available = 1122) {
  const sections = (data.sections || []).filter(s => s.visible !== false).sort((a,b) => (a.order ?? 0) - (b.order ?? 0));
  const pages = partitionSections(data, templateId, sections, true, available);
  return pages.length ? pages.filter(page => page.sections.length > 0) : [{ sections: [], firstPage: true }];
}

function getPageOverflowDetails(root) {
  const pages = Array.from(root.querySelectorAll(':scope .rf-a4-page[data-rf-page="true"]'));
  return pages.map((page, pageIndex) => {
    const inner = page.querySelector(':scope .rf-page-content');
    if (!inner) return { pageIndex, overflow: 0, contentHeight: 0, pageHeight: 0 };
    const pageHeight = Math.max(page.clientHeight || 0, 1122.5);
    const contentHeight = Math.max(
      inner.scrollHeight || 0,
      inner.getBoundingClientRect().height || 0
    );
    return {
      pageIndex,
      overflow: Math.max(0, contentHeight - pageHeight),
      contentHeight,
      pageHeight
    };
  });
}

function getActualPageOverflow(root) {
  return Math.max(0, ...getPageOverflowDetails(root).map(item => item.overflow));
}

// Sidebar and main render as parallel CSS Grid columns (page height = max of
// the two, not a sum). Before trimming anything off an overflowing page we
// need to know which column is actually too tall - the flat sections array
// lists sidebar sections before main ones (see partitionSections), so
// blindly trimming the last entry always hits main even when the sidebar is
// the one running long.
const REGION_ELEMENT_SELECTORS = {
  sidebar: ['[data-role="sidebar"]', '.sidebar', '.side', '.rail', '.facet-sidebar', '.duo-sidebar', '.split-rail'],
  main: ['[data-role="main"]', '.main', '.facet-main', '.duo-main']
};

function locateRegionElement(pageEl, region) {
  for (const selector of REGION_ELEMENT_SELECTORS[region] || []) {
    const found = pageEl.querySelector(selector);
    if (found) return found;
  }
  return null;
}

function findOverflowingRegion(root, pageIndex) {
  const pages = Array.from(root.querySelectorAll(':scope .rf-a4-page[data-rf-page="true"]'));
  const page = pages[pageIndex];
  if (!page) return 'main';
  const sideEl = locateRegionElement(page, 'sidebar');
  const mainEl = locateRegionElement(page, 'main');
  const sideHeight = sideEl ? Math.max(sideEl.scrollHeight || 0, sideEl.getBoundingClientRect().height || 0) : 0;
  const mainHeight = mainEl ? Math.max(mainEl.scrollHeight || 0, mainEl.getBoundingClientRect().height || 0) : 0;
  return sideHeight >= mainHeight ? 'sidebar' : 'main';
}

function lastIndexOfRegion(sections, spec, region) {
  for (let i = sections.length - 1; i >= 0; i--) {
    if (sectionRegion(spec, sections[i].type) === region) return i;
  }
  return -1;
}

function moveOverflowFromPage(plan, pageIndex, templateId, region) {
  if (!Array.isArray(plan) || pageIndex < 0 || pageIndex >= plan.length) return plan;
  const next = plan.map(page => ({ ...page, sections: [...(page.sections || [])] }));
  const page = next[pageIndex];
  if (!page?.sections?.length) return next;

  const spec = getPageSpec(templateId);
  const layout = spec?.layout || templateById[templateId]?.layout || 'single-column';
  const regionIndex = layout === 'two-column' ? lastIndexOfRegion(page.sections, spec, region) : -1;
  const moveIndex = regionIndex >= 0 ? regionIndex : page.sections.length - 1;
  const moved = page.sections[moveIndex];
  page.sections.splice(moveIndex, 1);

  if (pageIndex + 1 >= next.length) {
    next.push({ sections: [moved], firstPage: false });
  } else {
    // Prepend and then restore correct two‑column ordering
    next[pageIndex + 1].sections = reorderTwoColumnSections(
      [moved, ...(next[pageIndex + 1].sections || [])],
      templateId
    );
  }

  // Never leave an empty page behind. When the first/only section overflows,
  // the original page must disappear rather than becoming a blank sheet.
  if (page.sections.length === 0) {
    next.splice(pageIndex, 1);
  }
  return next;
}

function splitLastSectionForOverflow(data, templateId, page, firstPage, available, region) {
  if (!page?.sections?.length) return null;
  const spec = getPageSpec(templateId);
  const layout = spec?.layout || templateById[templateId]?.layout || 'single-column';
  const regionIndex = layout === 'two-column' ? lastIndexOfRegion(page.sections, spec, region) : -1;
  const index = regionIndex >= 0 ? regionIndex : page.sections.length - 1;
  const section = page.sections[index];
  const items = sectionItems(section);
  if (items.length <= 1) return null;

  const cut = Math.max(1, Math.ceil(items.length / 2));
  const head = cloneSection(section, items.slice(0, cut));
  const tail = cloneSection(section, items.slice(cut), true);
  return {
    index,
    head,
    tail,
    headHeight: measureNaturalHeight(data, templateId, [head], firstPage),
    tailHeight: measureNaturalHeight(data, templateId, [tail], false)
  };
}

async function waitForVisualStabilization(root) {
  try { if (document.fonts?.ready) await document.fonts.ready; } catch (_) {}
  const images = Array.from(root.querySelectorAll('img'));
  if (images.length) {
    await Promise.all(images.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        const done = () => { img.removeEventListener('load', done); img.removeEventListener('error', done); resolve(); };
        img.addEventListener('load', done, { once: true });
        img.addEventListener('error', done, { once: true });
      });
    }));
  }
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
}

async function reflowRenderedOverflow(root, initialPlan, data, templateId) {
  let plan = initialPlan.map(page => ({ ...page, sections: [...(page.sections || [])] }));
  for (let iteration = 0; iteration < 20; iteration++) {
    await waitForVisualStabilization(root);
    const details = getPageOverflowDetails(root);
    const overflowed = details.find(item => item.overflow > 2);
    if (!overflowed) return plan;

    const page = plan[overflowed.pageIndex];
    if (!page?.sections?.length) return plan;

    const firstPage = !!page.firstPage;
    const available = 1122.5;
    const region = findOverflowingRegion(root, overflowed.pageIndex);
    const split = splitLastSectionForOverflow(data, templateId, page, firstPage, available, region);
    if (split && split.headHeight <= available + 2 && split.tailHeight > 0) {
      page.sections.splice(split.index, 1, split.head);
      if (overflowed.pageIndex + 1 >= plan.length) {
        plan.push({ sections: [split.tail], firstPage: false });
      } else {
        // Prepend tail and restore correct two‑column ordering
        plan[overflowed.pageIndex + 1].sections = reorderTwoColumnSections(
          [split.tail, ...(plan[overflowed.pageIndex + 1].sections || [])],
          templateId
        );
      }
    } else {
      plan = moveOverflowFromPage(plan, overflowed.pageIndex, templateId, region);
    }

    const rootNode = document.getElementById('cv-root');
    if (!rootNode) return plan;
    // Signal the parent render effect that a new plan is required. The caller
    // will set the returned plan and React will render it on the next cycle.
    return plan;
  }
  return plan;
}

function PageFrame({ html, templateId, pageIndex, pageCount }) {
  return (
    <section className="a4-page rf-a4-page" data-rf-page="true" data-rf-page-index={pageIndex}>
      <div className="rf-page-content" dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  );
}

export default function ResumeDocument({ data, templateId, onPagesReady }) {
  const [pagePlan, setPagePlan] = useState(null);
  const A4_HEIGHT_PX = 1122.5;
  const lastSignatureRef = useRef('');
  const signature = useMemo(() => JSON.stringify({
    templateId,
    personalDetails: data?.personalDetails,
    sections: data?.sections,
    definition: templateById[templateId]?.pageCount,
    pageSpec: getPageSpec(templateId)
  }), [data, templateId]);

  useLayoutEffect(() => {
    if (!data || !templateId) return;
    if (lastSignatureRef.current !== signature) {
      lastSignatureRef.current = signature;
    }
    const effectiveHeight = A4_HEIGHT_PX;
    let cancelled = false;
    const timer = window.requestAnimationFrame(async () => {
      // Pagination is geometry-sensitive. Wait for web fonts so fallback metrics
      // cannot change line wrapping after the page plan has already been chosen.
      try {
        if (document.fonts?.ready) await document.fonts.ready;
      } catch (_) {}
      if (cancelled) return;
      const next = paginate(data, templateId, effectiveHeight);
      if (cancelled) return;
      setPagePlan(next);
      window.requestAnimationFrame(() => {
        if (!cancelled) onPagesReady?.(next.length);
      });
    });
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(timer);
    };
  }, [signature, data, templateId, onPagesReady]);

  useLayoutEffect(() => {
    if (!pagePlan || !data || !templateId) return;
    let cancelled = false;
    (async () => {
      const root = document.getElementById('cv-root');
      if (!root) return;
      const nextPlan = await reflowRenderedOverflow(root, pagePlan, data, templateId);
      if (cancelled) return;
      const before = JSON.stringify(pagePlan);
      const after = JSON.stringify(nextPlan);
      if (before !== after) {
        setPagePlan(nextPlan);
      }
      onPagesReady?.(nextPlan.length, { overflow: getActualPageOverflow(root) });
    })();
    return () => { cancelled = true; };
  }, [pagePlan, data, templateId, onPagesReady]);

  if (!data || !templateId) return null;
  if (!pagePlan) return <div className={`rf-resume-document rf-template-${templateId}`} aria-busy="true" />;

  const pageCount = pagePlan.length;
  return (
    <div className={`rf-resume-document rf-template-${templateId}`} data-rf-page-count={pageCount}>
      <div className="resume-pages">
        {pagePlan.map((plan, index) => {
          const pageData = dataForSections(data, plan.sections, plan.firstPage);
          const html = renderPageHtml(pageData, templateId, index + 1, pageCount, plan.firstPage);
          return <PageFrame key={`${templateId}-${index}`} html={html} templateId={templateId} pageIndex={index + 1} pageCount={pageCount} />;
        })}
      </div>
    </div>
  );
}