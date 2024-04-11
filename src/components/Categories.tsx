import { MoveDownRight } from 'lucide-react'
import Image from 'next/image'
import SalesCarousel from './SalesCarousel'
import Link from 'next/link'
import { topCategories } from '@/constants'
import LatestProducts from './LatestProducts'

export default function Categories() {
  return (
    <div className='pb-10'>
      <h1 className='text-2xl font-semibold md:font-bold uppercase text-center mb-4'>
        top categories
      </h1>
      <div className='p-18 xl:p-20'>
        {/* Type of Orders  */}
        <div className='flex flex-col md:flex-row items-center md:justify-evenly mb-10 gap-6 '>
          {topCategories.map((category, idx) => (
            <div
              key={idx}
              className='w-[352px] lg:w-[470px] xl:w-[628px] h-[267px] lg:h-[356px] xl:h-[475px] relative flex justify-center items-center overflow-hidden flex-grow'
            >
              <Link href={category.slug}>
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className='object-cover transform hover:scale-110 transition-transform ease-in-out duration-500'
                />
              </Link>
              <div className='absolute text-center'>
                <h3 className='capitalize text-white text-2xl font-thin pb-2'>
                  {category.title}
                </h3>
                <Link href={category.slug} className='hidden md:block'>
                  <button className='text-white bg-[rgb(95,40,74)] py-2 lg:py-3 w-[150px] rounded-full uppercase font-thin text-xs flex items-center justify-center gap-1 lg:gap-2 '>
                    learn more
                    <span>
                      <MoveDownRight className='w-4 lg:w-5 h-4 lg:h-5 pt-1' />
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel */}
        <SalesCarousel />
      </div>
      <div className='p-12 bg-[rgb(56,22,10)]'>
        {/* Header */}
        <div className=' flex justify-center text-white md:justify-between'>
          <h3 className='uppercase text-3xl md:text-xl font-bold md:font-semibold'>
            Popular items
          </h3>
          <Link href='/shop'>
            <button className='hidden py-2 lg:py-3 w-[120px] lg:w-[150px] rounded-full uppercase font-thin text-xs md:flex items-center justify-center gap-1 lg:gap-2 border-2 border-white '>
              learn more
              <span>
                <MoveDownRight className='w-4 lg:w-5 h-4 lg:h-5 pt-1' />
              </span>
            </button>
          </Link>
        </div>
        <LatestProducts />
      </div>
    </div>
  )
}
