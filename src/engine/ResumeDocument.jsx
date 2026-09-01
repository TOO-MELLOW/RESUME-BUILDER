import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { templateById } from '../data/templates';
import { templatePageSpecs } from '../data/templatePageSpecs';

const SIDEBAR_TYPES = new Set(['personal-info','skills','languages','certificates','references','interests','strengths','projects','custom']);

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

function applyContinuationContract(html, templateId, isContinuation, pageNumber, pageCount) {
  if (!isContinuation) return html;
  const spec = getPageSpec(templateId);
  if (!spec?.continuation) return html;
  const doc = new DOMParser().parseFromString(`<div id="__rf_cont_root">${html}</div>`, 'text/html');
  const root = doc.getElementById('__rf_cont_root');
  root.setAttribute('data-rf-continuation', 'true');
  root.setAttribute('data-rf-page-number', String(pageNumber));

  const selectors = [
    ...(spec.page1?.headerSelectors || []),
    ...(spec.continuation.hidePage1ChromeSelectors || [])
  ];
  for (const selector of [...new Set(selectors)]) {
    try {
      root.querySelectorAll(selector).forEach(node => {
        node.setAttribute('data-rf-hidden-continuation', 'true');
        node.style.setProperty('display', 'none', 'important');
      });
    } catch (_) {}
  }
  root.querySelectorAll('[data-bind="personalDetails.summary"]').forEach(node => {
    node.setAttribute('data-rf-hidden-continuation', 'true');
    node.style.setProperty('display', 'none', 'important');
  });
  root.querySelectorAll('[data-rf-region="header"]').forEach(node => {
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

function splitTextIntoMeasuredChunks(data, templateId, section, item, key, text, firstPage) {
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
    const chunks = splitTextIntoMeasuredChunks(data, templateId, section, base, key, base[key], firstPage);
    if (chunks) return chunks;
  }

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

// Adjusted constants
const MIN_SPLIT_SPACE = 30; // was 60
const FIT_TOLERANCE = 10;   // was 2

function fillPageSections(data, templateId, remaining, firstPage, available) {
  const chosen = [];
  while (remaining.length) {
    const section = remaining[0];
    const candidate = [...chosen, section];
    const h = measureNaturalHeight(data, templateId, candidate, firstPage);
    if (h <= available + FIT_TOLERANCE || !chosen.length) {
      chosen.push(section);
      remaining = remaining.slice(1);
      if (h > available + FIT_TOLERANCE) break;
      continue;
    }
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
      if (side.length) {
        const candidateSide = [...chosenSide, side[0]];
        const h = measureNaturalHeight(data, templateId, [...candidateSide, ...chosenMain], pageFirst);
        if (h <= available + FIT_TOLERANCE || (!chosenSide.length && !chosenMain.length)) {
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
        if (h <= available + FIT_TOLERANCE || (!chosenSide.length && !chosenMain.length)) {
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

    if (!chosenSide.length && !chosenMain.length) {
      const fallback = side.shift() || main.shift();
      if (fallback) chosenMain.push(fallback);
    }

    pages.push({ sections: [...chosenSide, ...chosenMain], firstPage: pageFirst });
    pageFirst = false;
  }
  return pages;
}

function isPremiumTemplate(templateId) {
  const definition = typeof window !== 'undefined' ? window.TEMPLATE_DEFINITIONS?.[templateId] : null;
  return !!(definition?.templateMarkup);
}

function normalizePremiumFragment(fragment, templateId) {
  const doc = new DOMParser().parseFromString(`<div id="__rf_premium_src">${fragment}</div>`, 'text/html');
  const source = doc.getElementById('__rf_premium_src');
  const root = source.firstElementChild;
  if (!root) return fragment;
  root.removeAttribute('data-template');
  root.setAttribute('data-template', templateId);
  root.setAttribute('data-rf-template-root', 'true');
  return root.outerHTML;
}

function renderPageHtml(data, templateId, pageIndex, pageCount, firstPage) {
  const definition = templateById[templateId] || { rendererKind: 'legacy' };
  const spec = getPageSpec(templateId);
  if (typeof window.__RF_RENDER_TEMPLATE__ === 'function') {
    const fragment = window.__RF_RENDER_TEMPLATE__(data, templateId) || '<p class="empty-note">Unable to render template.</p>';
    const premium = isPremiumTemplate(templateId);
    const rendered = premium ? normalizePremiumFragment(fragment, templateId) : fragment;
    const pageDataAttr = premium ? '' : ` data-template="${escapeAttr(templateId)}"`;
    let html = `<div class="page"${pageDataAttr} data-rf-layout="${escapeAttr(spec?.layout || definition.layout || 'single-column')}" data-rf-template-page="true">${rendered}</div>`;
    if (data.sections.some(section => section?.__rfContinuation)) {
      html = html.replace(/<p class="(?:side-label|main-label)">\s*<\/p>/g, '');
    }
    return markTemplatePageFrames(applyContinuationContract(html, templateId, !firstPage, pageIndex, pageCount));
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

  const page = document.createElement('div');
  page.style.cssText = 'width:210mm;height:auto;min-height:0;max-height:none;overflow:visible;background:#fff;box-sizing:border-box;';
  page.innerHTML = renderPageHtml(pageData, templateId, firstPage ? 1 : 2, 1, firstPage);
  holder.appendChild(page);
  document.body.appendChild(holder);
  page.querySelectorAll('.page, .a4-page, [data-role="page"], [data-rf-template-root="true"], [data-rf-template-page="true"], .cv').forEach(node => {
    node.style.setProperty('height','auto','important');
    node.style.setProperty('min-height','0','important');
    node.style.setProperty('max-height','none','important');
    node.style.setProperty('overflow','visible','important');
    node.style.setProperty('margin-bottom','0','important');
  });
  const candidates = [page, ...page.querySelectorAll('.page, .a4-page, [data-role="page"], [data-rf-template-root="true"], .cv')];
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

function moveOverflowFromPage(plan, pageIndex) {
  if (!Array.isArray(plan) || pageIndex < 0 || pageIndex >= plan.length) return plan;
  const next = plan.map(page => ({ ...page, sections: [...(page.sections || [])] }));
  const page = next[pageIndex];
  if (!page?.sections?.length) return next;

  const moveIndex = page.sections.length - 1;
  const moved = page.sections[moveIndex];
  page.sections.splice(moveIndex, 1);

  if (pageIndex + 1 >= next.length) {
    next.push({ sections: [moved], firstPage: false });
  } else {
    next[pageIndex + 1].sections = [moved, ...(next[pageIndex + 1].sections || [])];
  }

  if (page.sections.length === 0) {
    next.splice(pageIndex, 1);
    if (pageIndex === 0 && next.length > 0) {
      next[0].firstPage = true;
    }
  }
  return next;
}

function splitLastSectionForOverflow(data, templateId, page, firstPage, available) {
  if (!page?.sections?.length) return null;
  const index = page.sections.length - 1;
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
    const split = splitLastSectionForOverflow(data, templateId, page, firstPage, available);
    if (split && split.headHeight <= available + 2 && split.tailHeight > 0) {
      page.sections.splice(split.index, 1, split.head);
      if (overflowed.pageIndex + 1 >= plan.length) {
        plan.push({ sections: [split.tail], firstPage: false });
      } else {
        plan[overflowed.pageIndex + 1].sections = [split.tail, ...(plan[overflowed.pageIndex + 1].sections || [])];
      }
    } else {
      plan = moveOverflowFromPage(plan, overflowed.pageIndex);
    }

    if (plan.length > 0 && !plan[0].firstPage) plan[0].firstPage = true;

    const rootNode = document.getElementById('cv-root');
    if (!rootNode) return plan;
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
  const [shouldReflow, setShouldReflow] = useState(false);
  const A4_HEIGHT_PX = 1122.5;
  const lastSignatureRef = useRef('');
  const reflowDoneRef = useRef(false);
  const lastTotalHeightRef = useRef(0);

  const signature = useMemo(() => JSON.stringify({
    templateId,
    personalDetails: data?.personalDetails,
    sections: data?.sections,
    definition: templateById[templateId]?.pageCount,
    pageSpec: getPageSpec(templateId)
  }), [data, templateId]);

  useLayoutEffect(() => {
    if (!data || !templateId) return;
    if (lastSignatureRef.current === signature && pagePlan) return;
    lastSignatureRef.current = signature;
    reflowDoneRef.current = false;

    const effectiveHeight = A4_HEIGHT_PX;
    let cancelled = false;
    const timer = window.requestAnimationFrame(async () => {
      try {
        if (document.fonts?.ready) await document.fonts.ready;
      } catch (_) {}
      if (cancelled) return;
      const next = paginate(data, templateId, effectiveHeight);
      if (cancelled) return;
      let totalHeight = 0;
      if (next.length === 1) {
        const sections = next[0].sections;
        totalHeight = measureNaturalHeight(data, templateId, sections, true);
      } else {
        totalHeight = effectiveHeight + 1;
      }
      lastTotalHeightRef.current = totalHeight;
      setShouldReflow(totalHeight > effectiveHeight + 5);
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
    if (!shouldReflow) {
      reflowDoneRef.current = true;
      return;
    }
    if (reflowDoneRef.current) return;

    let cancelled = false;
    (async () => {
      const rootNode = document.getElementById('cv-root');
      if (!rootNode) return;
      let newTotalHeight = 0;
      if (pagePlan.length === 1) {
        const sections = pagePlan[0].sections;
        newTotalHeight = measureNaturalHeight(data, templateId, sections, true);
      } else {
        newTotalHeight = A4_HEIGHT_PX + 1;
      }
      // Only reflow if height changed by more than 10px
      if (Math.abs(newTotalHeight - lastTotalHeightRef.current) < 10) {
        reflowDoneRef.current = true;
        onPagesReady?.(pagePlan.length, { overflow: 0 });
        return;
      }
      lastTotalHeightRef.current = newTotalHeight;

      const nextPlan = await reflowRenderedOverflow(rootNode, pagePlan, data, templateId);
      if (cancelled) return;
      const before = JSON.stringify(pagePlan);
      const after = JSON.stringify(nextPlan);
      if (before !== after) {
        setPagePlan(nextPlan);
      }
      reflowDoneRef.current = true;
      onPagesReady?.(nextPlan.length, { overflow: getActualPageOverflow(rootNode) });
    })();
    return () => { cancelled = true; };
  }, [pagePlan, shouldReflow, data, templateId, onPagesReady]);

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
