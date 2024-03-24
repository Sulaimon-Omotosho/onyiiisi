import { Heart, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

const Sidebar = () => {
  return (
    <div className=' md:hidden h-20 flex flex-col items-center w-full bg-white  text-center uppercase font-semibold  '>
      <div className='flex w-full justify-around items-center h-[65%] '>
        <Link href='/shop' className='hover:underline underline-offset-2'>
          shop
        </Link>
        <Link href='/about' className='hover:underline underline-offset-2'>
          about
        </Link>
        <Link href='/sales' className='hover:underline underline-offset-2'>
          sales
        </Link>
      </div>

      {/* Navbar Icons  */}
      <div className='flex-1 flex gap-5 h-[35%] w-full items-center justify-end px-2 '>
        <Link href='/cart'>
          <ShoppingCart className='cursor-pointer h-5 w-5' />
        </Link>
        <Link href='/wish-list'>
          <Heart className='cursor-pointer h-5 w-5' />
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
