'use client'

import React, { useEffect, useState } from 'react'
import type { Post, Media, Category } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import RichText from '@/components/RichText'

type ExploreSectionBlockProps = {
  heading?: string
  numberOfColumns?: number
  backgroundColor?: 'bg-creme' | 'bg-background' | 'bg-white' | 'bg-black' | 'bg-primary-green'
  category?: Category
  posts?: Post[]
}

export const ExploreSectionBlock: React.FC<ExploreSectionBlockProps> = ({
  heading,
  numberOfColumns = 3,
  backgroundColor = 'bg-white',
  category,
  posts: initialPosts = [],
}) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(!initialPosts.length)
  const [loadingMore, setLoadingMore] = useState(false)

  const fetchPosts = async (pageNum: number) => {
    if (!category) return { docs: [], totalPages: 1 }
    const res = await fetch(`/api/get-posts/${category.id}?page=${pageNum}`)
    if (!res.ok) throw new Error('Failed to fetch posts')
    return res.json()
  }

  // Fetch only if posts not pre-provided
  useEffect(() => {
    if (!category || initialPosts.length) return
    ;(async () => {
      try {
        setLoading(true)
        const data = await fetchPosts(1)
        setPosts(data.docs)
        setTotalPages(data.totalPages)
      } finally {
        setLoading(false)
      }
    })()
  }, [category, initialPosts.length])

  const handleLoadMore = async () => {
    if (page >= totalPages) return
    try {
      setLoadingMore(true)
      const next = page + 1
      const data = await fetchPosts(next)
      setPosts((prev) => [...prev, ...data.docs])
      setPage(next)
    } finally {
      setLoadingMore(false)
    }
  }

  return (
    <section className={`${backgroundColor} py-[60px] sm:py-[73px]`}>
      <div className="px-6 sm:px-10 md:px-20">
        {heading && (
          <h2 className="text-3xl sm:text-4xl md:text-[32px] font-libre-baskerville leading-[40px] sm:leading-[48px] text-white mb-8">
            {heading}
          </h2>
        )}

        {loading ? (
          <p className="text-center text-white">Loading...</p>
        ) : posts.length > 0 ? (
          <>
            {/* RESPONSIVE GRID */}
            <div
              className="
                grid gap-9
                grid-cols-1               /* mobile default = 2 columns */
                md:grid-cols-[var(--cols)] /* desktop uses dynamic columns */
              "
              style={
                {
                  '--cols': `repeat(${numberOfColumns}, minmax(0, 1fr))`,
                } as React.CSSProperties
              }
            >
              {posts.map((post) => {
                const imgUrl =
                  typeof (post.heroImage as Media)?.url === 'string'
                    ? (post.heroImage as Media).url
                    : ''

                return (
                  <Link href={`/posts/${post.slug}`} key={post.id}>
                    {/* Responsive Image Container */}
                    {imgUrl && (
                      <div className="relative w-full aspect-[16/10] rounded-md overflow-hidden">
                        <Image src={imgUrl} alt={post.title} fill className="object-cover" />
                      </div>
                    )}

                    <div>
                      <h3 className="mt-4 text-xl sm:text-2xl font-libre-baskerville leading-8 sm:leading-9 text-white">
                        {post.title}
                      </h3>

                      {post.content && (
                        <RichText
                          data={post.content}
                          className="mt-1 text-base sm:text-lg text-creme leading-[150%] font-quicksand"
                          enableGutter={false}
                        />
                      )}

                      <h6 className="mt-1 text-base sm:text-lg text-white leading-[150%] font-quicksand">
                        Please enquire
                      </h6>
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* LOAD MORE BUTTON */}
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
          <p className="text-center text-gray-400">No posts found.</p>
        )}
      </div>
    </section>
  )
}
