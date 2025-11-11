'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Image from 'next/image'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex gap-12 items-center bg-">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" className='text-xl hover:no-underline leading-[30px]' />
      })}
      <button className='bg-primary-green px-6 py-3.5 rounded-[40px]'>
        <span className="sr-only">Search</span>
        <Image src={'/icons/search.svg'} alt="Search" width={30} height={30} />
      </button>
      <button className='bg-primary-green px-6 py-3.5 rounded-[40px]'>
        <span className="sr-only">Menu</span>
        <Image src={'/icons/burger.svg'} alt="Search" width={30} height={30} />
      </button>
    </nav>
  )
}
