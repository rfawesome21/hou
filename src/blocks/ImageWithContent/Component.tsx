'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

type Media = {
  id: string
  url: string
  alt?: string
}

export interface AccordionItem {
  title: string
  content: any
}

export interface ImageWithContentProps {
  heading?: string
  headingClasses?: string
  image: Media | string
  richText?: any
  imagePosition?: 'left' | 'right'
  backgroundColor?: string
  button?: {
    text: string
    internalPage?: { slug: string }
    style?: 'primary' | 'secondary'
  }
  accordions?: AccordionItem[]
  gap?: string
  marginTop?: 'mt-0' | 'mt-[77px]'
  paddingTop?: string
  showGetInTouch?: boolean
  imageHeight?: 'h-[1081px]' | 'h-[951px]'
}

export const ImageWithContentBlock: React.FC<ImageWithContentProps> = ({
  heading,
  headingClasses = 'text-5xl font-libre-baskerville text-black leading-normal',
  image,
  richText,
  imagePosition = 'left',
  backgroundColor = 'bg-white',
  button,
  accordions = [],
  gap = 'gap-[115px]',
  marginTop = 'mt-0',
  paddingTop = 'pt-[0px]',
  showGetInTouch = true,
  imageHeight = 'h-[1081px]',
}) => {
  const img = typeof image === 'string' ? null : image
  const [openIndexes, setOpenIndexes] = useState<number[]>([])

  const toggleAccordion = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    )
  }

  return (
    <section className={`${backgroundColor} w-full relative pb-[42px] ${marginTop} ${paddingTop}`}>
      <div
        className={`
          flex flex-col md:flex-row items-start ${gap}
          ${imagePosition === 'right' ? 'md:flex-row-reverse' : ''}
          px-6 md:px-0
        `}
      >
        {/* IMAGE */}
        {img && (
          <div className={`relative w-full md:w-1/2 max-w-full ${imageHeight}`}>
            <Image src={img.url} alt={img.alt || ''} fill className="object-cover rounded-md" />
          </div>
        )}

        {/* CONTENT COLUMN */}
        <div className="flex flex-col w-full md:w-1/2 mt-10 md:mt-0">
          {/* HEADING */}
          {heading && (
            <h2
              className={`
                text-[32px] sm:text-[40px] md:text-[46px]
                max-w-full md:w-[300px]
                mx-auto md:mx-0
                ${imagePosition === 'right' ? 'md:text-right text-center' : 'md:text-left text-center'}
                ${headingClasses}
              `}
            >
              {heading}
            </h2>
          )}

          {/* UNDERLINE */}
          <div className="h-px w-[180px] sm:w-[260px] md:w-[469px] bg-creme mt-[38px] mb-6 mx-auto md:mx-0" />

          {/* ACCORDIONS */}
          {accordions.length > 0 && (
            <div className="w-full max-w-full md:w-[469px] mx-auto md:mx-0">
              {accordions.map((acc, index) => {
                const isOpen = openIndexes.includes(index)

                return (
                  <div key={index} className="w-full">
                    <button
                      className="w-full text-left text-2xl sm:text-3xl text-white font-libre-baskerville flex justify-between items-center"
                      onClick={() => toggleAccordion(index)}
                    >
                      <span>{acc.title}</span>
                      <span className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0">
                        {isOpen ? (
                          <Image src={'/icons/Minus.svg'} alt="Collapse" width={48} height={48} />
                        ) : (
                          <Image src={'/icons/Plus.svg'} alt="Expand" width={48} height={48} />
                        )}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pb-4">
                            <RichText
                              data={acc.content}
                              className="text-lg sm:text-xl text-white font-libre-baskerville my-4"
                              enableGutter={false}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="h-px w-full bg-creme my-6" />
                  </div>
                )
              })}
            </div>
          )}

          {/* RICH TEXT */}
          {richText && (
            <RichText
              data={richText}
              className={`
                font-quicksand text-lg sm:text-xl md:text-2xl font-normal leading-[150%] mt-6
                ${imagePosition === 'right' ? 'md:text-right text-center' : 'md:text-left text-center'}
              `}
              enableGutter={false}
            />
          )}

          {/* BUTTON */}
          {button?.text && button.internalPage && (
            <a
              href={button.internalPage.slug || '#'}
              className={`
                mt-6 inline-block px-6 py-3 rounded-full font-inter font-normal
                ${button.style === 'secondary' ? 'bg-gray-500' : 'bg-creme'}
                mx-auto md:${imagePosition === 'right' ? 'ml-auto' : 'mr-auto'}
              `}
            >
              {button.text}
            </a>
          )}

          {/* GET IN TOUCH SECTION */}
          {showGetInTouch && (
            <>
              <div className="mt-[100px] md:mt-[150px] z-30 text-center md:text-left">
                <h1 className="leading-[40px] md:leading-[48px] text-[32px] md:text-[40px] font-libre-baskerville text-primary-green">
                  Get in Touch
                </h1>
                <p className="mt-6 md:mt-10 text-lg md:text-xl font-quicksand leading-[30px] tracking-[0.4px] text-background">
                  Every piece of jewellery starts with a conversation. <br /> Book an appointment
                  with us today.
                </p>

                <div className="flex justify-center md:justify-start gap-x-5 mt-8 md:mt-10">
                  <Link href="mailto:studio@houseofkaia.com" className="flex items-center gap-3">
                    <Image src={'/icons/mail-green.svg'} alt="mail" width={24} height={24} />
                  </Link>
                  <Link href={'https://www.instagram.com/houseofkaia'} target="_blank">
                    <Image
                      src={'/icons/instagram-green.svg'}
                      alt="Instagram"
                      width={24}
                      height={24}
                    />
                  </Link>
                </div>
              </div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1446 444"
                fill="none"
                className="absolute bottom-0 left-0 w-full h-[315px] md:h-auto"
                preserveAspectRatio="none"
              >
                <path
                  d="M1446 444H-2.99958L-3 81.228C517.415 -11.3017 1180.76 -7.46085 1446 9.5766V444Z"
                  fill="#E7E3E0"
                />
              </svg>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
