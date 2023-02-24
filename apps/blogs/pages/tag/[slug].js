import { useRouter } from 'next/router'
import Meta from '@/components/meta/meta'
import {
  getAllTags,
  getAllPostsByTagSlug,
  getTagBySlug,
  getAllSettings,
  getPostsByTag,
} from '@/lib/api'
import Layout from '@/components/layouts/layout'
import { PostSkeleton } from '@/components/skeleton'
import HeadingTag from '@/components/tag/tag-header'
import HeroTag from '@/components/tag/tag-hero'
import CategoryMatrix from '@/components/shared/categories-matrix'
import TagPost from '@/components/tag/tag-content'
import ErrorPage from 'next/error'

export default function Tag({
  posts,
  tagData,
  settings,
  postMeta,
  tagPostsTop,
  slug,
}) {
  const router = useRouter()

  //console.log(posts)

  const heroPost = posts.slice(0, 2)
  if (posts.length > 2) {
    var thenPosts = posts.slice(2, 12)
  } else {
    var thenPosts = posts.slice(0, 12)
  }
  const morePosts = posts.slice(12)
  const lastNews = tagPostsTop.slice(0, 4)

  if (!router.isFallback && !posts) return <ErrorPage statusCode={404} />
  if (router.isFallback) return <PostSkeleton />

  return (
    <>
      <Meta settings={settings} tag={tagData} />
      <Layout settings={settings}>
        {<HeadingTag tag={tagData} />}
        {tagData.count.posts > 2 && <HeroTag posts={heroPost} />}
        {thenPosts && (
          <TagPost
            posts={morePosts}
            slug={slug}
            thenPosts={thenPosts}
            meta={postMeta}
            tag_top={lastNews}
          />
        )}

        {<CategoryMatrix settings={settings} />}
      </Layout>
    </>
  )
}

export async function getStaticProps({ params }) {
  try {
    const { slug } = params
    const posts = await getAllPostsByTagSlug(slug)
    const tagData = await getTagBySlug(slug)
    const settings = await getAllSettings()
    const tagPostsTop = (await getPostsByTag('noticias-do-dia')) || []
    const postMeta = posts.meta
    return {
      props: { posts, tagData, settings, postMeta, tagPostsTop, slug },
      revalidate: 1,
    }
  } catch (error) {
    return { notFound: true, revalidate: 1 }
  }
}

export async function getStaticPaths() {
  const tags = await getAllTags()
  const paths = tags.slice(0, 50).map(({ slug }) => ({ params: { slug } }))
  // const paths = tags.slice(0, 2000).map((slug) => `/tag/${slug.slug}`)

  return {
    paths,
    fallback: 'blocking',
  }
}
