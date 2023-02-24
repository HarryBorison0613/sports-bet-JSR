import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import parseISO from 'date-fns/parseISO'
import { ptBR } from 'date-fns/locale'
import type { ITweet, ITwitterAuthor } from 'src/interface'
import { twitterClient } from 'src/utils/twitter'

export class TwitterRepository {
  requiredUserTweetsIds = ['15911679', '33320098', '420535612', '14595245']

  /**
   * Normalize tweets
   * @param tweets
   * @returns
   */
  normalizeTweet(tweets: any) {
    const tweetAuthors = tweets?.includes?.users?.flatMap((x: any) => x)

    return tweets?.data?.flatMap((x: any) => {
      return {
        ...x,
        timeSince: formatDistanceToNow(parseISO(x?.created_at), {
          includeSeconds: true,
          locale: ptBR,
        }),
        author: tweetAuthors?.find(
          (author: ITwitterAuthor) => author?.id === x?.author_id
        ),
      }
    })
  }

  /**
   * Get all tweets
   * @returns
   */
  async getAllTweets() {
    // Temp array to keep id
    let allUserTweets: any[] = []

    // Parse all tweets
    await Promise.all(
      this.requiredUserTweetsIds.map(async (item, index) => {
        const result = await twitterClient.get(`users/${item}/tweets`, {
          user: { fields: ['username', 'name', 'profile_image_url', 'id'] },
          expansions: ['author_id'],
          max_results: '6',
          tweet: { fields: ['created_at', 'public_metrics'] },
        })

        allUserTweets.push(result)
      })
    )

    // Normalize all tweets
    const normalizedTweets: ITweet[] = allUserTweets.flatMap((x) =>
      this.normalizeTweet(x)
    )

    // Sort by date and return
    return normalizedTweets?.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
  }
}
