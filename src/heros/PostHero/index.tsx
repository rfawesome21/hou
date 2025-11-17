'use client'

import React, { useState } from 'react'

import type { Post, Media, Size } from '@/payload-types'

import Link from 'next/link'
import Image from 'next/image'
import RichText from '@/components/RichText'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { heroImage, title, breadcrumbs, otherImages, content, sizes } = post

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [error, setError] = useState('')

  const handleEnquire = () => {
    if (!selectedSize) {
      setError('Please select a size before enquiring.')
      return
    }

    // store info and redirect
    localStorage.setItem(
      'enquiryPost',
      JSON.stringify({
        id: post.id,
        title: post.title,
        size: selectedSize,
        image: heroImage,
        sizes: sizes,
      }),
    )

    window.location.href = '/enquiry'
  }

  return (
    <div className="relative">
      <div className="mt-28 px-28 z-20 relative">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="text-base font-quicksand text-white leading-8 h-12">
            {breadcrumbs.map((crumb, index) => (
              <span key={index}>
                {crumb.link ? (
                  <Link href={crumb.link} className="hover:underline">
                    {crumb.label}
                  </Link>
                ) : (
                  <span>{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && '>'}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-x-14">
          <div className="flex flex-col relative z-30">
            <Image
              src={typeof heroImage === 'object' && heroImage?.url ? heroImage.url : ''}
              alt={title || 'Post Hero Image'}
              width={502}
              height={684}
              className="object-cover mb-1.5 rounded-[8px] relative z-30"
            />
            <div className="flex gap-x-9">
              {otherImages &&
                otherImages.length > 0 &&
                otherImages.map((image, index) => (
                  <Image
                    key={index}
                    src={
                      typeof image === 'object' &&
                      image?.image &&
                      typeof image.image === 'object' &&
                      'url' in image.image &&
                      (image.image as Media).url
                        ? ((image.image as Media).url as string)
                        : ''
                    }
                    alt={title || 'Post Other Image'}
                    width={142}
                    height={142}
                    className="object-cover relative z-30"
                  />
                ))}
            </div>
          </div>

          <div className="flex flex-col justify-center relative z-30">
            <h1 className="text-[64px] text-creme font-libre-baskerville mb-7">{title}</h1>
            {content && (
              <RichText className="text-2xl font-quicksand leading-9 text-white" data={content} />
            )}

            <div className="flex gap-x-7 mt-[71px]">
              {error && (
                <div className="absolute top-96 left-0 text-red-500 text-sm font-quicksand">
                  {error}
                </div>
              )}
              {/* 👇 moved dropdown here (still visually aligned to creme div) */}
              {sizes && Array.isArray(sizes) && sizes.length > 0 && (
                <div className="relative">
                  <div className="relative inline-block">
                    <select
                      value={selectedSize || ''}
                      onChange={(e) => {
                        setSelectedSize(e.target.value)
                        setError('')
                      }}
                      className="w-[245px] py-3 h-[55px] rounded-full pl-6 text-base font-inter leading-8 focus:outline-none bg-background text-white appearance-none cursor-pointer relative"
                    >
                      <option value="">Select your size</option>
                      {sizes.map((size, index) => (
                        <option key={index} value={(size as Size)?.id || (size as Size)?.name}>
                          {(size as Size)?.name}
                        </option>
                      ))}
                    </select>
                    <Image
                      src="/icons/arrow_drop_down.svg"
                      alt="Open"
                      width={24}
                      height={24}
                      className="absolute left-48 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                  </div>
                </div>
              )}
              <button
                onClick={handleEnquire}
                className="w-[173px] px-6 py-3 bg-primary-green text-white text-base font-inter leading-8 font-medium rounded-full hover:opacity-90 transition"
              >
                Please enquire
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Creme background stays below visually */}
      <div className="bg-creme w-full mt-[-380px] lg:h-[438px] pt-10 z-0" />
    </div>
  )
}
