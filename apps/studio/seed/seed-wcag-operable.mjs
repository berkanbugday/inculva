#!/usr/bin/env node

/**
 * Seed all Operable (2.x) WCAG rules into Sanity.
 *
 * Usage:
 *   SANITY_TOKEN=<token> node seed/seed-wcag-operable.mjs
 */

import { upsertWcagRule } from './helpers.mjs'
import rules21to23 from './operable-2-1-to-2-3.mjs'
import rules24 from './operable-2-4.mjs'
import rules25 from './operable-2-5.mjs'

const allRules = [...rules21to23, ...rules24, ...rules25]

console.log(`\nSeeding ${allRules.length} Operable WCAG rules...\n`)

for (const rule of allRules) {
  await upsertWcagRule(rule)
}

console.log(`\nDone — ${allRules.length} Operable rules seeded.\n`)
