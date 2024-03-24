import Image from 'next/image'
import React from 'react'

const RelatedProducts = () => {
  return (
    <div className='py-10'>
      <h1 className='font-bold text-2xl uppercase py-10'>related products</h1>
      <div className='flex justify-around content-center items-center relative '>
        <div className='flex flex-col items-center'>
          <div className='relative h-[225px] lg:h-[300px] xl:h-[400px] w-[213px] lg:w-[284px] xl:w-[379px]'>
            <Image
              src='/70.jpg'
              alt='percent cut'
              fill
              className='rounded-xl'
            />
            <div className='bg-white absolute left-3 top-6'>
              <p className='px-3 py-[2px]'>-70%</p>
            </div>
          </div>
          <div className='flex flex-col gap-1 w-[75%] mt-2'>
            <p className=' font-semibold text-sm'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <p className='text-xs font-thin'>Platinum</p>
            <p className=' text-yellow-600 '>$674</p>
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <div className='relative h-[225px] lg:h-[300px] xl:h-[400px] w-[213px] lg:w-[284px] xl:w-[379px] '>
            <Image
              src='/trendingCarousel.jpg'
              alt='trending'
              fill
              className='rounded-xl'
            />
            <div className='bg-white absolute left-3 top-6'>
              <p className='px-3 py-[2px] uppercase'>trending</p>
            </div>
          </div>
          <div className='flex flex-col gap-1 w-[75%] mt-2'>
            <p className=' font-semibold text-sm'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <p className='text-xs font-thin'>Platinum</p>
            <p className=' text-yellow-600 '>$674</p>
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <div className='relative h-[225px] lg:h-[300px] xl:h-[400px] w-[213px] lg:w-[284px] xl:w-[379px]'>
            <Image
              src='/limitedCarousel.jpg'
              alt='limited'
              fill
              className='rounded-xl'
            />
            <div className='bg-white absolute left-3 top-6'>
              <p className='px-3 py-[2px] uppercase'>Limited</p>
            </div>
          </div>
          <div className='flex flex-col gap-1 w-[75%] mt-2'>
            <p className=' font-semibold text-sm'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <p className='text-xs font-thin'>Platinum</p>
            <p className=' text-yellow-600 '>$674</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RelatedProducts
