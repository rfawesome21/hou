import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import Image from 'next/image'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  return (
    <footer
      className="
        mt-auto bg-primary-green 
        py-[49px]
        px-6                /* mobile padding */
        md:pl-[56.5px] 
        md:pr-[173px]
        z-10
      "
    >
      <div
        className="
          flex flex-col md:flex-row
          gap-10 md:gap-0
        "
      >
        {/* LEFT COLUMN — LOGO + CONTACT */}
        <div>
          <Link href="/">
            <Logo
              loading="eager"
              priority="high"
              className="
                invert dark:invert-0 
                h-[140px] w-[50px]     /* mobile size */
                md:h-[183px] md:w-[66px]
              "
            />
          </Link>

          <Link
            href="https://www.instagram.com/houseofkaia"
            target="_blank"
            className="
              flex mt-3 space-x-[5px] 
              text-creme text-[13px] 
              font-quicksand leading-[19.5px] 
              items-center font-light
            "
          >
            <Image src="/icons/instagram.svg" alt="Instagram" width={24} height={24} />
            <span>@houseofkaia_</span>
          </Link>

          <Link
            href="mailto:studio@houseofkaiajewellery.com"
            target="_blank"
            className="
              flex mt-3 space-x-[5px] 
              text-creme text-[13px] 
              font-quicksand leading-[19.5px] 
              items-center font-light
            "
          >
            <Image src="/icons/mail.svg" alt="Email" width={24} height={24} />
            <span>studio@houseofkaiajewellery.com</span>
          </Link>
        </div>

        {/* MIDDLE + RIGHT COLUMNS — NOW SIDE-BY-SIDE ON MOBILE */}
        <div
          className="
            flex w-full 
            justify-between 
            md:block 
            md:w-auto 
            md:ml-auto
          "
        >
          {/* HOUSE OF KAIA COLUMN */}
          <div className="w-1/2 md:w-auto">
            <h1 className="text-white text-base font-libre-baskerville leading-[24px]">
              House of Kaia
            </h1>
            <nav className="flex flex-col mt-6 space-y-6">
              {navItems.slice(0, 3).map(({ link }, i) => (
                <CMSLink
                  key={i}
                  {...link}
                  appearance="link"
                  className="text-white text-base font-quicksand font-medium leading-[24px]"
                />
              ))}
            </nav>
          </div>

          {/* LINKS COLUMN */}
          <div className="w-1/2 md:w-auto md:ml-[107px]">
            <h1 className="text-white text-base font-libre-baskerville leading-[24px]">Links</h1>
            <nav className="flex flex-col mt-6 space-y-6">
              {navItems.slice(3).map(({ link }, i) => (
                <CMSLink
                  key={i}
                  {...link}
                  appearance="link"
                  className="text-white text-base font-quicksand leading-[24px]"
                />
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* BOTTOM COPYRIGHT */}
      <div className="mt-[50px] flex justify-center items-center text-center px-4">
        <p className="font-source-serif-pro leading-[150%] text-creme text-sm md:text-base">
          <span className="font-normal">Designed with soul </span>
          <span className="font-light">for House of Kaia, {new Date().getFullYear()}</span>
        </p>
      </div>
    </footer>
  )
}
