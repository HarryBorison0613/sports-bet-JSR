import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import PostBody from '@/components/post/post-body'
import PostHeader from '@/components/post/post-header'
import Layout from '@/components/layouts/layout'
import Meta from '@/components/meta/meta'
import {
  getAllPostsWithSlug,
  getAllSettings,
  getPostAndMorePosts,
  getPostsByTag,
} from '@/lib/api'
import TagPostsGrid from '@/components/post/posts-by-tag-002'
import { PostSkeleton } from '@/components/skeleton'

export default function Post({
  post,
  morePosts,
  settings,
  tagTitle,
  tagLink,
  sameTagPosts,
  articlesTags,
}) {
  const router = useRouter()

  if (!router.isFallback && !post?.slug) return <ErrorPage statusCode={404} />
  if (router.isFallback) return <PostSkeleton />

  return (
    <>
      <Meta article={post} settings={settings} articlesTags={articlesTags} />
      <Layout settings={settings}>
        <article className="single-post__article">
          <PostHeader post={post} />
          <PostBody
            post={post}
            content={post.html}
            settings={settings}
            title={post.title}
          />
        </article>
        <div className="bg-body mb-10">
          {sameTagPosts.length > 0 && (
            <TagPostsGrid
              posts={sameTagPosts}
              tagTitle={tagTitle}
              tagLink={tagLink}
            />
          )}
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps({ params }) {
  try {
    const { post, morePosts } = await getPostAndMorePosts(params.slug)
    const sameTagPosts = await getPostsByTag(post.tags[0].slug, 5)
    const tagTitle = 'ARTIGOS RELACIONADOS'
    const tagLink = '/tag/' + post.tags[0].slug
    const settings = await getAllSettings()
    const articlesTags = Object.keys(post.tags)
      .reduce((all, item) => {
        all.push(post.tags[item].name)
        return all
      }, [])
      .join(', ')
    return {
      props: {
        post,
        morePosts: morePosts || [],
        settings,
        tagTitle,
        tagLink,
        sameTagPosts,
        articlesTags,
      },
      revalidate: 1,
    }
  } catch (error) {
    return { notFound: true, revalidate: 1 }
  }
}

export async function getStaticPaths() {
  const allPosts = (await getAllPostsWithSlug()) || []

  return {
    paths: allPosts.slice(0, 50).map((post) => `/${post.slug}`),
    fallback: true,
  }
}
