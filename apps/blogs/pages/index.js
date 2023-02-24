import HeroPost from '@/components/home/hero-post'
import HomePost from '@/components/home/home-content'
import Layout from '@/components/layouts/layout'
import Meta from '@/components/meta/meta'
import CategoryMatrix from '@/components/shared/categories-matrix'
import TagPostsGrid from '@/components/post/posts-by-tag-002'
import { getAllPostsForHome, getPostsByTag, getAllSettings } from '@/lib/api'

export default function Index({
  allPosts,
  tagPostsTop,
  tagPostsBrasil,
  postMeta,
  settings,
  customTagTitle,
  customTagLink,
}) {
  const heroPost = allPosts.slice(0, 4)
  const thenPosts = allPosts.slice(4, 14)
  const morePosts = allPosts.slice(14)

  return (
    <>
      <Meta settings={settings} />
      <Layout settings={settings}>
        {heroPost && <HeroPost posts={heroPost} />}
        {morePosts.length > 0 && (
          <HomePost
            posts={morePosts}
            thenPosts={thenPosts}
            meta={postMeta}
            all_posts_count={allPosts.lenght}
            tag_top={tagPostsTop}
          />
        )}
        {<CategoryMatrix settings={settings} />}
        {
          <TagPostsGrid
            posts={tagPostsBrasil}
            tagTitle={customTagTitle}
            tagLink={customTagLink}
          />
        }
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = (await getAllPostsForHome()) || []
  const tagPostsTop = (await getPostsByTag('noticias-do-dia')) || []
  const tagPostsBrasil = (await getPostsByTag('brasil', 5)) || []
  const settings = await getAllSettings()
  const customTagTitle = 'Brasil'
  const customTagLink = '/tag/brasil'


  const postMeta = allPosts.meta
  return {
    props: {
      allPosts,
      tagPostsTop,
      postMeta,
      settings,
      tagPostsBrasil,
      customTagTitle,
      customTagLink,
    },
    revalidate: 3,
  }
}
