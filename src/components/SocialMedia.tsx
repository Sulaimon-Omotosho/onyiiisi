import Image from 'next/image'
import React from 'react'

const SocialMedia = () => {
  return (
    <div>
      {' '}
      <div className='mx-5 lg:mx-10 xl:mx-20 my-5'>
        <h1 className='text-2xl text-center md:text-left font-bold uppercase my-5'>
          our social media
        </h1>
        <div className='flex flex-col md:flex-row items-center md:justify-between gap-3 '>
          <div className='relative h-[308px] md:h-[250px] xl:h-[318px] w-[290px] xl:w-[300px] rounded-md overflow-hidden'>
            <Image
              src='/socials.jpeg'
              alt='socials'
              fill
              className='object-cover'
            />
          </div>
          <div className='relative h-[308px] md:h-[250px] xl:h-[318px] w-[290px] xl:w-[300px] rounded-md overflow-hidden'>
            <Image
              src='/socials.jpeg'
              alt='socials'
              fill
              className='object-cover'
            />
          </div>
          <div className='relative h-[308px] md:h-[250px] xl:h-[318px] w-[290px] xl:w-[300px] rounded-md overflow-hidden'>
            <Image
              src='/socials.jpeg'
              alt='socials'
              fill
              className='object-cover'
            />
          </div>
          <div className='relative h-[308px] md:h-[250px] xl:h-[318px] w-[290px] xl:w-[300px] rounded-md overflow-hidden'>
            <Image
              src='/socials.jpeg'
              alt='socials'
              fill
              className='object-cover'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SocialMedia
