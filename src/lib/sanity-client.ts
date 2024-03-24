import { createClient, groq } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { CategoriesProps } from './types'

const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})

const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => {
  return builder.image(source)
}

export const categoryQuery = groq`*[_type =='category']{...} | order(createdAt asc)`

export const categories = async () => {
  const categories: CategoriesProps[] = await client.fetch(categoryQuery)
  return categories
}
