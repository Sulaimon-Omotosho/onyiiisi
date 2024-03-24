import { MoveDownRight } from 'lucide-react'
import Image from 'next/image'
import { earrings } from '@/constants'
import Link from 'next/link'

export default function PopularItems() {
  return (
    <div className='p-12'>
      {/* Header */}
      <div className='flex justify-center md:justify-between'>
        <h3 className='uppercase text-3xl md:text-xl font-bold md:font-semibold'>
          Popular items
        </h3>
        <button className='hidden text-black py-2 lg:py-3 w-[120px] lg:w-[150px] rounded-full uppercase font-thin text-xs md:flex items-center justify-center gap-1 lg:gap-2 border-2 border-black '>
          learn more
          <span>
            <MoveDownRight className='w-4 lg:w-5 h-4 lg:h-5 pt-1' />
          </span>
        </button>
      </div>

      {/* Earrings */}
      <div className='flex flex-wrap flex-grow gap-10 lg:gap-14 my-10 justify-center'>
        {earrings.map((item) => (
          <div
            key={item.index}
            className=' bg-[rgb(230,230,230)] rounded-md text-center h-[350px] md:h-[220px] lg:h-[280px] 2xl:h-[300px] w-[320px] md:w-[190px] lg:w-[250px] 2xl:w-[280px]'
          >
            <Link href={item.slug}>
              <div className='h-[80%] border-b-[1px] flex items-center justify-center border-gray-400'>
                <div className='h-[220px] w-[220px] relative flex-grow'>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                  />
                </div>
              </div>
            </Link>
            <div className='pt-1'>
              <h3 className='font-semibold text-sm'>{item.name}</h3>
              <p className=' font-thin text-xs text-gray-600'>
                {item.grams} grams
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
