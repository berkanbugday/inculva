# inculva — WCAG Compliance & Standards

## What is WCAG?

WCAG (Web Content Accessibility Guidelines) is an international standard published by the W3C (World Wide Web Consortium) for making web content accessible to people with disabilities. It is the most widely referenced accessibility standard globally.

## WCAG Versions

- **WCAG 2.0** (2008) — 61 success criteria. The foundation of web accessibility standards.
- **WCAG 2.1** (2018) — Added 17 new success criteria addressing mobile accessibility, low vision, and cognitive disabilities.
- **WCAG 2.2** (2023) — Added 9 new success criteria focusing on users with cognitive or learning disabilities, users of mobile devices, and users of assistive technologies.

## Conformance Levels

| Level | Meaning |
|-------|---------|
| **A** | Minimum accessibility. Addresses the most basic barriers. |
| **AA** | Mid-range. The level most laws and regulations reference. inculva targets this level. |
| **AAA** | Highest level. Not always achievable for all content, but inculva scans for these too. |

## Four Principles of WCAG (POUR)

1. **Perceivable** — Information and UI components must be presentable to users in ways they can perceive (e.g., text alternatives for images, captions for audio).
2. **Operable** — UI components and navigation must be operable (e.g., keyboard accessible, enough time to read content, no seizure-inducing content).
3. **Understandable** — Information and UI operation must be understandable (e.g., readable text, predictable behavior, input assistance).
4. **Robust** — Content must be robust enough to be interpreted by a wide variety of assistive technologies (e.g., proper HTML semantics, valid ARIA attributes).

## Standards inculva Supports

| Standard | Region | Description |
|----------|--------|-------------|
| **WCAG 2.1 AA** | International | Primary standard inculva scans against |
| **WCAG 2.2** | International | Latest version, also covered by inculva scanning |
| **ADA** | United States | Americans with Disabilities Act — references WCAG 2.1 AA |
| **Section 508** | United States | Federal accessibility requirements for government websites |
| **EN 301 549** | European Union | European standard for ICT accessibility, maps to WCAG 2.1 AA |
| **EAA (European Accessibility Act)** | European Union | Requires accessibility for products and services by June 2025 |

## How inculva Helps with Compliance

### Automated Scanning

inculva's scanning engine uses axe-core (the industry standard accessibility testing library) to detect violations. It analyzes:

- DOM structure and semantic HTML
- Color contrast ratios
- ARIA attributes and roles
- Keyboard navigation paths
- Form labels and input associations
- Image alt text
- Heading hierarchy
- Focus management
- Link purpose and text
- Target size for touch inputs

### Scanner-to-Knowledge-Base Link

When the scanner detects a violation, it maps the issue directly to a Knowledge Base article explaining:
- What the rule means
- Why it matters for users with disabilities
- How to test for the issue
- How to fix it with code examples
- Common mistakes to avoid

### Widget as Remediation Layer

The accessibility widget acts as a remediation overlay. While it does not replace proper accessible development, it provides immediate accommodations:
- Screen reader support via Web Speech API
- Keyboard navigation enhancements
- Visual adjustments (contrast, text size, spacing, color blind filters)
- Motor assistance (large click targets, cursor enhancement, skip navigation)
- Cognitive support (reading mask, reading guide, pause animations)

## Accessibility Statement

inculva includes a built-in accessibility statement generator compliant with EAA Article 13. Site owners can create their statement in the dashboard and link it in the widget configuration, so the widget displays a link to it for visitors.
