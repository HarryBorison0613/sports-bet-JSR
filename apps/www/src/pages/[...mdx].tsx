import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import fg from 'fast-glob'
import path from 'node:path'
import fs from 'node:fs/promises'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import MdxLayout from 'src/layouts/MdxLayout/MdxLayout'

const MdxPage: React.FC<any> = ({ source }) => {
  return <MDXRemote {...source} />
}

;(MdxPage as any).Layout = MdxLayout

export default MdxPage

export const getStaticProps: GetStaticProps = async (ctx) => {
  const filePath = path.resolve(
    process.cwd(),
    `./src/mdx/${(ctx?.params?.mdx as string[])?.join('/')}/index.mdx`
  )

  // Parse content
  const content = await fs.readFile(filePath, { encoding: 'utf-8' })

  // Extract mdx source
  const mdxSource = await serialize(content, { parseFrontmatter: true })

  return {
    props: {
      source: mdxSource,
      seo: mdxSource?.frontmatter,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = await fg(['src/mdx/**/*.mdx'])

  const paths = files?.map((x) => ({
    params: {
      mdx: [x?.split('/')[2]],
    },
  }))

  return {
    paths,
    fallback: false,
  }
}
