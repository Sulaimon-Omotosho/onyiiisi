import Image from 'next/image'
import React from 'react'
import { earrings, shopCollections } from '@/constants'
import { MoveDownRight } from 'lucide-react'
import Link from 'next/link'

const ShopPage = () => {
  return (
    <div>
      {/* Shop Hero  */}
      <div className='relative h-[400px] lg:h-[580px] xl:h-[790px] w-full mb-20'>
        <Image src='/Shop Hero.jpeg' alt='Shop Hero' fill />
      </div>

      {/* Collections  */}
      <div className='flex flex-wrap flex-grow gap-5 justify-between items-center py-30 px-5 lg:px-10 xl:px-20'>
        {shopCollections.map((shop, idx) => (
          <div
            key={idx}
            className='flex flex-grow justify-center items-center w-[380px] md:w-[340px] lg:w-[300px] xl:w-[410px] h-[340px] md:h-[300px] lg:h-[260px] xl:h-[370px] rounded-md overflow-hidden relative'
          >
            <Image
              src={shop.image}
              alt='ombre collections'
              width={500}
              height={500}
              className='brightness-75'
            />
            <div className='absolute text-white text-center'>
              <h1 className='text-3xl font-semibold uppercase'>{shop.title}</h1>
              <p className='text-lg capitalize font-thin'>{shop.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Categories  */}
      <h1 className='mt-20 text-3xl font-bold text-center uppercase '>
        Categories
      </h1>
      <div className='flex flex-col md:flex-row md:h-[520px] lg:h-[700px] mx-5 lg:mx-10 xl:mx-20 my-5 gap-5 xl:gap-10'>
        <div className='relative h-[200px] md:h-full w-full md:w-1/3 flex justify-center items-center'>
          <Image
            src='/Categories Bracelets.jpeg'
            alt='Bracelet'
            fill
            className='brightness-75'
          />
          <div className='absolute'>
            <h1 className='capitalize text-3xl text-center font-thin text-white pb-3'>
              Bracelet
            </h1>
            <button className='text-white bg-orange-800 py-2 lg:py-3 w-[100px] lg:w-[150px] rounded-full uppercase font-thin text-xs flex items-center justify-center gap-1 lg:gap-2 '>
              learn more
              <span>
                <MoveDownRight className='w-4 lg:w-5 h-4 lg:h-5 pt-1' />
              </span>
            </button>
          </div>
        </div>
        <div className='flex flex-col md:w-1/3 gap-5 xl:gap-10'>
          <div className='relative w-full h-[200px] md:h-2/5 flex justify-center items-center'>
            {' '}
            <Image
              src='/Categories Rings.jpeg'
              alt='Rings'
              fill
              className='brightness-75'
            />
            <div className='absolute'>
              <h1 className='capitalize text-3xl text-center font-thin text-white pb-3'>
                Rings
              </h1>
              <button className='text-white bg-orange-800 py-2 lg:py-3 w-[100px] lg:w-[150px] rounded-full uppercase font-thin text-xs flex items-center justify-center gap-1 lg:gap-2 '>
                learn more
                <span>
                  <MoveDownRight className='w-4 lg:w-5 h-4 lg:h-5 pt-1' />
                </span>
              </button>
            </div>
          </div>
          <div className='relative w-full h-[200px] md:h-3/5 flex justify-center items-center'>
            {' '}
            <Image
              src='/Categories Earings.jpeg'
              alt='Earings'
              fill
              className='brightness-75'
            />
            <div className='absolute'>
              <h1 className='capitalize text-3xl text-center font-thin text-white pb-3'>
                Earings
              </h1>
              <button className='text-white bg-orange-800 py-2 lg:py-3 w-[100px] lg:w-[150px] rounded-full uppercase font-thin text-xs flex items-center justify-center gap-1 lg:gap-2 '>
                learn more
                <span>
                  <MoveDownRight className='w-4 lg:w-5 h-4 lg:h-5 pt-1' />
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className='flex flex-col md:w-1/3 gap-5 xl:gap-10 '>
          <div className='relative w-full h-[200px] md:h-3/5 flex justify-center items-center'>
            {' '}
            <Image
              src='/Categories Chains.jpeg'
              alt='chains'
              fill
              className='brightness-75'
            />
            <div className='absolute'>
              <h1 className='capitalize text-3xl text-center font-thin text-white pb-3'>
                chains
              </h1>
              <button className='text-white bg-orange-800 py-2 lg:py-3 w-[100px] lg:w-[150px] rounded-full uppercase font-thin text-xs flex items-center justify-center gap-1 lg:gap-2 '>
                learn more
                <span>
                  <MoveDownRight className='w-4 lg:w-5 h-4 lg:h-5 pt-1' />
                </span>
              </button>
            </div>
          </div>
          <div className='relative w-full h-[200px] md:h-2/5 flex justify-center items-center'>
            {' '}
            <Image
              src='/Categories Charms.jpeg'
              alt='Charms'
              fill
              className='brightness-75'
            />
            <div className='absolute'>
              <h1 className='capitalize text-3xl text-center font-thin text-white pb-3'>
                charms
              </h1>
              <button className='text-white bg-orange-800 py-2 lg:py-3 w-[100px] lg:w-[150px] rounded-full uppercase font-thin text-xs flex items-center justify-center gap-1 lg:gap-2 '>
                learn more
                <span>
                  <MoveDownRight className='w-4 lg:w-5 h-4 lg:h-5 pt-1' />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* New Arrivals  */}
      <div className='p-12'>
        {/* Header */}
        <div className='flex justify-center md:justify-between'>
          <h3 className='uppercase text-3xl md:text-xl font-bold md:font-semibold'>
            new arrivals
          </h3>
          <button className='hidden text-black py-2 lg:py-3 w-[120px] lg:w-[150px] rounded-full uppercase font-thin text-xs md:flex items-center justify-center gap-1 lg:gap-2 border-2 border-black '>
            learn more
            <span>
              <MoveDownRight className='w-4 lg:w-5 h-4 lg:h-5 pt-1' />
            </span>
          </button>
        </div>

        {/* Arrivals */}
        <div className='flex flex-wrap flex-grow gap-10 lg:gap-14 my-10 justify-center'>
          {earrings.map((item) => (
            <div
              key={item.index}
              className=' bg-[rgb(230,230,230)] rounded-md text-center h-[350px] md:h-[220px] lg:h-[280px] 2xl:h-[300px] w-[320px] md:w-[190px] lg:w-[250px] 2xl:w-[280px] flex-grow'
            >
              <Link href={item.slug}>
                <div className='h-[80%] border-b-[1px] flex items-center justify-center border-gray-400'>
                  <div className='h-[220px] w-[220px] relative'>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      objectFit='contain'
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

      {/* Customise  */}

      <div className='w-full h-[390px] lg:h-[490px] relative flex justify-center items-center mb-10'>
        <Image
          src='/Customize Jewelry.jpeg'
          alt='Customize'
          fill
          className='brightness-75'
        />
        <div className='text-white text-center absolute flex flex-col items-center justify-center gap-4'>
          <h1 className='text-xl md:text-3xl font-semibold capitalize'>
            Wanna Customise your Jewelry
          </h1>
          <p className='text-sm md:text-md font-thin'>
            New Amazing Chains From Our Party Collections. New Amazing Chains
            From Our Party Collections
          </p>
          <button className='text-white bg-orange-800 py-2 lg:py-3 w-[120px] lg:w-[150px] rounded-full uppercase font-thin text-xs flex items-center justify-center gap-1 lg:gap-2 '>
            learn more
            <span>
              <MoveDownRight className='w-4 lg:w-5 h-4 lg:h-5 pt-1' />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShopPage
