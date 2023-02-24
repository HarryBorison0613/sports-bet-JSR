import { useEffect, useState, Fragment } from 'react'
import { useRouter } from 'next/router'
import PostPreviewSecond from '@/components/shared/post-preview-002'
import PostPreviewThird from '@/components/shared/post-preview-003'
import WindowsBreackpoint from '../../lib/helpers/breackpoint'
import { getAllPostsByTagSlug } from '@/lib/api'

// Make sure you are pulling ALL your posts from the ghost API [No limit]

export default function LatestPostMoreButtonTag(props) {
  const router = useRouter()

  //console.log('my ruter', router)

  const [posts, setPosts] = useState(props?.myPosts)
  const [meta, setMeta] = useState(props?.props?.meta)
  const [procesing, setProcesing] = useState(false)

  const substring = '?query='
  const substringTag = '/tag/'

  //We grab it initialy from props
  let currentPageTag = props?.props?.slug

  useEffect(() => {
    router.events.on('routeChangeStart', (url, { shallow }) => {
      const currentTag = url.replace('/tag/', '')
      //console.log(`App is Changed to ${url}`, currentTag)

      if (
        !url.includes(substring) &&
        url.includes(substringTag) &&
        router.asPath.includes(substringTag)
      ) {
        //We grab it from url to have it before the page even changed
        currentPageTag = currentTag

        async function fetchData() {
          const firstResult = await getAllPostsByTagSlug(currentTag)
          if (firstResult.length >= 12) {
            setPosts(firstResult.slice(12))
            setMeta(firstResult.meta)
          } else {
            setPosts([])
            setMeta([])
          }

          //console.log( firstResult);
        }

        fetchData()
      }
    })
  }, [])

  //  console.log(props.myPosts, props)

  //Screen size
  const screenSize = WindowsBreackpoint(760).isBreakpoint

  const changeArray = WindowsBreackpoint(1023).isBreakpoint

  const getPostFromAPI = async (page = 1) => {
    const newPosts = getAllPostsByTagSlug(currentPageTag, page)
    return newPosts
  }

  const getMorePost = async () => {
    setProcesing(true)
    const result = await getPostFromAPI(meta?.pagination?.next)
    if (result) {
      setProcesing(false)
    }

    // set new post and new meta
    setPosts((post) => post.concat(result))
    setMeta(result?.meta)
  }

  const firstPart = posts.filter(function (value, index, Arr) {
    return index % 2 == 0
  })

  const secondPart = posts.filter(function (value, index, Arr) {
    return index % 2 != 0
  })

  //Split the amount of posts to have 2 columns
  var halfWayIndex = Math.ceil(posts.length / 2)

  //Create 2 new arrays
  const firstHalf = posts.slice(0, halfWayIndex)
  const secondHalf = posts.slice(halfWayIndex)

  //Different arrays depending on screen size
  const leftPosts = () => {
    if (!changeArray) {
      return firstPart
    } else {
      return firstHalf
    }
  }

  const rightPosts = () => {
    if (!changeArray) {
      return secondPart
    } else {
      return secondHalf
    }
  }

  //Load the right post cards on left
  const LoadRightPostCardLeft = (post, index) => {
    if (screenSize) {
      return (
        <Fragment key={post.id + index}>
          <PostPreviewThird post={post} tags={post.tags} />
        </Fragment>
      )
    } else {
      return (
        <Fragment key={post.id + index}>
          <PostPreviewSecond post={post} tags={post.tags} />
        </Fragment>
      )
    }
  }

  const loader = () => {
    if (procesing) {
      return <span className="lds-dual-ring absolute"></span>
    }
  }

  //Load more button
  const LoadMoreButton = () => {
    if (meta?.pagination?.next) {
      return (
        <div className="flex justify-center mb-[50px] lg:mb-[100px] w-full">
          <button
            className="p-4 min-w-[180px] rounded bg-primary text-white uppercase font-bold"
            onClick={loadMore}
          >
            CARREGUE MAIS{loader()}
          </button>
        </div>
      )
    } else {
      return null
    }
  }

  //Load more posts on click
  function loadMore() {
    getMorePost()
  }

  return (
    <Fragment>
      <div className="flex flex-wrap mt-10">
        <div className="home-content__right-first w-full lg:w-1/2 lg:pl-[40px]">
          {leftPosts().map((post, index) => LoadRightPostCardLeft(post, index))}
        </div>
        <div className="home-content__right-second w-full lg:w-1/2 lg:pl-[40px]">
          {rightPosts().map((post, index) => (
            <Fragment key={post.id + index}>
              <PostPreviewSecond post={post} tags={post.tags} />
            </Fragment>
          ))}
        </div>
      </div>

      {LoadMoreButton()}
    </Fragment>
  )
}
