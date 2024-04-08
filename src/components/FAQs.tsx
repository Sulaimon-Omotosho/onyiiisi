'use client'

import { faqData } from '@/constants'
import { Minus, Plus } from 'lucide-react'
import React, { useState } from 'react'

const FAQs = () => {
  const [activeIdx, setActiveIdx] = useState(-1)

  const handleFaq = (idx: number) => {
    setActiveIdx(activeIdx === idx ? -1 : idx)
  }

  return (
    <div className='py-5 px-2 lg:px-5'>
      {faqData.map((faq, idx) => (
        <div key={idx} className=''>
          <div className=' lg:px-8 xl:px-24'>
            <div
              onClick={() => handleFaq(idx)}
              className='flex gap-2 items-center lg:px-5 py-2 cursor-pointer'
            >
              {activeIdx === idx ? <Minus /> : <Plus />}
              <p className='text-xl font-semibold'>{faq.question}</p>
            </div>
            <div
              className={` gap-3 items-center py-5 px-5 lg:px-12 xl:px-24 ${
                activeIdx === idx ? 'flex' : 'hidden'
              }`}
            >
              <hr className=' border-l-4 border-slate-600 h-16' />
              <p className='text-slate-500'>{faq.answer}</p>
            </div>
          </div>
          <hr className=' border-t-2' />
        </div>
      ))}
    </div>
  )
}

export default FAQs
