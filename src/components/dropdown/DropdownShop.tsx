'use client'
import Image from 'next/image'
import Link from 'next/link'
// import { collections } from '@/constants'
import {
  SpecialsProps,
  type CategoriesProps,
  CollectionsProps,
} from '@/lib/types'
import { useEffect, useState } from 'react'
import { categories, collection, specials } from '@/lib/sanity-client'

export default function DropdownShop() {
  // Categories
  const [categoryData, setCategoryData] = useState<CategoriesProps[]>([])

  useEffect(() => {
    // fetch Categories
    const fetchCategories = async () => {
      try {
        const categoryData = await categories()
        setCategoryData(categoryData)
      } catch (error) {
        console.log(console.error('Error fetching category data:', error))
      }
    }
    fetchCategories()
  }, [])

  // fetch Specials
  const [specialData, setSpecialData] = useState<SpecialsProps[]>([])

  useEffect(() => {
    const fetchSpecials = async () => {
      try {
        const specialData = await specials()
        setSpecialData(specialData)
      } catch (error) {
        console.log(console.error('error fetching specials data:', error))
      }
    }
    fetchSpecials()
  }, [])

  // fetch Collections
  const [collectionData, setCollectionData] = useState<CollectionsProps[]>([])

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const collectionData = await collection()
        setCollectionData(collectionData)
      } catch (err) {
        console.log(console.error('error fetching collection data:', err))
      }
    }
    fetchCollections()
  }, [])

  return (
    <div className=''>
      <div className='py-[50px] px-9 absolute lg:fixed z-30 w-full bg-[rgb(71,28,13)]'>
        <div className='flex-1 flex items-center gap-6 lg:gap-10 '>
          <div className='flex flex-col justify-center items-center gap-3'>
            <Link
              href='/shop'
              className='uppercase underline underline-offset-4 pr-[70px]'
            >
              new in
            </Link>
            <div className='w-[150px] lg:w-[202px] h-[108px] lg:h-[144px] relative rounded-md mr-14 overflow-hidden object-cover'>
              <Image
                src='/shop.png'
                fill
                // objectFit='cover'
                alt='shop image'
              />
            </div>
          </div>
          <div className='flex-4 flex gap-[60px] lg:gap-[120px]'>
            <div className=''>
              <h1 className='capitalize font-medium underline text-center pb-3'>
                categories
              </h1>
              <ul className='text-center uppercase flex flex-col gap-2'>
                {categoryData?.map((category, idx) => (
                  <li key={idx}>
                    <Link
                      href={`/shop/categories/${category?.title}`}
                      className=''
                    >
                      {category?.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className=''>
              <h1 className='capitalize font-medium underline text-center pb-3'>
                specials
              </h1>
              <ul className='text-center uppercase flex flex-col gap-2'>
                {specialData?.map((special, idx) => (
                  <li key={idx}>
                    <Link href={`/shop/specials/${special?.title}`}>
                      {special?.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className=''>
              <h1 className='capitalize font-medium underline text-center pb-3'>
                collections
              </h1>
              <ul className='text-center uppercase flex flex-col gap-2'>
                {collectionData?.map((collection, idx) => (
                  <li key={idx}>
                    <Link href={`/shop/collections/${collection?.title}`}>
                      {collection?.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
