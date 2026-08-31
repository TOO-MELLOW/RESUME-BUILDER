// js/gallery-renderer.js
//
// Real, live template thumbnails for the gallery grid.
//
// The app already has a single rendering engine — renderTemplateContent(data, tid)
// in script.js — that powers the live editor preview (#cv-root) and feeds the
// PDF export path. Previously the gallery used a completely separate set of
// abstract, procedurally-generated SVG icons (SVGS[id]) instead of that engine,
// so template cards never showed the real design.
//
// This file reuses renderTemplateContent() with the app's own sample CV data
// to render an actual miniature of each template into its gallery card, then
// scales it to fit with a CSS transform — the same "one engine powers every
// surface" approach requested for Phase 2 (thumbnail / editor preview / PDF
// all share renderTemplateContent()).
//
// Loaded AFTER script.js. Rendering is lazy (IntersectionObserver) so we only
// pay the cost for cards that are actually scrolled into view.

(function () {
    const THUMB_CACHE = {};       // tid -> rendered inner HTML (string) once resolved
    let SAMPLE_DATA_BY_CAT = null;
    const LOADING_RETRY_MS = 700;
    const MAX_RETRIES = 6;

    function parseSampleTag(id) {
        const el = document.getElementById(id);
        if (!el) return null;
        try { return JSON.parse(el.textContent); } catch (e) { return null; }
    }

    // Pick a sample dataset that suits the template's category, so e.g. a
    // "student" or "south-african" template previews with the entry-level
    // sample CV rather than the default mid-career one.
    function getSampleDataFor(tid) {
        if (!SAMPLE_DATA_BY_CAT) {
            const general = parseSampleTag('cv-data');
            SAMPLE_DATA_BY_CAT = {
                general: general,
                starter: parseSampleTag('cv-data-starter') || general,
                trade: parseSampleTag('cv-data-trade') || general
            };
        }
        const cfg = (typeof TEMPLATE_CONFIGS !== 'undefined')
            ? TEMPLATE_CONFIGS.find(t => t.id === tid)
            : null;
        const cat = cfg ? cfg.cat : '';
        if (cat === 'trade') return SAMPLE_DATA_BY_CAT.trade;
        if (cat === 'student' || cat === 'south-african' || cat === 'career-change') return SAMPLE_DATA_BY_CAT.starter;
        return SAMPLE_DATA_BY_CAT.general;
    }

    function isStillLoadingPlaceholder(html) {
        return typeof html === 'string' && html.indexOf('is still loading') !== -1;
    }

    function scaleThumb(container, page) {
        const cw = container.clientWidth || 1;
        const pw = page.offsetWidth || 794; // ~210mm @ 96dpi fallback
        if (!pw) return;
        page.style.transform = `scale(${cw / pw})`;
    }

    function paintThumb(container, tid, html) {
        const page = document.createElement('div');
        page.className = 'page g-thumb-page';
        page.setAttribute('data-template', tid);
        page.innerHTML = html;

        container.innerHTML = '';
        container.appendChild(page);
        container.dataset.rendered = '1';

        requestAnimationFrame(() => scaleThumb(container, page));
    }

    function renderThumbInto(container, tid, attempt) {
        attempt = attempt || 0;
        if (!container || container.dataset.rendered === '1') return;
        if (typeof renderTemplateContent !== 'function') {
            // script.js hasn't finished initializing yet — try shortly.
            if (attempt < MAX_RETRIES) setTimeout(() => renderThumbInto(container, tid, attempt + 1), LOADING_RETRY_MS);
            return;
        }
        const data = getSampleDataFor(tid);
        if (!data) return; // no sample data available, leave the fallback icon showing

        let html = THUMB_CACHE[tid];
        if (html === undefined) {
            try {
                html = renderTemplateContent(data, tid);
            } catch (e) {
                console.error('Gallery thumbnail render failed for', tid, e);
                html = null;
            }
            if (!isStillLoadingPlaceholder(html)) THUMB_CACHE[tid] = html;
        }

        if (isStillLoadingPlaceholder(html)) {
            // HTML shell template still being fetched by loadHtmlTemplates();
            // retry a few times rather than caching the "loading" placeholder.
            if (attempt < MAX_RETRIES) setTimeout(() => renderThumbInto(container, tid, attempt + 1), LOADING_RETRY_MS);
            return;
        }
        if (!html) return; // render failed — keep the placeholder SVG icon

        paintThumb(container, tid, html);
    }

    let observer = null;
    function ensureObserver() {
        if (observer) return observer;
        if (typeof IntersectionObserver === 'undefined') return null;
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    renderThumbInto(el, el.getAttribute('data-thumb-id'));
                    observer.unobserve(el);
                }
            });
        }, { root: null, rootMargin: '500px 0px', threshold: 0.01 });
        return observer;
    }

    // Called by renderGallery() in script.js right after it rebuilds
    // #gallery-grid, so newly-added .g-thumb nodes get observed.
    window.initGalleryThumbs = function initGalleryThumbs() {
        const obs = ensureObserver();
        const nodes = document.querySelectorAll('.g-thumb[data-thumb-id]');
        if (!obs) {
            // No IntersectionObserver support — just render everything eagerly.
            nodes.forEach(el => { if (el.dataset.rendered !== '1') renderThumbInto(el, el.getAttribute('data-thumb-id')); });
            return;
        }
        nodes.forEach(el => { if (el.dataset.rendered !== '1') obs.observe(el); });
    };

    let resizeT = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeT);
        resizeT = setTimeout(() => {
            document.querySelectorAll('.g-thumb-page').forEach(page => {
                const container = page.parentElement;
                if (container) scaleThumb(container, page);
            });
        }, 150);
    });
})();
