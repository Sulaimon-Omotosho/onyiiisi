import React from 'react'

const Loading = () => {
  return (
    <section className=' py-28'>
      <div className='container'>
        {/* <h2 className=''>Loading...</h2> */}
        <svg
          className='animate-spin h-10 w-10 text-gray-500 mx-auto'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          ></circle>
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.004 8.004 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm10 3.647c1.863-2.114 3-4.896 3-7.938h-4a8.001 8.001 0 01-3.999 6.938l1.999 1.999zM20 12h4c0-6.627-5.373-12-12-12v4c3.042 0 5.824 1.135 7.938 3l-2.647 3zm-2-7.291A7.96 7.96 0 0012 4V0c6.627 0 12 5.373 12 12h-4c0-3.042-1.135-5.824-3-7.938l-2.647 3z'
          ></path>
        </svg>
      </div>
    </section>
  )
}

export default Loading
