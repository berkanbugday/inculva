import { defineType, defineField } from 'sanity'

export const resource = defineType({
  name: 'resource',
  title: 'External Resource',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {
        list: [
          { title: 'W3C WCAG Spec', value: 'w3c-spec' },
          { title: 'W3C Understanding WCAG', value: 'w3c-understanding' },
          { title: 'W3C Techniques', value: 'w3c-techniques' },
          { title: 'W3C WAI Tutorials', value: 'w3c-wai' },
          { title: 'Deque University', value: 'deque' },
          { title: 'WebAIM', value: 'webaim' },
          { title: 'MDN Web Docs', value: 'mdn' },
          { title: 'A11Y Project', value: 'a11y-project' },
          { title: 'ACT Rules', value: 'act-rules' },
          { title: 'Axe-core', value: 'axe-core' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'Turkish', value: 'tr' },
          { title: 'Both', value: 'both' },
        ],
      },
      initialValue: 'en',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'source',
    },
  },
})
