import NextLink, { LinkProps } from 'next/link'
import React from 'react'

export type ILinkProps = LinkProps

const Link: React.FC<React.PropsWithChildren<ILinkProps>> = (props) => {
  return <NextLink prefetch={false} scroll={true} passHref={true} {...props} />
}

export default Link
