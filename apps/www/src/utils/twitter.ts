import Twitter from 'twitter-v2'

export const twitterClient = new Twitter({
  bearer_token: (process.env as any)?.TWITTER_TOKEN,
})
