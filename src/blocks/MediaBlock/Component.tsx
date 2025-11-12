import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '../../components/Media'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
  } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  return (
    <div className={cn('w-full', className)}>
      {(media || staticImage) && (
        <div className="relative h-[1185px] overflow-hidden">
          {/* Image */}
          <Media
            imgClassName="w-full object-cover translate-y-[100px] h-[1185px]"
            resource={media}
            src={staticImage}
          />

          {/* SVG wave overlay */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1444 112"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 w-full h-[112px] z-10"
          >
            <path
              d="M0.610864 -5.66244e-05C0.203621 1.04865 -0.203621 2.09735 -0.610864 3.14605C21.6921 11.8634 45.381 19.6983 68.4053 26.4527C494.67 133.939 938.125 119.64 1373.91 102.927C1398.27 101.727 1422.3 100.453 1446.76 99.0653C1447.96 98.9977 1449.07 98.4595 1449.86 97.5676C1450.66 96.6757 1451.06 95.5033 1450.99 94.3095C1450.92 93.1158 1450.38 91.9989 1449.49 91.2058C1448.6 90.4128 1447.43 90.0085 1446.24 90.0807C1421.8 91.5605 1397.79 92.9269 1373.46 94.2199C938.206 112.62 494.924 128.517 69.4284 22.9425C46.4581 16.3015 22.8351 8.58622 0.610864 -5.66244e-05Z"
              fill="#E7E3E0"
            />
          </svg>

          {/* Curved div below the wave */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1444 500"
            preserveAspectRatio="none"
            className="absolute -bottom-72 left-0 w-full h-[500px] z-[5]"
          >
            <path
              d="M0 112 C0 112 21.6921 120 68.4053 135 C494.67 242 938.125 228 1373.91 211 C1398.27 210 1422.3 209 1446.76 207 L1444 500 L0 500 Z"
              fill="#1E1C1C"
            />
          </svg>
        </div>
      )}
      {caption && (
        <div
          className={cn(
            'mt-6',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
