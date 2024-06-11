'use client'

import { CheckCircle, Star, X } from 'lucide-react'
import React, { useState } from 'react'

const WriteReview = ({ closeReview }: { closeReview: () => void }) => {
  const [rating, setRating] = useState(0)

  const handleStarClick = (value: number) => {
    setRating(value)
  }

  return (
    <div className='fixed bg-gray-700 bg-opacity-50 flex justify-center items-center w-full h-full'>
      <div className='bg-white p-6 rounded-md flex flex-col justify-center items-center gap-8 w-full md:w-[85%] lg:w-[50%] relative'>
        <X
          onClick={closeReview}
          className='absolute right-4 top-4 cursor-pointer'
        />
        <div className='w-full md:px-10'>
          <p className='font-bold capitalize text-2xl'>write a review</p>
        </div>
        <div className='flex gap-10 items-center justify-around'>
          {[1, 2, 3, 4, 5].map((value, idx) => (
            <Star
              key={idx}
              onClick={() => handleStarClick(value)}
              style={{
                fill: value <= rating ? 'rgb(244,206,80)' : 'rgb(255,255,255)',
              }}
              color='rgb(244,206,80)'
              className='cursor-pointer'
            />
          ))}
        </div>
        <div className='w-full md:pl-10'>
          <form action=''>
            <div className='relative py-[10px] w-full'>
              <label
                htmlFor='header'
                className='font-semibold text-sm absolute bg-white left-6 top-0 capitalize px-2 rounded-full'
              >
                Header
              </label>
              <input
                type='text'
                name='header'
                id='header'
                className='border-[1px] w-full border-gray-300 rounded-sm p-3'
              />
            </div>
            <div className='relative py-[10px] w-full'>
              <label
                htmlFor='review'
                className='font-semibold text-sm absolute bg-white left-6 top-0 capitalize px-2 rounded-full'
              >
                review
              </label>
              <textarea
                name='review'
                id='review'
                className='border-[1px] w-full h-40 border-gray-300 rounded-sm p-3'
              ></textarea>
            </div>
          </form>
        </div>
        <button
          onClick={closeReview}
          className='py-2 px-5 capitalize rounded-full bg-[rgb(95,40,74)] text-white font-semibold text-center w-[75%]'
        >
          continue
        </button>
      </div>
    </div>
  )
}

export default WriteReview
