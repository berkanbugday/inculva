import { createClient } from '@sanity/client'
import 'dotenv/config'

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || '0w6yrm5e',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

/**
 * Create a Portable Text block (paragraph)
 */
export function p(text) {
  return {
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: randomKey(), text, marks: [] }],
  }
}

/**
 * Create a heading block
 */
export function heading(text, level = 'h2') {
  return {
    _type: 'block',
    _key: randomKey(),
    style: level,
    markDefs: [],
    children: [{ _type: 'span', _key: randomKey(), text, marks: [] }],
  }
}

/**
 * Create a bullet list item
 */
export function bullet(text) {
  return {
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    markDefs: [],
    children: [{ _type: 'span', _key: randomKey(), text, marks: [] }],
  }
}

/**
 * Create a numbered list item
 */
export function numbered(text) {
  return {
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    listItem: 'number',
    level: 1,
    markDefs: [],
    children: [{ _type: 'span', _key: randomKey(), text, marks: [] }],
  }
}

/**
 * Create a code block
 */
export function code(codeText, language = 'html') {
  return {
    _type: 'code',
    _key: randomKey(),
    code: codeText,
    language,
  }
}

/**
 * Create a blockquote
 */
export function blockquote(text) {
  return {
    _type: 'block',
    _key: randomKey(),
    style: 'blockquote',
    markDefs: [],
    children: [{ _type: 'span', _key: randomKey(), text, marks: [] }],
  }
}

/**
 * Upsert a WCAG rule document
 */
export async function upsertWcagRule(rule) {
  const doc = {
    _id: `wcag-${rule.criterionNumber.replace(/\./g, '-')}`,
    _type: 'wcagRule',
    ...rule,
    slug: {
      _type: 'slug',
      current: `${rule.criterionNumber.replace(/\./g, '-')}-${slugify(rule.title.en)}`,
    },
    publishedAt: new Date().toISOString(),
  }

  try {
    await client.createOrReplace(doc)
    console.log(`✓ ${rule.criterionNumber} ${rule.title.en}`)
  } catch (err) {
    console.error(`✗ ${rule.criterionNumber}: ${err.message}`)
  }
}

/**
 * Upsert a guide document
 */
export async function upsertGuide(guide) {
  const doc = {
    _id: `guide-${slugify(guide.title.en)}`,
    _type: 'guide',
    ...guide,
    slug: {
      _type: 'slug',
      current: slugify(guide.title.en),
    },
    publishedAt: new Date().toISOString(),
  }

  try {
    await client.createOrReplace(doc)
    console.log(`✓ Guide: ${guide.title.en}`)
  } catch (err) {
    console.error(`✗ Guide ${guide.title.en}: ${err.message}`)
  }
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function randomKey() {
  return Math.random().toString(36).slice(2, 10)
}
