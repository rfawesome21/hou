'use client'

import Link from 'next/link'
import React from 'react'

export default function OurStudioClient() {
  return (
    <div className="relative w-full h-[331px]">
      {/* Full-width SVG background */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1446 331"
        fill="none"
        className="absolute bottom-0 left-0 w-full h-auto"
        preserveAspectRatio="none"
      >
        <path
          d="M1446 444H-2.99958L-3 81.228C517.415 -11.3017 1180.76 -7.46085 1446 9.5766V444Z"
          fill="#E7E3E0"
        />
      </svg>

      {/* Content overlay */}
      <div className="relative z-10 flex justify-center space-x-[334px] items-center h-full w-full">
        <div className='flex flex-col mt-2.5'>
          <h1 className="text-[40px] font-libre-baskerville leading-[48px] font-normal text-primary-green">Contact</h1>
          <Link className='text-xl font-quicksand leading-10 tracking-[0.4px] font-normal text-background' href="mailto:studio@houseofkaiajewellery.com">studio@houseofkaiajewellery.com</Link>
          <Link className='text-xl font-quicksand leading-10 tracking-[0.4px] font-normal text-background' href="tel:+919324877252"> +91 9324 877252</Link>
        </div>
        <div className='flex flex-col mt-2.5'>
          <h1 className="text-[40px] font-libre-baskerville leading-[48px] font-normal text-primary-green">Location</h1>
          <p className='text-xl font-quicksand leading-10 tracking-[0.4px] font-normal text-background'>Block J, Bharat Diamond <br /> Bourse, BKC <br /> Mumbai 400051</p>
        </div>
      </div>
    </div>
  )
}
