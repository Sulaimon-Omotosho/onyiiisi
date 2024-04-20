import ContactForm from '@/components/ContactForm'
import SocialMedia from '@/components/SocialMedia'
import { blogData } from '@/constants'
import { MoveDownRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const BlogPage = () => {
  return (
    <div className='lg:py-20'>
      {/* Blog Hero  */}
      <div className='relative flex items-center justify-center w-full h-[400px] lg:h-[580px] xl:h-[790px]'>
        <Image
          src='/blog hero.jpeg'
          alt='Blog Hero'
          fill
          className=' object-cover brightness-75'
        />
        <div className='flex flex-col items-center gap-3 md:gap-5 absolute xl:w-[70%]'>
          <h1 className='text-xl md:text-3xl xl:text-6xl  text-white font-bold text-center'>
            The Art of Timeless Elegance: Exploring Onnyiisi&apos;s Luxury
            Jewelry Collection
          </h1>
          <button className='text-white bg-[rgb(95,40,74)] py-2 lg:py-3 w-[120px] lg:w-[150px] rounded-full uppercase font-thin text-xs flex items-center justify-center gap-1 lg:gap-2 '>
            read article
            <span>
              <MoveDownRight className='w-4 lg:w-5 h-4 lg:h-5 pt-1' />
            </span>
          </button>
        </div>
      </div>

      {/* Blog Intro  */}
      <div className='bg-[rgb(56,22,10)] w-full flex flex-col-reverse md:flex-row items-center justify-center'>
        <div className='text-white flex items-center justify-center w-[90%] md:w-1/2'>
          <div className='md:w-[85%] lg:w-[70%] py-4'>
            <h2 className='text-xl md:text-2xl lg:text-3xl font-bold '>
              The Essence of Luxury: Unveiling Onnyiisi&apos;s Signature
              Collections
            </h2>
            <p className='text-xs py-2 md:py-4'>
              Step into the world of luxury and sophistication with
              Onnyiisi&apos;s signature collections. In this blog, we invite you
              to explore the epitome of elegance through our meticulously
              curated selection of jewelry pieces. From exquisite diamonds to
              vibrant gemstones, each collection embodies the essence of luxury
              craftsmanship and timeless beauty.
            </p>
            <p className='text-xs pt-4 md:pt-10'>
              From rich sapphires to radiant emeralds, each gemstone tells a
              story of beauty and grace.
            </p>
          </div>
        </div>
        <div className='relative my-3 md:my-10 h-[380px] lg:h-[430px] w-[80%] md:w-1/2'>
          <Image src='Birds.svg' alt='Birds' fill className='object-contain' />
        </div>
      </div>

      {/* Articles  */}
      <div className='py-10 px-5 md:p-10 lg:p-20'>
        <div className='flex justify-between'>
          <h2 className='capitalize text-xl md:text-3xl font-extrabold'>
            featured articles
          </h2>
          <button className='text-white bg-[rgb(95,40,74)] py-2 lg:py-3 w-[120px] lg:w-[150px] rounded-full uppercase font-thin text-xs flex items-center justify-center gap-1 lg:gap-2 '>
            see more
            <span>
              <MoveDownRight className='w-4 lg:w-5 h-4 lg:h-5 pt-1' />
            </span>
          </button>
        </div>
        <hr className=' border-2 border-black my-2 md:my-4' />
        <div className='w-full h-[220px] md:h-[280px] xl:h-[380px] relative mt-5 md:mt-12 lg:mt-16'>
          <Image
            src='/colored.jpeg'
            alt='Colored Feature'
            fill
            className='object-cover'
          />
        </div>
        {blogData.map((data, idx) => (
          <div key={idx} className='py-3 md:py-5 lg:py-8'>
            <div className='py-3 md:py-5'>
              <div className='flex flex-col gap-5 md:gap-0 md:flex-row justify-between items-center'>
                <div className='md:w-1/3'>
                  <h3 className='text-xl lg:text-3xl font-bold'>
                    {data.title}
                  </h3>
                  <p className='text-xs font-mono pt-1 md:pt-5'>{data.date}</p>
                </div>
                <div className='md:w-1/3 flex justify-end items-center '>
                  <p className='text-sm  lg:text-md '>{data.blog}</p>
                </div>
                <div className='md:w-1/3 flex justify-end'>
                  <button className='text-[rgb(95,40,74)] border-2 border-[rgb(95,40,74)] py-2 lg:py-3 w-[120px] lg:w-[150px] rounded-full uppercase font-thin text-xs flex items-center justify-center gap-1 lg:gap-2 '>
                    read article
                    <span>
                      <MoveDownRight className='w-4 lg:w-5 h-4 lg:h-5 pt-1' />
                    </span>
                  </button>
                </div>
              </div>
              <hr className='border-[1px] border-slate-500 mt-8 lg:mt-10' />
            </div>
          </div>
        ))}
      </div>

      {/* Contact Us  */}
      <div className='flex flex-col md:flex-row mb-10'>
        <div className='w-full md:w-1/2 h-[400px] md:h-[700px] relative'>
          {' '}
          <Image
            src='/contact blog.jpeg'
            alt='Contact Us'
            fill
            className='object-cover'
          />{' '}
        </div>
        <div className='md:w-1/2 bg-[rgb(217,199,211)]'>
          <div className=' flex w-full h-full justify-center items-center'>
            <div className='w-[95%] md:w-[80%] xl:w-[60%] py-5 md:py-0 '>
              <h2 className='capitalize text-2xl font-bold pb-3 lg:pb-5'>
                contact us
              </h2>
              <p className=' font-semibold capitalize'>onyiisi&apos;s info</p>
              <hr className='border-[1px] border-black w-[70%] my-2 lg:my-3' />
              <p className='font-semibold pb-1'>Email :- info@oyiinsi.com</p>
              <p className='font-semibold pb-1'>Phone :- +1 (555) 123-4567</p>
              <p className='font-semibold pb-1'>
                Address :- 123 Luxury Avenue, Cityville, State, Zipcode
              </p>
              <ContactForm />
              <div className='text-sm pt-4 lg:pt-8'>
                Customer Support Hours: Our customer support team is available
                to assist you during the following hours:{' '}
                <p>Monday to Friday: 9:00 AM - 5:00 PM (EST)</p>
                <p className=''> Saturday and Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media  */}
      <SocialMedia />
    </div>
  )
}

export default BlogPage
