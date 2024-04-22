import { limitedProd, popularProd, trendingProd } from '@/lib/sanity-client'
import { ProductProps } from '@/lib/types'
import { useEffect, useState } from 'react'
// import { salesCarousel } from '.'

export const markdowns = () => {
  const [trend, setTrend] = useState<ProductProps[]>([])
  const [limited, setLimited] = useState<ProductProps[]>([])
  const [popular, setPopular] = useState<ProductProps[]>([])

  // Trending

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const fetchedTrends = await trendingProd(true)
        setTrend(Array.isArray(fetchedTrends) ? fetchedTrends : [fetchedTrends])
      } catch (err) {
        console.error('Error fetching products:', err)
        // setLoading(false)
      }
    }
    fetchTrends()
  }, [])

  const firstTrend = trend.length > 0 ? trend[0] : null

  // Popular

  useEffect(() => {
    const fetchpopular = async () => {
      try {
        const fetchedpopular = await popularProd(true)
        setPopular(
          Array.isArray(fetchedpopular) ? fetchedpopular : [fetchedpopular]
        )
      } catch (err) {
        console.error('Error fetching products:', err)
        // setLoading(false)
      }
    }
    fetchpopular()
  }, [])

  const firstPopular = popular.length > 0 ? popular[0] : null

  // Limited

  useEffect(() => {
    const fetchLimiteds = async () => {
      try {
        const fetchedLimiteds = await limitedProd(true)
        setLimited(
          Array.isArray(fetchedLimiteds) ? fetchedLimiteds : [fetchedLimiteds]
        )
      } catch (err) {
        console.error('Error fetching products:', err)
        // setLoading(false)
      }
    }
    fetchLimiteds()
  }, [])

  const firstLimited = limited.length > 0 ? limited[0] : null

  const markdown = [
    {
      image: firstTrend?.placeholder,
      title: 'Trending',
      desc: 'Indulge in an irresistible product trending in the market right now.',
      type: firstTrend?.brand,
      price: firstTrend?.price,
      slug: firstTrend?._id,
    },
    {
      image: firstPopular?.placeholder,
      title: 'Popular',
      desc: 'Discover the hottest product dominating the market with unbeatable price!',
      type: firstPopular?.brand,
      price: firstPopular?.price,
      slug: firstPopular?._id,
    },
    {
      image: firstLimited?.placeholder,
      title: 'Limited',
      desc: 'Explore an exclusive limited product with special offer.',
      type: firstLimited?.brand,
      price: firstLimited?.price,
      slug: firstLimited?._id,
    },
  ]

  return markdown
}

export default markdowns
