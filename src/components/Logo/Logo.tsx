import clsx from 'clsx'
import React from 'react'
import Image from 'next/image'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <div
      className={clsx(
        'flex items-center space-x-2.5',
        // prevent the logo from breaking layout on small screens
        'shrink-0',
        className
      )}
    >
      {/* ICON */}
      <Image
        src="/logos/hok-logo.svg"
        alt="house-of-kaia"
        width={40}
        height={58}
        loading={loading}
        className="w-7 sm:w-8 md:w-[40px] h-auto"
      />

      {/* TEXT LOGO */}
      <Image
        src="/logos/hok-text-logo.svg"
        alt="house-of-kaia"
        width={122}
        height={58}
        loading={loading}
        className="w-[122px] h-auto"
      />
    </div>
  )
}
