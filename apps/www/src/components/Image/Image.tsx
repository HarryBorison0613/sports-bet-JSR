import NextImage, { ImageProps } from 'next/future/image'
import cx from 'classnames'
import { shimmer } from 'src/utils/shimmer'
import React from 'react'

export type IImageProps = ImageProps

const Image: React.FC<IImageProps> = ({
  className,
  width,
  height,
  src,
  ...restProps
}) => {
  const [imageSrc, setImageSrc] = React.useState(src)

  const setFallbackImage = React.useCallback(
    () => setImageSrc('/season_fallback.png'),
    []
  )

  const blurProps = React.useMemo(
    () =>
      (width as number) > 40
        ? {
            placeholder: 'blur' as any,
            blurDataURL: shimmer(128, 128),
          }
        : {},
    [width]
  )

  return (
    <NextImage
      className={cx('object-contain overflow-hidden w-auto h-auto', className)}
      width={width}
      height={height}
      style={{ width, height }}
      {...blurProps}
      {...restProps}
      src={imageSrc}
      onError={setFallbackImage}
    />
  )
}

export default React.memo(Image)
