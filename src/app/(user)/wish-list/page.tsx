import { Heart, ShoppingCart, Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { cartItems } from '@/constants'
import RelatedProducts from '@/components/RelatedProducts'

const WishListPage = () => {
  return (
    <div>
      <div className='lg:py-20 px-10 xl:px-20'>
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
            <div key={idx} className='flex gap-10 items-center'>
              <div className='relative w-[200px] lg:w-[350px] h-[200px] lg:h-[350px]'>
                <Image
                  src={item.img}
                  alt='Earring'
                  fill
                  className=' border-2 border-gray-600 rounded-md'
                />
              </div>
              <div className='relative flex w-[70%] gap-4 lg:gap-8 flex-col'>
                <div className='flex justify-between pb-20'>
                  <div className=''>
                    <h3 className='text-lg lg:text-2xl text-gray-800 font-semibold capitalize lg:pb-2'>
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
                  <div className='flex justify-between items-center'>
                    <button className='flex gap-1 text-orange-800 font-semibold'>
                      {' '}
                      <ShoppingCart /> Add to Cart
                    </button>
                    <button className='flex gap-1 text-gray-500 text-sm'>
                      {' '}
                      <Trash size={18} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CheckOut  */}
        <div className='flex flex-col items-center'>
          <div className='m-10 rounded-md w-[80%] lg:w-[70%] flex justify-between bg-gray-200 p-4'>
            <p className='uppercase text-gray-500 text-xl'>item subtotal</p>
            <p className='text-xl'>$674</p>
          </div>
          <button className='text-white bg-orange-800 py-2 lg:py-3 w-[50%] lg:w-[30%] rounded-full uppercase font-bold text-md flex items-center justify-center gap-1 lg:gap-2 '>
            add all to cart
          </button>
        </div>
        {/* Related Products  */}
        <RelatedProducts />
      </div>
    </div>
  )
}

export default WishListPage
