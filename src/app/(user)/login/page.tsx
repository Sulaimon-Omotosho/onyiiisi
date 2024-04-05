import { getServerSession } from 'next-auth'
import { Button } from '@/components/ui/button'

import Link from 'next/link'
import React from 'react'

import LoginForm from '@/components/forms/login-form'
import { redirect } from 'next/navigation'
const LoginPage = async () => {
  const session = await getServerSession()
  if (session) {
    redirect('/')
  }
  const handleClick = () => {
    // Perform any additional actions you want when the component is clicked
    console.log('Component clicked')
  }
  return (
    <div
      className='bg-image py-20 flex items-center justify-center'
      style={{
        backgroundImage: 'url(loginImg.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <div className='bg-white md:m-[50px] xl:m-[100px] w-full md:w-[80%] lg:w-[60%] rounded-lg p-5 md:p-16'>
        <h1 className='text-2xl font-bold text-center'>
          Log into your Onyiisi Account
        </h1>
        <p className='text-lg text-center'>OR</p>
        <div className='text-md flex text-center justify-center items-center'>
          <h2 className=''>Continue with google </h2>
          <Button variant={'ghost'} size={'sm'}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              style={{ color: 'rgba(0, 0, 0, 1)' }}
            >
              <path d='M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z'></path>
            </svg>
          </Button>
        </div>
        <p className='text-sm text-center'>
          Don&apos;t Have an account?{' '}
          <Link href='/sign-up'>
            <span className='text-[rgb(95,40,74)] underline cursor-pointer'>
              Create Account{' '}
            </span>
          </Link>
        </p>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage
