'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative flex w-full items-center justify-center text-white"
      data-theme="dark"
    >
      <div className="absolute bottom-[106px]">
        <div className="max-w-[36.5rem] md:text-center">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} className='font-inter text-base rounded-full text-primary-green bg-creme px-6 py-3' />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="w-full h-[755px] select-none">
        {media && typeof media === 'object' && (
          <Media imgClassName="object-cover h-[755px] flex-1 w-full" priority resource={media} />
        )}
      </div>
    </div>
  )
}
