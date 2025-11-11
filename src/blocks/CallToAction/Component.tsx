import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div>
      <div className="mt-[50px]">
        <div className="flex flex-col gap-8">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="lg" className='mx-auto bg-[#E7E3E0] text-black rounded-[40px] px-6 py-[14px] uppercase' {...link} />
          })}
        </div>
      </div>
    </div>
  )
}
