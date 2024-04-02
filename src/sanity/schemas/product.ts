import { SlugifierFn, defineField, defineType } from 'sanity'

const slugify: SlugifierFn = (input: string | { title: string }) => {
  const title = typeof input === 'string' ? input : input.title
  const timestamp = new Date().getTime().toString()
  const slug = `${title}-${timestamp}`
  return slug.replace(/ \s+/g, '-')
}

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Keep the title relative to product',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: slugify,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      type: 'image',
      description: 'Placeholder Image',
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
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{ type: 'image' }],
    }),
    defineField({
      name: 'category',
      title: 'Product Category',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'specials',
      title: 'Product Specials',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'specials' }] }],
      // validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'collection',
      title: 'Product Collection',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'collection' }] }],
      // validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'discountedprice',
      title: 'Discount Price',
      type: 'number',
    }),
    defineField({
      name: 'ratings',
      title: 'Ratings',
      type: 'number',
      description: 'Ratings must be equal or below 5',
    }),
    defineField({
      name: 'trending',
      title: 'Trending',
      type: 'boolean',
    }),
    defineField({
      name: 'limited',
      title: 'Limited',
      type: 'boolean',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
    }),
    defineField({
      name: 'grade',
      title: 'Grade',
      type: 'string',
    }),
    defineField({
      name: 'gram',
      title: 'Gram',
      type: 'string',
    }),
    defineField({
      name: 'holesize',
      title: 'Hole Size',
      type: 'string',
    }),
    defineField({
      name: 'compatibility',
      title: 'Style Compatibility',
      type: 'string',
    }),
    defineField({
      name: 'quantity',
      title: 'Quantity',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      position: 'position',
    },
  },
})
