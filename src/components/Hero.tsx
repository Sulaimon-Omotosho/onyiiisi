import Image from 'next/image'
import HeroCarousel from './HeroCarousel'
// import { guarantees } from '@/constants'
import { BannerProps, GuaranteesProps } from '@/lib/types'
import { urlFor } from '@/lib/sanity-client'

export default function Hero({
  banners,
  guarantees,
}: {
  banners: BannerProps[]
  guarantees: GuaranteesProps[]
}) {
  return (
    <div className='py-0 lg:py-16 xl:py-20'>
      {/* Hero Header  */}
      <div className='px-5 md:px-10 lg:px-16 xl:px-20 uppercase text-2xl md:text-3xl lg:text-5xl xl:text-7xl mt-8'>
        <h1 className='font-thin text-[rgb(95,40,74)]'>radiating Luxury</h1>
        <h1 className='font-extrabold'>one gleam at a time.</h1>
      </div>

      {/* Hero Image and Details */}
      <HeroCarousel banners={banners} />

      {/* Guarantees  */}
      <div className='bg-[rgb(217,199,211)] my-12 flex flex-col md:flex-row items-center content-center gap-10 lg:gap-16 px-[35px] py-6 lg:px-[50px] xl:px-[100px] 2xl:px-[150px]'>
        {guarantees?.map((guarantee, idx) => (
          <div
            key={guarantee._id}
            className=' flex-1 text-center flex flex-col gap-5 content-center items-center flex-grow'
          >
            <div className='h-20 w-20 relative'>
              <Image
                src={urlFor(guarantee.image).url()}
                alt={guarantee.title}
                fill
              />
            </div>
            <div className=''>
              <h2 className='font-bold text-lg lg:text-xl capitalize pb-1'>
                {guarantee.title}
              </h2>
              <p className='text-sm'>{guarantee.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
