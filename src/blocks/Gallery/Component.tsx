'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper'
import { Autoplay } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload, type Payload } from 'payload'
import config from '@payload-config'

import 'swiper/css'
import { Post } from '@/payload-types'

type Media = {
  id: string
  url: string
  alt?: string
}

type GalleryImage = {
  image: Media | string
  caption?: string
}

type Category = {
  id: string
  title: string
  slug: string
  image?: Media | string
}

export interface GalleryBlockProps {
  heading?: string
  subheading?: string
  images?: GalleryImage[]
  categories?: Category[]
  displayCategories?: boolean
  autoPlay?: boolean
  autoPlaySpeed?: number
  paddingX?: string
  marginTop?: string
  categoryForPosts?: Category
  button?: {
    text?: string
    internalPage?: {
      slug: string
    }
    style?: 'primary' | 'secondary'
  }
}

const getPostsByCategory = async (categoryId: string) => {
  const res = await fetch(`/api/get-posts/${categoryId}`)
  return await res.json().then((data) => data.docs)
}

export const GalleryBlock: React.FC<GalleryBlockProps> = ({
  heading,
  subheading,
  images = [],
  categories = [],
  displayCategories = false,
  autoPlay = true,
  autoPlaySpeed = 3000,
  paddingX = 'px-0',
  marginTop = 'mt-[107px]',
  categoryForPosts,
  button,
}) => {
  const swiperRef = useRef<SwiperType>(null)
  const [items, setItems] = useState<(GalleryImage | Category)[]>([])

  useEffect(() => {
    ;(async () => {
      if (displayCategories) {
        setItems(categories)
      } else if (categoryForPosts) {
        const posts = await getPostsByCategory(categoryForPosts.id)
        // Map posts to GalleryImage format
        const postImages: GalleryImage[] = posts.map((post: Post) => ({
          image: post.heroImage,
          caption: post.title,
        }))
        setItems(postImages)
      } else {
        setItems(images)
      }
    })()
  }, [displayCategories, images, categories])

  return (
    <div className={`relative gallery-block w-full ${paddingX} ${marginTop}`}>
      <div
        className={`flex flex-col items-center justify-center mx-auto ${heading ? 'mb-[50px]' : ''}`}
      >
        {heading && (
          <h2 className="text-[45px] text-center text-white font-libre-baskerville font-normal leading-normal align-baseline">
            {heading}
          </h2>
        )}
        {subheading && (
          <h3 className="text-xl text-center text-white font-quicksand font-medium leading-7 max-w-[1114px]">
            {subheading} 
          </h3>
        )}
      </div>
      <Swiper
        modules={[Autoplay]}
        autoplay={autoPlay ? { delay: autoPlaySpeed } : false}
        loop
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 8 },
          1024: {
            slidesPerView: displayCategories || categoryForPosts ? 4 : 3.6,
            spaceBetween: 32,
          },
        }}
      >
        {items?.map((item, i) => {
          const isCategory = displayCategories && 'title' in item
          const img =
            typeof (item as any).image === 'string' ? null : ((item as any).image as Media)

          return (
            <SwiperSlide key={i}>
              <div className="flex flex-col items-start">
                {img?.url && (
                  <Link
                    href={isCategory ? `/categories/${(item as Category).slug}` : '#'}
                    className="block"
                  >
                    <Image
                      src={img.url}
                      alt={
                        isCategory
                          ? (item as Category).title
                          : (item as GalleryImage).caption || img.alt || ''
                      }
                      className="w-full h-auto select-none rounded-md object-cover"
                      width={376.75}
                      height={405}
                    />
                  </Link>
                )}

                <p className="text-2xl leading-[150%] mt-6 text-white">
                  {isCategory ? (item as Category).title : (item as GalleryImage).caption}
                </p>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>

      {items.length > 4 && (
        <div className="flex justify-center gap-8 mt-[42px] w-[165px] mx-auto">
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
      )}
      {button && button.text && button.internalPage && (
        <div className="flex justify-center mt-[50px] mb-[120px]">
          <a
            href={button.internalPage?.slug || '#'}
            className={`px-6 py-3 rounded-full font-inter font-normal ${
              button.style === 'secondary' ? 'bg-gray-500' : 'bg-creme'
            }`}
          >
            {button.text}
          </a>
        </div>
      )}
    </div>
  )
}
