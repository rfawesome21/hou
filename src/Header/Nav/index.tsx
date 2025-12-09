'use client'

import React, { useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import Image from 'next/image'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop / Mobile Icons Row */}
      <nav
        className="
          flex items-center
          gap-4 sm:gap-6 md:gap-12
        "
      >
        {/* Desktop nav items */}
        <div className="hidden md:flex items-center gap-12">
          {navItems.map(({ link }, i) => (
            <CMSLink
              key={i}
              {...link}
              appearance="link"
              className="text-xl hover:no-underline leading-[30px]"
            />
          ))}
        </div>

        {/* Search button (always visible) */}
        <button className="bg-primary-green px-3 py-1.5 md:px-6 md:py-3.5 rounded-[40px]">
          <span className="sr-only">Search</span>
          <Image
            src="/icons/search.svg"
            alt="Search"
            width={30}
            height={30}
            className="h-4 w-4 md:w-[30px] md:h-[30px]"
          />
        </button>

        {/* Hamburger (mobile only) */}
        <button
          className="bg-primary-green px-3 py-1.5 md:px-6 md:py-3.5 rounded-[40px] md:hidden relative"
          onClick={() => {
            setOpen((prev) => !prev)
          }}
        >
          <span className="sr-only">Menu</span>
          <Image
            src="/icons/burger.svg"
            alt="Menu"
            width={30}
            height={30}
            className="h-4 w-4 md:w-[30px] md:h-[30px]"
          />
        </button>
      </nav>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-background z-40" onClick={() => setOpen(false)} />
      )}

      {/* Mobile sidebar menu */}
      <div
        className={`
          fixed top-0 left-0 bottom-0 bg-white z-[1000000]
          transform transition-transform duration-300 ease-in-out
          shadow-2xl w-full
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Close button */}
          <div className="flex justify-end bg-background p-4">
            <button onClick={() => setOpen(false)} className="p-2 text-white rounded-full">
              <span className="sr-only">Close menu</span>
              <svg className="w-6 h-6" fill="#fff" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Nav items */}
          <div className="flex flex-col bg-background gap-2 px-6 py-4">
            {navItems.map(({ link }, i) => (
              <CMSLink
                key={i}
                {...link}
                appearance="link"
                className="text-base md:text-lg hover:no-underline py-3 border-b border-gray-100"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
