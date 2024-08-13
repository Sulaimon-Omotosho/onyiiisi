'use client'

import { categories, collection, specials } from '@/lib/sanity-client'
import { CategoriesProps, CollectionsProps, SpecialsProps } from '@/lib/types'
import { ArrowBigLeft } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const MiniSidebar = ({
  shop,
  closeSidebar,
}: {
  shop: any
  closeSidebar: () => void
}) => {
  // Fetch Categories
  const [categoryData, setCategoryData] = useState<CategoriesProps[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await categories()
        setCategoryData(categoryData)
      } catch (err) {
        console.error('Error fetching category data:', err)
      }
    }
    fetchCategories()
  }, [])

  // Fetch Specials
  const [specialData, setSpecialData] = useState<SpecialsProps[]>([])

  useEffect(() => {
    const fetchSpecials = async () => {
      try {
        const specialData = await specials()
        setSpecialData(specialData)
      } catch (err) {
        console.error('Error fetching Specials Data:', err)
      }
    }
    fetchSpecials()
  }, [])

  // Fetch Collections
  const [collectionData, setCollectionData] = useState<CollectionsProps[]>([])

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const collectionData = await collection()
        setCollectionData(collectionData)
      } catch (err) {
        console.error('Error fetching Collections Data:', err)
      }
    }
    fetchCollections()
  }, [])

  return (
    <div className='w-full h-full bg-[rgb(95,40,74)] py-10'>
      <div
        onClick={shop}
        className='capitalize flex items-center justify-center gap-3 pb-4'
      >
        <ArrowBigLeft />
        back
      </div>
      <hr className='mx-10 opacity-55' />
      <div className=''>
        {/* CATEGORIES  */}
        <div className=''>
          <h1 className='capitalize text-center py-3'>categories</h1>
          <ul className='text-center capitalize text-base'>
            {categoryData?.map((category, idx) => (
              <li
                key={idx}
                onClick={() => {
                  closeSidebar
                }}
                className='p-1'
              >
                <Link href={`/shop/categories/${category?.title}`}>
                  {category?.title}
                </Link>{' '}
              </li>
            ))}
          </ul>
        </div>
        {/* SPECIALS  */}
        <div className=''>
          <h1 className='capitalize text-center py-3'>specials</h1>
          <ul className='text-center capitalize text-base'>
            {specialData?.map((special, idx) => (
              <li key={idx} className='p-1'>
                <Link href={`/shop/specials/${special?.title}`}>
                  {special?.title}
                </Link>{' '}
              </li>
            ))}
          </ul>
        </div>
        {/* COLLECTIONS  */}
        <div className=''>
          <h1 className='capitalize text-center py-3'>collections</h1>
          <ul className='text-center capitalize text-base'>
            {collectionData?.map((collection, idx) => (
              <li key={idx} className='p-1'>
                <Link href={`/shop/collections/${collection?.title}`}>
                  {collection?.title}
                </Link>{' '}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MiniSidebar
