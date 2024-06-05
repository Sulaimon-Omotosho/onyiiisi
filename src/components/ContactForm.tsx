'use client'

import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

const ContactForm = () => {
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
        process.env.NEXT_PUBLIC_TEMPLATE_ID || '',
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
    <div className=' lg:pt-2'>
      <h2 className='font-bold capitalize text-lg'>contact form</h2>
      <p className='text-sm py-1 lg:py-2'>
        If you prefer, you can also fill out the contact form below, and one of
        our team members will get back to you as soon as possible
      </p>
      <form
        onSubmit={sendEmail}
        ref={form}
        className='flex flex-col gap-2 lg:gap-4'
      >
        <input
          type='text'
          placeholder='Name'
          name='user_name'
          className='p-2 rounded-md'
        />
        <input
          type='email'
          placeholder='Email'
          name='user_email'
          className='p-2 rounded-md'
        />
        <textarea
          name='user_message'
          id=''
          placeholder='Message'
          className='rounded w-full h-32 p-2'
        ></textarea>
        <button className='bg-purple-400 rounded font-semibold text-gray-800 p-4'>
          Send
        </button>
        {success && (
          <span className='text-green-600 font-semibold'>
            Message sent successfully!
          </span>
        )}
        {error && (
          <span className='text-red-600 font-semibold'>Message not sent!</span>
        )}
      </form>
    </div>
  )
}

export default ContactForm
