'use client'

import React from 'react'
import { Button } from './ui/button'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

const GoogleButton = () => {
  return (
    <div className='text-md flex text-center justify-center items-center'>
      <h2 className=''>Continue with google </h2>
      <Button variant={'ghost'} size={'sm'} onClick={() => signIn('google')}>
        <Image
          src='/google.png'
          alt='google'
          height={20}
          width={20}
          className='cursor-pointer'
        />
      </Button>
    </div>
  )
}

export default GoogleButton
