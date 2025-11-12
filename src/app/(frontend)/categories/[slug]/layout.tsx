import type { Metadata } from 'next'

import React from 'react'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return <section className='bg-creme'>{children}</section>
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
