import { WORKER_CONSTANTS, WORKER_ERROR } from './enum'
import { addToKV, readFromKV } from './kv'
import { loadDataFromProxy } from './proxy'
import { errorResponse, successResponse } from './response'
import { Cache } from './cache'

/**
 * Worker request handler
 * @param req
 * @returns
 */
export const handleRequest = async (req: Request): Promise<Response> => {
  // Extract the url from request
  const url = new URL(req?.url)

  // Request pathname to use as a key locator
  const pathname = url?.pathname

  // Extract api key from url
  const apiKey = url?.searchParams?.get(WORKER_CONSTANTS.apiKey)

  // No API key, return error response
  if (!apiKey) {
    return errorResponse(WORKER_ERROR.noApiKey)
  }

  // Try to load cached data from KV
  const cachedKVData = await readFromKV(pathname)

  // Return if cached data exist
  if (cachedKVData) {
    return successResponse(cachedKVData)
  }

  // Load data from proxy
  const originalData = await loadDataFromProxy(pathname, apiKey)

  // Return error response if original data is empty
  if (!originalData) {
    return errorResponse(WORKER_ERROR.noData)
  }

  // Calculate object expiry
  const { data, expirationTtl } = new Cache().calculateObjectExpiry(
    pathname,
    originalData
  )

  // Add to kv if expirationTtl is defined.
  if (expirationTtl) {
    await addToKV(pathname, data, {
      expirationTtl,
    })
  }

  // Return success response
  return successResponse(data)
}
