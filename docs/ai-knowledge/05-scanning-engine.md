# inculva — Scanning Engine

## Overview

inculva includes an automated WCAG compliance scanner that crawls your website, analyzes pages in a headless browser, and reports accessibility violations with severity ratings, WCAG criterion references, and links to Knowledge Base fix documentation.

## How It Works

1. **Crawl** — The scanner crawls your website starting from the provided URL, following links to discover pages (up to your plan's page limit).
2. **Analyze** — Each page is rendered in a headless browser and analyzed using axe-core, the industry-standard accessibility testing engine.
3. **Report** — Results are aggregated into a comprehensive report showing violations, passed rules, and incomplete checks with a compliance score (0-100).

## What the Scanner Detects

The scanner checks for 60+ axe-core rules mapped to WCAG success criteria, including:

- **Missing alt text** on images (WCAG 1.1.1)
- **Insufficient color contrast** (WCAG 1.4.3, 1.4.6)
- **Missing form labels** (WCAG 1.3.1)
- **Invalid ARIA attributes** (WCAG 4.1.2)
- **Missing page language** (WCAG 3.1.1)
- **Missing document title** (WCAG 2.4.2)
- **Duplicate IDs** (WCAG 4.1.1)
- **Missing link text** (WCAG 2.4.4)
- **Focus order issues** (WCAG 2.4.3)
- **Keyboard accessibility** (WCAG 2.1.1)
- **Missing skip navigation** (WCAG 2.4.1)
- **Target size issues** (WCAG 2.5.8)
- **Missing captions** on video/audio (WCAG 1.2.1, 1.2.2)
- **Heading order** problems (WCAG 1.3.1)
- **Missing link purpose** (WCAG 2.4.4, 2.4.9)
- And many more

## Impact Levels

Each violation is rated by severity:

| Impact | Meaning |
|--------|---------|
| **Critical** | Blocks users from accessing core functionality. Must be fixed immediately. |
| **Serious** | Creates significant barriers. Should be prioritized. |
| **Moderate** | Causes difficulty but users can work around it. |
| **Minor** | Small inconvenience with low user impact. |

## Scan Results

Each scan produces three types of results:

1. **Violations** — Rules that failed. These are accessibility issues that need to be fixed.
2. **Passed Rules** — Rules that were checked and passed. Shows what you are doing correctly.
3. **Incomplete** — Rules that could not be fully evaluated automatically and may need manual review.

## Scanner-to-Knowledge-Base Integration

Every violation is linked to the corresponding inculva Knowledge Base article. The mapping covers 60+ axe-core rules to WCAG success criteria. For example:

- `image-alt` violation links to KB article "1.1.1 Non-Text Content"
- `color-contrast` violation links to KB article "1.4.3 Contrast (Minimum)"
- `aria-roles` violation links to KB article "4.1.2 Name, Role, Value"
- `button-name` violation links to KB article "4.1.2 Name, Role, Value"
- `document-title` violation links to KB article "2.4.2 Page Titled"

This helps users understand not just what is wrong, but why it matters and exactly how to fix it.

## Scan Limits by Plan

| Plan | Frequency | Pages/Scan | Scans/Day | History |
|------|-----------|------------|-----------|---------|
| Free | Monthly | 5 | 1 | 30 days |
| Small | Weekly | 25 | 10 | 90 days |
| Medium | Weekly | 100 | 20 | 180 days |
| Large | Daily | 500 | 50 | 365 days |

## Compliance Score

Each scan produces a compliance score from 0 to 100 based on the ratio of passed rules to total rules checked. This score can be tracked over time in the dashboard to monitor your accessibility improvement.
