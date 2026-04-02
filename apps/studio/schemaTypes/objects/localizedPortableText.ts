import { defineType, defineField } from 'sanity'

const portableTextMembers = [
  { type: 'block' },
  {
    type: 'image',
    options: { hotspot: true },
    fields: [
      {
        name: 'alt',
        type: 'string',
        title: 'Alternative Text',
      },
    ],
  },
  {
    type: 'code',
    title: 'Code Block',
    options: {
      languageAlternatives: [
        { title: 'HTML', value: 'html' },
        { title: 'CSS', value: 'css' },
        { title: 'JavaScript', value: 'javascript' },
        { title: 'TypeScript', value: 'typescript' },
      ],
    },
  },
]

export const localizedPortableText = defineType({
  name: 'localizedPortableText',
  title: 'Localized Portable Text',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'array',
      of: portableTextMembers,
    }),
    defineField({
      name: 'tr',
      title: 'Turkish',
      type: 'array',
      of: portableTextMembers,
    }),
  ],
})
