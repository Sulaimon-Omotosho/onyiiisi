import { getServerSession } from 'next-auth'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import LoginForm from '@/components/forms/login-form'
import { redirect } from 'next/navigation'
import Image from 'next/image'
const LoginPage = async () => {
  const session = await getServerSession()
  if (session) {
    redirect('/')
  }
  return (
    <div
      className='bg-image m-auto flex items-center justify-center'
      style={{
        backgroundImage: 'url(loginImg.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <div className='bg-white relative z-10 md:m-[50px] xl:m-[100px] w-full md:w-[80%] lg:w-[60%] rounded-lg p-5 md:p-16'>
        <h1 className='text-2xl font-bold text-center'>
          Log into your Onyiisi Account
        </h1>
        <p className='text-lg text-center'>OR</p>
        <div className='text-md flex text-center justify-center items-center'>
          <h2 className=''>Continue with google </h2>
          <Button variant={'ghost'} size={'sm'} className='cursor-pointer'>
            <Image
              src='/google.png'
              alt='google'
              height={20}
              width={20}
              className='cursor-pointer'
            />
          </Button>
        </div>
        <p className='text-sm text-center'>
          Don&apos;t Have an account?{' '}
          <Link href='/sign-up'>
            <span className='text-[rgb(95,40,74)] z-5 underline cursor-pointer'>
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
