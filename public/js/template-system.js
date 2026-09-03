(function (global) {
  'use strict';

  const definitions = [
    {
      "id": "luxury-editorial-01",
      "name": "Luxury Editorial",
      "category": "premium",
      "description": "Editorial hero · Bronze",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 78,
      "accentColor": "#A78550",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Editorial, luxury & personal-brand roles",
      "templateMarkup":
        "<header><div class=\"hero\"><div><h1 data-bind=\"personalDetails.fullName\"></h1>" +
        "<div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div>" +
        "<div class=\"statement\"></div>" +
        "</div><div class=\"contact\" data-role=\"contact\"></div></header><div class=\"edgrid\"><aside>" +
        "<p data-bind=\"personalDetails.summary\"></p><div data-role=\"sidebar\"></div></aside><main>" +
        "<div data-role=\"main\"></div></main></div>"
    },
    {
      "id": "black-champagne-executive-02",
      "name": "Black Champagne Executive",
      "category": "premium",
      "description": "Premium CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 82,
      "accentColor": "#C8A66B",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Experienced professionals wanting a designer look",
      "templateMarkup":
        "<div class=\"p6-black-champagne\"><header class=\"p6-bc-head\">" +
        "<div class=\"p6-bc-folio\"></div><div class=\"p6-bc-identity\">" +
        "<h1 data-bind=\"personalDetails.fullName\"></h1>" +
        "<div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div>" +
        "<div class=\"contact\" data-role=\"contact\"></div></header><div class=\"p6-bc-layout\"><aside>" +
        "<p class=\"p6-bc-kicker\">PROFILE</p><p class=\"summary\" data-bind=\"personalDetails.summary\"></p>" +
        "<div data-role=\"sidebar\"></div></aside><main><p class=\"p6-bc-kicker\">EXECUTIVE RECORD</p>" +
        "<div data-role=\"main\"></div></main></div></div>"
    },
    {
      "id": "architectural-grid-03",
      "name": "Architectural Grid",
      "category": "premium",
      "description": "Premium CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 82,
      "accentColor": "#98633E",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Experienced professionals wanting a designer look",
      "templateMarkup": "<div class=\"corp-p1 corp-architectural\"><header class=\"ag-header\"><div class=\"ag-title\"><span class=\"ag-kicker\"></span><h1 data-bind=\"personalDetails.fullName\"></h1><div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div><div class=\"contact\" data-role=\"contact\"></div></header><div class=\"ag-grid\"><aside><div class=\"ag-summary\"><span>PROFILE NOTE</span><p data-bind=\"personalDetails.summary\"></p></div><div data-role=\"sidebar\"></div></aside><main><div data-role=\"main\"></div></main></div></div>"},
    {
      "id": "modern-swiss-04",
      "name": "Modern Swiss",
      "category": "premium",
      "description": "Premium CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 82,
      "accentColor": "#5D6870",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Experienced professionals wanting a designer look",
      "templateMarkup": "<div class=\"corp-p1 corp-swiss\"><section class=\"ms-identity\"><div><h1 data-bind=\"personalDetails.fullName\"></h1><div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div><div class=\"contact\" data-role=\"contact\"></div></section><div class=\"ms-content\"><aside><div class=\"ms-summary\"><span>SUMMARY</span><p data-bind=\"personalDetails.summary\"></p></div><div data-role=\"sidebar\"></div></aside><main><div data-role=\"main\"></div></main></div></div>"},
    {
      "id": "fashion-editorial-portrait-05",
      "name": "Fashion Editorial Portrait",
      "category": "premium",
      "description": "Premium CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 82,
      "accentColor": "#9A5D80",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Experienced professionals wanting a designer look",
      "templateMarkup":
        "<div class=\"p6-fashion\"><header class=\"p6-f-head\">" +
        "<div class=\"p6-f-portrait photo portrait\">[APPLICANT PHOTO]</div><div class=\"p6-f-identity\">" +
        "<span class=\"p6-f-kicker\"></span><h1 data-bind=\"personalDetails.fullName\">" +
        "</h1><div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div>" +
        "<div class=\"contact\" data-role=\"contact\"></div></div></header><div class=\"p6-f-body\"><aside>" +
        "<p class=\"p6-f-label\">PROFILE</p><p class=\"summary\" data-bind=\"personalDetails.summary\"></p>" +
        "<div data-role=\"sidebar\"></div></aside><main><p class=\"p6-f-label\">WORK + EDUCATION</p>" +
        "<div data-role=\"main\"></div></main></div></div>"
    },
    {
      "id": "dark-executive-06",
      "name": "Dark Executive",
      "category": "premium",
      "description": "Premium CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 82,
      "accentColor": "#C7A66A",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Experienced professionals wanting a designer look",
      "templateMarkup":
        "<div class=\"p6-dark-exec\"><header class=\"p6-de-head\"><div class=\"p6-de-index\"></div>" +
        "<div class=\"p6-de-copy\"><p></p><h1 data-bind=\"personalDetails.fullName\"></h1>" +
        "<div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div>" +
        "<div class=\"contact\" data-role=\"contact\"></div></header><div class=\"p6-de-layout\"><main>" +
        "<p class=\"p6-de-section-label\">CAREER</p><div data-role=\"main\"></div></main><aside>" +
        "<p class=\"p6-de-section-label\">AT A GLANCE</p>" +
        "<p class=\"summary\" data-bind=\"personalDetails.summary\"></p><div data-role=\"sidebar\"></div></aside>" +
        "</div></div>"
    },
    {
      "id": "european-minimal-07",
      "name": "European Minimal",
      "category": "premium",
      "description": "Premium CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 82,
      "accentColor": "#8A7460",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Experienced professionals wanting a designer look",
      "templateMarkup": "<div class=\"corp-p1 corp-european-min\"><header class=\"em-header\"><div class=\"em-name\"><h1 data-bind=\"personalDetails.fullName\"></h1><div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div><div class=\"contact\" data-role=\"contact\"></div></header><div class=\"em-line\"></div><div class=\"em-body\"><aside><p class=\"em-summary\" data-bind=\"personalDetails.summary\"></p><div data-role=\"sidebar\"></div></aside><main><div data-role=\"main\"></div></main></div></div>"},
    {
      "id": "burgundy-heritage-08",
      "name": "Burgundy Heritage",
      "category": "premium",
      "description": "Premium CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 82,
      "accentColor": "#8F3D4A",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Experienced professionals wanting a designer look",
      "templateMarkup": "<div class=\"corp-p1 corp-burgundy\"><header class=\"bh-header\"><div class=\"bh-identity\"><h1 data-bind=\"personalDetails.fullName\"></h1><div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div><div class=\"contact\" data-role=\"contact\"></div></header><div class=\"bh-frame\"><aside><div class=\"bh-summary\"><span>ABOUT</span><p data-bind=\"personalDetails.summary\"></p></div><div data-role=\"sidebar\"></div></aside><main><div class=\"bh-intro\">SELECTED EXPERIENCE</div><div data-role=\"main\"></div></main></div></div>"},
    {
      "id": "technology-executive-09",
      "name": "Technology Executive",
      "category": "premium",
      "description": "Premium CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 82,
      "accentColor": "#4D7399",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Experienced professionals wanting a designer look",
      "templateMarkup": "<div class=\"corp-p1 corp-tech\"><header class=\"te-header\"><div class=\"te-identity\"><div><h1 data-bind=\"personalDetails.fullName\"></h1><div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div><div class=\"contact\" data-role=\"contact\"></div></div><div class=\"te-signal\"><i></i><i></i><i></i><i></i><span>ONLINE</span></div></header><div class=\"te-grid\"><aside><div class=\"te-summary\"><span>EXECUTIVE SIGNAL</span><p data-bind=\"personalDetails.summary\"></p></div><div data-role=\"sidebar\"></div></aside><main><div data-role=\"main\"></div></main></div></div>"},
    {
      "id": "portrait-luxury-10",
      "name": "Portrait Luxury",
      "category": "premium",
      "description": "Premium CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 82,
      "accentColor": "#B1845A",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Experienced professionals wanting a designer look",
      "templateMarkup":
        "<header class=\"top\" data-rf-region=\"header\"><div class=\"identity\"><div>" +
        "<h1 data-bind=\"personalDetails.fullName\"></h1>" +
        "<div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div>" +
        "<div class=\"contact\" data-role=\"contact\"></div></div>" +
        "<div class=\"photo portrait\">[APPLICANT PHOTO]</div></div></header><div class=\"grid\"><aside>" +
        "<p data-bind=\"personalDetails.summary\"></p><div data-role=\"sidebar\" data-rf-region=\"sidebar\"></div>" +
        "</aside><main><div data-role=\"main\" data-rf-region=\"main\"></div></main></div>"
    },
    {
      "id": "contemporary-public-sector-11",
      "name": "Contemporary Public Sector",
      "category": "premium",
      "description": "Premium CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 82,
      "accentColor": "#617F87",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Experienced professionals wanting a designer look",
      "templateMarkup": "<div class=\"corp-p1 corp-public\"><div class=\"cp-rail\"><b></b></div><div class=\"cp-sheet\"><header class=\"cp-header\"><div class=\"cp-identity\"><h1 data-bind=\"personalDetails.fullName\"></h1><div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div><div class=\"contact\" data-role=\"contact\"></div></header><div class=\"cp-rule\"></div><div class=\"cp-grid\"><aside><div class=\"cp-summary\"><span>PROFILE</span><p data-bind=\"personalDetails.summary\"></p></div><div data-role=\"sidebar\"></div></aside><main><div data-role=\"main\"></div></main></div></div></div>"},
    {
      "id": "finance-executive-12",
      "name": "Finance Executive",
      "category": "premium",
      "description": "Premium CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 82,
      "accentColor": "#7D946C",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Experienced professionals wanting a designer look",
      "templateMarkup": "<div class=\"corp-p1 corp-finance\"><header class=\"fx-header\"><div class=\"fx-name\"><h1 data-bind=\"personalDetails.fullName\"></h1><div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div><div class=\"contact\" data-role=\"contact\"></div></header><div class=\"fx-bar\"><i></i><i></i><i></i></div><div class=\"fx-content\"><aside><div class=\"fx-summary\"><span>EXECUTIVE SUMMARY</span><p data-bind=\"personalDetails.summary\"></p></div><div data-role=\"sidebar\"></div></aside><main><div data-role=\"main\"></div></main></div></div>"},
    {
      "id": "creative-director-13",
      "name": "Creative Director",
      "category": "premium",
      "description": "Premium CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 82,
      "accentColor": "#A85D43",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Experienced professionals wanting a designer look",
      "templateMarkup":
        "<div class=\"p6-creative\"><header class=\"p6-cd-head\"><div class=\"p6-cd-num\"></div><div>" +
        "<p class=\"p6-cd-kicker\"></p>" +
        "<h1 data-bind=\"personalDetails.fullName\"></h1>" +
        "<div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div>" +
        "<div class=\"contact\" data-role=\"contact\"></div></header><div class=\"p6-cd-layout\"><main>" +
        "<p class=\"p6-cd-label\">CAREER HISTORY</p><div data-role=\"main\"></div></main><aside>" +
        "<p class=\"p6-cd-label\">SIGNATURE PROFILE</p><p class=\"summary\" data-bind=\"personalDetails.summary\">" +
        "</p><div data-role=\"sidebar\"></div></aside></div></div>"
    },
    {
      "id": "magazine-column-portrait-14",
      "name": "Magazine Column Portrait",
      "category": "premium",
      "description": "Premium CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 82,
      "accentColor": "#777777",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Experienced professionals wanting a designer look",
      "templateMarkup":
        "<div class=\"p6-magazine\"><header class=\"p6-m14-head\"><div class=\"p6-m14-title\">" +
        "<span></span><h1 data-bind=\"personalDetails.fullName\"></h1>" +
        "<div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div>" +
        "<div class=\"photo portrait p6-m14-photo\">[APPLICANT PHOTO]</div></header><div class=\"p6-m14-deck\">" +
        "<p class=\"summary\" data-bind=\"personalDetails.summary\"></p></div><div class=\"p6-m14-body\"><aside>" +
        "<p class=\"p6-m14-label\">NOTES</p><div data-role=\"sidebar\"></div></aside><main>" +
        "<p class=\"p6-m14-label\">FEATURED CAREER</p><div data-role=\"main\"></div></main></div></div>"
    },
    {
      "id": "monochrome-gallery-15",
      "name": "Monochrome Gallery",
      "category": "premium",
      "description": "Premium CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 82,
      "accentColor": "#5A5A5A",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Experienced professionals wanting a designer look",
      "templateMarkup": "<div class=\"corp-p1 corp-mono-gallery\"><header class=\"mg-header\"><div class=\"mg-identity\"><h1 data-bind=\"personalDetails.fullName\"></h1><div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div><div class=\"contact\" data-role=\"contact\"></div></header><div class=\"mg-stage\"><main><div data-role=\"main\"></div></main><aside><div class=\"mg-summary\"><span>CURATED PROFILE</span><p data-bind=\"personalDetails.summary\"></p></div><div data-role=\"sidebar\"></div></aside></div></div>"},
    {
      "id": "modernist-geometry-16",
      "name": "Modernist Geometry",
      "category": "premium",
      "description": "Premium CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 82,
      "accentColor": "#6B6FAA",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Experienced professionals wanting a designer look",
      "templateMarkup": "<div class=\"corp-p1 corp-geometry\"><header class=\"geo-header\"><div class=\"geo-name\"><h1 data-bind=\"personalDetails.fullName\"></h1><div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div><div class=\"contact\" data-role=\"contact\"></div><div class=\"geo-block\"></div></header><div class=\"geo-body\"><main><div data-role=\"main\"></div></main><aside><div class=\"geo-summary\"><span>ABSTRACT</span><p data-bind=\"personalDetails.summary\"></p></div><div data-role=\"sidebar\"></div></aside></div></div>"},
    {
      "id": "forest-estate-17",
      "name": "Forest Estate",
      "category": "premium",
      "description": "Premium CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 82,
      "accentColor": "#8A9B7A",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Experienced professionals wanting a designer look",
      "templateMarkup": "<div class=\"corp-p1 corp-forest\"><header class=\"fe-header\"><div class=\"fe-title\"><h1 data-bind=\"personalDetails.fullName\"></h1><div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div><div class=\"contact\" data-role=\"contact\"></div></header><div class=\"fe-intro\"><div><span>FIELD NOTE</span><p data-bind=\"personalDetails.summary\"></p></div></div><div class=\"fe-body\"><aside><div data-role=\"sidebar\"></div></aside><main><div data-role=\"main\"></div></main></div></div>"},
    {
      "id": "sapphire-executive-portrait-18",
      "name": "Sapphire Executive Portrait",
      "category": "premium",
      "description": "Premium CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 82,
      "accentColor": "#5E7FAF",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Experienced professionals wanting a designer look",
      "templateMarkup":
        "<div class=\"p6-sapphire\"><header class=\"p6-s18-head\"><div class=\"p6-s18-brand\"></div>" +
        "<div class=\"p6-s18-identity\"><div><h1 data-bind=\"personalDetails.fullName\"></h1>" +
        "<div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div>" +
        "<div class=\"photo portrait p6-s18-photo\">[APPLICANT PHOTO]</div></div>" +
        "<div class=\"contact\" data-role=\"contact\"></div></header><div class=\"p6-s18-rule\"></div>" +
        "<div class=\"p6-s18-body\"><main><p class=\"p6-s18-label\">PROFESSIONAL HISTORY</p>" +
        "<div data-role=\"main\"></div></main><aside><p class=\"p6-s18-label\">PROFILE / SKILLS</p>" +
        "<p class=\"summary\" data-bind=\"personalDetails.summary\"></p><div data-role=\"sidebar\"></div></aside>" +
        "</div></div>"
    },
    {
      "id": "premium-consultant-19",
      "name": "Premium Consultant",
      "category": "premium",
      "description": "Premium CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 82,
      "accentColor": "#8C8B78",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Experienced professionals wanting a designer look",
      "templateMarkup": "<div class=\"corp-p1 corp-consultant\"><header class=\"pc-header\"><div class=\"pc-center\"><div class=\"pc-monogram\">P</div><h1 data-bind=\"personalDetails.fullName\"></h1><div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div><div class=\"contact\" data-role=\"contact\"></div></div></header><div class=\"pc-body\"><main><div data-role=\"main\"></div></main><aside><div class=\"pc-summary\"><span>POSITIONING</span><p data-bind=\"personalDetails.summary\"></p></div><div data-role=\"sidebar\"></div></aside></div></div>"},
    {
      "id": "editorial-portrait-20",
      "name": "Editorial Portrait",
      "category": "premium",
      "description": "Premium CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 82,
      "accentColor": "#B45F46",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Experienced professionals wanting a designer look",
      "templateMarkup":
        "<div class=\"p6-editorial\"><header class=\"p6-e20-head\"><div class=\"p6-e20-folio\"></div>" +
        "<div class=\"p6-e20-name\"><p></p><h1 data-bind=\"personalDetails.fullName\"></h1>" +
        "<div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div>" +
        "<div class=\"p6-e20-contact contact\" data-role=\"contact\"></div></header><div class=\"p6-e20-intro\">" +
        "<p class=\"summary\" data-bind=\"personalDetails.summary\"></p></div><div class=\"p6-e20-body\"><aside>" +
        "<p class=\"p6-e20-label\">DETAILS</p><div data-role=\"sidebar\"></div></aside><main>" +
        "<p class=\"p6-e20-label\">CAREER HISTORY</p><div data-role=\"main\"></div></main></div></div>"
    },
    {
      "id": "asymmetric-architecture-21",
      "name": "Asymmetric Architecture",
      "category": "premium",
      "description": "Premium CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 82,
      "accentColor": "#6B9AAA",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Experienced professionals wanting a designer look",
      "templateMarkup": "<div class=\"corp-p1 corp-asymmetric\"><div class=\"aa-spine\"></div><header class=\"aa-header\"><div><h1 data-bind=\"personalDetails.fullName\"></h1><div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div><div class=\"contact\" data-role=\"contact\"></div></header><div class=\"aa-body\"><main><div data-role=\"main\"></div></main><aside><div class=\"aa-summary\"><span>OVERVIEW</span><p data-bind=\"personalDetails.summary\"></p></div><div data-role=\"sidebar\"></div></aside></div></div>"},
    {
      "id": "luxury-portfolio-22",
      "name": "Luxury Portfolio",
      "category": "premium",
      "description": "Premium CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 82,
      "accentColor": "#C8A66B",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Experienced professionals wanting a designer look",
      "templateMarkup":
        "<div class=\"p6-portfolio\"><aside class=\"p6-p22-rail\"><div class=\"p6-p22-mark\"></div>" +
        "<p></p><p class=\"p6-p22-note\">SELECTED PROFILE</p><div data-role=\"sidebar\"></div>" +
        "</aside><main class=\"p6-p22-main\"><header><h1 data-bind=\"personalDetails.fullName\"></h1>" +
        "<div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div>" +
        "<div class=\"contact\" data-role=\"contact\"></div></header><section class=\"p6-p22-summary\">" +
        "<p class=\"summary\" data-bind=\"personalDetails.summary\"></p></section><section class=\"p6-p22-career\">" +
        "<p class=\"p6-p22-label\">EXPERIENCE + EDUCATION</p><div data-role=\"main\"></div></section></main>" +
        "</div>"
    },
    {
      "id": "slate-copper-23",
      "name": "Slate Copper",
      "category": "premium",
      "description": "Premium CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 82,
      "accentColor": "#617F87",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Experienced professionals wanting a designer look",
      "templateMarkup": "<div class=\"corp-p1 corp-copper\"><header class=\"sc-header\"><div class=\"sc-identity\"><h1 data-bind=\"personalDetails.fullName\"></h1><div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div><div class=\"contact\" data-role=\"contact\"></div></header><div class=\"sc-copper-rule\"></div><div class=\"sc-body\"><main><div data-role=\"main\"></div></main><aside><div class=\"sc-summary\"><span>PROFILE</span><p data-bind=\"personalDetails.summary\"></p></div><div data-role=\"sidebar\"></div></aside></div></div>"},
    {
      "id": "modern-academic-24",
      "name": "Modern Academic",
      "category": "premium",
      "description": "Premium CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 82,
      "accentColor": "#837A9D",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Experienced professionals wanting a designer look",
      "templateMarkup": "<div class=\"corp-p1 corp-academic\"><header class=\"ma-header\"><div class=\"ma-identity\"><h1 data-bind=\"personalDetails.fullName\"></h1><div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div><div class=\"contact\" data-role=\"contact\"></div></header><div class=\"ma-rule\"></div><div class=\"ma-body\"><main><div data-role=\"main\"></div></main><aside><div class=\"ma-summary\"><span>ABSTRACT</span><p data-bind=\"personalDetails.summary\"></p></div><div data-role=\"sidebar\"></div></aside></div></div>"},
    {
      "id": "high-end-minimal-25",
      "name": "High End Minimal",
      "category": "premium",
      "description": "Premium CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 82,
      "accentColor": "#5D6870",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Experienced professionals wanting a designer look",
      "templateMarkup": "<div class=\"corp-p1 corp-minimal\"><header class=\"hm-header\"><div><h1 data-bind=\"personalDetails.fullName\"></h1><div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div><div class=\"contact\" data-role=\"contact\"></div></header><div class=\"hm-whitespace\"></div><div class=\"hm-body\"><aside><div class=\"hm-summary\"><span>NOTE</span><p data-bind=\"personalDetails.summary\"></p></div><div data-role=\"sidebar\"></div></aside><main><div data-role=\"main\"></div></main></div></div>"},
    {
      "id": "vertical-navigation-26",
      "name": "Vertical Navigation",
      "category": "premium",
      "description": "Premium CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 82,
      "accentColor": "#5B8B86",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Experienced professionals wanting a designer look",
      "templateMarkup":
        "<div class=\"p6-vertical\"><aside class=\"p6-v26-rail\"><div class=\"p6-v26-number\"></div>" +
        "<div class=\"p6-v26-word\"></div><div class=\"p6-v26-side\"><p>PROFILE</p>" +
        "<div data-role=\"sidebar\"></div></div></aside><main class=\"p6-v26-main\"><header>" +
        "<p class=\"p6-v26-kicker\"></p><h1 data-bind=\"personalDetails.fullName\"></h1>" +
        "<div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div>" +
        "<div class=\"contact\" data-role=\"contact\"></div></header><section class=\"p6-v26-summary\">" +
        "<p class=\"summary\" data-bind=\"personalDetails.summary\"></p></section><section>" +
        "<p class=\"p6-v26-label\">CAREER STORY</p><div data-role=\"main\"></div></section></main></div>"
    },
    {
      "id": "art-directed-corporate-27",
      "name": "Art Directed Corporate",
      "category": "premium",
      "description": "Premium CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 82,
      "accentColor": "#87906A",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Experienced professionals wanting a designer look",
      "templateMarkup":
        "<div class=\"p6-art-directed\"><header class=\"p6-ad27-head\"><div class=\"p6-ad27-number\"></div>" +
        "<div class=\"p6-ad27-identity\"><p></p>" +
        "<h1 data-bind=\"personalDetails.fullName\"></h1>" +
        "<div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div>" +
        "<div class=\"contact\" data-role=\"contact\"></div></header><div class=\"p6-ad27-grid\">" +
        "<section class=\"p6-ad27-profile\"><p class=\"p6-ad27-label\">PROFILE</p>" +
        "<p class=\"summary\" data-bind=\"personalDetails.summary\"></p><div data-role=\"sidebar\"></div></section>" +
        "<main><p class=\"p6-ad27-label\">CAREER + EDUCATION</p><div data-role=\"main\"></div></main></div></div>"
    },
    {
      "id": "dark-editorial-28",
      "name": "Dark Editorial",
      "category": "premium",
      "description": "Premium CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 82,
      "accentColor": "#C8A66B",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Experienced professionals wanting a designer look",
      "templateMarkup":
        "<div class=\"p6-dark-editorial\"><div class=\"p6-ded-top\"><span></span><span></span>" +
        "<span></span></div><header class=\"p6-ded-head\"><div>" +
        "<h1 data-bind=\"personalDetails.fullName\"></h1>" +
        "<div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div>" +
        "<div class=\"contact\" data-role=\"contact\"></div></header><div class=\"p6-ded-layout\"><aside>" +
        "<p class=\"p6-ded-label\">PROFILE / DETAIL</p><p class=\"summary\" data-bind=\"personalDetails.summary\">" +
        "</p><div data-role=\"sidebar\"></div></aside><main><p class=\"p6-ded-label\">SELECTED EXPERIENCE</p>" +
        "<div data-role=\"main\"></div></main></div></div>"
    },
    {
      "id": "modern-european-29",
      "name": "Modern European",
      "category": "premium",
      "description": "Premium CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 82,
      "accentColor": "#A85D43",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Experienced professionals wanting a designer look",
      "templateMarkup": "<div class=\"corp-p1 corp-modern-eu\"><header class=\"me-header\"><div class=\"me-card\"><h1 data-bind=\"personalDetails.fullName\"></h1><div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div><div class=\"me-contact\"><span>CONTACT</span><div class=\"contact\" data-role=\"contact\"></div></div></header><div class=\"me-grid\"><aside><div class=\"me-summary\"><span>PROFILE</span><p data-bind=\"personalDetails.summary\"></p></div><div data-role=\"sidebar\"></div></aside><main><div data-role=\"main\"></div></main></div></div>"},
    {
      "id": "signature-executive-30",
      "name": "Signature Executive",
      "category": "premium",
      "description": "Premium CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 82,
      "accentColor": "#8295B0",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Experienced professionals wanting a designer look",
      "templateMarkup":
        "<header class=\"darkhead\"><h1 data-bind=\"personalDetails.fullName\"></h1>" +
        "<div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div>" +
        "<div class=\"photo portrait\">[APPLICANT PHOTO]</div><div class=\"contact\" data-role=\"contact\"></div>" +
        "</header><div class=\"darkgrid\"><aside><p data-bind=\"personalDetails.summary\"></p>" +
        "<div data-role=\"sidebar\"></div></aside><main><div data-role=\"main\"></div></main></div>"
    },
    {
      "id": "graphite-sidebar-01",
      "name": "Graphite Sidebar",
      "category": "premium-sidebar",
      "description": "Premium sidebar CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 76,
      "accentColor": "#20313A",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Detailed, multi-section professional profiles",
      "templateMarkup":
        "<div class=\"cv p5-graphite\"><aside class=\"p5-g-rail\"><div class=\"p5-g-badge\">CV</div>" +
        "<div class=\"p5-g-side\"><div data-role=\"sidebar\"></div></div></aside><main class=\"p5-g-sheet\">" +
        "<header class=\"p5-g-head\"><div><span class=\"p5-g-kicker\">PROFESSIONAL PROFILE</span>" +
        "<h1 data-bind=\"personalDetails.fullName\"></h1>" +
        "<div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div>" +
        "<div class=\"contact\" data-role=\"contact\"></div></header><section class=\"p5-g-summary\">" +
        "<p class=\"summary\" data-bind=\"personalDetails.summary\"></p></section>" +
        "<div class=\"p5-g-main\" data-role=\"main\"></div></main></div>"
    },
    {
      "id": "ivory-editorial-sidebar-02",
      "name": "Ivory Editorial Sidebar",
      "category": "premium-sidebar",
      "description": "Premium sidebar CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 76,
      "accentColor": "#8B493D",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Detailed, multi-section professional profiles",
      "templateMarkup":
        "<div class=\"cv p5-ivory\"><header class=\"p5-i-head\"><div class=\"p5-i-index\"></div>" +
        "<div class=\"p5-i-title\"><span></span><h1 data-bind=\"personalDetails.fullName\"></h1>" +
        "<div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div>" +
        "<div class=\"contact\" data-role=\"contact\"></div></header><div class=\"p5-i-rule\"></div>" +
        "<div class=\"p5-i-columns\"><main><section class=\"p5-i-lead\">" +
        "<p class=\"summary\" data-bind=\"personalDetails.summary\"></p></section><div data-role=\"main\"></div>" +
        "</main><aside><div class=\"p5-i-note\">SELECTED DETAILS</div><div data-role=\"sidebar\"></div></aside>" +
        "</div></div>"
    },
    {
      "id": "navy-vertical-rail-03",
      "name": "Navy Vertical Rail",
      "category": "premium-sidebar",
      "description": "Premium sidebar CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 76,
      "accentColor": "#153A62",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Detailed, multi-section professional profiles",
      "templateMarkup":
        "<div class=\"cv p5-navy\"><aside class=\"p5-n-rail\"><div class=\"p5-n-mark\"></div>" +
        "<div class=\"p5-n-label\"></div><div data-role=\"sidebar\"></div></aside>" +
        "<main class=\"p5-n-content\"><header class=\"p5-n-head\"><div><h1 data-bind=\"personalDetails.fullName\">" +
        "</h1><div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div>" +
        "<div class=\"contact\" data-role=\"contact\"></div></header><section class=\"p5-n-summary\">" +
        "<span>PROFILE</span><p class=\"summary\" data-bind=\"personalDetails.summary\"></p></section>" +
        "<div data-role=\"main\"></div></main></div>"
    },
    {
      "id": "burgundy-two-page-04",
      "name": "Burgundy Two Page",
      "category": "premium-sidebar",
      "description": "Premium sidebar CV template",
      "layout": "two-column",
      "pageCount": 2,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 76,
      "accentColor": "#6D2535",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Detailed, multi-section professional profiles",
      "templateMarkup":
        "<div class=\"cv p5-burgundy\"><header class=\"p5-b-head\"><div class=\"p5-b-number\"></div><div>" +
        "<span class=\"p5-b-kicker\">HERITAGE PROFILE</span><h1 data-bind=\"personalDetails.fullName\"></h1>" +
        "<div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div>" +
        "<div class=\"contact\" data-role=\"contact\"></div></header><div class=\"p5-b-frame\"><aside>" +
        "<div class=\"p5-b-side-title\">AT A GLANCE</div><div data-role=\"sidebar\"></div></aside><main>" +
        "<section class=\"p5-b-profile\"><p class=\"summary\" data-bind=\"personalDetails.summary\"></p></section>" +
        "<div data-role=\"main\"></div></main></div></div>"
    },
    {
      "id": "forest-profile-sidebar-05",
      "name": "Forest Profile Sidebar",
      "category": "premium-sidebar",
      "description": "Premium sidebar CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 76,
      "accentColor": "#315D4A",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Detailed, multi-section professional profiles",
      "templateMarkup":
        "<div class=\"cv p5-forest\"><header class=\"p5-f-head\"><div class=\"p5-f-monogram\"></div><div>" +
        "<span class=\"p5-f-kicker\">FIELD + OFFICE</span><h1 data-bind=\"personalDetails.fullName\"></h1>" +
        "<div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div>" +
        "<div class=\"contact\" data-role=\"contact\"></div></header><div class=\"p5-f-body\"><aside>" +
        "<section class=\"p5-f-profile\"><span>ABOUT</span>" +
        "<p class=\"summary\" data-bind=\"personalDetails.summary\"></p></section><div data-role=\"sidebar\"></div>" +
        "</aside><main><div class=\"p5-f-mainbar\">EXPERIENCE &amp; EDUCATION</div><div data-role=\"main\"></div>" +
        "</main></div></div>"
    },
    {
      "id": "black-copper-executive-06",
      "name": "Black Copper Executive",
      "category": "premium-sidebar",
      "description": "Premium sidebar CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 76,
      "accentColor": "#C27A4A",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Detailed, multi-section professional profiles",
      "templateMarkup":
        "<div class=\"cv p5-copper\"><header class=\"p5-c-top\"><div class=\"p5-c-brand\"></div>" +
        "<div class=\"p5-c-identity\"><h1 data-bind=\"personalDetails.fullName\"></h1>" +
        "<div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div>" +
        "<div class=\"contact\" data-role=\"contact\"></div></header><div class=\"p5-c-band\">" +
        "<span>LEADERSHIP PROFILE</span><p class=\"summary\" data-bind=\"personalDetails.summary\"></p></div>" +
        "<div class=\"p5-c-body\"><main><div data-role=\"main\"></div></main><aside><div data-role=\"sidebar\">" +
        "</div></aside></div></div>"
    },
    {
      "id": "slate-portfolio-07",
      "name": "Slate Portfolio",
      "category": "premium-sidebar",
      "description": "Premium sidebar CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 76,
      "accentColor": "#425466",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Detailed, multi-section professional profiles",
      "templateMarkup":
        "<div class=\"cv p5-slate\"><header class=\"p5-s-head\"><div class=\"p5-s-monogram\">SP</div><div>" +
        "<p class=\"p5-s-label\"></p><h1 data-bind=\"personalDetails.fullName\"></h1>" +
        "<div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div>" +
        "<div class=\"contact\" data-role=\"contact\"></div></header><section class=\"p5-s-intro\">" +
        "<span>PROFILE</span><p class=\"summary\" data-bind=\"personalDetails.summary\"></p></section>" +
        "<div class=\"p5-s-grid\"><main><div data-role=\"main\"></div></main><aside>" +
        "<div class=\"p5-s-sidehead\">TOOLS / DETAILS</div><div data-role=\"sidebar\"></div></aside></div></div>"
    },
    {
      "id": "sand-modern-two-page-08",
      "name": "Sand Modern Two Page",
      "category": "premium-sidebar",
      "description": "Premium sidebar CV template",
      "layout": "two-column",
      "pageCount": 2,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 76,
      "accentColor": "#4B4035",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Detailed, multi-section professional profiles",
      "templateMarkup":
        "<div class=\"cv p5-sand\"><div class=\"p5-sa-banner\"><span></span><span></span>" +
        "<span></span></div><header class=\"p5-sa-head\"><div>" +
        "<h1 data-bind=\"personalDetails.fullName\"></h1>" +
        "<div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div>" +
        "<div class=\"contact\" data-role=\"contact\"></div></header><div class=\"p5-sa-summary\">" +
        "<p class=\"summary\" data-bind=\"personalDetails.summary\"></p></div><div class=\"p5-sa-layout\"><aside>" +
        "<div data-role=\"sidebar\"></div></aside><main><div data-role=\"main\"></div></main></div></div>"
    },
    {
      "id": "indigo-cards-09",
      "name": "Indigo Cards",
      "category": "premium-sidebar",
      "description": "Premium sidebar CV template",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 76,
      "accentColor": "#4C46A5",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Detailed, multi-section professional profiles",
      "templateMarkup":
        "<div class=\"cv p5-indigo\"><header class=\"p5-in-head\"><div>" +
        "<span class=\"p5-in-kicker\"></span><h1 data-bind=\"personalDetails.fullName\"></h1>" +
        "<div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div>" +
        "<div class=\"contact\" data-role=\"contact\"></div></header><div class=\"p5-in-overview\">" +
        "<p class=\"summary\" data-bind=\"personalDetails.summary\"></p></div><div class=\"p5-in-cards\"><main>" +
        "<div data-role=\"main\"></div></main><aside><div data-role=\"sidebar\"></div></aside></div></div>"
    },
    {
      "id": "teal-command-two-page-10",
      "name": "Teal Command Two Page",
      "category": "premium-sidebar",
      "description": "Premium sidebar CV template",
      "layout": "two-column",
      "pageCount": 2,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 76,
      "accentColor": "#0B6B68",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Detailed, multi-section professional profiles",
      "templateMarkup":
        "<div class=\"cv p5-teal\"><header class=\"p5-t-head\"><div class=\"p5-t-command\"></div><div>" +
        "<h1 data-bind=\"personalDetails.fullName\"></h1>" +
        "<div class=\"role\" data-bind=\"personalDetails.jobTitle\"></div></div>" +
        "<div class=\"contact\" data-role=\"contact\"></div></header><div class=\"p5-t-grid\"><main>" +
        "<section class=\"p5-t-summary\"><span>EXECUTIVE SUMMARY</span>" +
        "<p class=\"summary\" data-bind=\"personalDetails.summary\"></p></section><div data-role=\"main\"></div>" +
        "</main><aside><div class=\"p5-t-sidecap\">CORE DATA</div><div data-role=\"sidebar\"></div></aside></div>" +
        "</div>"
    },
    {
      "id": "modern-01",
      "name": "Classic",
      "category": "modern",
      "description": "Sidebar left · Teal",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": true,
      "atsScore": 90,
      "accentColor": "#2F6F63",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Tech, marketing & general professional roles"
    },
    {
      "id": "modern-03",
      "name": "Accent",
      "category": "modern",
      "description": "Bold labels · Warm",
      "layout": "single-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": true,
      "atsScore": 90,
      "accentColor": "#B2562F",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Tech, marketing & general professional roles"
    },
    {
      "id": "ats-01",
      "name": "Clean",
      "category": "ats",
      "description": "Single column · Minimal",
      "layout": "single-column",
      "pageCount": 1,
      "photoSupport": false,
      "atsFriendly": true,
      "atsScore": 98,
      "accentColor": "#222222",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Corporate, government & high-volume applications"
    },
    {
      "id": "ats-02",
      "name": "Split",
      "category": "ats",
      "description": "Classic split header",
      "layout": "single-column",
      "pageCount": 1,
      "photoSupport": false,
      "atsFriendly": true,
      "atsScore": 98,
      "accentColor": "#1B2A4A",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Corporate, government & high-volume applications"
    },
    {
      "id": "executive-01",
      "name": "Prestige",
      "category": "executive",
      "description": "Dark header · Formal",
      "layout": "single-column",
      "pageCount": 1,
      "photoSupport": false,
      "atsFriendly": true,
      "atsScore": 85,
      "accentColor": "#1B2A4A",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Senior leadership & management positions"
    },
    {
      "id": "executive-02",
      "name": "Formal",
      "category": "executive",
      "description": "Dark sidebar · Gold",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": true,
      "atsScore": 85,
      "accentColor": "#C9A84C",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Senior leadership & management positions"
    },
    {
      "id": "creative-01",
      "name": "Vivid",
      "category": "creative",
      "description": "Color band · Bold",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 68,
      "accentColor": "#C1447E",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Design, media & creative industries"
    },
    {
      "id": "split-01",
      "name": "Ledger",
      "category": "modern",
      "description": "Card sections · Teal",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": true,
      "atsScore": 90,
      "accentColor": "#2F6F63",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Tech, marketing & general professional roles"
    },
    {
      "id": "timeline-01",
      "name": "Pathway",
      "category": "modern",
      "description": "Timeline · Teal",
      "layout": "timeline",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": true,
      "atsScore": 90,
      "accentColor": "#2F6F63",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Tech, marketing & general professional roles"
    },
    {
      "id": "combined-01",
      "name": "All Together",
      "category": "student",
      "description": "Merged history · Teal",
      "layout": "single-column",
      "pageCount": 1,
      "photoSupport": false,
      "atsFriendly": true,
      "atsScore": 92,
      "accentColor": "#2F6F63",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "First jobs, students & recent graduates"
    },
    {
      "id": "practical-01",
      "name": "Ready to Work",
      "category": "student",
      "description": "Checklist layout · Teal",
      "layout": "single-column",
      "pageCount": 1,
      "photoSupport": false,
      "atsFriendly": true,
      "atsScore": 92,
      "accentColor": "#2F6F63",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "First jobs, students & recent graduates"
    },
    {
      "id": "practical-02",
      "name": "On Call",
      "category": "student",
      "description": "Checklist layout · Navy",
      "layout": "single-column",
      "pageCount": 1,
      "photoSupport": false,
      "atsFriendly": true,
      "atsScore": 92,
      "accentColor": "#1B2A4A",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "First jobs, students & recent graduates"
    },
    {
      "id": "functional-01",
      "name": "Strong Suit",
      "category": "career-change",
      "description": "Skills-grouped · Teal",
      "layout": "skills-first",
      "pageCount": 1,
      "photoSupport": false,
      "atsFriendly": true,
      "atsScore": 88,
      "accentColor": "#2F6F63",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Career changers highlighting transferable skills"
    },
    {
      "id": "trade-01",
      "name": "On the Tools",
      "category": "trade",
      "description": "Credential badges · Steel Blue",
      "layout": "skills-first",
      "pageCount": 1,
      "photoSupport": false,
      "atsFriendly": true,
      "atsScore": 90,
      "accentColor": "#1B3A4B",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Skilled trades, apprenticeships & artisans"
    },
    {
      "id": "trade-02",
      "name": "Certified",
      "category": "trade",
      "description": "Credential badges · Safety Orange",
      "layout": "skills-first",
      "pageCount": 1,
      "photoSupport": false,
      "atsFriendly": true,
      "atsScore": 90,
      "accentColor": "#7A3A1B",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Skilled trades, apprenticeships & artisans"
    },
    {
      "id": "starter-01",
      "name": "Starter Classic",
      "category": "student",
      "description": "Skills bars · Teal",
      "layout": "single-column",
      "pageCount": 1,
      "photoSupport": false,
      "atsFriendly": true,
      "atsScore": 92,
      "accentColor": "#2F8A6E",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "First jobs, students & recent graduates"
    },
    {
      "id": "mono-01",
      "name": "Stonewood",
      "category": "elegant",
      "description": "Monogram · Champagne",
      "layout": "single-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 78,
      "accentColor": "#8C7A5E",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Editorial, luxury & personal-brand roles"
    },
    {
      "id": "facet-01",
      "name": "Terraline",
      "category": "elegant",
      "description": "Facet · Terracotta",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 78,
      "accentColor": "#B5654A",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Editorial, luxury & personal-brand roles"
    },
    {
      "id": "duo-01",
      "name": "Rosemere",
      "category": "elegant",
      "description": "Duotone · Dusty Rose",
      "layout": "two-column",
      "pageCount": 1,
      "photoSupport": true,
      "atsFriendly": false,
      "atsScore": 78,
      "accentColor": "#A06060",
      "previewImage": null,
      "templatePath": null,
      "rendererKind": "legacy",
      "supportedSections": ["personal", "summary", "experience", "education", "skills", "certifications", "languages", "references", "interests", "strengths", "custom"],
      "bestFor": "Editorial, luxury & personal-brand roles"
    }
  ];
  const seen = new Set();
  definitions.forEach(def => {
    if (!def || !def.id || seen.has(def.id)) {
      throw new Error(`Duplicate or missing template id: ${def && def.id}`);
    }
    seen.add(def.id);
    def.supportedSections = Object.freeze(
      Array.isArray(def.supportedSections) ? def.supportedSections.slice() : []
    );
    Object.freeze(def);
  });

  const byId = new Map(definitions.map(def => [def.id, def]));
  const templateDefinitions = Object.freeze(definitions);

  const templateConfig = Object.freeze(
    definitions.map(def => Object.freeze({
      id: def.id,
      name: def.name,
      cat: def.category,
      desc: def.description
    }))
  );

  const templateMeta = Object.freeze(
    Object.fromEntries(definitions.map(def => [
      def.id,
      Object.freeze({
        pages: def.pageCount,
        photo: def.photoSupport,
        ats: def.atsScore,
        bestFor: def.bestFor
      })
    ]))
  );

  const registry = Object.freeze({
    list: () => templateDefinitions.slice(),
    get: id => byId.get(id) || null,
    has: id => byId.has(id),
    config: () => templateConfig.slice(),
    metadata: id => templateMeta[id] || null
  });

  // --- Retired-template redirects -----------------------------------------
  // These template ids used to be separate gallery entries that shared the
  // exact same layout/render logic as another entry and only differed by
  // accent colour. They were collapsed into one canonical entry per family.
  // Any resume saved with one of these ids gets redirected to the surviving
  // id, and its original accent colour is preserved via the "color" field
  // (applied by migrateTemplateId() in script.js on load).
  const TEMPLATE_ID_MIGRATIONS = {
    "combined-02": { to: "combined-01", color: "#B2562F" },
    "combined-03": { to: "combined-01", color: "#3B5BA9" },
    "combined-04": { to: "combined-01", color: "#4A5E2F" },
    "starter-02": { to: "starter-01", color: "#7A3A1B" },
    "starter-03": { to: "starter-01", color: "#2E5E88" },
    "functional-02": { to: "functional-01", color: "#3B5BA9" },
    "functional-03": { to: "functional-01", color: "#B08D2E" },
    "practical-03": { to: "practical-01", color: "#3D3D3D" },
    "trade-03": { to: "trade-01", color: "#2C2C2C" },
    // 2026-09 second pass: collapsed the remaining accent-only clones that
    // slipped through the first pass (see templates.js / templatePageSpecs.js
    // for the matching removal). Same rule as above: each of these ids used
    // to render through the exact same function as its "to" target with only
    // --color-accent differing, so nothing structural is lost.
    "modern-02": { to: "modern-01", color: "#3B5BA9" },
    "ats-03": { to: "ats-01", color: "#4A3728" },
    "ats-04": { to: "ats-01", color: "#264D3B" },
    "split-02": { to: "split-01", color: "#3B5BA9" },
    "split-03": { to: "split-01", color: "#C1447E" },
    "split-04": { to: "split-01", color: "#3D3D3D" },
    "timeline-02": { to: "timeline-01", color: "#3D3D3D" },
    "timeline-03": { to: "timeline-01", color: "#1B2A4A" },
    "mono-02": { to: "mono-01", color: "#4A6741" },
    "mono-03": { to: "mono-01", color: "#3B5BA9" },
    "facet-02": { to: "facet-01", color: "#1B5E56" },
    "facet-03": { to: "facet-01", color: "#6B3E8E" },
    "facet-04": { to: "facet-01", color: "#7A5C2E" },
    "duo-02": { to: "duo-01", color: "#4A6B4A" },
    "duo-03": { to: "duo-01", color: "#6B6860" }
  };

  function resolveTemplateId(id) {
    const migration = TEMPLATE_ID_MIGRATIONS[id];
    return migration ? migration.to : id;
  }

  global.TEMPLATE_DEFINITIONS = templateDefinitions;
  global.TEMPLATE_REGISTRY = registry;
  global.TEMPLATE_CONFIGS = templateConfig;
  global.TEMPLATE_META = templateMeta;
  global.TEMPLATE_ID_MIGRATIONS = TEMPLATE_ID_MIGRATIONS;
  global.resolveTemplateId = resolveTemplateId;
  global.getTemplateDefinition = id => byId.get(resolveTemplateId(id)) || null;
  global.listTemplateDefinitions = () => templateDefinitions.slice();
})(window);
