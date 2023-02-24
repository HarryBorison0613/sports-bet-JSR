import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { useRouter } from 'next/router'
import LatestPostMoreButtonTag from '@/components/post/more-posts-button-tag'
import TwoColPosts from '@/components/post/two-col-posts'
import ListedPosts from '@/components/post/posts-by-tag'
import BannerLandscape from '@/components/shared/banners-lanscape'
import { landscapeBanners, portraitBanners } from '../../lib/const'
import BannerPortraits from '@/components/shared/banners-portrait'

export default function TagPost(props) {
  const router = useRouter()

  const substring = '?query='
  const substringTag = '/tag/'
  // const forceReload = () => {
  //   router.reload();
  // }

  //show or not
  var [isShown, setIsShown] = useState(true)

  //Load more posts on click
  const changeVisibility = (event) => {
    // 👇️ toggle visibility
    setIsShown((current) => !current)
  }

  useEffect(() => {
    router.events.on('routeChangeComplete', (url, { shallow }) => {
      if (
        !url.includes(substring) &&
        url.includes(substringTag) &&
        router.asPath.includes(substringTag)
      ) {
        //forceReload();

        setIsShown((current) => !current)
      }
    })
  }, [])

  //Banners
  const selectedBannerLandscape = landscapeBanners.banner002

  //Calculate the width of the ref div on landscape
  const refland = useRef(null)
  const [widthland, setWidthland] = useState(0)

  useLayoutEffect(() => {
    setWidthland(refland.current.offsetWidth)
  }, [])

  //Banners
  const selectedBannerPortrait = portraitBanners.banner002

  //Calculate the width of the ref div on portrait
  const ref = useRef(null)
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth)
  }, [])

  return (
    <section>
      <div className="container lg:pt-[100px] pt-12">
        <h2 className="text-2xl md:text-3xl w-full font-bold tracking-tighter leading-tight home__level-1-title relative overflow-x-hidden">
          ÚLTIMAS NOTÍCIAS
        </h2>

        <div className="wrap flex flex-wrap-reverse lg:flex-wrap pt-5">
          <div className="home-content__left lg:w-1/5 w-full" ref={ref}>
            <h3 className="text-2xl md:text-lg w-full font-bold tracking-tighter leading-tight home__level-2-title relative uppercase overflow-x-hidden">
              Notícias principais
            </h3>
            <div className="mt-5">{<ListedPosts posts={props.tag_top} />}</div>
            <div className="mb-10">
              <BannerPortraits
                id={selectedBannerPortrait.id}
                slug={selectedBannerPortrait.slug}
                img_desktop={selectedBannerPortrait.image_desktop}
                img_mobile={selectedBannerPortrait.image_mobile}
                banner_width={width}
                img_size={selectedBannerPortrait.img_size}
                img_size_mobile={selectedBannerPortrait.img_size_mobile}
                place={'left_banner_tag_' + props.slug}
              />
            </div>
          </div>

          <div className="home-content__right lg:w-4/5 w-full">
            {
              <TwoColPosts
                firstposts={props.thenPosts}
                place_banner={'right_banner_tag_' + props.slug}
              />
            }

            <div className="mb-5 w-full lg:pl-[40px]" ref={refland}>
              {
                <BannerLandscape
                  id={selectedBannerLandscape.id}
                  slug={selectedBannerLandscape.slug}
                  img_desktop={selectedBannerLandscape.image_desktop}
                  img_mobile={selectedBannerLandscape.image_mobile}
                  banner_width={widthland}
                  img_size={selectedBannerLandscape.img_size}
                  img_size_mobile={selectedBannerLandscape.img_size_mobile}
                  place={'bottom_banner_tag_' + props.slug}
                />
              }
            </div>

            {props.posts.length >= 1 && (
              <div
                className="flex justify-center pb-10 pt-10 w-full"
                style={{ display: isShown ? 'flex' : 'none' }}
              >
                <button
                  className="p-4 min-w-[180px] rounded bg-primary text-white uppercase font-bold"
                  onClick={changeVisibility}
                >
                  CARREGUE MAIS
                </button>
              </div>
            )}

            <div style={{ display: isShown ? 'none' : 'block' }}>
              {props.posts.length >= 1 && (
                <LatestPostMoreButtonTag props={props} myPosts={props.posts} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
