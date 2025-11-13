'use client'

import React, { useEffect, useState } from 'react'
import type { Post, Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { Category } from '@/payload-types'
import RichText from '@/components/RichText'

type ExploreSectionBlockProps = {
  heading?: string
  numberOfColumns?: number
  backgroundColor?: 'bg-creme' | 'bg-background' | 'bg-white' | 'bg-black' | 'bg-primary-green'
  category?: Category
  posts?: Post[] // optional posts prop
}

export const ExploreSectionBlock: React.FC<ExploreSectionBlockProps> = ({
  heading,
  numberOfColumns = 3,
  backgroundColor = 'bg-white',
  category,
  posts: initialPosts = [],
}) => {
    console.log('ExploreSectionBlock rendered with initialPosts:', initialPosts)
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(!initialPosts.length) // only loading if no posts passed
  const [loadingMore, setLoadingMore] = useState(false)

  const fetchPosts = async (pageNum: number) => {
    if (!category) return { docs: [], totalPages: 1 }
    const res = await fetch(`/api/get-posts/${category.id}?page=${pageNum}`)
    if (!res.ok) throw new Error('Failed to fetch posts')
    return res.json()
  }

  useEffect(() => {
    // only fetch if no posts were passed
    if (!category || initialPosts.length) return
    ;(async () => {
      try {
        setLoading(true)
        const data = await fetchPosts(1)
        setPosts(data.docs)
        setTotalPages(data.totalPages)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [category, initialPosts.length])

  const handleLoadMore = async () => {
    if (page >= totalPages) return
    try {
      setLoadingMore(true)
      const nextPage = page + 1
      const data = await fetchPosts(nextPage)
      setPosts((prev) => [...prev, ...data.docs])
      setPage(nextPage)
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingMore(false)
    }
  }

  return (
    <section className={`${backgroundColor} py-[73px]`}>
      <div className="px-20">
        {heading && (
          <h2 className="text-4xl md:text-[32px] font-libre-baskerville leading-[48px] text-white mb-8">
            {heading}
          </h2>
        )}

        {loading ? (
          <p className="text-center text-white">Loading...</p>
        ) : posts.length > 0 ? (
          <>
            <div
              className={`grid gap-9`}
              style={{
                gridTemplateColumns: `repeat(${numberOfColumns}, minmax(0, 1fr))`,
              }}
            >
              {posts.map((post) => (
                <Link href={`/posts/${post.slug}`} key={post.id}>
                  {post.heroImage && (
                    <div className="relative h-[238px] w-[404px]">
                      <Image
                        src={typeof (post.heroImage as Media)?.url === 'string' ? (post.heroImage as Media).url! : ''}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="mt-6 text-2xl font-libre-baskerville leading-9 text-white">
                      {post.title}
                    </h3>
                    {post.content && (
                      <RichText
                        data={post.content}
                        className="mt-1 lg:text-xl text-creme leading-[150%] font-quicksand"
                        enableGutter={false}
                      />
                    )}
                    <h6 className="mt-1 lg:text-xl text-white leading-[150%] font-quicksand">
                      Please enquire
                    </h6>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More button */}
            {page < totalPages && (
              <div className="text-center mt-12">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="px-6 py-3 bg-creme text-primary-green text-base font-inter font-medium rounded-full hover:opacity-90 transition"
                >
                  {loadingMore ? 'Loading…' : 'Load More'}
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500">No posts found.</p>
        )}
      </div>
    </section>
  )
}
