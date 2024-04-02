'use client'

import {
  ShoppingCart,
  Heart,
  UserRound,
  Menu,
  X,
  LogOut,
  NotebookText,
  Dot,
} from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Noto_Sans_Georgian } from 'next/font/google'
import DropdownSales from './dropdown/DropdownSales'
import DropdownShop from './dropdown/DropdownShop'
import Sidebar from './Sidebar'
import { signOut, useSession } from 'next-auth/react'
import { Button } from './ui/button'
import { isAdmin } from '@/lib/use-check'
import { usePathname } from 'next/navigation'

const georgia = Noto_Sans_Georgian({ subsets: ['latin'] })

export default function Navbar() {
  const { data: session } = useSession()

  const [shopDropDown, setShopDropDown] = useState(false)
  // const [salesDropDown, setSalesDropDown] = useState(false)

  const toggleShopDropdown = () => {
    setShopDropDown(!shopDropDown)
    // setSalesDropDown(false)
  }
  // const toggleSalesDropdown = () => {
  //   setSalesDropDown(!salesDropDown)
  //   setShopDropDown(false)
  // }
  useEffect(() => {
    const checkAdmin = async () => {
      const admin = await isAdmin()
      setIsAdminUser(admin)
    }

    checkAdmin()
  }, [])

  // Sidebar function
  const [sidebar, setSidebar] = useState(false)
  const [isAdminUser, setIsAdminUser] = useState<boolean>(false)

  const handleSidebar = () => {
    setSidebar(!sidebar)
  }

  const closeSidebar = () => {
    setSidebar(false)
  }

  // Pathname Active

  const pathname = usePathname()
  function pathMatch(route: string) {
    if (route === pathname) {
      return true
    }
  }
  console.log(pathMatch)

  return (
    <header className='relative z-10 bg-[rgb(56,22,10)] text-slate-300'>
      {' '}
      <div
        className={`absolute w-full  transition-all duration-500 h-[100vh] z-10 ${
          sidebar ? 'top-0 left-0' : 'top-0 left-[-500px] shadow-none'
        }`}
      >
        <Sidebar closeSidebar={closeSidebar} />
      </div>
      <div className='px-[40px] lg:px-[60px] h-20 border-b-[1px] border-slate-500 flex justify-between items-center z-20 lg:fixed w-full bg-[rgb(56,22,10)]'>
        {/* Links  */}
        <div className='hidden md:flex gap-5 lg:gap-10 flex-1 uppercase'>
          <div
            onMouseEnter={toggleShopDropdown}
            className='flex items-center justify-center'
          >
            <Link
              href='/shop'
              // onClick={toggleShopDropdown}
              className={`cursor-pointer items-center flex justify-center hover:text-orange-500 ease-in-out duration-200 ${
                pathMatch('/shop') && ' text-orange-500 relative'
              }`}
            >
              shop
              <Dot
                className={` ${
                  pathMatch('/shop') ? 'h-10 w-10 absolute left-7' : 'hidden'
                }`}
              />
            </Link>
          </div>
          <Link
            href='/about'
            className={`cursor-pointer items-center justify-center flex hover:text-orange-500 ease-in-out duration-200 ${
              pathMatch('/about') && ' text-orange-500 relative'
            }`}
          >
            About
            <Dot
              className={` ${
                pathMatch('/about') ? 'h-10 w-10 absolute left-10' : 'hidden'
              }`}
            />
          </Link>
          <Link
            href={'/blog'}
            className={`cursor-pointer items-center justify-center flex hover:text-orange-500 ease-in-out duration-200 ${
              pathMatch('/blog') && ' text-orange-500 relative'
            }`}
          >
            blog
            <Dot
              className={` ${
                pathMatch('/blog') ? 'h-10 w-10 absolute left-7' : 'hidden'
              }`}
            />
          </Link>
          {session && (
            <p className='hidden lg:inline'>Hi, {session?.user?.name}</p>
          )}
        </div>

        {/* Side Bar  */}
        <div onClick={handleSidebar} className='md:hidden flex-1 z-20'>
          {sidebar ? (
            <X className='w-10 h-10 text-white' />
          ) : (
            <Menu className='w-10 h-10' />
          )}
        </div>

        {/* Logo  */}
        <div className='flex-1'>
          <Link href='/'>
            <h1
              style={{ fontStyle: 'italic' }}
              className={`font-bold text-2xl italic text-white text-center ${georgia.className}`}
            >
              Onyiisi
            </h1>
          </Link>
        </div>

        {/* Navbar Icons  */}
        <div className='flex-1 flex gap-5 lg:scale-100 justify-end items-center'>
          {isAdminUser && (
            <Link href={'/studio'} target='_blank' className='hidden md:inline'>
              Studio
            </Link>
          )}

          {session && (
            <Link href='/history' className='relative'>
              <NotebookText className='cursor-pointer hidden md:inline ' />
              <p className='hidden absolute top-[-4px] right-[-6px] bg-[rgb(56,22,10)] text-white text-xs w-4 h-4 rounded-full md:flex items-center justify-center font-semibold'>
                {1}
              </p>
            </Link>
          )}
          <div className='relative'>
            <Link href='/cart'>
              <ShoppingCart className='cursor-pointer hidden md:block' />
            </Link>
            <p className='hidden absolute top-[-4px] right-[-6px] bg-[rgb(56,22,10)] text-white text-xs w-4 h-4 rounded-full md:flex items-center justify-center font-semibold'>
              {2}
            </p>
          </div>
          <div className='relative'>
            <Link href='/wish-list'>
              <Heart
                className='cursor-pointer hidden md:block'
                // style={{ fill: 'red' }}
              />
            </Link>
            <p className='hidden absolute top-[-4px] right-[-6px] bg-[rgb(56,22,10)] text-white text-xs w-4 h-4 rounded-full md:flex items-center justify-center font-semibold'>
              {9}
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
      {/* <div
        onMouseLeave={toggleSalesDropdown}
        className={`${
          salesDropDown
            ? 'absolute top-20 left-0 right-0 opacity-100'
            : ' hidden opacity-0'
        } transition-top ease-in-out duration-300   `}
      >
        <DropdownSales />
      </div> */}
    </header>
  )
}
