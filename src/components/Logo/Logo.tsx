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
     
    <div className='flex space-x-2.5'>
      <Image src={'/logos/hok-logo.svg'} alt='house-of-kaia' width={40} height={58} />
      <Image src={'/logos/hok-text-logo.svg'} alt='house-of-kaia' width={122} height={58} />
    </div>
  )
}
