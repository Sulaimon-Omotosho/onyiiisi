'use client'

import { MoveDownRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { heroes } from '@/constants'
import { BannerProps } from '@/lib/types'
import { urlFor } from '@/lib/sanity-client'

export default function HeroCarousel({ banners }: { banners: BannerProps[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentIndex((prev) => (prev === heroes.length - 1 ? 0 : prev + 1)),
      10000
    )
    return () => clearInterval(interval)
  }, [heroes.length])

  const goToHero = (idx: number) => {
    setCurrentIndex(idx)
  }

  return (
    <div className=''>
      <div className='w-full h-[300px] md:h-[480px] lg:h-[680px] xl:h-[729px] relative my-5 lg:my-10 z-0 duration-1000 '>
        {banners?.map((item, idx) => (
          <div
            className={`absolute h-full w-full transition-opacity duration-1000 ${
              idx === currentIndex ? 'opacity-100' : 'opacity-0'
            } `}
            key={idx}
          >
            <Image
              src={urlFor(item?.image).url()}
              alt='Hero Onyiisi'
              fill
              className='object-cover brightness-90'
            />
          </div>
        ))}
        <div className='absolute bottom-6 md:bottom-11 lg:bottom-20 left-6 md:left-11 lg:left-20 w-[250px] md:w-[350px] lg:w-[500px] flex flex-col gap-5'>
          {banners?.map((hero, idx) => (
            <p
              key={idx}
              className={`text-xl lg:text-2xl ${
                idx === currentIndex ? 'opacity-100' : 'opacity-0 hidden'
              }`}
              style={{ color: hero?.color }}
            >
              {hero?.description}
            </p>
          ))}
          <button className='text-white bg-[rgb(95,40,74)] py-2 lg:py-3 w-[100px] lg:w-[150px] rounded-full uppercase font-thin text-xs flex items-center justify-center gap-1 lg:gap-2 '>
            shop now
            <span>
              <MoveDownRight className='w-4 lg:w-5 h-4 lg:h-5 pt-1' />
            </span>
          </button>
          <div className='flex gap-1 '>
            {heroes?.map((hero, idx) => (
              <button
                key={idx}
                onClick={() => goToHero(idx)}
                className={`${
                  idx === currentIndex
                    ? 'bg-[rgb(95,40,74)] border-none'
                    : 'bg-transparent border-[1px] border-[rgb(95,40,74)]'
                }  py-[2px] w-[30px] lg:w-[50px] rounded-full`}
              ></button>
            ))}
            {/* <button className='border-[1px] border-orange-800 py-[2px] w-[30px] lg:w-[50px] rounded-full'></button>
            <button className='border-[1px] border-orange-800 py-[2px] w-[30px] lg:w-[50px] rounded-full'></button> */}
          </div>
        </div>
      </div>
    </div>
  )
}
