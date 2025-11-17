import React from 'react'
import Image from 'next/image'
import { Media } from '@/payload-types'
import type { Form } from '@payloadcms/plugin-form-builder/types'
import { FormBlock } from '../Form/Component'

export interface ImageWithFormProps {
  heading?: string
  subheading?: string
  image: Media | string
  imagePosition?: 'left' | 'right'
  marginTop?: 'mt-0' | 'mt-[96px]' | 'mt-[150px]'
  form: Form
}

const ImageWithForm: React.FC<ImageWithFormProps> = ({
  heading,
  subheading,
  image,
  imagePosition = 'left',
  marginTop = 'mt-[96px]',
  form,
}) => {
  const img = typeof image === 'string' ? null : image

  return (
    <section className={`w-full relative ${marginTop}`}>
      <div
        className={`flex flex-col md:flex-row items-start ${
          imagePosition === 'right' ? 'md:flex-row-reverse' : ''
        }`}
      >
        {img && (
          <div className="relative w-full md:w-1/2">
            <Image
              src={img.url ?? ''}
              alt={img.alt || ''}
              width={746}
              height={951}
              className="object-cover"
            />
          </div>
        )}

        <div className="flex flex-col justify-center items-end my-auto pl-40 mr-[60px] md:w-[700px]">
          {heading && <h2 className="text-[48px] font-libre-baskerville tracking-[-0.96px] font-normal text-white text-right">{heading}</h2>}
          {subheading && <p className="text-2xl font-quicksand font-normal leading-9 text-white text-right mt-6 mb-11">{subheading}</p>}

            {form && (
                <FormBlock enableIntro={false} form={form} />
            )}
        </div>
      </div>
    </section>
  )
}

export default ImageWithForm
