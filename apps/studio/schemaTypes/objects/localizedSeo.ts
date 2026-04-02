import { defineType, defineField } from 'sanity'

export const localizedSeo = defineType({
  name: 'localizedSeo',
  title: 'Localized SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Max 60 characters',
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 2,
          description: 'Max 160 characters',
          validation: (Rule) => Rule.max(160),
        }),
      ],
    }),
    defineField({
      name: 'tr',
      title: 'Turkish SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Max 60 characters',
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 2,
          description: 'Max 160 characters',
          validation: (Rule) => Rule.max(160),
        }),
      ],
    }),
  ],
})
