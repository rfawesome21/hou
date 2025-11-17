'use client'

import { Media, Size } from '@/payload-types'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function EnquiryClient() {
  const [enquiredProduct, setEnquiredProduct] = useState<{
    id: string
    title: string
    size: number
    image: Media
    sizes: { name: string; id: number; updatedAt: string; createdAt: string }[]
  } | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  useEffect(() => {
    const desc = JSON.parse(localStorage.getItem('enquiryPost') || 'null')
    setEnquiredProduct(desc)
  }, [])

  const handleUpdate = () => {
    if (!enquiredProduct) return

    const updatedProduct = selectedSize
      ? { ...enquiredProduct, size: Number(selectedSize) }
      : enquiredProduct

    localStorage.setItem('enquiryPost', JSON.stringify(updatedProduct))
    setEnquiredProduct(updatedProduct)
  }

  return (
    <div className="mt-[200px] px-40 mb-[60px]">
      {enquiredProduct && (
        <section>
          <h2 className="text-base font-quicksand font-normal leading-8 text-white mb-2">
            Your Hand-Picked Jewellery
          </h2>
          <div className="bg-white px-[73px] py-[46px] rounded-[9px] flex items-center">
            <Image
              src={enquiredProduct.image.url || ''}
              alt={enquiredProduct.title || 'Enquired Product'}
              width={150}
              height={150}
            />
            <div className="ml-6">
              <h1 className="font-libre-baskerville font-normal text-[36px] text-primary-green h-[65px]">
                {enquiredProduct.title}
              </h1>
              <div className="bg-background rounded-[40px] py-[14px] px-6">
                <p className="text-base leading-8 font-medium text-center text-white">
                  Size {enquiredProduct.size}
                </p>
              </div>
            </div>
            <div className="ml-auto">
              {enquiredProduct.sizes &&
                Array.isArray(enquiredProduct.sizes) &&
                enquiredProduct.sizes.length > 0 && (
                  <div className="relative">
                    <div className="relative inline-block">
                      <select
                        value={selectedSize || ''}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="w-[245px] py-3 h-[55px] rounded-full pl-6 text-base font-inter leading-8 focus:outline-none bg-background text-white appearance-none cursor-pointer relative"
                      >
                        <option value="">Select your size</option>
                        {enquiredProduct.sizes.map((size, index) => (
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
              <div
                onClick={() => {
                  localStorage.removeItem('enquiryPost')
                  setEnquiredProduct(null)
                }}
                className="mt-4 bg-background rounded-full px-6 py-[14px] w-[111px] flex items-center justify-center"
              >
                <Image
                  src={'/icons/delete.svg'}
                  alt="Delete"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />
              </div>
              <button
                onClick={handleUpdate}
                className="text-white bg-primary-green rounded-full px-6 py-[14px] mt-4 w-full"
              >
                Update List
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
