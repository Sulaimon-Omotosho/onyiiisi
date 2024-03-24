'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { LoaderIcon } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { Form } from '@/components/ui/form'
import { LoginFormSchema, type LoginFormType } from '@/lib/types'
import { CustomFormFields } from '@/components/forms/custom-form-field'
import Link from 'next/link'
import { Button } from '../ui/button'
export default function LoginForm() {
  const { push, refresh } = useRouter()
  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormType) => {
    try {
      const response = await signIn('credentials', {
        email: data?.email,
        password: data?.password,
        callbackUrl: '/',
        redirect: false,
      })
      if (!response?.ok) {
        toast.error('Invalid email or password.')
        return
      }
 

      toast.success('Successfully Signed In')
      push('/')
      refresh()
    } catch (error: any) {
      toast.error(error?.message)
    }
  }
  return (
    <Form {...form}>
      <form
        className='flex flex-col justify-center pt-8 gap-6'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <CustomFormFields name='email' control={form.control} />
        <CustomFormFields
          name='password'
          control={form.control}
          type='password'
        />
        <div className='flex justify-between py-4'>
          <div className=''>
            <input type='checkbox' id='remember' className=' rounded-full' />{' '}
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
            Login
          </Button>
        </div>
      </form>
    </Form>
  )
}
