import React from 'react'

const ContactForm = () => {
  return (
    <div className=' lg:pt-2'>
      <h2 className='font-bold capitalize text-lg'>contact form</h2>
      <p className='text-sm py-1 lg:py-2'>
        If you prefer, you can also fill out the contact form below, and one of
        our team members will get back to you as soon as possible
      </p>
      <form action='' className='flex flex-col gap-2 lg:gap-4'>
        <input type='text' placeholder='Name' className='p-2 rounded-md' />
        <input type='email' placeholder='Email' className='p-2 rounded-md' />
        <textarea
          name=''
          id=''
          placeholder='Message'
          className='rounded w-full h-32 p-2'
        ></textarea>
      </form>
    </div>
  )
}

export default ContactForm
