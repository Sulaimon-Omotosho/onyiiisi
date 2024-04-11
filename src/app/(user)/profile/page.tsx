import { Plus } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const ProfilePage = () => {
  // Minimum Number Of Years
  const minYear = 1900
  const maxYear = new Date().getFullYear()

  return (
    <div className='lg:py-20 pb-10'>
      <h1 className='text-3xl text-center font-bold capitalize py-10'>
        user profile
      </h1>
      <div className='relative flex flex-col  items-center justify-around'>
        <div className='md:absolute top-0 md:left-5 lg:left-10 '>
          <div className='relative rounded-full h-28 lg:h-36 xl:h-48 w-28 lg:w-36 xl:w-48'>
            <Image
              src='/User.jpeg'
              alt='user'
              fill
              className=' object-cover rounded-full'
            />
          </div>
        </div>
        <form
          action=''
          className='w-[90%] md:w-[60%] py-10 flex flex-col gap-10'
        >
          <div className='relative py-[10px] '>
            <label
              htmlFor='name'
              className='font-semibold text-sm absolute bg-white left-6 top-0 capitalize px-2 rounded-full'
            >
              full name
            </label>
            <input
              type='text'
              name='name'
              id='name'
              className='border-[1px] w-full border-gray-300 rounded-sm p-3'
            />
          </div>
          <div className=''>
            <p className='font-semibold text-sm'>Gender</p>
            <div className='flex justify-between w-[50%] pt-2'>
              <div className='flex gap-2 items-center'>
                <input
                  type='radio'
                  name='gender'
                  id='male'
                  value='male'
                  className='h-5 w-5'
                />
                <label htmlFor='male' className='text-sm'>
                  Male
                </label>
              </div>
              <div className='flex gap-2 items-center'>
                <input
                  type='radio'
                  name='gender'
                  id='female'
                  value='female'
                  className='h-5 w-5'
                />
                <label htmlFor='female' className='text-sm'>
                  Female
                </label>
              </div>
            </div>
          </div>
          <div className='w-full'>
            <p className='capitalize font-semibold text-sm'>date of birth</p>
            <div className='flex gap-3 pt-3'>
              <div className='relative py-[10px] w-1/3'>
                <label
                  htmlFor='dob.month'
                  className='font-semibold text-sm absolute bg-white left-6 top-0 capitalize px-2 rounded-full'
                >
                  month
                </label>
                <input
                  type='number'
                  name='dob.month'
                  id='dob.month'
                  min={1}
                  max={12}
                  className='border-[1px] w-full border-gray-300 rounded-sm p-3'
                />
              </div>
              <div className='relative py-[10px] w-1/3'>
                <label
                  htmlFor='dob.day'
                  className='font-semibold text-sm absolute bg-white left-6 top-0 capitalize px-2 rounded-full'
                >
                  day
                </label>
                <input
                  type='number'
                  name='day'
                  id='dob.day'
                  min={1}
                  max={31}
                  className='border-[1px] w-full border-gray-300 rounded-sm p-3'
                />
              </div>
              <div className='relative py-[10px] w-1/3'>
                <label
                  htmlFor='dob.year'
                  className='font-semibold text-sm absolute bg-white left-6 capitalize top-0 px-2 rounded-full'
                >
                  year
                </label>
                <input
                  type='number'
                  name='year'
                  id='dob.year'
                  min={minYear}
                  max={maxYear}
                  className='border-[1px] w-full border-gray-300 rounded-sm p-3'
                />
              </div>
            </div>
          </div>
          <div className='relative py-[10px] '>
            <label
              htmlFor='email'
              className='font-semibold text-sm absolute bg-white left-6 top-0 capitalize px-2 rounded-full'
            >
              email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              className='border-[1px] w-full border-gray-300 rounded-sm p-3'
            />
          </div>
          <div className=''>
            <div className='justify-between flex capitalize font-semibold text-xl'>
              <h2 className=''>shipping address</h2>
              <h2 className='flex items-center hover:underline underline-offset-4 cursor-pointer'>
                <Plus /> add address
              </h2>
            </div>
            <div className='relative py-[10px] '>
              <label
                htmlFor='address'
                className='font-semibold text-sm absolute bg-white left-6 top-0 capitalize px-2 rounded-full'
              >
                Address
              </label>
              <input
                type='text'
                name='address'
                id='address'
                className='border-[1px] w-full border-gray-300 rounded-sm p-3'
              />
            </div>
          </div>
          <h2 className='capitalize font-semibold text-xl'>payment info</h2>
        </form>
      </div>
    </div>
  )
}

export default ProfilePage
