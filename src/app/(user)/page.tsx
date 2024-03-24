import Blog from '@/components/Blog'
import Categories from '@/components/Categories'
import FeedbackCarousel from '@/components/FeedbackCarousel'
import Hero from '@/components/Hero'
import Newsletter from '@/components/Newsletter'
import { client } from '@/lib/sanity-client'
import { type BannerProps } from '@/lib/types'
import { groq } from 'next-sanity'
export const revalidate = 10

const bannerQuery = groq`*[_type == 'banner']{
  image, _id
} | order(_createdAt asc)`

export default async function Home() {
  const banners: BannerProps[] = await client.fetch(bannerQuery)
  // console.log(banners)

  return (
    <main>
      <Hero banners={banners} />
      <Categories />
      <FeedbackCarousel />
      <Blog />
      <Newsletter />
    </main>
  )
}
