import { ImageLoaderProps, ImageLoader } from 'next/image'

const cloudflareNormalizeSrc = (src: string) => {
  return src.startsWith('/') ? src.slice(1) : src
}

/**
 * Cloudflare image loader
 * @param param0
 * @returns
 */
let cloudflareLoader: any = undefined

// if (process.env.NODE_ENV === 'production') {
//   cloudflareLoader = ({ src, width, quality }: ImageLoaderProps) => {
//     const params = [`width=${width}`]

//     if (quality) {
//       params.push(`quality=${quality}`)
//     }

//     const paramsString = params.join(',')

//     const filename = encodeURI(cloudflareNormalizeSrc(src))

//     return `/cdn-cgi/image/${paramsString}/${filename}`
//   }
// }

export { cloudflareLoader }
