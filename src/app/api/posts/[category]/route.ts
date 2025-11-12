import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(req: Request, { params }: { params: { category: string } }) {
  const payload = await getPayload({ config })

  // Await the param value as Next.js requires
  const category = await params.category

  const posts = await payload.find({
    collection: 'posts',
    where: {
      categories: { equals: category },
    },
  })

  return new Response(JSON.stringify(posts.docs), {
    headers: { 'Content-Type': 'application/json' },
  })
}
