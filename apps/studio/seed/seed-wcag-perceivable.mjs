#!/usr/bin/env node

/**
 * Seed all Perceivable (1.x) WCAG rules into Sanity.
 *
 * Usage:
 *   SANITY_TOKEN=<token> node seed/seed-wcag-perceivable.mjs
 */

import { upsertWcagRule } from './helpers.mjs'
import rules11 from './perceivable-1-1.mjs'
import rules12 from './perceivable-1-2.mjs'
import rules13 from './perceivable-1-3.mjs'
import rules14 from './perceivable-1-4.mjs'

const allRules = [...rules11, ...rules12, ...rules13, ...rules14]

console.log(`\nSeeding ${allRules.length} Perceivable WCAG rules...\n`)

for (const rule of allRules) {
  await upsertWcagRule(rule)
}

console.log(`\nDone — ${allRules.length} Perceivable rules seeded.\n`)
