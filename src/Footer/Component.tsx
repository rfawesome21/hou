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
    <footer className="mt-auto bg-primary-green py-[49px] pl-[56.5px] pr-[173px] z-10">
      <div className="flex">
        <div>
          <Link href="/">
            <Logo
              loading="eager"
              priority="high"
              className="invert dark:invert-0 h-[183px] w-[66px]"
            />
          </Link>
          <Link
            href={'https://www.instagram.com/houseofkaia'}
            target="_blank"
            className="flex mt-3 space-x-[5px] text-creme text-[13px] font-quicksand leading-[19.5px] items-center font-light"
          >
            <Image src={'/icons/instagram.svg'} alt="Instagram" width={28} height={28} />
            <span>@houseofkaia</span>
          </Link>
          <Link
            href={'mailto:studio@houseofkaiajewellery.com'}
            target="_blank"
            className="flex mt-3 space-x-[5px] text-creme text-[13px] font-quicksand leading-[19.5px] items-center font-light"
          >
            <Image src={'/icons/mail.svg'} alt="Email" width={28} height={28} />
            <span>studio@houseofkaiajewellery.com</span>
          </Link>
        </div>
        <div className="ml-auto">
          <h1 className="text-white text-base font-libre-baskerville leading-[24px]">
            House of Kaia
          </h1>
          <nav className="flex flex-col mt-6 space-y-6">
            {navItems.slice(0, 3).map(({ link }, i) => {
              return (
                <CMSLink
                  key={i}
                  {...link}
                  appearance="link"
                  className="text-white text-base font-quicksand font-medium leading-[24px]"
                />
              )
            })}
          </nav>
        </div>
        <div className="ml-[107px]">
          <h1 className="text-white text-base font-libre-baskerville leading-[24px]">Links</h1>
          <nav className="flex flex-col mt-6 space-y-6">
            {navItems.slice(3).map(({ link }, i) => {
              return (
                <CMSLink
                  key={i}
                  {...link}
                  appearance="link"
                  className="text-white text-base font-quicksand leading-[24px]"
                />
              )
            })}
          </nav>
        </div>
      </div>
      <div className="mt-[50px] flex justify-center items-center">
        <p className="font-source-serif-pro leading-[150%] text-creme">
          <span className="font-normal">Designed with soul </span>
          <span className="font-light">for House of Kaia, {new Date().getFullYear()}</span>
        </p>
      </div>
    </footer>
  )
}
