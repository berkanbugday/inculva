import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
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
      name: 'slugTr',
      title: 'Slug (Turkish)',
      type: 'slug',
      description: 'Turkish URL slug for /tr/blog/ URLs',
      options: {
        source: 'title.tr',
        maxLength: 96,
      },
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
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Accessibility', value: 'accessibility' },
          { title: 'Legal', value: 'legal' },
          { title: 'WCAG', value: 'wcag' },
          { title: 'Tools', value: 'tools' },
          { title: 'News', value: 'news' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'blogPost' }],
        }),
      ],
    }),
    defineField({
      name: 'relatedGuides',
      title: 'Related Guides',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'guide' }],
        }),
      ],
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
      titleTr: 'title.tr',
      titleEn: 'title.en',
      category: 'category',
    },
    prepare({ titleTr, titleEn, category }) {
      return {
        title: titleTr || titleEn || 'Untitled',
        subtitle: category?.toUpperCase(),
      }
    },
  },
})
