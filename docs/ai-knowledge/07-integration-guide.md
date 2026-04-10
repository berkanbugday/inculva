# inculva — Integration Guide

## Overview

inculva works with any website technology. Add a single script tag and you're done. No build tools, no package installs, no framework dependencies.

## Quick Start

### Step 1: Create an Account

Sign up at https://app.inculva.com. Registration requires:

- Full name
- Email address
- Password

You'll receive a verification email to confirm your account.

### Step 2: Add Your Website

In the dashboard, click "Add Site" and enter:

- **Site name** — A label for your reference
- **Domain** — The domain where the widget will be embedded

### Step 3: Install the Widget

Copy the script tag from your dashboard and paste it into your website's HTML:

```html
<script
  src="https://cdn.inculva.com/widget.js"
  data-site-id="YOUR_SITE_ID"
  async
></script>
```

### Step 4: Verify Installation

The dashboard includes an install checker that verifies the widget script is properly loaded on your domain.

### Step 5: Configure Features

In the dashboard, customize:

- Which of the 24 features are enabled
- Widget position (left or right)
- Button size and icon
- Panel language (41 languages)
- Header and footer brand colors
- Accessibility profiles
- Accessibility statement URL

## Works With Any Technology

inculva is compatible with:

- **Static sites** — Plain HTML, Jekyll, Hugo, Eleventy
- **JavaScript frameworks** — React, Next.js, Vue, Nuxt, Angular, Svelte, SvelteKit
- **CMS platforms** — WordPress, Drupal, Joomla, Squarespace, Wix, Webflow
- **E-commerce** — Shopify, WooCommerce, Magento, BigCommerce
- **Any other platform** — If it renders HTML in a browser, inculva works with it

## Dashboard Features

### Site Management

- Add, edit, and remove websites
- Configure widget appearance and features per site
- Verify widget installation status
- Manage multiple sites (based on your plan limit)

### Analytics

- **Feature usage** — See which accessibility features your visitors use most
- **Session tracking** — Unique visitor sessions using the widget
- **Interaction events** — Timeline of widget opens, feature toggles, and profile activations
- **Period filters** — View data for 7, 14, 30, or 90 days
- **Export** — Export analytics data as Excel (XLSX)

### Scanning

- Run on-demand accessibility scans
- View violation reports with severity ratings
- Track compliance score (0-100) over time
- See passed rules and incomplete checks
- Each violation links to a Knowledge Base article with fix guidance

### Accessibility Statement

- Generate EAA Article 13 compliant accessibility statements
- Store and update your statement directly in the dashboard
- Link the statement URL in the widget so visitors can access it

## Support

- **Contact form** — Available in the dashboard under Support
- **Email:** hi@inculva.com
- **Medium plan:** Priority email support
- **Large plan:** Priority phone and email support
