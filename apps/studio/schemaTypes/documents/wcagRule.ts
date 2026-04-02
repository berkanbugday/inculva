import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const wcagRule = defineType({
  name: 'wcagRule',
  title: 'WCAG Rule',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'criterionNumber',
      title: 'Criterion Number',
      type: 'string',
      description: 'e.g. 1.1.1, 2.4.7',
      validation: (Rule) => Rule.required().regex(/^\d+\.\d+\.\d+$/),
    }),
    defineField({
      name: 'level',
      title: 'Conformance Level',
      type: 'string',
      options: {
        list: [
          { title: 'A', value: 'A' },
          { title: 'AA', value: 'AA' },
          { title: 'AAA', value: 'AAA' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'principle',
      title: 'Principle',
      type: 'string',
      options: {
        list: [
          { title: 'Perceivable', value: 'perceivable' },
          { title: 'Operable', value: 'operable' },
          { title: 'Understandable', value: 'understandable' },
          { title: 'Robust', value: 'robust' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'introducedIn',
      title: 'Introduced In',
      type: 'string',
      description: 'WCAG version that first added this criterion',
      options: {
        list: [
          { title: 'WCAG 2.0', value: '2.0' },
          { title: 'WCAG 2.1', value: '2.1' },
          { title: 'WCAG 2.2', value: '2.2' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'wcagVersions',
      title: 'Present In Versions',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        list: [
          { title: 'WCAG 2.0', value: '2.0' },
          { title: 'WCAG 2.1', value: '2.1' },
          { title: 'WCAG 2.2', value: '2.2' },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'impact',
      title: 'Impact',
      type: 'string',
      options: {
        list: [
          { title: 'Critical', value: 'critical' },
          { title: 'Serious', value: 'serious' },
          { title: 'Moderate', value: 'moderate' },
          { title: 'Minor', value: 'minor' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'axeRuleIds',
      title: 'Axe-core Rule IDs',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Related axe-core rule identifiers (e.g. image-alt, color-contrast)',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        list: [
          { title: 'Images', value: 'images' },
          { title: 'Forms', value: 'forms' },
          { title: 'Color', value: 'color' },
          { title: 'ARIA', value: 'aria' },
          { title: 'Keyboard', value: 'keyboard' },
          { title: 'Navigation', value: 'navigation' },
          { title: 'Text', value: 'text' },
          { title: 'Media', value: 'media' },
          { title: 'Structure', value: 'structure' },
          { title: 'Tables', value: 'tables' },
          { title: 'Links', value: 'links' },
          { title: 'Timing', value: 'timing' },
          { title: 'Errors', value: 'errors' },
          { title: 'Language', value: 'language' },
          { title: 'Predictability', value: 'predictability' },
        ],
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc: any) => {
          const num = doc.criterionNumber || ''
          const title = doc.title?.en || ''
          return `${num.replace(/\./g, '-')}-${title}`
        },
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'localizedPortableText',
    }),
    defineField({
      name: 'resources',
      title: 'Resources',
      type: 'array',
      of: [defineArrayMember({ type: 'resource' })],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'localizedSeo',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
  ],
  orderings: [
    {
      title: 'Criterion Number',
      name: 'criterionAsc',
      by: [{ field: 'criterionNumber', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      criterion: 'criterionNumber',
      title: 'title.en',
      level: 'level',
      impact: 'impact',
    },
    prepare({ criterion, title, level, impact }) {
      return {
        title: `${criterion} — ${title || 'Untitled'}`,
        subtitle: `Level ${level} | ${impact}`,
      }
    },
  },
})
