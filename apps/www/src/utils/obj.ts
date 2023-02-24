export interface ISortableObject {
  [key: string]: number
}

export const rankObject = (item: ISortableObject) =>
  Object.keys(item)
    .sort((key1, key2) => item[key2] - item[key1])
    .reduce(
      (obj, key) => ({
        ...obj,
        [key]: item[key],
      }),
      {}
    )

export const countObjArray = (objs: string[]) =>
  objs?.reduce<any>((prev, curr: any) => {
    if (curr in prev) {
      prev[curr] = prev[curr] + 1
    } else {
      prev[curr] = 0
    }

    return prev
  }, {})

export const sumObjects = (a: any, b: any) => {
  const reduced = Object.keys(a)?.reduce<any>((prev, curr) => {
    // Find value from A
    const valA = !isNaN(a[curr]) ? a[curr] : 0

    // Find value from B
    const valB = !isNaN(b[curr]) ? b[curr] : 0

    prev[curr] = valA + valB

    return prev
  }, {})

  return {
    ...b, // Include missing keys from b
    ...reduced,
  }
}
