'use client'

import Search from '@/components/Search'
// import { earringsPage } from '@/constants'
import { productsByCategory, urlFor } from '@/lib/sanity-client'
import { ProductProps } from '@/lib/types'
import { Heart, MoveUp, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { string } from 'zod'

const CategoryPage = () => {
  const params = useParams()
  const categoryName = params.category

  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<ProductProps[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(16)

  useEffect(() => {
    if (typeof categoryName === 'string') {
      const fetchProducts = async () => {
        try {
          const products = await productsByCategory(categoryName)
          setProducts(products)
          setLoading(false)
        } catch (err) {
          console.error('Error fetching products:', err)
          setLoading(false)
        }
      }
      fetchProducts()
    }
  }, [categoryName])

  const handleProductsPerPage = (value: number) => {
    setProductsPerPage(value)
    setCurrentPage(1)
  }

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )

  return (
    <div className='py-0 lg:py-20'>
      <div className=''>
        {/* Main Img */}
        <div className='relative w-full h-[400px] lg:h-[580px] xl:h-[790px]'>
          <Image
            src='/Earrings Page.jpg'
            alt='Earrings'
            fill
            className='object-cover'
          />
          <h2 className=' absolute top-10 left-10 uppercase text-3xl font-thin text-white'>
            {categoryName}
          </h2>
        </div>

        <div className='px-5 lg:px-20 py-10'>
          {/* Navigation */}
          <div className='flex flex-col gap-5 md:flex-row md:gap-0 md:px-10 justify-between items-center'>
            <div className='flex gap-1'>
              <Link className='text-gray-400 hover:text-gray-800' href='/'>
                Home |{' '}
              </Link>
              <Link className='text-gray-400 hover:text-gray-800' href='/shop'>
                Shop |{' '}
              </Link>
              <p className='font-semibold'>{categoryName}</p>
            </div>
            <div className='hidden md:flex'>
              <p className='text-gray-400'>
                View:{' '}
                <span
                  onClick={() => setProductsPerPage(16)}
                  className={`hover:underline underline-offset-2 hover:text-gray-800 cursor-pointer ${
                    productsPerPage === 16
                      ? 'text-gray-800 underline underline-offset-2'
                      : ' text-gray-500'
                  }`}
                >
                  16
                </span>{' '}
                /{' '}
                <span
                  onClick={() => setProductsPerPage(32)}
                  className={`hover:underline hover:text-gray-800 underline-offset-2 cursor-pointer ${
                    productsPerPage === 32
                      ? 'text-gray-800 underline underline-offset-2'
                      : ' text-gray-500'
                  }`}
                >
                  32
                </span>{' '}
                /{' '}
                <span
                  onClick={() => setProductsPerPage(products.length)}
                  className={`hover:underline hover:text-gray-800 underline-offset-2 cursor-pointer ${
                    productsPerPage === products.length
                      ? 'text-gray-800 underline underline-offset-2'
                      : ' text-gray-500'
                  }`}
                >
                  ALL
                </span>{' '}
              </p>
            </div>
            <div className='flex gap-5 items-center justify-end'>
              <div className='flex gap-1'>
                <Search placeholder={`Search ${categoryName}...`} />
              </div>
              <div className=''>Popularity</div>
            </div>
          </div>

          {/* Products  */}
          <div className='flex flex-wrap flex-grow gap-10 lg:gap-14 my-10 mx-5 justify-center'>
            {loading ? (
              <p>Loading...</p>
            ) : (
              currentProducts?.map((product) => (
                <div
                  key={product?._id}
                  className=' bg-[rgb(230,230,230)] rounded-md text-center h-[350px] md:h-[220px] lg:h-[280px] 2xl:h-[300px] w-[320px] md:w-[190px] lg:w-[250px] 2xl:w-[280px] flex-grow'
                >
                  <Link href={`/product/${product._id}`}>
                    <div className='h-[80%] w-full border-b-[1px] flex items-center justify-center border-gray-400 overflow-hidden relative'>
                      {product.placeholder && (
                        <Image
                          src={urlFor(product.placeholder).url()}
                          alt={product.title}
                          fill
                          className=' object-cover'
                          // height={150}
                          // width={150}
                        />
                      )}
                      <div className='absolute w-full h-full flex justify-between p-4 bottom-14 hover:bottom-0 transition-all ease-in-out duration-3000'>
                        <div className='w-10 h-10 bg-[rgb(95,40,74)] rounded-md text-white flex justify-center items-center hover:scale-125 transition-all duration-300'>
                          {' '}
                          <Heart />{' '}
                        </div>
                        <div className='w-10 h-10 bg-[rgb(95,40,74)] rounded-md text-white flex justify-center items-center hover:scale-125 transition-all duration-300'>
                          {' '}
                          <Plus />{' '}
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className='pt-1'>
                    <h3 className='font-semibold text-sm'>{product.title}</h3>
                    <p className=' font-thin text-xs text-gray-600'>
                      {product?.gram} grams
                    </p>
                  </div>
                  <div className='text-green-800 flex justify-center font-bold lg:text-xl items-center md:m-3 lg:m-5 xl:m-7'>
                    <MoveUp className='h-3' />${product.price}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className='uppercase text-gray-500 text-lg text-center'>
            showing{' '}
            <span className='text-gray-800'>
              {' '}
              {indexOfFirstProduct + 1}-{indexOfLastProduct}
            </span>{' '}
            of <span className='text-gray-800'> {products.length}</span>{' '}
            products
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
