'use client'
import { CustomFormFields } from '@/components/forms/custom-form-field'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { SignUpFormSchema, type SignUpFormType } from '@/lib/types'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import {useRouter } from 'next/navigation'
import { LoaderIcon } from 'lucide-react'

const SignUpPage = () => {
  const { push } = useRouter()
  const form = useForm<SignUpFormType>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: SignUpFormType) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })
      if (response.ok) {
        toast.success('User registration successful')
        push('/login')
      }
    } catch (error: any) {
      toast.error(error?.message)
    }
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
      <div className='bg-white m-[100px] rounded-lg p-16'>
        <h1 className='text-2xl font-bold text-center'>Sign up</h1>
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
          Have an account?{' '}
          <span className='text-orange-800 underline'>
            <Link href='/sign-up'>Login</Link>
          </span>
        </p>

        <Form {...form}>
          <form
            className='flex flex-col justify-center pt-8 gap-6'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <CustomFormFields name='name' control={form.control} />
            <CustomFormFields name='email' control={form.control} />
            <CustomFormFields
              name='password'
              control={form.control}
              type='password'
            />
            <div className='flex justify-between py-4'>
              <div className=''>
                <input
                  type='checkbox'
                  id='remember'
                  className=' rounded-full'
                />{' '}
                <label htmlFor='remember' className='text-sm text-gray-500'>
                  Remember me
                </label>
              </div>
              <Link href='/login' className='text-sm text-blue-500 capitalize'>
                forgot password?
              </Link>
            </div>
            <div className='flex justify-center'>
              <Button
                className='text-white bg-orange-800 py-1 lg:py-2 w-[50%] rounded-full uppercase font-thin justify-center gap-1 lg:gap-2 '
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <LoaderIcon className='animate-spin h-4 w-4 mr-2' />
                )}
                Sign Up
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default SignUpPage
