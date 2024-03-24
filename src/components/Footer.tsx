import { LocateIcon, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

const location = [
  {
    title: 'Location',
    desc: '123, Broad street, Ikoyi, Lagos Island, Lagos. Nigeria',
    icon: 'MapPin',
  },
  { title: 'Phone', desc: '+234 901 234 5678', icon: 'Phone' },
  { title: 'E-Mail', desc: 'contact@onyiisi.com', icon: 'Mail' },
]

const company = [
  { title: 'about us', link: '/' },
  { title: 'best seller', link: '/' },
  { title: 'new arrivals', link: '/' },
  { title: 'collections', link: '/' },
  { title: 'reviews', link: '/' },
]

const information = [
  { title: 'contact us', link: '/' },
  { title: 'help center', link: '/' },
  { title: 'payment guide', link: '/' },
  { title: 'FAQS', link: '/' },
]

const socials = [
  { title: 'facebook', link: '/' },
  { title: 'twitter', link: '/' },
  { title: 'youtube', link: '/' },
  { title: 'instagram', link: '/' },
]

export default function Footer() {
  return (
    <div className='py-10 px-20 bg-[rgb(56,22,10)] text-white'>
      <div className='flex flex-col md:flex-row content-center gap-20 justify-center mb-8'>
        <div className='flex flex-col gap-3'>
          <h1 className='font-bold text-xl mb-5'>Onyiisi</h1>
          <div className='flex items-center gap-1 text-gray-400'>
            <MapPin className='' />
            <div className=''>
              <h3 className='font-semibold '>Location</h3>
              <p className='text-sm'>
                123, Broad street, Ikoyi, Lagos Island, Lagos. Nigeria
              </p>
            </div>
          </div>
          <div className='flex items-center gap-1 text-gray-400'>
            <Phone className='' />
            <div className=''>
              <h3 className='font-semibold '>Phone</h3>
              <p className='text-sm'>+234 901 234 5678</p>
            </div>
          </div>
          <div className='flex items-center gap-1 text-gray-400'>
            <Mail className='' />
            <div className=''>
              <h3 className='font-semibold '>E-Mail</h3>
              <p className='text-sm'>contact@onyiisi.com</p>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <h1 className='font-bold text-xl mb-5 capitalize'>Company</h1>
          {company.map((com, idx) => (
            <Link
              className='text-sm capitalize text-gray-400'
              key={idx}
              href={com.link}
            >
              {com.title}
            </Link>
          ))}
        </div>
        <div className='flex flex-col gap-3'>
          <h1 className='font-bold text-xl mb-5 capitalize'>information</h1>
          {information.map((info, idx) => (
            <Link
              className='text-sm capitalize text-gray-400'
              key={idx}
              href={info.link}
            >
              {info.title}
            </Link>
          ))}
        </div>
        <div className='flex flex-col gap-3'>
          <h1 className='font-bold text-xl mb-5 capitalize'>Stay In Touch</h1>
          {socials.map((social, idx) => (
            <Link
              className='text-sm capitalize text-gray-400'
              key={idx}
              href={social.link}
            >
              {social.title}
            </Link>
          ))}
        </div>
      </div>
      <div className=''>
        <p className='font-thin text-sm text-gray-400 text-center'>
          &copy; All rights reserved 2024. Onyiisi
        </p>
      </div>
    </div>
  )
}
