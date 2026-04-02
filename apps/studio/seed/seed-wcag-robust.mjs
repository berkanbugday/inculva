#!/usr/bin/env node

/**
 * Seed all Robust (4.x) WCAG rules into Sanity.
 *
 * Usage:
 *   SANITY_TOKEN=<token> node seed/seed-wcag-robust.mjs
 */

import { upsertWcagRule } from './helpers.mjs'
import rules from './robust-4.mjs'

console.log(`\nSeeding ${rules.length} Robust WCAG rules...\n`)

for (const rule of rules) {
  await upsertWcagRule(rule)
}

console.log(`\nDone — ${rules.length} Robust rules seeded.\n`)
