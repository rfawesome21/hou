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
    <div className="relative w-full h-[500px] md:h-[720px] -mt-[140px] z-0">
      {/* Background Image */}
      <Image
        src={image.url}
        alt={heading || 'Background Image'}
        fill
        className="object-cover z-0"
      />

      {/* Optional overlay color */}
      {backgroundColor && <div className="absolute inset-0 z-0" style={{ backgroundColor }} />}

      {/* Text overlay */}
      <div
        className={`absolute left-0 right-0 flex flex-col z-20 px-6 md:px-12 ${alignmentClasses[textAlignment]}`}
        style={{ bottom: '74px' }}
      >
        {heading && (
          <h2 className="text-white font-libre-baskerville md:text-[52px] tracking-[-1.04px] mb-4 leading-[72.8px]">
            {heading}
          </h2>
        )}

        {richText && (
          <div className="text-white font-quicksand font-medium text-xl leading-[28px] max-w-[700px]">
            <RichText data={richText} enableGutter={false} />
          </div>
        )}

        {button && button.text && (
          <a
            href={button.internalPage ? `/${button.internalPage.slug}` : '#'}
            className={`px-6 py-3 rounded-full font-semibold transition-colors ${
              button.style === 'secondary'
                ? 'bg-white text-black hover:bg-gray-200'
                : 'bg-creme text-black hover:bg-yellow-200'
            }`}
          >
            {button.text}
          </a>
        )}
      </div>
    </div>
  )
}
