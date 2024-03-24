import { Heart, ShoppingCart, Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { cartItems } from '@/constants'
import RelatedProducts from '@/components/RelatedProducts'

const WishListPage = () => {
  return (
    <div>
      <div className='lg:py-20 px-3 md:px-10 xl:px-20'>
        {/* Navigation */}
        <div className='flex py-10 justify-between items-center'>
          <div className='flex gap-1'>
            <Link className='text-gray-400 hover:text-gray-800' href='/'>
              Home |{' '}
            </Link>
            <Link className='text-gray-400 hover:text-gray-800' href='/shop'>
              Shop |{' '}
            </Link>
            <Link
              className='text-gray-400 hover:text-gray-800'
              href='/shop/earrings'
            >
              Earrings |{' '}
            </Link>
            <Link
              className='text-gray-400 hover:text-gray-800'
              href='/product/test123'
            >
              Details |{' '}
            </Link>
            <p className='font-semibold'> Wishlist</p>
          </div>
        </div>

        {/* Items  */}
        <div className='flex-col flex gap-10'>
          {cartItems.map((item, idx) => (
            <div key={idx} className='flex gap-5 md:gap-10 items-center'>
              <div className='relative w-[120px] md:w-[200px] lg:w-[350px] h-[120px] md:h-[200px] lg:h-[350px]'>
                <Image
                  src={item.img}
                  alt='Earring'
                  fill
                  className='object-cover border-2 border-gray-600 rounded-md'
                />
              </div>
              <div className='relative flex w-[70%] gap-4 lg:gap-8 flex-col'>
                <div className='flex justify-between pb-10 md:pb-20'>
                  <div className=''>
                    <h3 className='md:text-lg lg:text-2xl text-gray-800 font-semibold capitalize lg:pb-2'>
                      {item.title} <span>{item.desc}</span>
                    </h3>
                    <p className='capitalize text-sm lg:text-lg text-gray-500'>
                      {item.grade} | {item.size} grams
                    </p>
                  </div>
                  <p className='text-2xl font-semibold text-orange-800'>
                    ${item.price}
                  </p>
                </div>
                <div className=''>
                  <hr className='border-gray-700 mb-3' />
                  <div className='flex justify-between items-center px-5'>
                    <button className='flex gap-1 text-[rgb(95,40,74)] font-semibold'>
                      {' '}
                      <ShoppingCart />{' '}
                      <p className='hidden md:inline'>Add to Cart</p>
                    </button>
                    <button className='flex gap-1 text-gray-500 text-sm'>
                      {' '}
                      <Trash size={18} />{' '}
                      <p className='hidden md:inline'>Remove</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CheckOut  */}
        <div className='flex flex-col items-center'>
          <div className='m-10 rounded-md w-[95%] md:w-[80%] lg:w-[70%] flex justify-between bg-gray-200 p-4'>
            <p className='uppercase text-gray-500 text-xl'>item subtotal</p>
            <p className='text-xl'>$674</p>
          </div>
          <button className='text-white bg-[rgb(95,40,74)] py-2 lg:py-3 w-[50%] lg:w-[30%] rounded-full uppercase font-bold text-md flex items-center justify-center gap-1 lg:gap-2 '>
            add all to cart
          </button>
        </div>
      </div>
      {/* Related Products  */}
      <RelatedProducts />
    </div>
  )
}

export default WishListPage
