import Link from 'next/link'
import React from 'react'
import { historyDetails } from '@/constants'
import Image from 'next/image'

const HistoryPage = () => {
  return (
    <div className='lg:py-20'>
      <div className='px-5 md:px-10 lg:px-20 py-10'>
        <h1 className='text-2xl lg:text-3xl font-bold text-center uppercase'>
          history detail
        </h1>
        <div className='flex flex-col gap-16 py-10 w-full'>
          {historyDetails.map((detail, idx) => (
            <div
              key={idx}
              className='flex flex-col md:flex-row gap-5 lg:gap-10 md:items-center'
            >
              <div className='relative h-[180px] md:h-[250px] lg:h-[370px] w-[180px] lg:w-[370px] md:w-[250px] border-[1px] border-gray-500 rounded-md'>
                <Image
                  src={detail.img}
                  alt={detail.title}
                  fill
                  objectFit='cover'
                />
              </div>
              <div className=' text-slate-600 w-full md:w-3/4 flex flex-col gap-2'>
                <p className='flex capitalize justify-between md:text-lg font-semibold w-full'>
                  {detail.title}: {detail.desc}
                  <Link
                    href={`history/${detail.id}`}
                    className='capitalize md:text-lg font-medium hover:underline underline-offset-4'
                  >
                    view details
                  </Link>{' '}
                </p>
                <p className='font-bold md:text-lg'>
                  Order ID:-{' '}
                  <span className='text-black font-thin'>{detail.id}</span>
                </p>
                <p className='md:text-lg font-bold'>{detail.date}</p>
                <p className=' text-purple-950 font-semibold capitalize'>
                  {detail.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HistoryPage
