import Blog from '@/components/Blog'
import Categories from '@/components/Categories'
import FeedbackCarousel from '@/components/FeedbackCarousel'
import Hero from '@/components/Hero'
import Newsletter from '@/components/Newsletter'
// import Search from '@/components/Search'
import { client } from '@/lib/sanity-client'
import { type BannerProps, type GuaranteesProps } from '@/lib/types'
import { groq } from 'next-sanity'
export const revalidate = 10

const bannerQuery = groq`*[_type == 'banner']{
  image, _id, description, color
} | order(_createdAt asc)`

const guaranteesQuery = groq`*[_type == 'guarantees']{
  _id, title, image, description
} | order(_createdAt asc)`

export default async function Home() {
  const banners: BannerProps[] = await client.fetch(bannerQuery)
  // console.log(banners)
  const guarantees: GuaranteesProps[] = await client.fetch(guaranteesQuery)
  // console.log(guarantees)

  return (
    <main>
      <Hero banners={banners} guarantees={guarantees} />
      <Categories />
      <FeedbackCarousel />
      <Blog />
      <Newsletter />
    </main>
  )
}
