import { Star } from 'lucide-react'
import React, { useState } from 'react'

const DetailsDescription = () => {
  const [showDesc, setShowDesc] = useState(true)
  const [showRev, setShowRev] = useState(false)
  const [showSpec, setShowSpec] = useState(false)

  const toggleDescription = () => {
    setShowDesc(true)
    setShowRev(false)
    setShowSpec(false)
  }

  const toggleReviews = () => {
    setShowDesc(false)
    setShowRev(true)
    setShowSpec(false)
  }

  const toggleSpecifications = () => {
    setShowDesc(false)
    setShowRev(false)
    setShowSpec(true)
  }

  return (
    <div className='pt-10'>
      <div className='flex gap-10'>
        <div className='flex flex-col gap-3'>
          <p
            onClick={toggleDescription}
            className={`uppercase text-lg hover:underline text-gray-500 hover:text-gray-800 cursor-pointer ${
              showDesc ? 'underline text-gray-800' : ''
            }`}
          >
            Description
          </p>
          <p
            onClick={toggleReviews}
            className={`uppercase text-lg hover:underline text-gray-500 hover:text-gray-800 cursor-pointer ${
              showRev ? 'underline text-gray-800' : ''
            }`}
          >
            reviews
          </p>
          <p
            onClick={toggleSpecifications}
            className={`uppercase text-lg hover:underline text-gray-500 hover:text-gray-800 cursor-pointer ${
              showSpec ? 'underline text-gray-800' : ''
            }`}
          >
            Specification
          </p>
        </div>
        <div className='text-gray-800'>
          <div className={`${showDesc ? 'block' : 'hidden'}`}>
            <p className=''>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet
              veritatis obcaecati quas quos unde aperiam ipsam deleniti soluta
              explicabo nihil, officia cumque, magnam, sapiente ex consectetur
              dolorem ducimus harum. Corrupti, error perspiciatis deserunt illum
              consequuntur a debitis sed? Recusandae quas quibusdam voluptatum,
              odit labore natus quidem repellat magnam voluptatem debitis
              perferendis a.
              <br />
              <br />
              Vel id ratione quasi! Vero minima voluptate iusto temporibus fuga
              velit iste iure earum eligendi maxime ea quas laboriosam quia, cum
              reiciendis ex error dolorem necessitatibus odio, dicta recusandae
              vel. Officia repellat optio nesciunt reiciendis fuga placeat
              laboriosam praesentium saepe veritatis minus, nisi cum eveniet
              exercitationem obcaecati ullam, commodi ab sint ratione esse.
              <br />
              <br />
              Voluptas, fuga maiores assumenda adipisci libero eum. Ratione
              recusandae ipsum totam perferendis consequuntur, officia est vero
              blanditiis, voluptatem optio architecto rerum corrupti quam error
              nesciunt laudantium. Et hic in vitae neque laudantium aperiam
              corporis corrupti nesciunt. Qui incidunt nemo eius unde!
            </p>
          </div>
          <div className={`${showRev ? 'block' : 'hidden'}`}>
            <div className='relative mb-3'>
              <p className='capitalize text-lg text-black'>honey</p>
              <p className='capitalize text-sm mb-3'>apr 4, 2023</p>
              <p className='text-lg'>I Love my chain</p>
              <p className='text-black'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aliquid, perspiciatis?
              </p>
              <hr className='border-b-1 border-black my-1' />
              <div className='absolute top-1 right-1'>
                <div className='flex gap-1'>
                  <Star
                    style={{ fill: 'rgb(244,206,80)' }}
                    color='rgb(244,206,80)'
                    size={20}
                  />
                  <Star
                    style={{ fill: 'rgb(244,206,80)' }}
                    color='rgb(244,206,80)'
                    size={20}
                  />
                  <Star
                    style={{ fill: 'rgb(244,206,80)' }}
                    color='rgb(244,206,80)'
                    size={20}
                  />
                  <Star
                    style={{ fill: 'rgb(244,206,80)' }}
                    color='rgb(244,206,80)'
                    size={20}
                  />
                  <Star
                    style={{ fill: 'rgb(244,206,80)' }}
                    color='rgb(244,206,80)'
                    size={20}
                  />
                </div>
                <p className='capitalize text-orange-500 text-sm'>
                  verified purchase
                </p>
              </div>
            </div>
            <div className='relative mb-3'>
              <p className='capitalize text-lg text-black'>honey</p>
              <p className='capitalize text-sm mb-3'>apr 4, 2023</p>
              <p className='text-lg'>I Love my chain</p>
              <p className='text-black'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aliquid, perspiciatis?
              </p>
              <hr className='border-b-1 border-black my-1' />
              <div className='absolute top-1 right-1'>
                <div className='flex gap-1'>
                  <Star
                    style={{ fill: 'rgb(244,206,80)' }}
                    color='rgb(244,206,80)'
                    size={20}
                  />
                  <Star
                    style={{ fill: 'rgb(244,206,80)' }}
                    color='rgb(244,206,80)'
                    size={20}
                  />
                  <Star
                    style={{ fill: 'rgb(244,206,80)' }}
                    color='rgb(244,206,80)'
                    size={20}
                  />
                  <Star
                    style={{ fill: 'rgb(244,206,80)' }}
                    color='rgb(244,206,80)'
                    size={20}
                  />
                  <Star
                    style={{ fill: 'rgb(244,206,80)' }}
                    color='rgb(244,206,80)'
                    size={20}
                  />
                </div>
                <p className='capitalize text-orange-500 text-sm'>
                  verified purchase
                </p>
              </div>
            </div>
            <div className='relative mb-3'>
              <p className='capitalize text-lg text-black'>honey</p>
              <p className='capitalize text-sm mb-3'>apr 4, 2023</p>
              <p className='text-lg'>I Love my chain</p>
              <p className='text-black'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aliquid, perspiciatis?
              </p>
              <hr className='border-b-1 border-black my-1' />
              <div className='absolute top-1 right-1'>
                <div className='flex gap-1'>
                  <Star
                    style={{ fill: 'rgb(244,206,80)' }}
                    color='rgb(244,206,80)'
                    size={20}
                  />
                  <Star
                    style={{ fill: 'rgb(244,206,80)' }}
                    color='rgb(244,206,80)'
                    size={20}
                  />
                  <Star
                    style={{ fill: 'rgb(244,206,80)' }}
                    color='rgb(244,206,80)'
                    size={20}
                  />
                  <Star
                    style={{ fill: 'rgb(244,206,80)' }}
                    color='rgb(244,206,80)'
                    size={20}
                  />
                  <Star
                    style={{ fill: 'rgb(244,206,80)' }}
                    color='rgb(244,206,80)'
                    size={20}
                  />
                </div>
                <p className='capitalize text-orange-500 text-sm'>
                  verified purchase
                </p>
              </div>
            </div>
          </div>
          <div className={`${showSpec ? 'block' : 'hidden'}`}>
            <ul className='list-disc pl-5 capitalize'>
              <li>
                Hole Size: <span className='pl-3'>2.5 mm</span>
              </li>
              <li>
                Chain Style Compability:{' '}
                <span className='pl-3'>
                  classic, rounded box, fine linear link
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailsDescription
