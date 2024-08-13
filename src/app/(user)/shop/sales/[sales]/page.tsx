'use client'

import fetchMetalPrices from '@/app/api/metalPrices/metalPrices'
import Loading from '@/components/Loading'
import Search from '@/components/Search'
// import { earringsPage } from '@/constants'
import {
  productsByCollection,
  salesProducts,
  urlFor,
} from '@/lib/sanity-client'
import { MetalPrices, ProductProps } from '@/lib/types'
import { addToCart } from '@/redux/cart-slice'
import { addToWishlist } from '@/redux/wishlist-slice'
import { Heart, MoveDown, MoveUp, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { string } from 'zod'

const CollectionsPage = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const saleName = params.sales
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<ProductProps[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(16)

  useEffect(() => {
    if (typeof saleName === 'string') {
      const fetchProducts = async () => {
        try {
          const products = await salesProducts(saleName)
          setProducts(products)
          setLoading(false)
        } catch (err) {
          console.error('Error fetching products:', err)
          setLoading(false)
        }
      }
      fetchProducts()
    }
  }, [saleName])

  // Products Display & Infinte Scrolling

  const handleProductsPerPage = (value: number) => {
    setProductsPerPage(value)
    setCurrentPage(1)
  }

  const handleScroll = () => {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const scrollTop =
      window.scrollY || window.pageYOffset || document.body.scrollTop
    let triggerHeight = 200

    if (window.innerWidth <= 768) {
      triggerHeight = 600
    }

    const isCloseToBottom =
      scrollTop + windowHeight >= documentHeight - triggerHeight

    if (isCloseToBottom) {
      loadMoreProducts()
    }
  }

  const loadMoreProducts = () => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [currentPage])

  const indexOfLastProduct = currentPage * productsPerPage
  const currentProducts = products.slice(0, indexOfLastProduct)

  // Metal Prices
  // const [metalPrices, setMetalPrices] = useState<MetalPrices | null>(null);

  // useEffect(() => {
  //   const fetchPrices = async () => {
  //     try {
  //       const data = await fetchMetalPrices();
  //       setMetalPrices(data);
  //     } catch (error) {}
  //   };
  //   fetchPrices();
  // }, []);

  // const calcProductPrice = (product: any) => {
  //   if (metalPrices && metalPrices?.rates?.USD) {
  //     const ounces = parseFloat(product.gram) / 31.1035;
  //     const newPrice = metalPrices?.rates?.USD * ounces;
  //     const previousPrice = parseFloat(product.price);

  //     let priceChange = "same";
  //     if (newPrice > previousPrice) {
  //       priceChange = "up";
  //     } else if (newPrice < previousPrice) {
  //       priceChange = "down";
  //     }

  //     return {
  //       price: newPrice.toFixed(2),
  //       change: priceChange,
  //     };
  //   } else {
  //     return {
  //       price: product.price,
  //       change: "same",
  //     };
  //   }
  // };

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
            {saleName}
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
              <p className='font-semibold'> {saleName}</p>
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
                <Search placeholder={`Search ${saleName}...`} />
              </div>
              <div className=''>Popularity</div>
            </div>
          </div>

          {/* Products  */}
          <div className='flex flex-wrap flex-grow gap-10 lg:gap-14 my-10 mx-5 justify-center'>
            {loading ? (
              <Loading />
            ) : (
              currentProducts?.map((product) => (
                <div
                  key={product?._id}
                  className=' bg-[rgb(230,230,230)] rounded-md text-center h-[350px] md:h-[220px] lg:h-[280px] 2xl:h-[300px] w-[320px] md:w-[190px] lg:w-[250px] 2xl:w-[280px] flex-grow'
                >
                  <div className='h-[80%] border-b-[1px] flex items-center justify-center border-gray-400 relative overflow-hidden'>
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
                      <div
                        onClick={() => {
                          dispatch(addToWishlist(product))
                          toast.success(
                            `${product?.title.substring(
                              0,
                              12
                            )}... added to wishlist`
                          )
                        }}
                        className='w-10 h-10 bg-[rgb(95,40,74)] rounded-md text-white flex justify-center items-center hover:scale-125 transition-all duration-300'
                      >
                        {' '}
                        <Heart />{' '}
                      </div>
                      <div
                        onClick={() => {
                          dispatch(addToCart(product))
                          toast.success(
                            `${product?.title.substring(0, 12)}... added to cart
                      `
                          )
                        }}
                        className='w-10 h-10 bg-[rgb(95,40,74)] rounded-md text-white flex justify-center items-center hover:scale-125 transition-all duration-300'
                      >
                        {' '}
                        <Plus />{' '}
                      </div>
                    </div>
                  </div>

                  <Link href={`/product/${product._id}`}>
                    <div className='pt-1'>
                      <h3 className='font-semibold text-sm'>{product.title}</h3>
                      <p className=' font-thin text-xs text-gray-600'>
                        {product?.gram} grams
                      </p>
                    </div>
                  </Link>
                  <div className='flex text-green-700 justify-center font-bold lg:text-xl items-center md:m-3 lg:m-5 xl:m-7'>
                    <MoveUp className='text-green-700 w-5 h-5' />
                    {product.price}
                  </div>
                </div>
              ))
            )}
          </div>
          <div className='uppercase text-gray-500 text-lg text-center'>
            showing{' '}
            <span className='text-gray-800'>
              1-{Math.min(currentProducts.length, products.length)}
            </span>{' '}
            of <span className='text-gray-800'> {products.length}</span>{' '}
            products
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollectionsPage
