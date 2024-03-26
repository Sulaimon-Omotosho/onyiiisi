import { Control } from 'react-hook-form'
import { ImageAsset } from 'sanity'
import { z } from 'zod'

export type ProductProps = {
  _id: string
  _type: string
  _rev: string
  _createdAt: string
  price: number
  rowprice: number
  title: string
  position: string
  ratings: number
  description: string
  brand: string
  slug: {
    current: string
    _type: string
  }
  image: {
    _type: string
    asset: {
      _ref: string
      _type: string
    }
  }
  categoryName: string
  isnew: boolean
  body: any
  quantity: number
}

export type BannerProps = {
  _id: string
  image: ImageAsset
  description: string
  color: string
}

export type GuaranteesProps = {
  _id: string
  image: ImageAsset
  title: string
  description: string
}

export type CategoriesProps = {
  _id: string
  title: string
  description: string
}

export type CustomFormFieldsType = {
  name: string
  control: Control<any>
  type?: string
}

export const SignUpFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email(),
  password: z.string().min(5, 'Password must be at least 5 characters'),
})

export type SignUpFormType = z.infer<typeof SignUpFormSchema>

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, 'Password must be at least 5 characters'),
})

export type LoginFormType = z.infer<typeof LoginFormSchema>
