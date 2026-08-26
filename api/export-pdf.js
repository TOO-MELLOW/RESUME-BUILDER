// api/export-pdf.js
//
// Serverless PDF exporter for Resume Factory.
// Receives a self-contained resume HTML document and returns a native,
// selectable-text A4 PDF rendered by Chromium.
//
// POST /api/export-pdf
// Body: { html: string, filename?: string }

// Normalize CommonJS/default-export shapes across supported runtimes.
const fs = require('fs');
const path = require('path');

const chromiumModule = require('@sparticuz/chromium');
const chromium = chromiumModule && chromiumModule.default
  ? chromiumModule.default
  : chromiumModule;
const puppeteerModule = require('puppeteer-core');
const puppeteer = puppeteerModule && puppeteerModule.default
  ? puppeteerModule.default
  : puppeteerModule;

const FUNCTION_BUDGET_MS = 28000;
const CONTENT_TIMEOUT_MS = 8000;
const FONT_TIMEOUT_MS = 3500;

function getBody(req) {
  if (!req || req.body == null) return {};
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch (_) { return {}; }
  }
  return req.body;
}

function safeFilename(value) {
  const name = String(value || 'resume')
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
  return (name || 'resume').slice(0, 80) + '.pdf';
}

function withTimeout(promise, ms, label) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

function findLocalChrome() {
  const candidates = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    process.env.CHROME_EXECUTABLE_PATH,
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/snap/bin/chromium',
  ].filter(Boolean);

  for (const candidate of candidates) {
    try {
      if (fs.existsSync(candidate)) return candidate;
    } catch (_) {}
  }
  return null;
}

async function resolveChromiumExecutable() {
  // `vercel dev` runs locally. @sparticuz/chromium contains a Linux serverless
  // binary, but using an already-installed local Chrome makes local testing
  // deterministic and avoids depending on the serverless binary extraction
  // path during development.
  const isLocal = process.env.VERCEL !== '1' && process.env.VERCEL_ENV !== 'production';
  if (isLocal) {
    const localChrome = findLocalChrome();
    if (localChrome) return localChrome;
  }

  if (!chromium || typeof chromium !== 'object') {
    throw new Error('Chromium module could not be loaded.');
  }

  const value = chromium.executablePath;
  if (typeof value === 'function') {
    const resolved = await value.call(chromium);
    if (typeof resolved === 'string' && resolved) return resolved;
  } else if (typeof value === 'string' && value) {
    return value;
  }

  throw new Error(
    'Chromium executablePath is unavailable. ' +
    'Install the pinned @sparticuz/chromium dependency or provide ' +
    'PUPPETEER_EXECUTABLE_PATH for local development.'
  );
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { html, filename } = getBody(req);
  if (!html || typeof html !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid HTML' });
  }

  // Keep accidental oversized requests from consuming the function.
  if (Buffer.byteLength(html, 'utf8') > 4 * 1024 * 1024) {
    return res.status(413).json({ error: 'Resume HTML is too large' });
  }

  let browser = null;
  const deadline = Date.now() + FUNCTION_BUDGET_MS;

  const remaining = (label, cap) => {
    const ms = Math.min(cap, Math.max(1, deadline - Date.now()));
    return { ms, label };
  };

  try {
    {
      const t = remaining('Chromium launch', 12000);
      const executablePath = await resolveChromiumExecutable();
      const chromiumArgs =
        process.env.VERCEL === '1' && Array.isArray(chromium.args)
          ? chromium.args
          : [];
      const defaultViewport =
        chromium.defaultViewport || { width: 1280, height: 900 };
      const headless =
        process.env.VERCEL === '1' && chromium.headless !== undefined
          ? chromium.headless
          : true;

      browser = await withTimeout(
        puppeteer.launch({
          args: chromiumArgs,
          defaultViewport,
          executablePath,
          headless,
        }),
        t.ms,
        t.label
      );
    }

    const page = await browser.newPage();
    page.setDefaultTimeout(CONTENT_TIMEOUT_MS);

    // The HTML is self-contained, so network-idle is unnecessary and can
    // hang indefinitely on a third-party request. domcontentloaded is enough.
    {
      const t = remaining('HTML rendering', CONTENT_TIMEOUT_MS);
      await withTimeout(
        page.setContent(html, { waitUntil: 'domcontentloaded', timeout: t.ms }),
        t.ms,
        t.label
      );
    }

    // Wait for fonts, but never let a remote font prevent the PDF.
    {
      const t = remaining('Font/layout settling', FONT_TIMEOUT_MS);
      await withTimeout(
        page.evaluate(async () => {
          if (document.fonts && document.fonts.ready) await document.fonts.ready;
          await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        }),
        t.ms,
        t.label
      ).catch(error => {
        console.warn('Font readiness timeout; continuing with available fonts:', error.message);
      });
    }

    // The final pagination is deliberately delegated to Chromium's print
    // engine. Do not measure/slice a single .page into artificial pages here.
    // CSS break-inside rules in the supplied document protect atomic resume
    // entries where they can safely fit.
    const pdfTimer = remaining('PDF rendering', 12000);
    const pdfBuffer = await withTimeout(
      page.pdf({
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        displayHeaderFooter: false,
              }),
      pdfTimer.ms,
      pdfTimer.label
    );

    if (!pdfBuffer || !pdfBuffer.length) {
      throw new Error('Chromium returned an empty PDF');
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${safeFilename(filename)}"`);
    res.setHeader('Content-Length', String(pdfBuffer.length));
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error('PDF export failed:', error);
    if (!res.headersSent) {
      return res.status(500).json({
        error: 'PDF generation failed',
        detail: error && error.message ? error.message : 'Unknown PDF error',
      });
    }
  } finally {
    if (browser) {
      try {
        await withTimeout(browser.close(), Math.min(5000, Math.max(1, deadline - Date.now())), 'Chromium shutdown');
      } catch (closeError) {
        console.error('Chromium shutdown failed:', closeError);
      }
    }
  }
};
