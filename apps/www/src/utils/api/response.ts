import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

export const errorResponse = (res: NextApiResponse) => {
  return res.status(400).send('BAD REQUEST')
}

export const cachedSuccessResponse = (
  res: NextApiResponse,
  data: any,
  duration = 30
) => {
  // // Set cache control header
  // if (process.env.NODE_ENV === 'production') {
  //   res.setHeader('Cache-Control', `s-maxage=5`)
  // }

  return res.status(200).send(data)
}

export const withCachedApiHandler = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Request pathname
    const endpoint = req.url!

    // Process handler
    const data = await handler(req, res)

    // No data, return error response
    if (!data) {
      return errorResponse(res)
    }

    // 15 min cache
    console.log(`🤯 [REALTIME_RESPONSE]: ${endpoint}`)
    return cachedSuccessResponse(res, data)
  }
}
