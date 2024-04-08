'use client'

import { Minus, Plus } from 'lucide-react'
import React, { useState } from 'react'

const Faq = () => {
  const [faq, setFaq] = useState(false)
  const [faq1, setFaq1] = useState(false)
  const [faq2, setFaq2] = useState(false)
  const [faq3, setFaq3] = useState(false)
  const [faq4, setFaq4] = useState(false)

  const handleFaq = () => {
    setFaq(!faq)
    setFaq1(false)
    setFaq2(false)
    setFaq3(false)
    setFaq4(false)
  }
  const handleFaq1 = () => {
    setFaq1(!faq1)
    setFaq(false)
    setFaq2(false)
    setFaq3(false)
    setFaq4(false)
  }
  const handleFaq2 = () => {
    setFaq2(!faq2)
    setFaq(false)
    setFaq1(false)
    setFaq3(false)
    setFaq4(false)
  }
  const handleFaq3 = () => {
    setFaq3(!faq3)
    setFaq(false)
    setFaq1(false)
    setFaq2(false)
    setFaq4(false)
  }
  const handleFaq4 = () => {
    setFaq4(!faq4)
    setFaq(false)
    setFaq1(false)
    setFaq2(false)
    setFaq3(false)
  }

  return (
    <div className='py-5 px-2 lg:px-5'>
      <div className=''>
        <div className=' lg:px-8 xl:px-24'>
          <div
            onClick={handleFaq}
            className='flex gap-2 items-center lg:px-5 py-2 cursor-pointer'
          >
            {faq ? <Minus /> : <Plus />}
            <p className='text-xl font-semibold'>
              What materials are used in your jewelry pieces?
            </p>
          </div>
          <div
            className={` gap-3 items-center py-5 px-5 lg:px-12 xl:px-24 ${
              faq ? 'flex' : 'hidden'
            }`}
          >
            <hr className=' border-l-4 border-slate-600 h-16' />
            <p className='text-slate-500'>
              Our jewelry pieces are crafted using high-quality materials such
              as sterling silver, 18k gold, and genuine gemstones sourced from
              trusted suppliers. Each piece is meticulously crafted to ensure
              durability and timeless elegance.
            </p>
          </div>
        </div>
        <hr className=' border-t-2' />
      </div>
      <div className=''>
        <div className=' lg:px-8 xl:px-24'>
          <div
            onClick={handleFaq1}
            className='flex gap-2 items-center lg:px-5 py-2 cursor-pointer'
          >
            {faq1 ? <Minus /> : <Plus />}
            <p className='text-xl font-semibold'>
              Do you offer customization options for your jewelry?
            </p>
          </div>
          <div
            className={` gap-3 items-center py-5 px-5 lg:px-12 xl:px-24 ${
              faq1 ? 'flex' : 'hidden'
            }`}
          >
            <hr className=' border-l-4 border-slate-600 h-16' />
            <p className='text-slate-500'>
              Yes, we offer customization options for many of our jewelry
              pieces. From selecting the type of metal to choosing gemstones and
              engravings, we provide personalized options to create a piece that
              reflects your unique style and preferences.
            </p>
          </div>
        </div>
        <hr className=' border-t-2' />
      </div>
      <div className=''>
        <div className=' lg:px-8 xl:px-24'>
          <div
            onClick={handleFaq2}
            className='flex gap-2 items-center lg:px-5 py-2 cursor-pointer'
          >
            {faq2 ? <Minus /> : <Plus />}
            <p className='text-xl font-semibold'>
              How do I care for my jewelry to maintain its quality?
            </p>
          </div>
          <div
            className={` gap-3 items-center py-5 px-5 lg:px-12 xl:px-24 ${
              faq2 ? 'flex' : 'hidden'
            }`}
          >
            <hr className=' border-l-4 border-slate-600 h-16' />
            <p className='text-slate-500'>
              We recommend gently cleaning your jewelry with a soft cloth and
              mild soap to remove any dirt or oils. Avoid exposing your jewelry
              to harsh chemicals, extreme temperatures, or abrasive materials.
              When not in use, store your jewelry in a clean, dry place away
              from sunlight to prevent tarnishing and damage.
            </p>
          </div>
        </div>
        <hr className=' border-t-2' />
      </div>
      <div className=''>
        <div className=' lg:px-8 xl:px-24'>
          <div
            onClick={handleFaq3}
            className='flex gap-2 items-center lg:px-5 py-2 cursor-pointer'
          >
            {faq3 ? <Minus /> : <Plus />}
            <p className='text-xl font-semibold'>
              What is your shipping and return policy?
            </p>
          </div>
          <div
            className={` gap-3 items-center py-5 px-5 lg:px-12 xl:px-24 ${
              faq3 ? 'flex' : 'hidden'
            }`}
          >
            <hr className=' border-l-4 border-slate-600 h-16' />
            <p className='text-slate-500'>
              We offer worldwide shipping with various shipping options to suit
              your needs. Our return policy allows for returns within 30 days of
              purchase for a full refund or exchange, provided the item is in
              its original condition and packaging.
            </p>
          </div>
        </div>
        <hr className=' border-t-2' />
      </div>
      <div className=''>
        <div className=' lg:px-8 xl:px-24'>
          <div
            onClick={handleFaq4}
            className='flex gap-2 items-center lg:px-5 py-2 cursor-pointer'
          >
            {faq4 ? <Minus /> : <Plus />}
            <p className='text-xl font-semibold'>
              How can I contact customer support if I have further questions?
            </p>
          </div>
          <div
            className={` gap-3 items-center py-5 px-5 lg:px-12 xl:px-24 ${
              faq4 ? 'flex' : 'hidden'
            }`}
          >
            <hr className=' border-l-4 border-slate-600 h-16' />
            <p className='text-slate-500'>
              Our customer support team is available to assist you with any
              inquiries or concerns. You can reach us through our contact form
              on the website, via email at support@onnyiisi.com, or by phone at
              +1 (555) 123-4567. We strive to provide prompt and helpful
              assistance to ensure your satisfaction.
            </p>
          </div>
        </div>
        <hr className=' border-t-2' />
      </div>
    </div>
  )
}

export default Faq
