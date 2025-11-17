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

const PAGE_SLUG = 'our-studio'

// 🔥 Fetch the our-studio page from Payload
const queryOurStudioPage = cache(async () => {
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

  const page = await queryOurStudioPage()

  if (!page) {
    return <PayloadRedirects url="/our-studio" />
  }

  const { hero, layout } = page

  return (
    <article>

      {/* Allow Payload redirects if needed */}
      <PayloadRedirects disableNotFound url="/our-studio" />

      {/* Live preview for draft mode */}
      {draft && <LivePreviewListener />}

      {/* Render Hero Section */}
      <RenderHero {...hero} />
      {/* Render CMS Blocks */}
      <RenderBlocks blocks={layout} />

      {/* Client component for any client-side logic */}
      <PageClient />
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await queryOurStudioPage()
  return generateMeta({ doc: page })
}
