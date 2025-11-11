'use client'

import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper'
import { Autoplay } from 'swiper/modules'

import 'swiper/css'
import Image from 'next/image'

type Media = {
  id: string
  url: string
  alt?: string
}

type GalleryImage = {
  image: Media | string
  caption?: string
}

export interface GalleryBlockProps {
  heading?: string
  images: GalleryImage[]
  autoPlay?: boolean
  autoPlaySpeed?: number
}

export const GalleryBlock: React.FC<GalleryBlockProps> = ({
  heading,
  images,
  autoPlay = true,
  autoPlaySpeed = 3000,
}) => {
  const swiperRef = useRef<SwiperType>(null)

  return (
    <div className="relative gallery-block mt-[107px] w-full">
      {heading && <h2 className="text-2xl font-bold mb-4">{heading}</h2>}

      <Swiper
        modules={[Autoplay]}
        autoplay={autoPlay ? { delay: autoPlaySpeed } : false}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 16 },
          1024: { slidesPerView: 3.6, spaceBetween: 32 },
        }}
      >
        {images?.map((item, i) => {
          const img = typeof item.image === 'string' ? null : item.image

          return (
            <SwiperSlide key={i}>
              {img?.url && (
                <Image
                  src={img.url}
                  alt={item.caption || img.alt || ''}
                  className="w-full h-auto select-none rounded-md"
                  width={376.75}
                  height={405}
                />
              )}

              {item.caption && (
                <p className="text-2xl leading-[150%] mt-6 text-white">{item.caption}</p>
              )}
            </SwiperSlide>
          )
        })}
      </Swiper>

      {/* Custom arrows below carousel */}
      <div className="hidden md:flex justify-center gap-8 mt-[42px] w-[165px] mx-auto">
        <button
          className="w-[66px] h-[66px] flex items-center justify-center bg-creme rounded-full"
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous Slide"
        >
          <Image src="/icons/left-arrow.svg" alt="Previous" width={34} height={34} />
        </button>

        <button
          className="w-[66px] h-[66px] flex items-center justify-center bg-creme rounded-full"
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next Slide"
        >
          <Image src="/icons/right-arrow.svg" alt="Next" width={34} height={34} />
        </button>
      </div>
    </div>
  )
}
