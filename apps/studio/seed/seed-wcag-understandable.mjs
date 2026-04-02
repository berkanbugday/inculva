#!/usr/bin/env node

/**
 * Seed all Understandable (3.x) WCAG rules into Sanity.
 *
 * Usage:
 *   SANITY_TOKEN=<token> node seed/seed-wcag-understandable.mjs
 */

import { upsertWcagRule } from './helpers.mjs'
import rules from './understandable-3.mjs'

console.log(`\nSeeding ${rules.length} Understandable WCAG rules...\n`)

for (const rule of rules) {
  await upsertWcagRule(rule)
}

console.log(`\nDone — ${rules.length} Understandable rules seeded.\n`)
