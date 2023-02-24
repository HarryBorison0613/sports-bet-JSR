import { countObjArray, rankObject } from 'src/utils/obj'

export const resolveCategoriesByRank = async (endpoint: string) => {
  // Call endpoint
  const result = await fetch(endpoint)

  // Extract result
  const data = await result.json()

  // Extract category names
  const categoryNames: string[] = data?.competitions?.flatMap(
    (x: any) => x?.category?.name
  )

  // Count names
  const categoryCounts = countObjArray(categoryNames)

  // Rank categories by count
  return rankObject(categoryCounts)
}
