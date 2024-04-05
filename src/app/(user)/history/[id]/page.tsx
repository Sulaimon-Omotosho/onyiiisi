'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { CheckCircle } from 'lucide-react'

const OrderDetailsPage = () => {
  const [showPopup, setShowPopUp] = useState(false)

  const handlePopUp = () => {
    setShowPopUp(true)
  }

  return (
    <div className='lg:py-20'>
      <div className='py-10 md:py-16 px-5 md:px-16'>
        <div className='relative flex flex-col gap-5'>
          <p className='text-2xl font-semibold '>
            Order ID : <span className='font-thin'>2134576FR</span>
          </p>
          <p className='capitalize'>
            status:{' '}
            <span className='text-lg text-green-600 font-semibold'>
              delivered
            </span>
          </p>
          <p className='capitalize'>
            amount of items: <span className='text-lg font-semibold'>4</span>
          </p>
          <p className='capitalize'>
            total: <span className='font-semibold text-lg'>$4354</span>
          </p>
          <button className='capitalize bg-[rgb(95,40,74)] text-white font-semibold py-1 px-8 rounded-full absolute right-0 top-0'>
            buy again
          </button>
        </div>
        <div className='py-20'>
          <p className='text-2xl font-bold uppercase py-5'>order items</p>
          <div className='relative h-[100px] w-[100px] overflow-hidden border-2 border-slate-500 rounded-md'>
            <Image
              src='/Details Earring.jpg'
              alt='order item'
              fill
              objectFit='cover'
            />
          </div>
        </div>
        <div className='flex flex-col justify-center items-center gap-5'>
          <button
            onClick={handlePopUp}
            className='uppercase py-3 w-[50%] rounded-full bg-[rgb(95,40,74)] text-white font-bold'
          >
            see status
          </button>
          <Link
            href='/'
            className='uppercase font-semibold hover:underline underline-offset-8'
          >
            Continue Shopping
          </Link>
        </div>
        <div className='py-10 lg:w-1/2'>
          <h1 className='text-2xl font-bold uppercase'>payment information</h1>
          <div className='flex justify-between py-5'>
            <div className=''>
              <h3 className='capitalize font-bold pb-2 '>payment method</h3>
              <p className='text-slate-800 capitalize font-medium'>
                mastercard
              </p>
            </div>
            <div className='flex flex-col gap-2'>
              <h3 className='capitalize font-bold'>payment details</h3>
              <p className='text-slate-800 capitalize font-medium'>
                product subtotal:{' '}
                <span className='text-black font-bold'>$4000</span>
              </p>
              <p className='text-slate-800 capitalize font-medium'>
                shipping fee: <span className='text-black font-bold'>$345</span>
              </p>
              <p className='text-slate-800 capitalize font-medium'>
                total: <span className='text-black font-bold'>$4345</span>
              </p>
            </div>
          </div>
        </div>
        <div className='py-10 lg:w-1/2'>
          <h1 className='text-2xl font-bold uppercase'>delivery information</h1>
          <div className='flex justify-between py-5'>
            <div className=''>
              <h3 className='capitalize font-bold pb-2 '>delivery method</h3>
              <p className='text-slate-800 capitalize font-medium'>
                door delivery
              </p>
            </div>
            <div className='flex flex-col gap-2'>
              <h3 className='capitalize font-bold'>delivery address</h3>
              <p className='text-slate-800 capitalize font-medium'>
                Martha Stewart
              </p>
              <p className='text-slate-800 capitalize font-medium'>
                123, Broas street, Ikoyi,
              </p>
              <p className='text-slate-800 capitalize font-medium'>
                Lagos island, lagos.
              </p>
              <p className='text-slate-800 capitalize font-medium'>nigeria</p>
            </div>
          </div>
        </div>
      </div>
      <div
        // onClick={() => setShowPopUp(false)}
        className={`${showPopup ? 'block' : 'hidden'} absolute top-0 left-0 `}
      >
        <div className='fixed bg-gray-700 bg-opacity-50 flex justify-center items-center w-full h-full'>
          <div className='bg-white p-6 rounded-md flex flex-col justify-center items-center gap-8 w-full md:w-[85%] lg:w-[50%]'>
            <p className='font-bold capitalize text-xl text-center '>
              Order Status Details
            </p>
            <div className='w-full pl-10'>
              <div className='flex items-center gap-2'>
                <CheckCircle className=' h-10 w-10 text-[rgb(95,40,74)]' />
                <div className=''>
                  <p className='font-semibold uppercase text-sm'>
                    order placed
                  </p>
                  <p className='text-xs'>24-04-2024</p>
                </div>
              </div>
              <div className=' border-2 border-[rgb(95,40,74)] h-10 w-0 rounded-full ml-5 my-1'></div>
              <div className='flex items-center gap-2'>
                <CheckCircle className=' h-10 w-10 text-[rgb(95,40,74)]' />
                <div className=''>
                  <p className='font-semibold uppercase text-sm'>confirmed</p>
                  <p className='text-xs'>24-04-2024</p>
                </div>
              </div>
              <div className=' border-2 border-[rgb(95,40,74)] h-10 w-0 rounded-full ml-5 my-1'></div>
              <div className='flex items-center gap-2'>
                <CheckCircle className=' h-10 w-10 text-[rgb(95,40,74)]' />
                <div className=''>
                  <p className='font-semibold uppercase text-sm'>shipped</p>
                  <p className='text-xs'>24-04-2024</p>
                </div>
              </div>
              <div className=' border-2 border-[rgb(95,40,74)] h-10 w-0 rounded-full ml-5 my-1'></div>
              <div className='flex items-center gap-2'>
                <CheckCircle className=' h-10 w-10 text-[rgb(95,40,74)]' />
                <div className=''>
                  <p className='font-semibold uppercase text-sm'>delivered</p>
                  <p className='text-xs'>24-04-2024</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowPopUp(false)}
              className='py-2 px-5 capitalize rounded-full bg-[rgb(95,40,74)] text-white font-semibold text-center w-[75%]'
            >
              close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsPage
