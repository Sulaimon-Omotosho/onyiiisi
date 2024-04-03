'use client'

import { earrings } from '@/constants'
import { productsByLatest, urlFor } from '@/lib/sanity-client'
import { ProductProps } from '@/lib/types'
import { Heart, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Loading from './Loading'

const LatestProducts = () => {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<ProductProps[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await productsByLatest()
        setProducts(
          Array.isArray(fetchedProducts) ? fetchedProducts : [fetchedProducts]
        )
        setLoading(false)
      } catch (err) {
        console.error('Error fetching products:', err)
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  console.log(products)

  return (
    <div>
      {' '}
      {loading ? (
        <Loading />
      ) : (
        <div className='flex flex-wrap flex-grow gap-10 lg:gap-14 my-10 justify-center'>
          {products?.map((item) => (
            <div
              key={item?._id}
              className=' bg-[rgb(230,230,230)] rounded-md text-center h-[350px] md:h-[220px] lg:h-[280px] 2xl:h-[300px] w-[320px] md:w-[190px] lg:w-[250px] 2xl:w-[280px] flex-grow'
            >
              <Link href={`/product/${item?._id}`}>
                <div className='h-[80%] border-b-[1px] flex items-center justify-center border-gray-400 relative overflow-hidden'>
                  {item.placeholder && (
                    <div className='h-full w-full relative'>
                      <Image
                        // src={item.placeholder}
                        src={urlFor(item?.placeholder).url()}
                        alt={item.title}
                        fill
                        className=' object-cover'
                      />
                    </div>
                  )}
                  <div className='absolute w-full h-full flex justify-between p-4 bottom-14 hover:bottom-0 transition-all ease-in-out duration-3000'>
                    <div className='w-10 h-10 bg-[rgb(95,40,74)] rounded-md text-white flex justify-center items-center hover:scale-125 transition-all duration-300'>
                      {' '}
                      <Heart />{' '}
                    </div>
                    <div className='w-10 h-10 bg-[rgb(95,40,74)] rounded-md text-white flex justify-center items-center hover:scale-125 transition-all duration-300'>
                      {' '}
                      <Plus />{' '}
                    </div>
                  </div>
                </div>
              </Link>
              <div className='pt-1'>
                <h3 className='font-semibold text-sm'>{item.title}</h3>
                <p className=' font-thin text-xs text-gray-600'>
                  {item.gram} grams
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LatestProducts
