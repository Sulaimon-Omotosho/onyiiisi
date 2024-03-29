import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'specials',
  title: 'Specials',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
  ],
})
