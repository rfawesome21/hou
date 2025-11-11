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
  text: any
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
}

export const ImageWithTextBlock: React.FC<ImageWithTextProps> = ({
  heading,
  image,
  text,
  imagePosition,
  richText,
  backgroundColor = 'bg-white',
  button,
}) => {
  const img = typeof image === 'string' ? null : image

  return (
    <div className={`${backgroundColor} w-full mt-[107px]`}>
      <div
        className={`flex flex-col md:flex-row items-center gap-16 ${
          imagePosition === 'right' ? 'md:flex-row-reverse' : ''
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
        <div
          className={`flex flex-col ${imagePosition === 'right' ? 'ml-[147px] w-[522px]' : 'mr-[147px] w-[522px]'}`}
        >
          {heading && (
            <h2
              className={`text-white font-libre-baskerville text-5xl tracking-[-0.96px] leading-normal w-[382px] ${
                imagePosition === 'right' ? 'text-right ml-auto' : 'text-left mr-auto'
              } overflow-hidden`}
            >
              {heading}
            </h2>
          )}
          {richText && (
            <RichText
              data={richText}
              className={`font-quicksand text-creme text-2xl leading-[150%] mt-[30px] ${imagePosition === 'right' ? 'text-right' : 'text-left'}`}
              enableGutter={false}
            />
          )}
          {button && button.text && button.internalPage && (
            <a
              href={button.internalPage?.slug || '#'}
              className={`mt-[50px] inline-block px-6 py-[14px] rounded-full text-black font-inter font-normal ${
                button.style === 'secondary' ? 'bg-gray-500' : 'bg-creme'
              } ${imagePosition === 'right' ? 'ml-auto' : 'mr-auto'}`}
            >
              {button.text}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
