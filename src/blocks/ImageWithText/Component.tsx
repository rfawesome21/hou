import React from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'

type Media = {
  id: string
  url: string
  alt?: string
}

export interface ImageWithTextProps {
  heading?: string
  image: Media | string
  text?: any
  imagePosition: 'left' | 'right'
  backgroundColor?: string
  richText?: any
  button?: {
    text: string
    internalPage?: {
      slug: string
    }
    style?: 'primary' | 'secondary'
  }
  marginTop?: string
}

export const ImageWithTextBlock: React.FC<ImageWithTextProps> = ({
  heading,
  image,
  text,
  imagePosition,
  richText,
  backgroundColor = 'bg-white',
  button,
  marginTop = 'mt-[107px]',
}) => {
  const img = typeof image === 'string' ? null : image

  const isRight = imagePosition === 'right'

  return (
    <div className={`${backgroundColor} w-full ${marginTop}`}>
      <div
        className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 ${
          isRight ? 'md:flex-row-reverse' : ''
        }`}
      >
        {img && (
          <div className="w-full md:w-1/2">
            <Image
              src={img.url}
              alt={img.alt || ''}
              width={711}
              height={951}
              className="w-full h-auto rounded-md"
            />
          </div>
        )}

        {/* TEXT BLOCK */}
        <div
          className={`
            flex flex-col 
            w-full 
            px-6                  /* mobile padding */
            md:px-0               /* remove padding on desktop */
            ${isRight ? 'md:ml-[147px] md:w-[522px]' : 'md:mr-[147px] md:w-[522px]'}
          `}
        >
          {heading && (
            <h2
              className={`
                font-libre-baskerville 
                leading-normal 
                text-white
                text-3xl           /* mobile */
                sm:text-4xl 
                md:text-5xl        /* desktop */
                tracking-[-0.96px]
                ${isRight ? 'text-right md:ml-auto' : 'text-left md:mr-auto'}
              `}
            >
              {heading}
            </h2>
          )}

          {richText && (
            <RichText
              data={richText}
              className={`
                font-quicksand 
                text-creme 
                text-base            /* mobile */
                sm:text-lg 
                md:text-2xl          /* desktop */
                leading-[150%] 
                mt-6
                ${isRight ? 'text-right' : 'text-left'}
              `}
              enableGutter={false}
            />
          )}

          {button?.text && button.internalPage && (
            <a
              href={button.internalPage.slug || '#'}
              className={`
                mt-10 
                inline-block 
                px-6 py-3 md:py-[14px] 
                rounded-full 
                text-center
                text-black 
                font-inter 
                !mb-5
                font-normal 
                ${button.style === 'secondary' ? 'bg-gray-500' : 'bg-creme'}
                ${isRight ? 'md:ml-auto' : 'md:mr-auto'}
              `}
            >
              {button.text}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
