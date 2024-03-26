import { defineField, defineType } from 'sanity'

export default defineType({
  type: 'document',
  name: 'guarantees',
  title: 'Guarantees',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Guarantees Image',
      validation: (rule) => rule.required(),
      options: {
        hotspot: true,
      },
      preview: {
        select: {
          imageUrl: 'asset.url',
          title: 'caption',
        },
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      description: 'description',
    },
  },
})
