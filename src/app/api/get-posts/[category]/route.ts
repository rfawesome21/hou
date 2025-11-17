import { getPayload } from 'payload'
import config from '@payload-config'

interface Params {
  category: string
}

export async function GET(req: Request, context: { params: Promise<Params> }) {
  const payload = await getPayload({ config })

  const { category } = await context.params

  const page = Number(new URL(req.url).searchParams.get('page')) || 1

  const posts = await payload.find({
    collection: 'posts',
    where: {
      categories: { equals: category },
    },
    limit: 6,
    page,
    sort: 'createdAt_desc',
  })

  return new Response(JSON.stringify(posts), {
    headers: { 'Content-Type': 'application/json' },
  })
}
