import { Mail, MoveDownRight } from 'lucide-react'
import Image from 'next/image'
import { blogs, blogData } from '@/constants'

export default function Blog() {
  return (
    <div className='p-10 lg:p-20 bg-[rgb(56,22,10)] text-white'>
      <div className=''>
        {/* Header  */}
        <div className='flex justify-between'>
          <div className='text-center md:text-start'>
            <h3 className='uppercase text-2xl md:text-xl font-semibold'>
              our blog
            </h3>
            <p className='text-sm font-thin'>
              Delve into amazing topics about jewelries and trends.
            </p>
          </div>
          <button className=' py-2 lg:py-3 w-[120px] lg:w-[150px] rounded-full uppercase font-thin text-xs hidden md:flex items-center justify-center gap-1 lg:gap-2 border-2 border-white '>
            learn more
            <span>
              <MoveDownRight className='w-4 lg:w-5 h-4 lg:h-5 pt-1' />
            </span>
          </button>
        </div>

        {/* Blog Carousel  */}
        <div className='flex flex-col md:flex-row items-center gap-6 md:justify-between mt-10 xl:mt-20'>
          {blogData.map((blog, idx) => (
            <div
              key={idx}
              className='w-[360px] md:w-[220px] lg:w-[250px] xl:w-[400px] '
            >
              <div className='relative w-[360px] md:w-[220px] lg:w-[250px] xl:w-[400px] h-[290px] md:h-[170px] lg:h-[200px] xl:h-[330px]'>
                <Image
                  className='object-cover rounded-md pb-5  '
                  src={blog.img}
                  alt={blog.title}
                  fill
                />
              </div>
              <div className=''>
                <p className='font-thin text-sm'>{blog.date}</p>
                <h3 className='font-bold capitalize '>{blog.title}</h3>
                <p className='text-xs font-thin'>{blog.blog}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
