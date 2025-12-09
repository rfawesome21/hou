'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
  transparentNavbar?: boolean
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, transparentNavbar }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  // reset theme when navigating
  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname, setHeaderTheme])

  // handle header theme updates
  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme, theme])

  // scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 480)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`
    fixed top-0 left-0 w-full z-50
    px-6 py-4 md:px-20 md:py-[41px]
    flex items-center justify-between
    flex-nowrap gap-4
    transition-all duration-500 ease-in-out
    ${
      transparentNavbar && !scrolled ? 'bg-transparent' : 'bg-background shadow-sm backdrop-blur-sm'
    }
  `}
    >
      <Link href="/" className="shrink-0">
        <Logo loading="eager" priority="high" className="invert dark:invert-0 w-16 md:w-auto" />
      </Link>

      <div className="w-full md:w-auto flex justify-end md:justify-center">
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
