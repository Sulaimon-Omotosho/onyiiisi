import React from 'react'

const CustomOrderPage = () => {
  return (
    <div className='lg:py-20'>
      <div className='px-5 md:px-10 py-10 md:py-20'>
        <h1 className='uppercase text-2xl font-bold'>custom order</h1>
        <div className=''>
          <form className='flex flex-col justify-center pt-8 gap-6 md:gap-10 lg:w-3/4 xl:w-2/3'>
            <div className='relative py-[10px] capitalize'>
              <label
                htmlFor='jewelry'
                className='font-semibold text-sm absolute bg-white left-6 top-0 px-2 rounded-full'
              >
                jewelry type
              </label>
              <input
                id='jewelry'
                type='text'
                required
                className='border-[1px] border-gray-300 rounded-sm p-3 w-full'
              />
            </div>
            <div className='relative py-[10px] capitalize'>
              <label
                htmlFor='metal'
                className='font-semibold text-sm absolute bg-white left-6 top-0 px-2 rounded-full'
              >
                metal type
              </label>
              <input
                id='metal'
                type='text'
                required
                className='border-[1px] border-gray-300 rounded-sm p-3 w-full'
              />
            </div>
            <div className=''>
              <div className='capitalize pb-3'>
                <p className='font-semibold text-sm'>
                  gemstone{' '}
                  <span className='text-slate-400 px-1'>(optional)</span>
                </p>
                <div className='flex justify-between w-[30%] pt-2'>
                  <div className='flex gap-2 items-center'>
                    <input
                      type='radio'
                      name='male'
                      id='male'
                      className='h-5 w-5'
                    />
                    <label htmlFor='male' className='text-sm'>
                      yes
                    </label>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <input
                      type='radio'
                      name='female'
                      id='female'
                      className='h-5 w-5'
                    />
                    <label htmlFor='female' className='text-sm'>
                      no
                    </label>
                  </div>
                </div>
              </div>
              <div className='relative py-[10px] capitalize'>
                <label
                  htmlFor='gemstone'
                  className='font-semibold text-sm absolute bg-white left-6 top-0 px-2 rounded-full'
                >
                  gemstone
                </label>
                <input
                  id='gemstone'
                  type='text'
                  className='border-[1px] border-gray-300 rounded-sm p-3 w-full'
                />
              </div>
            </div>
            <div className='relative py-[10px] capitalize'>
              <label
                htmlFor='engraved'
                className='font-semibold text-sm absolute bg-white left-6 top-0 px-2 rounded-full'
              >
                type in engraved message
              </label>
              <input
                id='engraved'
                type='text'
                required
                className='border-[1px] border-gray-300 rounded-sm p-3 w-full'
              />
            </div>
            <div className='flex justify-center'>
              <input
                type='submit'
                value='submit order'
                className='text-white bg-[rgb(95,40,74)] py-1 lg:py-2 w-[50%] rounded-full uppercase font-thin justify-center gap-1 lg:gap-2 cursor-pointer'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CustomOrderPage
