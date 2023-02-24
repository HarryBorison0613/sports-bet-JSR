export const paginateArray = <T>(
  array: T[],
  pageSize: number,
  pageNumber: number
) => {
  return array.slice(pageNumber * pageSize, pageNumber * pageSize + pageSize)
}

export const partition = <T>(array: T[], predicate: (obj: T) => Boolean) => {
  return array.reduce<T[][]>(
    ([pass, fail], curr) => {
      ;(predicate(curr) ? pass : fail).push(curr)

      return [pass, fail]
    },
    [[], []]
  )
}
