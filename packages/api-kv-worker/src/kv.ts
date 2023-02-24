/**
 * Add contents to KV
 * @param key
 * @param value
 */
export const addToKV = async (
  key: string,
  value: any,
  options: KVNamespacePutOptions
) => {
  await KV_STORE.put(key, value, options)
}

/**
 * Add contents to KV
 * @param key
 */
export const readFromKV = async (key: string) => {
  return KV_STORE.get(key, 'text')
}
