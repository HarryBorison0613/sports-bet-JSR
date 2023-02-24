import { useState, Fragment } from 'react'
import Link from 'next/link'
import PostPreviewFirst from '@/components/shared/post-preview-001'
import PostPreviewSecond from '@/components/shared/post-preview-002'
import PostPreviewThird from '@/components/shared/post-preview-003'
import WindowsBreackpoint from '../../lib/helpers/breackpoint'

export default function ListedPosts(props) {
  const tagPosts = props.posts
  const customTagTitle = props.tagTitle
  const customTagLink = props.tagLink
  //Screen size
  const screenSize = WindowsBreackpoint(760).isBreakpoint

  //Create 2 new arrays
  const firstHalf = tagPosts.slice(0, 2)
  const secondHalf = tagPosts.slice(2)

  const differentPostCards = (post, index, column) => {
    if (index == 0 && column == 'first') {
      return (
        <Fragment key={post.id}>
          <PostPreviewFirst post={post} tags={post.tags} />
        </Fragment>
      )
    } else {
      if (screenSize) {
        return (
          <Fragment key={post.id}>
            <PostPreviewThird post={post} tags={post.tags} />
          </Fragment>
        )
      } else {
        return (
          <Fragment key={post.id}>
            <PostPreviewSecond post={post} tags={post.tags} />
          </Fragment>
        )
      }
    }
  }

  return (
    <section className="posts-by-tag-002 pt-5 lg:pt-10 pb-10 lg:pb-20 lg:mb-20 lg:mx-10">
      <div className="container md:px-5 lg:px-0">
        <h3 className="text-2xl md:text-3xl font-bold tracking-tighter leading-tight home__level-1-title relative uppercase mb-10 overflow-x-hidden">
          {customTagTitle}
        </h3>
        <div className="flex flex-wrap lg:-ml-5 lg:-mg-5">
          <div className="w-full lg:w-1/2 lg:px-4 lg:pr-10">
            {firstHalf.map((post, index) => (
              <Fragment key={post.id}>
                {differentPostCards(post, index, 'first')}
              </Fragment>
            ))}
          </div>
          <div className="w-full lg:w-1/2 lg:px-4 lg:pl-10">
            {secondHalf.map((post, index) => (
              <Fragment key={post.id}>
                {differentPostCards(post, index, 'second')}
              </Fragment>
            ))}
          </div>
        </div>

        <div className="text-center mt-2 lg:mt-10">
          <Link href={customTagLink}>
            <a className="py-4 px-10 min-w-[180px] rounded bg-primary hover:bg-secondary text-white uppercase font-bold">
              CARREGUE MAIS
            </a>
          </Link>
        </div>
      </div>
    </section>
  )
}
