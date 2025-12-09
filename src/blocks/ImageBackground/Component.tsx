import React from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'

type Button = {
  text: string
  internalPage?: { slug: string }
  style?: 'primary' | 'secondary'
}

type ImageBackgroundBlockProps = {
  heading?: string
  richText?: any
  image: {
    id: string
    url: string
    alt?: string
  }
  textAlignment?: 'left' | 'center' | 'right'
  backgroundColor?: string
  button?: Button
}

export const ImageBackgroundBlock: React.FC<ImageBackgroundBlockProps> = ({
  heading,
  richText,
  image,
  textAlignment = 'center',
  backgroundColor,
  button,
}) => {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }

  return (
    <div
      className="
        relative w-full 
        h-[600px] md:h-[720px] 
        -mt-[80px] sm:-mt-[120px] md:-mt-[140px] 
        z-0
      "
    >
      {/* Background Image */}
      <Image
        src={image.url}
        alt={heading || 'Background Image'}
        fill
        className="object-cover z-0"
      />

      {/* Optional overlay color */}
      {backgroundColor && (
        <div className="absolute inset-0 z-0" style={{ backgroundColor }} />
      )}

      {/* Text Overlay */}
      <div
        className={`
          absolute left-0 right-0 flex flex-col 
          md:px-12 
          ${alignmentClasses[textAlignment]}
          z-20
        `}
        style={{ bottom: '40px' }}  // mobile spacing
      >
        {heading && (
          <h2
            className="
              text-white font-libre-baskerville 
              text-[28px] md:text-[52px]
              leading-[36px] sm:leading-[48px] md:leading-[72px]
              tracking-[-0.5px] sm:tracking-[-0.8px] md:tracking-[-1.04px]
              mb-3 sm:mb-4
            "
          >
            {heading}
          </h2>
        )}

        {richText && (
          <div
            className="
              text-white font-quicksand font-medium
              text-base sm:text-lg md:text-xl 
              leading-[22px] sm:leading-[26px] md:leading-[28px]
              max-w-[90%] sm:max-w-[600px] md:max-w-[700px]
              mb-4 sm:mb-6
            "
          >
            <RichText data={richText} enableGutter={false} />
          </div>
        )}

        {button?.text && (
          <a
            href={button.internalPage ? `/${button.internalPage.slug}` : '#'}
            className={`
              px-5 sm:px-6 py-2.5 sm:py-3 
              rounded-full font-semibold 
              text-sm sm:text-base
              transition-colors
              ${
                button.style === 'secondary'
                  ? 'bg-white text-black hover:bg-gray-200'
                  : 'bg-creme text-black hover:bg-yellow-200'
              }
            `}
          >
            {button.text}
          </a>
        )}
      </div>
    </div>
  )
}
