import { defineType, defineField, defineArrayMember } from 'sanity'
import { BookIcon } from '@sanity/icons'

export const guide = defineType({
  name: 'guide',
  title: 'Guide',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'SEO', value: 'seo' },
          { title: 'GEO', value: 'geo' },
          { title: 'AEO', value: 'aeo' },
          { title: 'Technique', value: 'technique' },
          { title: 'Best Practice', value: 'best-practice' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'relatedWcagRules',
      title: 'Related WCAG Rules',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'wcagRule' }],
        }),
      ],
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
        source: 'title.en',
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
  preview: {
    select: {
      title: 'title.en',
      category: 'category',
    },
    prepare({ title, category }) {
      return {
        title: title || 'Untitled',
        subtitle: category?.toUpperCase(),
      }
    },
  },
})
