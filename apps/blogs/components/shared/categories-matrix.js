import { Section } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { categoriesMatrix } from '../../lib/const'

export default function CategoryMatrix({ settings }) {
  const logo =
    settings?.icon ||
    settings.defaultSettings.siteLogo ||
    settings.defaultSettings.siteIcon
  const link = settings.defaultSettings.links.home_sponsor.href
  //Get  categories from constants
  const categories = categoriesMatrix

  const myLoader = ({ src, width = 200, quality }) => {
    return `${src}?w=256&q=${quality || 20}`
  }

  return (
    <section>
      <div className="categories-matrix__wrap bg-body pt-10 lg:pt-20 pb-10 lg:pb-20 bg-body mb-12 lg:mb-[100px]">
        <div className="container">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tighter text-white leading-tight home__level-1-title relative overflow-x-hidden">
            CATEGORIAS DE ESPORTES
          </h3>

          <div className="flex flex-wrap pt-5 pb-5 -ml-5 -mr-5 relative">
            {categories.map((post, index) => (
              <div
                className="w-full md:w-1/2 lg:w-1/3 relative h-[200px] md:h-[250px] lg:h-[300px] p-5"
                key={index}
              >
                <div className="categories-matrix__item relative w-full h-full">
                  <h3 className="absolute -translate-x-1/2 -translate-y-1/2 left-2/4 top-2/4 z-10 text-3xl uppercase font-bold text-center bg-quartenary pt-1.5 pb-1.5 pl-2.5 pr-2.5">
                    {post.title}
                  </h3>
                  <Image
                    src={post.image}
                    alt={post.title}
                    layout="fill"
                    loading="lazy"
                    loader={myLoader}
                  />

                  <Link href={post.link}>
                    <a className="categories-matrix__item-link absolute text-[0px] left-0 right-0 top-0 bottom-0 z-20">
                      <h2>{post.title}</h2>
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center md:justify-end -mt-3 md:mt-5 items-center">
            <div className="text-md font-medium text-white mr-2 md:mt-0 mt-4">
              Patrocinado por
            </div>
            <div className="mr-5 ml-5 md:mt-0 mt-4">
              <Image
                src={logo}
                alt="website-icon"
                aria-label="website-icon"
                width={70}
                height={60}
              />
            </div>
            <div className="text-center md:mt-0 mt-4">
              <Link href={link}>
                <a className="p-4 min-w-[180px] rounded bg-tertiary-full hover:bg-tertiary-hover text-white uppercase font-bold">
                  APOSTE AGORA
                  <span className="ml-5 button__arrow">
                    {
                      <Image
                        src="/artigos/vectors/arrow.svg"
                        alt="APOSTE AGORA"
                        width={15}
                        height={15}
                      />
                    }
                  </span>
                </a>
              </Link>
            </div>
          </div>
        </div>

        {/* {slug ? (
         <Link href={slug}>
           <a aria-label={id}>{image}</a>
         </Link>
       ) : (
         image
       )} */}
      </div>
    </section>
  )
}
