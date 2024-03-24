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
        <FormItem>
          <FormLabel className='capitalize'>{name}</FormLabel>
          <FormControl>
            <Input
              {...field}
              className='border-[1px] border-gray-300 rounded-sm p-3 w-[500px]'
              type={type}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
