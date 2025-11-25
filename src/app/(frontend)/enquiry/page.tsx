import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

const PAGE_SLUG = 'enquiry'

// 🔥 Fetch the enquiry page from Payload
const queryEnquiryPage = cache(async () => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: PAGE_SLUG,
      },
    },
  })

  return (result.docs?.[0] as RequiredDataFromCollectionSlug<'pages'>) || null
})

export default async function Page() {
  const { isEnabled: draft } = await draftMode()

  const page = await queryEnquiryPage()

  if (!page) {
    return <PayloadRedirects url="/enquiry" />
  }

  const { hero, layout } = page

  return (
    <article className='px-40'>
      {/* Client component that handles localStorage description */}
      <PageClient />

      {/* Allow Payload redirects if needed */}
      <PayloadRedirects disableNotFound url="/enquiry" />

      {/* Live preview for draft mode */}
      {draft && <LivePreviewListener />}

      {/* Render Hero Section */}
      <RenderHero {...hero} />

      {/* Render CMS Blocks */}
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await queryEnquiryPage()
  return generateMeta({ doc: page })
}
