export const templatePageSpecs = [
  {
    "id": "modern-01",
    "name": "Classic",
    "category": "modern",
    "layout": "two-column",
    "sourceRenderer": "modern",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "rendererGroup": "modern",
      "headerSelectors": [
        ".sidebar > .cv-photo",
        ".sidebar > .name",
        ".sidebar > .job-title",
        ".sidebar > .contact-list"
      ],
      "photoActual": true,
      "photoMetadataEnabled": true,
      "contentRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom/personal-info",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".sidebar > .cv-photo",
        ".sidebar > .name",
        ".sidebar > .job-title",
        ".sidebar > .contact-list"
      ],
      "preserveRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom/personal-info",
        "main": "experience/education"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "modern-02",
    "name": "Inverse",
    "category": "modern",
    "layout": "two-column",
    "sourceRenderer": "modern",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "rendererGroup": "modern",
      "headerSelectors": [
        ".sidebar > .cv-photo",
        ".sidebar > .name",
        ".sidebar > .job-title",
        ".sidebar > .contact-list"
      ],
      "photoActual": true,
      "photoMetadataEnabled": true,
      "contentRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom/personal-info",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".sidebar > .cv-photo",
        ".sidebar > .name",
        ".sidebar > .job-title",
        ".sidebar > .contact-list"
      ],
      "preserveRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom/personal-info",
        "main": "experience/education"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "modern-03",
    "name": "Accent",
    "category": "modern",
    "layout": "single-column",
    "sourceRenderer": "modern",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "single-column",
      "rendererGroup": "modern",
      "headerSelectors": [
        ".modern-header"
      ],
      "photoActual": false,
      "photoMetadataEnabled": true,
      "contentRegions": {
        "main": "summary/personal-info/experience/education"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".modern-header"
      ],
      "preserveRegions": {
        "main": "summary/personal-info/experience/education"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "ats-01",
    "name": "Clean",
    "category": "ats",
    "layout": "single-column",
    "sourceRenderer": "ats",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "single-column",
      "rendererGroup": "ats",
      "headerSelectors": [
        ".ats-header",
        ".ats-rule"
      ],
      "photoActual": false,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "main": [
          "summary",
          "personal-info",
          "experience",
          "education",
          "skills",
          "languages",
          "certifications",
          "projects",
          "references",
          "interests",
          "strengths",
          "custom"
        ],
        "sidebar": []
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".ats-header",
        ".ats-rule"
      ],
      "preserveRegions": {
        "main": [
          "summary",
          "personal-info",
          "experience",
          "education",
          "skills",
          "languages",
          "certifications",
          "projects",
          "references",
          "interests",
          "strengths",
          "custom"
        ],
        "sidebar": []
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "ats-02",
    "name": "Split",
    "category": "ats",
    "layout": "single-column",
    "sourceRenderer": "ats",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "single-column",
      "rendererGroup": "ats",
      "headerSelectors": [
        ".ats-header-row",
        ".ats-rule"
      ],
      "photoActual": false,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "main": [
          "summary",
          "personal-info",
          "experience",
          "education",
          "skills",
          "languages",
          "certifications",
          "projects",
          "references",
          "interests",
          "strengths",
          "custom"
        ],
        "sidebar": []
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".ats-header-row",
        ".ats-rule"
      ],
      "preserveRegions": {
        "main": [
          "summary",
          "personal-info",
          "experience",
          "education",
          "skills",
          "languages",
          "certifications",
          "projects",
          "references",
          "interests",
          "strengths",
          "custom"
        ],
        "sidebar": []
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "ats-03",
    "name": "Compact",
    "category": "ats",
    "layout": "single-column",
    "sourceRenderer": "ats",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "single-column",
      "rendererGroup": "ats",
      "headerSelectors": [
        ".ats-header",
        ".ats-rule"
      ],
      "photoActual": false,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "main": [
          "summary",
          "personal-info",
          "experience",
          "education",
          "skills",
          "languages",
          "certifications",
          "projects",
          "references",
          "interests",
          "strengths",
          "custom"
        ],
        "sidebar": []
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".ats-header",
        ".ats-rule"
      ],
      "preserveRegions": {
        "main": [
          "summary",
          "personal-info",
          "experience",
          "education",
          "skills",
          "languages",
          "certifications",
          "projects",
          "references",
          "interests",
          "strengths",
          "custom"
        ],
        "sidebar": []
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "ats-04",
    "name": "Caps",
    "category": "ats",
    "layout": "single-column",
    "sourceRenderer": "ats",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "single-column",
      "rendererGroup": "ats",
      "headerSelectors": [
        ".ats-header",
        ".ats-rule"
      ],
      "photoActual": false,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "main": [
          "summary",
          "personal-info",
          "experience",
          "education",
          "skills",
          "languages",
          "certifications",
          "projects",
          "references",
          "interests",
          "strengths",
          "custom"
        ],
        "sidebar": []
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".ats-header",
        ".ats-rule"
      ],
      "preserveRegions": {
        "main": [
          "summary",
          "personal-info",
          "experience",
          "education",
          "skills",
          "languages",
          "certifications",
          "projects",
          "references",
          "interests",
          "strengths",
          "custom"
        ],
        "sidebar": []
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "executive-01",
    "name": "Prestige",
    "category": "executive",
    "layout": "single-column",
    "sourceRenderer": "executive",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "single-column",
      "rendererGroup": "executive",
      "headerSelectors": [
        ".exec-header"
      ],
      "photoActual": false,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "main": [
          "summary",
          "personal-info",
          "experience",
          "education",
          "skills",
          "languages",
          "certifications",
          "projects",
          "references",
          "interests",
          "strengths",
          "custom"
        ],
        "sidebar": []
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".exec-header"
      ],
      "preserveRegions": {
        "main": [
          "summary",
          "personal-info",
          "experience",
          "education",
          "skills",
          "languages",
          "certifications",
          "projects",
          "references",
          "interests",
          "strengths",
          "custom"
        ],
        "sidebar": []
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "executive-02",
    "name": "Formal",
    "category": "executive",
    "layout": "two-column",
    "sourceRenderer": "executive-02",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "rendererGroup": "executive-02",
      "headerSelectors": [
        ".sidebar > .cv-photo",
        ".sidebar > .name",
        ".sidebar > .job-title",
        ".sidebar > .contact-list"
      ],
      "photoActual": true,
      "photoMetadataEnabled": true,
      "contentRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom/personal-info",
        "main": "summary/personal-info/experience/education"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".sidebar > .cv-photo",
        ".sidebar > .name",
        ".sidebar > .job-title",
        ".sidebar > .contact-list"
      ],
      "preserveRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom/personal-info",
        "main": "summary/personal-info/experience/education"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "creative-01",
    "name": "Vivid",
    "category": "creative",
    "layout": "two-column",
    "sourceRenderer": "creative",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "rendererGroup": "creative",
      "headerSelectors": [
        ".creative-band"
      ],
      "photoActual": false,
      "photoMetadataEnabled": true,
      "contentRegions": {
        "main": [
          "experience",
          "education"
        ],
        "sidebar": [
          "skills",
          "languages",
          "certifications",
          "references",
          "interests",
          "strengths",
          "projects",
          "custom",
          "personal-info"
        ]
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".creative-band"
      ],
      "preserveRegions": {
        "main": [
          "experience",
          "education"
        ],
        "sidebar": [
          "skills",
          "languages",
          "certifications",
          "references",
          "interests",
          "strengths",
          "projects",
          "custom",
          "personal-info"
        ]
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "split-01",
    "name": "Ledger",
    "category": "modern",
    "layout": "two-column",
    "sourceRenderer": "split",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "rendererGroup": "split",
      "headerSelectors": [
        ".split-header",
        ".split-rule"
      ],
      "photoActual": false,
      "photoMetadataEnabled": true,
      "contentRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "summary/personal-info/experience/education"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".split-header",
        ".split-rule"
      ],
      "preserveRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "summary/personal-info/experience/education"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "split-02",
    "name": "Bracket",
    "category": "modern",
    "layout": "two-column",
    "sourceRenderer": "split",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "rendererGroup": "split",
      "headerSelectors": [
        ".split-header",
        ".split-rule"
      ],
      "photoActual": false,
      "photoMetadataEnabled": true,
      "contentRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "summary/personal-info/experience/education"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".split-header",
        ".split-rule"
      ],
      "preserveRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "summary/personal-info/experience/education"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "split-03",
    "name": "Corner",
    "category": "creative",
    "layout": "two-column",
    "sourceRenderer": "split",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "rendererGroup": "split",
      "headerSelectors": [
        ".split-header",
        ".split-rule"
      ],
      "photoActual": false,
      "photoMetadataEnabled": true,
      "contentRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "summary/personal-info/experience/education"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".split-header",
        ".split-rule"
      ],
      "preserveRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "summary/personal-info/experience/education"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "split-04",
    "name": "Frame",
    "category": "executive",
    "layout": "two-column",
    "sourceRenderer": "split",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "rendererGroup": "split",
      "headerSelectors": [
        ".split-header",
        ".split-rule"
      ],
      "photoActual": false,
      "photoMetadataEnabled": true,
      "contentRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "summary/personal-info/experience/education"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".split-header",
        ".split-rule"
      ],
      "preserveRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "summary/personal-info/experience/education"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "timeline-01",
    "name": "Pathway",
    "category": "modern",
    "layout": "timeline",
    "sourceRenderer": "timeline",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "timeline",
      "rendererGroup": "timeline",
      "headerSelectors": [
        ".main > .name",
        ".main > .job-title",
        ".main > .ats-contact-line",
        ".tl-rule"
      ],
      "photoActual": false,
      "photoMetadataEnabled": true,
      "contentRegions": {
        "main": [
          "summary",
          "personal-info",
          "experience",
          "education",
          "skills",
          "languages",
          "certifications",
          "projects",
          "references",
          "interests",
          "strengths",
          "custom"
        ],
        "sidebar": []
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".main > .name",
        ".main > .job-title",
        ".main > .ats-contact-line",
        ".tl-rule"
      ],
      "preserveRegions": {
        "main": [
          "summary",
          "personal-info",
          "experience",
          "education",
          "skills",
          "languages",
          "certifications",
          "projects",
          "references",
          "interests",
          "strengths",
          "custom"
        ],
        "sidebar": []
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "timeline-02",
    "name": "Milestone",
    "category": "ats",
    "layout": "single-column",
    "sourceRenderer": "timeline",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "single-column",
      "rendererGroup": "timeline",
      "headerSelectors": [
        ".main > .name",
        ".main > .job-title",
        ".main > .ats-contact-line",
        ".tl-rule"
      ],
      "photoActual": false,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "main": [
          "summary",
          "personal-info",
          "experience",
          "education",
          "skills",
          "languages",
          "certifications",
          "projects",
          "references",
          "interests",
          "strengths",
          "custom"
        ],
        "sidebar": []
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".main > .name",
        ".main > .job-title",
        ".main > .ats-contact-line",
        ".tl-rule"
      ],
      "preserveRegions": {
        "main": [
          "summary",
          "personal-info",
          "experience",
          "education",
          "skills",
          "languages",
          "certifications",
          "projects",
          "references",
          "interests",
          "strengths",
          "custom"
        ],
        "sidebar": []
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "timeline-03",
    "name": "Journey",
    "category": "executive",
    "layout": "timeline",
    "sourceRenderer": "timeline",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "timeline",
      "rendererGroup": "timeline",
      "headerSelectors": [
        ".main > .name",
        ".main > .job-title",
        ".main > .ats-contact-line",
        ".tl-rule"
      ],
      "photoActual": false,
      "photoMetadataEnabled": true,
      "contentRegions": {
        "main": [
          "summary",
          "personal-info",
          "experience",
          "education",
          "skills",
          "languages",
          "certifications",
          "projects",
          "references",
          "interests",
          "strengths",
          "custom"
        ],
        "sidebar": []
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".main > .name",
        ".main > .job-title",
        ".main > .ats-contact-line",
        ".tl-rule"
      ],
      "preserveRegions": {
        "main": [
          "summary",
          "personal-info",
          "experience",
          "education",
          "skills",
          "languages",
          "certifications",
          "projects",
          "references",
          "interests",
          "strengths",
          "custom"
        ],
        "sidebar": []
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "combined-01",
    "name": "All Together",
    "category": "student",
    "layout": "single-column",
    "sourceRenderer": "combined",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "single-column",
      "rendererGroup": "combined",
      "headerSelectors": [
        ".combined-header"
      ],
      "photoActual": false,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "main": "summary/personal-info/experience/education/skills/languages/certificates/projects/references/interests/strengths/custom"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".combined-header"
      ],
      "preserveRegions": {
        "main": "summary/personal-info/experience/education/skills/languages/certificates/projects/references/interests/strengths/custom"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "combined-02",
    "name": "One Story",
    "category": "student",
    "layout": "single-column",
    "sourceRenderer": "combined",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "single-column",
      "rendererGroup": "combined",
      "headerSelectors": [
        ".combined-header"
      ],
      "photoActual": false,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "main": "summary/personal-info/experience/education/skills/languages/certificates/projects/references/interests/strengths/custom"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".combined-header"
      ],
      "preserveRegions": {
        "main": "summary/personal-info/experience/education/skills/languages/certificates/projects/references/interests/strengths/custom"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "combined-03",
    "name": "Steady Path",
    "category": "student",
    "layout": "single-column",
    "sourceRenderer": "combined",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "single-column",
      "rendererGroup": "combined",
      "headerSelectors": [
        ".combined-header"
      ],
      "photoActual": false,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "main": "summary/personal-info/experience/education/skills/languages/certificates/projects/references/interests/strengths/custom"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".combined-header"
      ],
      "preserveRegions": {
        "main": "summary/personal-info/experience/education/skills/languages/certificates/projects/references/interests/strengths/custom"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "combined-04",
    "name": "Groundwork",
    "category": "student",
    "layout": "single-column",
    "sourceRenderer": "combined",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "single-column",
      "rendererGroup": "combined",
      "headerSelectors": [
        ".combined-header"
      ],
      "photoActual": false,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "main": "summary/personal-info/experience/education/skills/languages/certificates/projects/references/interests/strengths/custom"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".combined-header"
      ],
      "preserveRegions": {
        "main": "summary/personal-info/experience/education/skills/languages/certificates/projects/references/interests/strengths/custom"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "practical-01",
    "name": "Ready to Work",
    "category": "student",
    "layout": "single-column",
    "sourceRenderer": "practical",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "single-column",
      "rendererGroup": "practical",
      "headerSelectors": [
        ".practical-header",
        ".practical-rule"
      ],
      "photoActual": false,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "main": "summary/personal-info/experience/education/skills/languages/certificates/projects/references/interests/strengths/custom"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".practical-header",
        ".practical-rule"
      ],
      "preserveRegions": {
        "main": "summary/personal-info/experience/education/skills/languages/certificates/projects/references/interests/strengths/custom"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "practical-02",
    "name": "On Call",
    "category": "student",
    "layout": "single-column",
    "sourceRenderer": "practical",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "single-column",
      "rendererGroup": "practical",
      "headerSelectors": [
        ".practical-header",
        ".practical-rule"
      ],
      "photoActual": false,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/personal-info/projects/custom",
        "main": "summary/experience/education"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".practical-header",
        ".practical-rule"
      ],
      "preserveRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/personal-info/projects/custom",
        "main": "summary/experience/education"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "practical-03",
    "name": "Hands On",
    "category": "student",
    "layout": "single-column",
    "sourceRenderer": "practical",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "single-column",
      "rendererGroup": "practical",
      "headerSelectors": [
        ".practical-header",
        ".practical-rule"
      ],
      "photoActual": false,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "main": "summary/personal-info/experience/education/skills/languages/certificates/projects/references/interests/strengths/custom"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".practical-header",
        ".practical-rule"
      ],
      "preserveRegions": {
        "main": "summary/personal-info/experience/education/skills/languages/certificates/projects/references/interests/strengths/custom"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "functional-01",
    "name": "Strong Suit",
    "category": "career-change",
    "layout": "skills-first",
    "sourceRenderer": "functional",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "skills-first",
      "rendererGroup": "functional",
      "headerSelectors": [
        ".functional-header"
      ],
      "photoActual": false,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "main": "summary/personal-info/experience/education/skills/languages/certificates/projects/references/interests/strengths/custom"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".functional-header"
      ],
      "preserveRegions": {
        "main": "summary/personal-info/experience/education/skills/languages/certificates/projects/references/interests/strengths/custom"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "functional-02",
    "name": "New Direction",
    "category": "career-change",
    "layout": "skills-first",
    "sourceRenderer": "functional",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "skills-first",
      "rendererGroup": "functional",
      "headerSelectors": [
        ".functional-header"
      ],
      "photoActual": false,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "main": "summary/personal-info/experience/education/skills/languages/certificates/projects/references/interests/strengths/custom"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".functional-header"
      ],
      "preserveRegions": {
        "main": "summary/personal-info/experience/education/skills/languages/certificates/projects/references/interests/strengths/custom"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "functional-03",
    "name": "Turning Point",
    "category": "career-change",
    "layout": "skills-first",
    "sourceRenderer": "functional",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "skills-first",
      "rendererGroup": "functional",
      "headerSelectors": [
        ".functional-header"
      ],
      "photoActual": false,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "main": "summary/personal-info/experience/education/skills/languages/certificates/projects/references/interests/strengths/custom"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".functional-header"
      ],
      "preserveRegions": {
        "main": "summary/personal-info/experience/education/skills/languages/certificates/projects/references/interests/strengths/custom"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "trade-01",
    "name": "On the Tools",
    "category": "trade",
    "layout": "skills-first",
    "sourceRenderer": "trade",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "skills-first",
      "rendererGroup": "trade",
      "headerSelectors": [
        ".trade-header"
      ],
      "photoActual": false,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "main": "experience/education/skills/certificates/languages/projects/references/interests/strengths/custom"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".trade-header"
      ],
      "preserveRegions": {
        "main": "experience/education/skills/certificates/languages/projects/references/interests/strengths/custom"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "trade-02",
    "name": "Certified",
    "category": "trade",
    "layout": "skills-first",
    "sourceRenderer": "trade",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "skills-first",
      "rendererGroup": "trade",
      "headerSelectors": [
        ".trade2-header"
      ],
      "photoActual": false,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "sidebar": "certificates/skills/languages/interests/strengths/references/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".trade2-header"
      ],
      "preserveRegions": {
        "sidebar": "certificates/skills/languages/interests/strengths/references/projects/custom",
        "main": "experience/education"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "trade-03",
    "name": "Skilled Hands",
    "category": "trade",
    "layout": "skills-first",
    "sourceRenderer": "trade",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "skills-first",
      "rendererGroup": "trade",
      "headerSelectors": [
        ".trade-header"
      ],
      "photoActual": false,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "main": "experience/education/skills/certificates/languages/projects/references/interests/strengths/custom"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".trade-header"
      ],
      "preserveRegions": {
        "main": "experience/education/skills/certificates/languages/projects/references/interests/strengths/custom"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "starter-01",
    "name": "Starter Classic",
    "category": "student",
    "layout": "single-column",
    "sourceRenderer": "starter",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "single-column",
      "rendererGroup": "starter",
      "headerSelectors": [
        ".starter-header",
        ".starter-contact-row"
      ],
      "photoActual": true,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "main": [
          "summary",
          "experience",
          "education",
          "skills",
          "languages",
          "certifications",
          "projects",
          "references",
          "interests",
          "strengths",
          "custom"
        ],
        "sidebar": []
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".starter-header",
        ".starter-contact-row"
      ],
      "preserveRegions": {
        "main": [
          "summary",
          "experience",
          "education",
          "skills",
          "languages",
          "certifications",
          "projects",
          "references",
          "interests",
          "strengths",
          "custom"
        ],
        "sidebar": []
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "starter-02",
    "name": "Starter Warm",
    "category": "student",
    "layout": "single-column",
    "sourceRenderer": "starter",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "single-column",
      "rendererGroup": "starter",
      "headerSelectors": [
        ".starter-header",
        ".starter-contact-row"
      ],
      "photoActual": true,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "main": [
          "summary",
          "experience",
          "education",
          "skills",
          "languages",
          "certifications",
          "projects",
          "references",
          "interests",
          "strengths",
          "custom"
        ],
        "sidebar": []
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".starter-header",
        ".starter-contact-row"
      ],
      "preserveRegions": {
        "main": [
          "summary",
          "experience",
          "education",
          "skills",
          "languages",
          "certifications",
          "projects",
          "references",
          "interests",
          "strengths",
          "custom"
        ],
        "sidebar": []
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "starter-03",
    "name": "Starter Cool",
    "category": "student",
    "layout": "single-column",
    "sourceRenderer": "starter",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "single-column",
      "rendererGroup": "starter",
      "headerSelectors": [
        ".starter-header",
        ".starter-contact-row"
      ],
      "photoActual": true,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "main": [
          "summary",
          "experience",
          "education",
          "skills",
          "languages",
          "certifications",
          "projects",
          "references",
          "interests",
          "strengths",
          "custom"
        ],
        "sidebar": []
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".starter-header",
        ".starter-contact-row"
      ],
      "preserveRegions": {
        "main": [
          "summary",
          "experience",
          "education",
          "skills",
          "languages",
          "certifications",
          "projects",
          "references",
          "interests",
          "strengths",
          "custom"
        ],
        "sidebar": []
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "mono-01",
    "name": "Stonewood",
    "category": "elegant",
    "layout": "single-column",
    "sourceRenderer": "monogram",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "single-column",
      "rendererGroup": "monogram",
      "headerSelectors": [
        ".mono-top"
      ],
      "photoActual": true,
      "photoMetadataEnabled": true,
      "contentRegions": {
        "main": "summary/experience/education",
        "sidebar": "skills/languages/certificates/interests/personal-info/strengths/references/projects/custom"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".mono-top"
      ],
      "preserveRegions": {
        "main": "summary/experience/education",
        "sidebar": "skills/languages/certificates/interests/personal-info/strengths/references/projects/custom"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "mono-02",
    "name": "Sagebrook",
    "category": "elegant",
    "layout": "single-column",
    "sourceRenderer": "monogram",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "single-column",
      "rendererGroup": "monogram",
      "headerSelectors": [
        ".mono-top"
      ],
      "photoActual": true,
      "photoMetadataEnabled": true,
      "contentRegions": {
        "main": "summary/experience/education",
        "sidebar": "skills/languages/certificates/interests/personal-info/strengths/references/projects/custom"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".mono-top"
      ],
      "preserveRegions": {
        "main": "summary/experience/education",
        "sidebar": "skills/languages/certificates/interests/personal-info/strengths/references/projects/custom"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "mono-03",
    "name": "Slateview",
    "category": "elegant",
    "layout": "single-column",
    "sourceRenderer": "monogram",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "single-column",
      "rendererGroup": "monogram",
      "headerSelectors": [
        ".mono-top"
      ],
      "photoActual": true,
      "photoMetadataEnabled": true,
      "contentRegions": {
        "main": "summary/experience/education",
        "sidebar": "skills/languages/certificates/interests/personal-info/strengths/references/projects/custom"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".mono-top"
      ],
      "preserveRegions": {
        "main": "summary/experience/education",
        "sidebar": "skills/languages/certificates/interests/personal-info/strengths/references/projects/custom"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "facet-01",
    "name": "Terraline",
    "category": "elegant",
    "layout": "two-column",
    "sourceRenderer": "facet",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "rendererGroup": "facet",
      "headerSelectors": [
        ".facet-main > .name",
        ".facet-main > .job-title",
        ".facet-main > .summary",
        ".facet-sidebar > .facet-badge",
        ".facet-sidebar > .facet-contact-mini"
      ],
      "photoActual": true,
      "photoMetadataEnabled": true,
      "contentRegions": {
        "sidebar": "skills/languages/certificates/interests/personal-info/strengths/references/projects/custom",
        "main": "summary/experience/education"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".facet-main > .name",
        ".facet-main > .job-title",
        ".facet-main > .summary",
        ".facet-sidebar > .facet-badge",
        ".facet-sidebar > .facet-contact-mini"
      ],
      "preserveRegions": {
        "sidebar": "skills/languages/certificates/interests/personal-info/strengths/references/projects/custom",
        "main": "summary/experience/education"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "facet-02",
    "name": "Deepwater",
    "category": "elegant",
    "layout": "two-column",
    "sourceRenderer": "facet",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "rendererGroup": "facet",
      "headerSelectors": [
        ".facet-main > .name",
        ".facet-main > .job-title",
        ".facet-main > .summary",
        ".facet-sidebar > .facet-badge",
        ".facet-sidebar > .facet-contact-mini"
      ],
      "photoActual": true,
      "photoMetadataEnabled": true,
      "contentRegions": {
        "sidebar": "skills/languages/certificates/interests/personal-info/strengths/references/projects/custom",
        "main": "summary/experience/education"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".facet-main > .name",
        ".facet-main > .job-title",
        ".facet-main > .summary",
        ".facet-sidebar > .facet-badge",
        ".facet-sidebar > .facet-contact-mini"
      ],
      "preserveRegions": {
        "sidebar": "skills/languages/certificates/interests/personal-info/strengths/references/projects/custom",
        "main": "summary/experience/education"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "facet-03",
    "name": "Plumline",
    "category": "elegant",
    "layout": "two-column",
    "sourceRenderer": "facet",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "rendererGroup": "facet",
      "headerSelectors": [
        ".facet-main > .name",
        ".facet-main > .job-title",
        ".facet-main > .summary",
        ".facet-sidebar > .facet-badge",
        ".facet-sidebar > .facet-contact-mini"
      ],
      "photoActual": true,
      "photoMetadataEnabled": true,
      "contentRegions": {
        "sidebar": "skills/languages/certificates/interests/personal-info/strengths/references/projects/custom",
        "main": "summary/experience/education"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".facet-main > .name",
        ".facet-main > .job-title",
        ".facet-main > .summary",
        ".facet-sidebar > .facet-badge",
        ".facet-sidebar > .facet-contact-mini"
      ],
      "preserveRegions": {
        "sidebar": "skills/languages/certificates/interests/personal-info/strengths/references/projects/custom",
        "main": "summary/experience/education"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "facet-04",
    "name": "Brasswork",
    "category": "elegant",
    "layout": "two-column",
    "sourceRenderer": "facet",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "rendererGroup": "facet",
      "headerSelectors": [
        ".facet-main > .name",
        ".facet-main > .job-title",
        ".facet-main > .summary",
        ".facet-sidebar > .facet-badge",
        ".facet-sidebar > .facet-contact-mini"
      ],
      "photoActual": true,
      "photoMetadataEnabled": true,
      "contentRegions": {
        "sidebar": "skills/languages/certificates/interests/personal-info/strengths/references/projects/custom",
        "main": "summary/experience/education"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".facet-main > .name",
        ".facet-main > .job-title",
        ".facet-main > .summary",
        ".facet-sidebar > .facet-badge",
        ".facet-sidebar > .facet-contact-mini"
      ],
      "preserveRegions": {
        "sidebar": "skills/languages/certificates/interests/personal-info/strengths/references/projects/custom",
        "main": "summary/experience/education"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "duo-01",
    "name": "Rosemere",
    "category": "elegant",
    "layout": "two-column",
    "sourceRenderer": "duotone",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "rendererGroup": "duotone",
      "headerSelectors": [
        ".duo-sidebar > .name",
        ".duo-sidebar > .job-title",
        ".duo-sidebar > .duo-gold-rule",
        ".duo-sidebar > .contact-list",
        ".duo-main > .summary"
      ],
      "photoActual": false,
      "photoMetadataEnabled": true,
      "contentRegions": {
        "sidebar": "skills/languages/certificates/interests/personal-info/strengths/references/projects/custom",
        "main": "summary/experience/education"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".duo-sidebar > .name",
        ".duo-sidebar > .job-title",
        ".duo-sidebar > .duo-gold-rule",
        ".duo-sidebar > .contact-list",
        ".duo-main > .summary"
      ],
      "preserveRegions": {
        "sidebar": "skills/languages/certificates/interests/personal-info/strengths/references/projects/custom",
        "main": "summary/experience/education"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "duo-02",
    "name": "Willowgreen",
    "category": "elegant",
    "layout": "two-column",
    "sourceRenderer": "duotone",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "rendererGroup": "duotone",
      "headerSelectors": [
        ".duo-sidebar > .name",
        ".duo-sidebar > .job-title",
        ".duo-sidebar > .duo-gold-rule",
        ".duo-sidebar > .contact-list",
        ".duo-main > .summary"
      ],
      "photoActual": false,
      "photoMetadataEnabled": true,
      "contentRegions": {
        "sidebar": "skills/languages/certificates/interests/personal-info/strengths/references/projects/custom",
        "main": "summary/experience/education"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".duo-sidebar > .name",
        ".duo-sidebar > .job-title",
        ".duo-sidebar > .duo-gold-rule",
        ".duo-sidebar > .contact-list",
        ".duo-main > .summary"
      ],
      "preserveRegions": {
        "sidebar": "skills/languages/certificates/interests/personal-info/strengths/references/projects/custom",
        "main": "summary/experience/education"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "duo-03",
    "name": "Warmstone",
    "category": "elegant",
    "layout": "two-column",
    "sourceRenderer": "duotone",
    "sourceConfidence": "verified-from-source-renderer",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "rendererGroup": "duotone",
      "headerSelectors": [
        ".duo-sidebar > .name",
        ".duo-sidebar > .job-title",
        ".duo-sidebar > .duo-gold-rule",
        ".duo-sidebar > .contact-list",
        ".duo-main > .summary"
      ],
      "photoActual": false,
      "photoMetadataEnabled": true,
      "contentRegions": {
        "sidebar": "skills/languages/certificates/interests/personal-info/strengths/references/projects/custom",
        "main": "summary/experience/education"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".duo-sidebar > .name",
        ".duo-sidebar > .job-title",
        ".duo-sidebar > .duo-gold-rule",
        ".duo-sidebar > .contact-list",
        ".duo-main > .summary"
      ],
      "preserveRegions": {
        "sidebar": "skills/languages/certificates/interests/personal-info/strengths/references/projects/custom",
        "main": "summary/experience/education"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "luxury-editorial-01",
    "name": "Luxury Editorial",
    "category": "elegant",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [
        "div.hero"
      ],
      "photo": [],
      "footer": [
        "div.footer"
      ],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "template-specific continuation frame; never clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; content flows into the same frame geometry",
      "hidePage1ChromeSelectors": [
        "div.hero"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]",
        "div.footer"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "black-champagne-executive-02",
    "name": "Black Champagne Executive",
    "category": "premium",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [],
      "photo": [],
      "footer": [
        "div.footer"
      ],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]",
        "div.footer"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "architectural-grid-03",
    "name": "Architectural Grid",
    "category": "premium",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [
        "header.top",
        "div.topline",
        "div.identity"
      ],
      "photo": [],
      "footer": [
        "div.footer"
      ],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]",
        "div.footer"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "modern-swiss-04",
    "name": "Modern Swiss",
    "category": "premium",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [
        "header.top",
        "div.topline",
        "div.identity"
      ],
      "photo": [],
      "footer": [
        "div.footer"
      ],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]",
        "div.footer"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "fashion-editorial-portrait-05",
    "name": "Fashion Editorial Portrait",
    "category": "premium",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [
        "div.hero"
      ],
      "photo": [
        "div.photo.portrait"
      ],
      "footer": [
        "div.footer"
      ],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]",
        "div.footer"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "dark-executive-06",
    "name": "Dark Executive",
    "category": "premium",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [],
      "photo": [],
      "footer": [
        "div.footer"
      ],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]",
        "div.footer"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "european-minimal-07",
    "name": "European Minimal",
    "category": "premium",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [
        "header.top",
        "div.topline",
        "div.identity"
      ],
      "photo": [],
      "footer": [
        "div.footer"
      ],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]",
        "div.footer"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "burgundy-heritage-08",
    "name": "Burgundy Heritage",
    "category": "premium",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [
        "header.top",
        "div.topline",
        "div.identity"
      ],
      "photo": [],
      "footer": [
        "div.footer"
      ],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]",
        "div.footer"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "technology-executive-09",
    "name": "Technology Executive",
    "category": "premium",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [
        "header.top",
        "div.topline",
        "div.identity"
      ],
      "photo": [],
      "footer": [
        "div.footer"
      ],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]",
        "div.footer"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "portrait-luxury-10",
    "name": "Portrait Luxury",
    "category": "premium",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": "[data-template=\"portrait-luxury-10\"]",
      "layout": "two-column",
      "header": [],
      "photo": [],
      "footer": [],
      "contentRoles": {},
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        "[data-template=\"portrait-luxury-10\"]",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "contemporary-public-sector-11",
    "name": "Contemporary Public Sector",
    "category": "premium",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [
        "header.top",
        "div.topline",
        "div.identity"
      ],
      "photo": [],
      "footer": [
        "div.footer"
      ],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]",
        "div.footer"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "finance-executive-12",
    "name": "Finance Executive",
    "category": "premium",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [
        "header.top",
        "div.topline",
        "div.identity"
      ],
      "photo": [],
      "footer": [
        "div.footer"
      ],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]",
        "div.footer"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "creative-director-13",
    "name": "Creative Director",
    "category": "premium",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [
        "header.top",
        "div.topline",
        "div.identity"
      ],
      "photo": [
        "div.page.standard.creative-photo",
        "div.photo.portrait"
      ],
      "footer": [
        "div.footer"
      ],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]",
        "div.footer"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "magazine-column-portrait-14",
    "name": "Magazine Column Portrait",
    "category": "premium",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [
        "header.top",
        "div.topline",
        "div.identity"
      ],
      "photo": [
        "div.page.standard.magazine-photo",
        "div.photo.portrait"
      ],
      "footer": [
        "div.footer"
      ],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]",
        "div.footer"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "monochrome-gallery-15",
    "name": "Monochrome Gallery",
    "category": "premium",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [
        "header.top",
        "div.topline",
        "div.identity"
      ],
      "photo": [],
      "footer": [
        "div.footer"
      ],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]",
        "div.footer"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "modernist-geometry-16",
    "name": "Modernist Geometry",
    "category": "premium",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [
        "header.top",
        "div.topline",
        "div.identity"
      ],
      "photo": [],
      "footer": [
        "div.footer"
      ],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]",
        "div.footer"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "forest-estate-17",
    "name": "Forest Estate",
    "category": "premium",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [
        "header.top",
        "div.topline",
        "div.identity"
      ],
      "photo": [],
      "footer": [
        "div.footer"
      ],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]",
        "div.footer"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "sapphire-executive-portrait-18",
    "name": "Sapphire Executive Portrait",
    "category": "premium",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [
        "header.top",
        "div.topline",
        "div.identity"
      ],
      "photo": [
        "div.page.standard.portrait2",
        "div.photo.portrait"
      ],
      "footer": [
        "div.footer"
      ],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]",
        "div.footer"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "premium-consultant-19",
    "name": "Premium Consultant",
    "category": "premium",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [
        "header.top",
        "div.topline",
        "div.identity"
      ],
      "photo": [],
      "footer": [
        "div.footer"
      ],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]",
        "div.footer"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "editorial-portrait-20",
    "name": "Editorial Portrait",
    "category": "premium",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [
        "div.hero"
      ],
      "photo": [
        "div.photo.portrait"
      ],
      "footer": [
        "div.footer"
      ],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]",
        "div.footer"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "asymmetric-architecture-21",
    "name": "Asymmetric Architecture",
    "category": "premium",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [
        "header.top",
        "div.topline",
        "div.identity"
      ],
      "photo": [],
      "footer": [
        "div.footer"
      ],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]",
        "div.footer"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "luxury-portfolio-22",
    "name": "Luxury Portfolio",
    "category": "premium",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [
        "header.top",
        "div.topline",
        "div.identity"
      ],
      "photo": [
        "div.page.standard.portfolio-photo",
        "div.photo.portrait"
      ],
      "footer": [
        "div.footer"
      ],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]",
        "div.footer"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "slate-copper-23",
    "name": "Slate Copper",
    "category": "premium",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [
        "header.top",
        "div.topline",
        "div.identity"
      ],
      "photo": [],
      "footer": [
        "div.footer"
      ],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]",
        "div.footer"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "modern-academic-24",
    "name": "Modern Academic",
    "category": "premium",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [
        "header.top",
        "div.topline",
        "div.identity"
      ],
      "photo": [],
      "footer": [
        "div.footer"
      ],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]",
        "div.footer"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "high-end-minimal-25",
    "name": "High End Minimal",
    "category": "premium",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [
        "header.top",
        "div.topline",
        "div.identity"
      ],
      "photo": [],
      "footer": [
        "div.footer"
      ],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]",
        "div.footer"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "vertical-navigation-26",
    "name": "Vertical Navigation",
    "category": "premium",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [
        "header.top",
        "div.topline",
        "div.identity"
      ],
      "photo": [
        "div.page.standard.vertical-photo",
        "div.photo.portrait"
      ],
      "footer": [
        "div.footer"
      ],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]",
        "div.footer"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "art-directed-corporate-27",
    "name": "Art Directed Corporate",
    "category": "premium",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [
        "header.top",
        "div.topline",
        "div.identity"
      ],
      "photo": [
        "div.page.standard.corporate-photo",
        "div.photo.portrait"
      ],
      "footer": [
        "div.footer"
      ],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]",
        "div.footer"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "dark-editorial-28",
    "name": "Dark Editorial",
    "category": "premium",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [],
      "photo": [],
      "footer": [
        "div.footer"
      ],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]",
        "div.footer"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "modern-european-29",
    "name": "Modern European",
    "category": "premium",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [
        "header.top",
        "div.topline",
        "div.identity"
      ],
      "photo": [],
      "footer": [
        "div.footer"
      ],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]",
        "div.footer"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "signature-executive-30",
    "name": "Signature Executive",
    "category": "premium",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [],
      "photo": [
        "div.photo.portrait"
      ],
      "footer": [
        "div.footer"
      ],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]",
        "div.footer"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "graphite-sidebar-01",
    "name": "Graphite Sidebar",
    "category": "premium-sidebar",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".cv",
      "layout": "two-column",
      "header": [
        "header.hero"
      ],
      "photo": [],
      "footer": [
        "div.footer"
      ],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".cv",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]",
        "div.footer"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "ivory-editorial-sidebar-02",
    "name": "Ivory Editorial Sidebar",
    "category": "premium-sidebar",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [],
      "photo": [],
      "footer": [],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "navy-vertical-rail-03",
    "name": "Navy Vertical Rail",
    "category": "premium-sidebar",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".cv",
      "layout": "two-column",
      "header": [
        "header.header"
      ],
      "photo": [],
      "footer": [],
      "contentRoles": {
        "sidebar": [
          "div"
        ],
        "contact": [
          "div.contact"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".cv",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "burgundy-two-page-04",
    "name": "Burgundy Two Page",
    "category": "premium-sidebar",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 2,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [
        "header.hero"
      ],
      "photo": [],
      "footer": [],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "forest-profile-sidebar-05",
    "name": "Forest Profile Sidebar",
    "category": "premium-sidebar",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".cv",
      "layout": "two-column",
      "header": [
        "header.header"
      ],
      "photo": [],
      "footer": [],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".cv",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "black-copper-executive-06",
    "name": "Black Copper Executive",
    "category": "premium-sidebar",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".cv",
      "layout": "two-column",
      "header": [
        "header.top"
      ],
      "photo": [],
      "footer": [],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".cv",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "slate-portfolio-07",
    "name": "Slate Portfolio",
    "category": "premium-sidebar",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".cv",
      "layout": "two-column",
      "header": [
        "header.header"
      ],
      "photo": [],
      "footer": [],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "main": [
          "div"
        ],
        "sidebar": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".cv",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "sand-modern-two-page-08",
    "name": "Sand Modern Two Page",
    "category": "premium-sidebar",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 2,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [
        "header.header"
      ],
      "photo": [],
      "footer": [],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "indigo-cards-09",
    "name": "Indigo Cards",
    "category": "premium-sidebar",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 1,
    "photoSupport": true,
    "page1": {
      "frame": ".cv",
      "layout": "two-column",
      "header": [
        "header.hero"
      ],
      "photo": [],
      "footer": [],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "main": [
          "div"
        ],
        "sidebar": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".cv",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "teal-command-two-page-10",
    "name": "Teal Command Two Page",
    "category": "premium-sidebar",
    "layout": "two-column",
    "sourceRenderer": "legacy",
    "sourceConfidence": "migrated-from-source-shell",
    "pageCountSeed": 2,
    "photoSupport": true,
    "page1": {
      "frame": ".page",
      "layout": "two-column",
      "header": [
        "header.top"
      ],
      "photo": [],
      "footer": [],
      "contentRoles": {
        "contact": [
          "div.contact"
        ],
        "sidebar": [
          "div"
        ],
        "main": [
          "div"
        ]
      },
      "contentRegions": {
        "sidebar": "personal-info/summary/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "continuation": {
      "design": "same template shell and content regions; no separate art-directed continuation",
      "pageBreakRule": "new A4 sheet; renderer reflows measured content into the same template shell",
      "hidePage1ChromeSelectors": [
        "[data-rf-region=\"header\"]"
      ],
      "preserveSelectors": [
        ".page",
        "[data-role=\"sidebar\"]",
        "[data-role=\"main\"]"
      ],
      "photo": "never on continuation unless a template explicitly declares it",
      "identity": "never repeat full name/job-title/contact masthead unless explicitly declared",
      "pageNumber": "template footer/page-number area when supported",
      "specialContinuationHeader": null,
      "preserveRegions": {
        "sidebar": "personal-info/skills/languages/certificates/references/interests/strengths/projects/custom",
        "main": "experience/education"
      }
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "sa-retail-admin",
    "name": "Retail to Admin",
    "category": "south-african",
    "layout": "single-column",
    "sourceRenderer": "modern-fallback",
    "sourceConfidence": "source-gap-template-has-no-dedicated-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "single-column",
      "rendererGroup": "modern-fallback",
      "headerSelectors": [
        ".sidebar > .cv-photo",
        ".sidebar > .name",
        ".sidebar > .job-title",
        ".sidebar > .contact-list"
      ],
      "photoActual": true,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom/personal-info",
        "main": "summary/personal-info/experience/education"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".sidebar > .cv-photo",
        ".sidebar > .name",
        ".sidebar > .job-title",
        ".sidebar > .contact-list"
      ],
      "preserveRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom/personal-info",
        "main": "summary/personal-info/experience/education"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "sa-matric-first",
    "name": "Matric First Job",
    "category": "south-african",
    "layout": "single-column",
    "sourceRenderer": "modern-fallback",
    "sourceConfidence": "source-gap-template-has-no-dedicated-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "single-column",
      "rendererGroup": "modern-fallback",
      "headerSelectors": [
        ".sidebar > .cv-photo",
        ".sidebar > .name",
        ".sidebar > .job-title",
        ".sidebar > .contact-list"
      ],
      "photoActual": true,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom/personal-info",
        "main": "summary/personal-info/experience/education"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".sidebar > .cv-photo",
        ".sidebar > .name",
        ".sidebar > .job-title",
        ".sidebar > .contact-list"
      ],
      "preserveRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom/personal-info",
        "main": "summary/personal-info/experience/education"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "sa-graduate-launch",
    "name": "Graduate Launch",
    "category": "south-african",
    "layout": "single-column",
    "sourceRenderer": "modern-fallback",
    "sourceConfidence": "source-gap-template-has-no-dedicated-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "single-column",
      "rendererGroup": "modern-fallback",
      "headerSelectors": [
        ".sidebar > .cv-photo",
        ".sidebar > .name",
        ".sidebar > .job-title",
        ".sidebar > .contact-list"
      ],
      "photoActual": true,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom/personal-info",
        "main": "summary/personal-info/experience/education"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".sidebar > .cv-photo",
        ".sidebar > .name",
        ".sidebar > .job-title",
        ".sidebar > .contact-list"
      ],
      "preserveRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom/personal-info",
        "main": "summary/personal-info/experience/education"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "sa-tvet-technical",
    "name": "TVET Technical",
    "category": "south-african",
    "layout": "single-column",
    "sourceRenderer": "modern-fallback",
    "sourceConfidence": "source-gap-template-has-no-dedicated-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "single-column",
      "rendererGroup": "modern-fallback",
      "headerSelectors": [
        ".sidebar > .cv-photo",
        ".sidebar > .name",
        ".sidebar > .job-title",
        ".sidebar > .contact-list"
      ],
      "photoActual": true,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom/personal-info",
        "main": "summary/personal-info/experience/education"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".sidebar > .cv-photo",
        ".sidebar > .name",
        ".sidebar > .job-title",
        ".sidebar > .contact-list"
      ],
      "preserveRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom/personal-info",
        "main": "summary/personal-info/experience/education"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "sa-call-centre",
    "name": "Call Centre Ready",
    "category": "south-african",
    "layout": "single-column",
    "sourceRenderer": "modern-fallback",
    "sourceConfidence": "source-gap-template-has-no-dedicated-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "single-column",
      "rendererGroup": "modern-fallback",
      "headerSelectors": [
        ".sidebar > .cv-photo",
        ".sidebar > .name",
        ".sidebar > .job-title",
        ".sidebar > .contact-list"
      ],
      "photoActual": true,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom/personal-info",
        "main": "summary/personal-info/experience/education"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".sidebar > .cv-photo",
        ".sidebar > .name",
        ".sidebar > .job-title",
        ".sidebar > .contact-list"
      ],
      "preserveRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom/personal-info",
        "main": "summary/personal-info/experience/education"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "sa-learnership",
    "name": "Learnership Applicant",
    "category": "south-african",
    "layout": "single-column",
    "sourceRenderer": "modern-fallback",
    "sourceConfidence": "source-gap-template-has-no-dedicated-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "single-column",
      "rendererGroup": "modern-fallback",
      "headerSelectors": [
        ".sidebar > .cv-photo",
        ".sidebar > .name",
        ".sidebar > .job-title",
        ".sidebar > .contact-list"
      ],
      "photoActual": true,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom/personal-info",
        "main": "summary/personal-info/experience/education"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".sidebar > .cv-photo",
        ".sidebar > .name",
        ".sidebar > .job-title",
        ".sidebar > .contact-list"
      ],
      "preserveRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom/personal-info",
        "main": "summary/personal-info/experience/education"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "sa-hospitality",
    "name": "Hospitality to Office",
    "category": "south-african",
    "layout": "single-column",
    "sourceRenderer": "modern-fallback",
    "sourceConfidence": "source-gap-template-has-no-dedicated-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "single-column",
      "rendererGroup": "modern-fallback",
      "headerSelectors": [
        ".sidebar > .cv-photo",
        ".sidebar > .name",
        ".sidebar > .job-title",
        ".sidebar > .contact-list"
      ],
      "photoActual": true,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom/personal-info",
        "main": "summary/personal-info/experience/education"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".sidebar > .cv-photo",
        ".sidebar > .name",
        ".sidebar > .job-title",
        ".sidebar > .contact-list"
      ],
      "preserveRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom/personal-info",
        "main": "summary/personal-info/experience/education"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "sa-general-worker",
    "name": "General Worker",
    "category": "south-african",
    "layout": "single-column",
    "sourceRenderer": "modern-fallback",
    "sourceConfidence": "source-gap-template-has-no-dedicated-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "single-column",
      "rendererGroup": "modern-fallback",
      "headerSelectors": [
        ".sidebar > .cv-photo",
        ".sidebar > .name",
        ".sidebar > .job-title",
        ".sidebar > .contact-list"
      ],
      "photoActual": true,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom/personal-info",
        "main": "summary/personal-info/experience/education"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".sidebar > .cv-photo",
        ".sidebar > .name",
        ".sidebar > .job-title",
        ".sidebar > .contact-list"
      ],
      "preserveRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom/personal-info",
        "main": "summary/personal-info/experience/education"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "sa-admin-starter",
    "name": "Admin Starter",
    "category": "south-african",
    "layout": "single-column",
    "sourceRenderer": "modern-fallback",
    "sourceConfidence": "source-gap-template-has-no-dedicated-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "single-column",
      "rendererGroup": "modern-fallback",
      "headerSelectors": [
        ".sidebar > .cv-photo",
        ".sidebar > .name",
        ".sidebar > .job-title",
        ".sidebar > .contact-list"
      ],
      "photoActual": true,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom/personal-info",
        "main": "summary/personal-info/experience/education"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".sidebar > .cv-photo",
        ".sidebar > .name",
        ".sidebar > .job-title",
        ".sidebar > .contact-list"
      ],
      "preserveRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom/personal-info",
        "main": "summary/personal-info/experience/education"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "sa-security-office",
    "name": "Security to Office",
    "category": "south-african",
    "layout": "single-column",
    "sourceRenderer": "modern-fallback",
    "sourceConfidence": "source-gap-template-has-no-dedicated-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "single-column",
      "rendererGroup": "modern-fallback",
      "headerSelectors": [
        ".sidebar > .cv-photo",
        ".sidebar > .name",
        ".sidebar > .job-title",
        ".sidebar > .contact-list"
      ],
      "photoActual": true,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom/personal-info",
        "main": "summary/personal-info/experience/education"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".sidebar > .cv-photo",
        ".sidebar > .name",
        ".sidebar > .job-title",
        ".sidebar > .contact-list"
      ],
      "preserveRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom/personal-info",
        "main": "summary/personal-info/experience/education"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "sa-care-domestic",
    "name": "Care & Domestic",
    "category": "south-african",
    "layout": "single-column",
    "sourceRenderer": "modern-fallback",
    "sourceConfidence": "source-gap-template-has-no-dedicated-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "single-column",
      "rendererGroup": "modern-fallback",
      "headerSelectors": [
        ".sidebar > .cv-photo",
        ".sidebar > .name",
        ".sidebar > .job-title",
        ".sidebar > .contact-list"
      ],
      "photoActual": true,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom/personal-info",
        "main": "summary/personal-info/experience/education"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".sidebar > .cv-photo",
        ".sidebar > .name",
        ".sidebar > .job-title",
        ".sidebar > .contact-list"
      ],
      "preserveRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom/personal-info",
        "main": "summary/personal-info/experience/education"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  },
  {
    "id": "sa-youth-portfolio",
    "name": "Youth Portfolio",
    "category": "south-african",
    "layout": "single-column",
    "sourceRenderer": "modern-fallback",
    "sourceConfidence": "source-gap-template-has-no-dedicated-renderer",
    "pageCountSeed": 1,
    "photoSupport": false,
    "page1": {
      "frame": ".page",
      "layout": "single-column",
      "rendererGroup": "modern-fallback",
      "headerSelectors": [
        ".sidebar > .cv-photo",
        ".sidebar > .name",
        ".sidebar > .job-title",
        ".sidebar > .contact-list"
      ],
      "photoActual": true,
      "photoMetadataEnabled": false,
      "contentRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom/personal-info",
        "main": "summary/personal-info/experience/education"
      }
    },
    "continuation": {
      "design": "explicit continuation composition from source renderer; do not clone page-1 identity chrome",
      "pageBreakRule": "new A4 sheet; preserve original renderer CSS and content-region geometry",
      "hidePage1ChromeSelectors": [
        ".sidebar > .cv-photo",
        ".sidebar > .name",
        ".sidebar > .job-title",
        ".sidebar > .contact-list"
      ],
      "preserveRegions": {
        "sidebar": "skills/languages/certificates/references/interests/strengths/projects/custom/personal-info",
        "main": "summary/personal-info/experience/education"
      },
      "photo": "never on continuation",
      "identity": "never repeat full name/job-title/contact header",
      "pageNumber": "no new styling unless source renderer already defines it"
    },
    "pagination": {
      "minPages": 1,
      "maxPages": null,
      "allowNaturalExpansion": true,
      "overflowPolicy": "move complete content units to next page; split oversized bullet collections only when necessary",
      "neverClip": true,
      "neverScaleToFitPage": true,
      "keepTogether": [
        "experience-item",
        "education-item",
        "project-item",
        "custom-item"
      ],
      "allowSplitInsideItem": [
        "bullet-list"
      ]
    }
  }
];

export const templatePageSpecById = Object.fromEntries(templatePageSpecs.map(spec => [spec.id, spec]));
