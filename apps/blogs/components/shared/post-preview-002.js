import Image from 'next/image'
import Link from 'next/link'
import Avatar from '@/components/misc/avatar'
import { baseImage } from '../../lib/const'
import WindowsBreackpoint from '../../lib/helpers/breackpoint'

export default function PostPreview({ post }) {
  const {
    title,
    feature_image,
    published_at,
    excerpt,
    custom_excerpt,
    primary_author,
    slug,
    reading_time,
    tags,
    key,
  } = post

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str
  }

  if (feature_image) {
    var featured = feature_image
  } else {
    var featured = baseImage.post_placeholder.url
  }

  //Screen size
  const mobileScreen = WindowsBreackpoint(600).isBreakpoint

  const tabletScreen = WindowsBreackpoint(992).isBreakpoint

  const desktopScreen = WindowsBreackpoint(1440).isBreakpoint

  if (mobileScreen === true) {
    var width = '60vw'
  } else if (tabletScreen === true) {
    var width = '18vw'
  } else if (desktopScreen === true) {
    var width = '15vw'
  } else {
    var width = '13vw'
  }

  return (
    <div
      className="max-w-full relative mb-10 md:mb-16 post-preview-002 relative"
      key={key}
    >
      <div className="flex flex-wrap justify-between items-top overflow-x-hidden">
        <div className="w-full md:w-1/4">
          <div className="h-[320px] w-full cover relative post-preview__image">
            {
              <Image
                loading="lazy"
                src={featured}
                alt={title}
                layout="fill"
                sizes={width}
                quality="60"
                decoding="async"
              />
            }

            <Link href={`/${slug}`}>
              <a className="box-link absolute left-0 right-0 bottom-0 top-0 opacity-0 text-transparent">
                {title}
              </a>
            </Link>
          </div>
        </div>

        <div className="w-full md:w-3/4 pl-2.5 md:pl-5 pr-2.5 md:pr-0">
          <div className="post-preview-002__category category pb-5 flex flex-wrap">
            {tags.slice(0, 8).map(({ name, slug }, index) => (
              <Link href={`/tag/${slug}`} key={name}>
                <a className="text-sm font-medium italic flex flex-wrap  text-tertiary-full hover:text-tertiary-hover gap-x-1.5 mr-2">
                  {/* {`#${ index < tags.length - 1 ? name+',' : name}`} */}
                  {`#${
                    index < 7 && index < tags.length - 1 ? name + ',' : name
                  }`}
                </a>
              </Link>
            ))}
          </div>

          <Link href={`/${slug}`}>
            <a className="text-lg font-bold uppercase hover:text-primary">
              <h3>{title}</h3>
            </a>
          </Link>

          <p className="text-[18px] mt-5 mb-8">
            {truncate(custom_excerpt || excerpt, 180)}
          </p>

          <div className="md:flex lg:block xl:flex flex-row justify-between mt-1 items-center">
            <div className="flex flex-row text-current">
              {/* User Image */}
              <Avatar
                name={primary_author.name}
                picture={primary_author.profile_image}
                date={published_at}
                color="current"
                show_name="false"
              />
            </div>
            <p className="text-base font-thin">
              {reading_time} em minutos de leitura
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
