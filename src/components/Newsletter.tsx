'use client'

import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

const Newsletter = () => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const form = useRef<HTMLFormElement>(null)
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(false)
    setSuccess(false)

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_TEMPLATE_ID2 || '',
        form.current || '',
        process.env.NEXT_PUBLIC_PUBLIC_KEY
      )
      .then(
        (result) => {
          setSuccess(true)
          form.current?.reset()
        },
        (error) => {
          setError(true)
        }
      )
  }

  return (
    <div>
      {/* News Letter  */}
      <div className='flex items-center justify-center'>
        <div className=' py-10 flex flex-col items-center justify-center w-full md:w-[80%] lg:w-[50%]'>
          <h2 className='font-semibold py-2 text-xl text-center '>
            Subscribe to our newsletter to get updates on our{' '}
            <br className='hidden md:flex ' />
            latest drops
          </h2>
          <p className='text-center text-xs font-thin text-gray-500 py-3'>
            Sign-up to receive 10% off your next purchase. Plus hear about new
            arrivals and offers
          </p>
          <form onSubmit={sendEmail} ref={form} className='w-full'>
            <div className='relative flex justify-between bg-gray-200 p-1 rounded-full w-[100%]'>
              <input
                type='email'
                name='message'
                id='email'
                placeholder='Enter your email'
                className=' p-2 rounded-full bg-transparent border-none focus:border-none outline-none w-full'
              />
              <button className=' hidden md:flex items-center right-6 text-white bg-[rgb(95,40,74)] px-2 w-[100px] rounded-full uppercase font-thin text-xs'>
                Subscribe
              </button>
            </div>
            <button className='md:hidden right-6 text-white bg-[rgb(95,40,74)] py-3 w-[200px] rounded-full uppercase font-semibold text-lg mt-5'>
              Subscribe
            </button>
            {success && (
              <span className='text-green-600 font-semibold'>
                Message sent successfully!
              </span>
            )}
            {error && (
              <span className='text-red-600 font-semibold'>
                Message not sent!
              </span>
            )}
          </form>
          <p className='hidden md:flex text-center text-xs font-thin text-gray-500'>
            By sharing your email, you agree to receive our weekly updates!
          </p>
        </div>
      </div>
    </div>
  )
}

export default Newsletter
