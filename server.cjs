const express = require('express');
const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json({ limit: '10mb' }));

// ─── Serve your static frontend files ──────────────────────────────
// This makes index.html, css/, js/, api/ (though we override the POST)
// all available at http://localhost:3000/
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

// ─── PDF export endpoint (exactly the same logic as api/export-pdf.js) ─
app.post('/api/export-pdf', async (req, res) => {
  const { html } = req.body;
  if (!html || typeof html !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid HTML' });
  }

  let browser = null;
  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.evaluateHandle('document.fonts.ready');

    // Run the page-filling algorithm if present
    await page.evaluate(() => {
      if (typeof window.fillPages === 'function') {
        window.fillPages();
      }
    });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');
    res.status(200).send(pdfBuffer);

  } catch (error) {
    console.error('PDF export failed:', error);
    res.status(500).json({ error: 'PDF generation failed', detail: error.message });
  } finally {
    if (browser) await browser.close();
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`   Static files served from ${path.join(__dirname, 'public')}`);
  console.log(`   POST /api/export-pdf ready`);
});