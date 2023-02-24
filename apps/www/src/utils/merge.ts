import { merge } from '@corex/deepmerge'

export const deepMerge = <T>(...args: T[]) =>
  merge([...args], {
    arrayMergeType: 'overwrite',
  })
