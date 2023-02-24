import GhostContentAPI from '@tryghost/content-api'
import { 
  defaultSettings,
} from '@/lib/env'

const api = new GhostContentAPI({
      url: `${process.env.NEXT_PUBLIC_GHOST_API_URL}`,
      key: `${process.env.NEXT_PUBLIC_GHOST_API_KEY}`,
      version: 'v3.0',
})

const is404 = (error) => /not found/i.test(error.message)

export async function getAllSettings() {
  const settings = await api.settings.browse()
  return { ...settings, defaultSettings: defaultSettings }
}

export async function getAllPostsWithSlug() {
  const params = {
    fields: "excerpt, published_at,  slug, title",
    formats: "plaintext",
    limit: "all",
    order: 'published_at DESC',
  }
  const posts = await api.posts.browse(params)
  return posts
}

export async function getAllPostsForHome(page = 1) {
  const params = {
    limit: '28',
    page: page,
    include: ['authors', 'tags'],
    order: 'published_at DESC',
  }
  const posts = await api.posts.browse(params)
  return posts
}

// retrieve all posts associated with a particular tag
export async function getPostsByTag(tag, count = 4) {
  const params = {
    filter: `tag:${tag}`,
    limit: count,
    include: ['authors', 'tags'],
  }
  const posts = await api.posts.browse(params).catch((err) => {
    console.error(err)
  })
  return posts
}

export async function getTagBySlug(slug) {
  const tag = await api.tags.read({ slug }, { include: 'count.posts' })
  return tag
}

export async function getAllPostsByTagSlug(slug, page = 1) {
  const params = {
    limit: '28',
    page: page,
    include: ['authors', 'tags'],
    filter: `tag:${slug}`,
  }
  const posts = await api.posts.browse(params)
  return posts
}

//Retrive tag page
export async function getAllTags() {
  const params = {
    fields: 'slug',
    limit: 'all',
  }
  const tags = await api.tags.browse(params)
  return tags
}

// export async function getAllTags() {
//   const tags = await api.tags.browse({ limit: 'all' });
//   return tags;
// }

export async function getPostAndMorePosts(slug) {
  // get full post
  const singleObjectParams = {
    slug,
    include: ['authors', 'tags'],
  }
  const post = await api.posts.read(singleObjectParams).catch((error) => {
    // Don't throw if an slug doesn't exist
    if (is404(error)) return
    throw error
  })

  // get more stories / post
  const moreObjectParams = {
    limit: 3,
    include: ['authors', 'tags'],
  }

  const morePosts = (await api.posts.browse(moreObjectParams))
    ?.filter(({ slug }) => post.slug !== slug)
    .slice(0, 5)

  return { post, morePosts }
}
