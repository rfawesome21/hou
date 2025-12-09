import React from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'

type Media = {
  id: string
  url: string
  alt?: string
}

export interface MuseBlockProps {
  heading?: string
  image: Media | string
  text?: any
  imagePosition: 'left' | 'right'
  backgroundColor?: string
  richText?: any
  button?: {
    text: string
    internalPage?: { slug: string }
    style?: 'primary' | 'secondary'
  }
}

export const MuseBlock: React.FC<MuseBlockProps> = ({
  heading,
  image,
  richText,
  imagePosition,
  backgroundColor = 'bg-white',
  button,
}) => {
  const img = typeof image === 'string' ? null : image

  return (
    <div className={`bg-creme pt-5 w-full`}>
      <div
        className={`
          flex flex-col md:flex-row items-center gap-10 md:gap-16
          ${imagePosition === 'right' ? 'md:flex-row-reverse' : ''}
          px-6 md:px-0
        `}
      >
        {/* IMAGE */}
        {img && (
          <div className="w-full md:w-1/2">
            <Image
              src={img.url}
              alt={img.alt || ''}
              width={699}
              height={1101}
              className="w-full h-auto rounded-md"
            />
          </div>
        )}

        {/* TEXT COLUMN */}
        <div
          className={`
            flex flex-col
            w-full md:w-1/2
            ${imagePosition === 'right' ? 'md:pl-[147px]' : 'md:pr-[147px]'}
            text-center md:text-left
          `}
        >
          {/* HEADING */}
          {heading && (
            <h2
              className={`
                font-libre-baskerville text-[40px] md:text-[64px] leading-normal text-primary-green
                max-w-[450px]
                ${imagePosition === 'right' ? 'md:text-right md:ml-auto' : 'md:text-left md:mr-auto'}
                mx-auto md:mx-0
              `}
            >
              {heading}
            </h2>
          )}

          {/* UNDERLINE */}
          <div
            className={`
              h-1 bg-primary-green mt-4
              w-[180px] sm:w-[250px] md:w-[462px]
              mx-auto
              ${imagePosition === 'right' ? 'md:ml-auto' : 'md:mr-auto'}
            `}
          />

          {/* RICH TEXT */}
          {richText && (
            <RichText
              data={richText}
              className={`
                font-quicksand font-normal text-background
                text-[18px] md:text-[22px]
                leading-[150%] mt-[30px]
                ${imagePosition === 'right' ? 'md:text-right' : 'md:text-left'}
                text-center md:text-left
              `}
              enableGutter={false}
            />
          )}

          {/* BUTTON */}
          {button?.text && button.internalPage && (
            <a
              href={button.internalPage.slug || '#'}
              className={`
                mt-[40px] inline-block px-6 py-[14px] rounded-full text-black font-inter font-normal
                ${button.style === 'secondary' ? 'bg-gray-500' : 'bg-creme'}
                mx-auto
                ${imagePosition === 'right' ? 'md:ml-auto' : 'md:mr-auto'}
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
