import { CustomFormFieldsType } from '@/lib/types'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'

export const CustomFormFields = ({
  name,
  control,
  type,
}: CustomFormFieldsType) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='w-full relative'>
          <FormLabel className='capitalize font-semibold text-sm absolute bg-white left-6 top-0 px-2 rounded-full'>
            {name}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              className='border-[1px] border-gray-300 rounded-sm p-3'
              type={type}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
