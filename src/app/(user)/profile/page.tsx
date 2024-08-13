'use client'

import { Plus } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'

interface UserInfo {
  name: string
  gender: string
  dateOfBirth: Date
  dateOfBirthDay: number
  dateOfBirthMonth: number
  dateOfBirthYear: number
  email: string
}

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const session = await getSession()
        if (session) {
          const response = await fetch('/api/user/')
          const data = await response.json()
          const { dateOfBirth, ...rest } = data
          const parsedDateOfBirth = dateOfBirth ? new Date(dateOfBirth) : null
          setUserInfo({
            ...rest,
            dateOfBirth: parsedDateOfBirth,
            dateOfBirthDay: parsedDateOfBirth ? parsedDateOfBirth.getDate() : 0,
            dateOfBirthMonth: parsedDateOfBirth
              ? parsedDateOfBirth.getMonth() + 1
              : 0,
            dateOfBirthYear: parsedDateOfBirth
              ? parsedDateOfBirth.getFullYear()
              : 0,
          })
        }
      } catch (error) {
        console.error('Error fetching user information')
      }
    }
    fetchUserInfo()
  }, [])

  const handleValueChange = (field: keyof UserInfo, value: any) => {
    if (userInfo) {
      if (
        (field === 'dateOfBirthDay' ||
          field === 'dateOfBirthMonth' ||
          field === 'dateOfBirthYear') &&
        userInfo.dateOfBirth !== null
      ) {
        // If dateOfBirth is not null, do not update the corresponding field
        return
      }

      setUserInfo({
        ...userInfo,
        [field]: value,
      })
      setHasChanges(true)
    }
  }

  const handleSaveChanges = async () => {
    if (userInfo) {
      try {
        const formData = new FormData()
        formData.append('name', userInfo.name)
        formData.append('gender', userInfo.gender)

        // Create the dateOfBirth object
        const dateOfBirth = new Date(
          userInfo.dateOfBirthYear,
          userInfo.dateOfBirthMonth - 1, // Subtract 1 from the month for the Date constructor
          userInfo.dateOfBirthDay
        )
        // Update the userInfo object with the dateOfBirth
        const updatedUserInfo: UserInfo = {
          ...userInfo,
          dateOfBirth,
        }
        formData.append('dateOfBirth', dateOfBirth.toISOString())

        const response = await fetch('/api/user', {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          const data = await response.json()
          setUserInfo(data)
          setHasChanges(false)
        } else {
          console.error('Failed to save changes')
        }
      } catch (error) {
        console.error('Error saving changes:', error)
      }
    }
  }

  const getInitials = (name: string | undefined) => {
    if (!name) {
      return ''
    }

    const names = name.trim().split(' ')
    let initials = ''

    if (names.length === 2) {
      initials = `${names[0][0]}${names[1][0]}`
    } else if (names.length >= 3) {
      initials = `${names[0][0]}${names[names.length - 1][0]}`
    } else {
      initials = names[0][0]
    }

    return initials.toUpperCase()
  }

  // Minimum Number Of Years
  const minYear = 1900
  const maxYear = new Date().getFullYear()

  return (
    <div className='lg:py-20 pb-10'>
      <h1 className='text-3xl text-center font-bold capitalize py-10'>
        user profile
      </h1>
      <div className='relative flex flex-col  items-center justify-around'>
        <div className='md:absolute top-0 md:left-5 lg:left-10 '>
          <div className='relative rounded-full h-28 lg:h-36 xl:h-48 w-28 lg:w-36 xl:w-48  flex items-center justify-center bg-gray-200'>
            <span className='text-3xl font-bold rounded-full'>
              {getInitials(userInfo?.name)}
            </span>
          </div>
        </div>
        <form
          action=''
          className='w-[90%] md:w-[60%] py-10 flex flex-col gap-10'
        >
          <div className='relative py-[10px] '>
            <label
              htmlFor='name'
              className='font-semibold text-sm absolute bg-white left-6 top-0 capitalize px-2 rounded-full'
            >
              Name
            </label>
            <input
              type='text'
              name='name'
              id='name'
              className='border-[1px] w-full border-gray-300 rounded-sm p-3'
              value={userInfo?.name || ''}
              onChange={(e) => handleValueChange('name', e.target.value)}
            />
          </div>
          <div className=''>
            <p className='font-semibold text-sm'>Gender</p>
            <div className='flex justify-between w-[50%] pt-2'>
              <div className='flex gap-2 items-center'>
                <input
                  type='radio'
                  name='gender'
                  id='male'
                  value='male'
                  className='h-5 w-5'
                  checked={userInfo?.gender === 'male'}
                  onChange={() => handleValueChange('gender', 'male')}
                />
                <label htmlFor='male' className='text-sm'>
                  Male
                </label>
              </div>
              <div className='flex gap-2 items-center'>
                <input
                  type='radio'
                  name='gender'
                  id='female'
                  value='female'
                  className='h-5 w-5'
                  checked={userInfo?.gender === 'female'}
                  onChange={() => handleValueChange('gender', 'female')}
                />
                <label htmlFor='female' className='text-sm'>
                  Female
                </label>
              </div>
            </div>
          </div>
          <div className='w-full'>
            <p className='capitalize font-semibold text-sm'>date of birth</p>
            <div className='flex gap-3 pt-3'>
              <div className='relative py-[10px] w-1/3'>
                <label
                  htmlFor='dateOfBirthMonth'
                  className='font-semibold text-sm absolute bg-white left-6 top-0 capitalize px-2 rounded-full'
                >
                  month
                </label>
                <input
                  type='number'
                  name='dateOfBirthMonth'
                  id='dateOfBirthMonth'
                  min={1}
                  max={12}
                  className='border-[1px] w-full border-gray-300 rounded-sm p-3'
                  value={userInfo?.dateOfBirthMonth || ''}
                  //disabled={true}
                  onChange={(e) =>
                    handleValueChange(
                      'dateOfBirthMonth',
                      parseInt(e.target.value)
                    )
                  }
                />
              </div>
              <div className='relative py-[10px] w-1/3'>
                <label
                  htmlFor='dateOfBirthDay'
                  className='font-semibold text-sm absolute bg-white left-6 top-0 capitalize px-2 rounded-full'
                >
                  day
                </label>
                <input
                  type='number'
                  name='dateOfBirthDay'
                  id='dateOfBirthDay'
                  min={1}
                  max={31}
                  className='border-[1px] w-full border-gray-300 rounded-sm p-3'
                  value={userInfo?.dateOfBirthDay || ''}
                  onChange={(e) =>
                    handleValueChange(
                      'dateOfBirthDay',
                      parseInt(e.target.value)
                    )
                  }
                />
              </div>
              <div className='relative py-[10px] w-1/3'>
                <label
                  htmlFor='dateOfBirthYear'
                  className='font-semibold text-sm absolute bg-white left-6 capitalize top-0 px-2 rounded-full'
                >
                  year
                </label>
                <input
                  type='number'
                  name='dateOfBirthYear'
                  id='dateOfBirthYear'
                  min={minYear}
                  max={maxYear}
                  className='border-[1px] w-full border-gray-300 rounded-sm p-3'
                  value={userInfo?.dateOfBirthYear || ''}
                  onChange={(e) =>
                    handleValueChange(
                      'dateOfBirthYear',
                      parseInt(e.target.value)
                    )
                  }
                />
              </div>
            </div>
          </div>
          <div className='relative py-[10px] '>
            <label
              htmlFor='email'
              className='font-semibold text-sm absolute bg-white left-6 top-0 capitalize px-2 rounded-full'
            >
              email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              className='border-[1px] w-full border-gray-300 rounded-sm p-3'
              value={userInfo?.email || ''}
            />
          </div>
          <div className=''>
            <div className='justify-between flex capitalize font-semibold text-xl pb-5'>
              <h2 className=''>shipping address</h2>
              <h2 className='flex items-center hover:underline underline-offset-4 cursor-pointer'>
                <Plus /> add address
              </h2>
            </div>
            <div className='relative py-[10px] '>
              <label
                htmlFor='address'
                className='font-semibold text-sm absolute bg-white left-6 top-0 capitalize px-2 rounded-full'
              >
                Address
              </label>
              <input
                type='text'
                name='address'
                id='address'
                className='border-[1px] w-full border-gray-300 rounded-sm p-3'
              />
            </div>
          </div>
        </form>
        {hasChanges && (
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded'
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
