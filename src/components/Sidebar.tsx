import { Heart, Minus, NotebookText, Plus, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'

const Sidebar = ({ closeSidebar }: { closeSidebar: () => void }) => {
  const { data: session } = useSession()
  const [shop, setShop] = useState(false)
  // const [sales, setSales] = useState(false)

  const handleShop = () => {
    setShop(!shop)
  }

  // const handlesSales = () => {
  //   setSales(!sales)
  // }

  return (
    <div
      // onClick={closeSidebar}
      className='fixed md:hidden h-[100vh] flex flex-col items-center w-full bg-[rgb(95,40,74)] text-2xl text-white uppercase font-semibold  '
    >
      {session && (
        <Link
          href='/profile'
          onClick={closeSidebar}
          className='absolute top-6 text-lg capitalize'
        >
          Hi, {session?.user?.name}
        </Link>
      )}
      <div className='flex flex-col mt-20 items-left gap-10 w-fit '>
        <div className=''>
          <div
            onClick={handleShop}
            // href='/shop'
            className='flex gap-2 items-center text-2xl'
          >
            {shop ? (
              <Minus className='h-8 w-8' />
            ) : (
              <Plus className='h-8 w-8' />
            )}
            shop
          </div>
          <div
            className={` ${
              shop
                ? 'capitalize pl-10 flex flex-col text-md font-thin'
                : 'hidden'
            }`}
          >
            <Link
              href='/shop'
              onClick={() => {
                closeSidebar()
                handleShop()
              }}
            >
              categories
            </Link>
            <Link
              href='/shop'
              onClick={() => {
                closeSidebar()
                handleShop()
              }}
            >
              specials
            </Link>
            <Link
              href='/shop'
              onClick={() => {
                closeSidebar()
                handleShop()
              }}
            >
              collections
            </Link>
          </div>
        </div>

        <Link
          onClick={closeSidebar}
          href='/about'
          className='flex gap-2 items-center hover:underline underline-offset-2 text-2xl pl-10'
        >
          about
        </Link>
        <div className=''>
          <Link
            href='/blog'
            onClick={closeSidebar}
            // href='/sales'
            className='flex gap-2 items-center hover:underline underline-offset-2 text-2xl pl-10'
          >
            blog
          </Link>
          {/* <div
            className={`${sales ? 'capitalize pl-10 flex flex-col' : 'hidden'}`}
          >
            <Link
              href='/sales'
              onClick={() => {
                closeSidebar()
                handlesSales()
              }}
            >
              Header
            </Link>
            <Link
              href='/sales'
              onClick={() => {
                closeSidebar()
                handlesSales()
              }}
            >
              Header
            </Link>
            <Link
              href='/sales'
              onClick={() => {
                closeSidebar()
                handlesSales()
              }}
            >
              Header
            </Link>
          </div> */}
        </div>
        <Link
          href='/cart'
          onClick={closeSidebar}
          className='relative flex gap-2'
        >
          <ShoppingCart className='h-8 w-8' />
          cart
          <p className='absolute left-5 top-[-5px] bg-[rgb(95,40,74)] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold'>
            {2}
          </p>
        </Link>
        <Link
          onClick={closeSidebar}
          href='/wish-list'
          className='relative flex gap-2'
        >
          <Heart className='h-8 w-8' />
          wishlist
          <p className='absolute left-5 top-[-5px] bg-[rgb(95,40,74)] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold'>
            {9}
          </p>
        </Link>
        {session && (
          <Link
            href='/history'
            onClick={closeSidebar}
            className='relative flex gap-2 items-center'
          >
            <NotebookText className='cursor-pointer' />
            orders
            <p className='absolute left-5 top-[-5px] bg-[rgb(95,40,74)] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold'>
              {1}
            </p>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Sidebar
