'use client'

import { ShoppingCart, Heart, UserRound, Menu, X, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Noto_Sans_Georgian } from 'next/font/google'
import DropdownSales from './dropdown/DropdownSales'
import DropdownShop from './dropdown/DropdownShop'
import Sidebar from './Sidebar'
import { signOut, useSession } from 'next-auth/react'
import { Button } from './ui/button'

const georgia = Noto_Sans_Georgian({ subsets: ['latin'] })

export default function Navbar() {
  const { data: session } = useSession()
  const [shopDropDown, setShopDropDown] = useState(false)
  const [salesDropDown, setSalesDropDown] = useState(false)

  // console.log(session)

  const toggleShopDropdown = () => {
    setShopDropDown(!shopDropDown)
    setSalesDropDown(false)
  }
  const toggleSalesDropdown = () => {
    setSalesDropDown(!salesDropDown)
    setShopDropDown(false)
  }

  // Sidebar function
  const [sidebar, setSidebar] = useState(false)

  const handleSidebar = () => {
    setSidebar(!sidebar)
  }

  return (
    <header className='relative z-10'>
      <div className='px-[40px] lg:px-[60px] h-20 border-b-[1px] border-black flex justify-between items-center z-20 lg:fixed w-full bg-white'>
        {/* Links  */}
        <div className='hidden md:flex gap-5 lg:gap-10 flex-1 capitalize'>
          <div onMouseEnter={toggleShopDropdown} className=''>
            <Link
              href={'/shop'}
              // onClick={toggleShopDropdown}
              className='cursor-pointer'
            >
              shop
            </Link>
          </div>
          <Link href={'/about'} className='cursor-pointer'>
            About Us
          </Link>
          <Link
            href={'/sales'}
            className='cursor-pointer'
            onMouseEnter={toggleSalesDropdown}
            // onClick={toggleSalesDropdown}
          >
            sales
          </Link>
          {session && <p className=''>Hi {session?.user?.name}</p>}
        </div>

        {/* Side Bar  */}
        <div onClick={handleSidebar} className='md:hidden flex-1'>
          {sidebar ? (
            <X className='w-10 h-10' />
          ) : (
            <Menu className='w-10 h-10' />
          )}
        </div>

        {/* Logo  */}
        <div className='flex-1'>
          <Link href='/'>
            <h1
              style={{ fontStyle: 'italic' }}
              className={`font-bold text-2xl italic text-center ${georgia.className}`}
            >
              Onyiisi
            </h1>
          </Link>
        </div>

        {/* Navbar Icons  */}
        <div className='flex-1 flex gap-5 lg:scale-100 justify-end items-center'>
          <Link href={'/studio'} target='_blank'>
            Studio
          </Link>

          {session && (
            <Link href={'/orders'} target='_blank'>
              Orders
            </Link>
          )}
          <div className='relative'>
            <Link href='/cart'>
              <ShoppingCart className='cursor-pointer hidden md:block' />
            </Link>
            <p className='absolute top-[-4px] right-[-6px] bg-gray-800 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold'>
              {2}
            </p>
          </div>
          <div className='relative'>
            <Link href='/wish-list'>
              <Heart className='cursor-pointer hidden md:block' />
            </Link>
            <p className='absolute top-[-4px] right-[-6px] bg-gray-800 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold'>
              {2}
            </p>
          </div>
          {session ? (
            <Button onClick={() => signOut()} variant={'ghost'}>
              <LogOut className='cursor-pointer' />
            </Button>
          ) : (
            <Link href='/login'>
              <UserRound className='cursor-pointer' />
            </Link>
          )}
        </div>
      </div>

      {/* Dropdown */}
      {/* {shopDropDown ? <DropdownShop /> : ''}
      {salesDropDown ? <DropdownSales /> : ''} */}
      <div
        onMouseLeave={toggleShopDropdown}
        className={`${
          shopDropDown
            ? 'absolute top-20 left-0 right-0 opacity-100'
            : ' hidden opacity-0'
        } transition-opacity ease-in-out duration-300 `}
      >
        <DropdownShop />
      </div>
      <div
        onMouseLeave={toggleSalesDropdown}
        className={`${
          salesDropDown
            ? 'absolute top-20 left-0 right-0 opacity-100'
            : ' hidden opacity-0'
        } transition-top ease-in-out duration-300   `}
      >
        <DropdownSales />
      </div>
      <div
        className={`absolute w-full shadow-lg shadow-slate-300 transition-all duration-500 z-10 ${
          sidebar ? 'top-20' : 'top-[-80px] shadow-none'
        }`}
      >
        <Sidebar />
      </div>
    </header>
  )
}
