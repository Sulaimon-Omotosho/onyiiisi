import Image from 'next/image'
import Link from 'next/link'
import { unknownDropdown } from '@/constants'

export default function DropdownSales() {
  return (
    <div className=''>
      <div className='py-[50px] px-9 absolute lg:fixed z-20 w-full bg-[rgb(71,28,13)]'>
        <div className='flex-1 flex items-center gap-6 lg:gap-10 '>
          <div className='w-[150px] lg:w-[202px] h-[108px] lg:h-[144px] relative rounded-md mr-16 overflow-hidden object-cover'>
            <Image
              src='/sales.png'
              fill
              // objectFit='cover'
              alt='sales image'
            />
          </div>
          <div className='flex-4 flex gap-[60px] lg:gap-[120px]'>
            <div className=''>
              <h1 className='capitalize underline font-medium text-center pb-3'>
                dropdown header
              </h1>
              <ul className='text-center uppercase flex flex-col gap-2'>
                {unknownDropdown.map((drop, idx) => (
                  <li key={idx}>
                    <Link href={drop.href}>{drop.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className=''>
              <h1 className='capitalize font-medium underline text-center pb-3'>
                dropdown header
              </h1>
              <ul className='text-center uppercase flex flex-col gap-2'>
                {unknownDropdown.map((drop, idx) => (
                  <li key={idx}>
                    <Link href={drop.href}>{drop.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className=''>
              <h1 className='capitalize font-medium underline text-center pb-3'>
                dropdown header
              </h1>
              <ul className='text-center uppercase flex flex-col gap-2'>
                {unknownDropdown.map((drop, idx) => (
                  <li key={idx}>
                    <Link href={drop.href}>{drop.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
