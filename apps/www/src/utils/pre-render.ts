export const prerenderFetch = async <T>(endpoint: string): Promise<T> => {
  // Call endpoint
  const result = await fetch(`https://bets-com.vercel.app${endpoint}`)

  return result.json()
}
