import GhostContentAPI, { GhostAPI, PostOrPage } from '@tryghost/content-api'
import type { IGhostPost } from 'src/interface'
import { formatDateDistance } from 'src/utils/date'

export class GhostRepository {
  ghost: GhostAPI

  constructor() {
    this.ghost = new GhostContentAPI({
      url: `${process.env?.GHOST_ENDPOINT}`,
      key: `${process.env.GHOST_API_KEY}`,
      version: 'v3.0' as any,
    })
  }

  normalizePost(post: IGhostPost): IGhostPost {
    return {
      ...post,
      formatted_time: formatDateDistance(post?.published_at),
    }
  }

  getGhostSportName(sport: string) {
    switch (sport) {
      case 'hockey-no-gelo':
        return 'hoquei'
      default:
        return sport
    }
  }

  async findFeaturedPosts(sport: string): Promise<IGhostPost[]> {
    const sportName = this.getGhostSportName(sport)

    const posts = (await this.ghost.posts.browse({
      limit: 8,
      include: ['authors', 'tags'],
      filter: `tag:${sportName}+featured:true`,
    })) as unknown as IGhostPost[]

    return posts?.map((post) => this.normalizePost(post))
  }

  async findLatestPosts(sport: string) {
    const sportName = this.getGhostSportName(sport)

    const posts = (await this.ghost.posts.browse({
      limit: 5,
      include: ['authors', 'tags'],
      filter: `tag:${sportName}`,
    })) as unknown as IGhostPost[]

    return posts?.map((post) => this.normalizePost(post))
  }

  async findPosts(sport: string, type: string) {
    switch (type) {
      case 'featured':
        return this.findFeaturedPosts(sport)
      case 'latest':
        return this.findLatestPosts(sport)
      default:
        return []
    }
  }
}
