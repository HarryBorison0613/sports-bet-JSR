import { WORKER_CONSTANTS } from './enum'

/**
 * Generate sports API URL
 * @param pathname
 * @param apiKey
 * @returns
 */
/**
 * Get sports api url
 * @param pathname
 * @param apiKey
 * @returns
 */
export const getSportsAPIUrl = (pathname: string, apiKey: string) => {
  // Construct url
  const url = new URL(pathname, SPORTS_API_BASE_URL)

  // Append api key
  url.searchParams.append(WORKER_CONSTANTS.apiKey, apiKey)

  return url
}

/**
 * Load data from proxy
 * @param pathname
 * @param apiKey
 */
export const loadDataFromProxy = async (pathname: string, apiKey: string) => {
  // Get sports api url
  const url = getSportsAPIUrl(pathname, apiKey)

  // Fetch data
  const response = await fetch(url.toString())

  // Return empty object if response is invalid
  if (!response?.ok) {
    return
  }

  // Return success object
  return response.json()
}
