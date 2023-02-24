import Date from "@/components/misc/date";
import Image from "next/image";
import Link from "next/link";
import { baseImage } from "../../lib/const"
import Avatar from "@/components/misc/avatar";
import WindowsBreackpoint from "../../lib/helpers/breackpoint"

export default function PostPreview({ post }) {
  const { title, image, published_at,  _highlightResult, slug,  tags, key } = post;

  if(image) {
    var featured = image;
  } else {
    var featured = baseImage.post_placeholder.url;
  }


    //Screen size
    const mobileScreen = WindowsBreackpoint(600).isBreakpoint;

    const tabletScreen = WindowsBreackpoint(992).isBreakpoint;

    const desktopScreen = WindowsBreackpoint(1440).isBreakpoint;

   
    if(mobileScreen === true) {
     var width = '60vw'
    } else if(tabletScreen === true) {
     var  width = '18vw'
    } else if(desktopScreen === true) {
      var width = '15vw'
    } else {
      var width = '13vw'
    }

  return (

      <div className="max-w-full relative mb-10 post-preview-004 shadow" key={key}>

            <div className="h-[280px] md:h-[350px] w-full cover relative post-preview__image relative">
              <Link href={`/${slug}`}>
                <a className="hover:opacity-[0.7]">
                    <Image
                    src={featured}
                    alt={title}
                    layout="responsive"
                    placeholder="blur"
                    blurDataURL="/artigos/vectors/bets.svg"
                    loading="lazy"
                    sizes={width}
                    quality="40"
                    decoding="async"
                  />
                </a>
              </Link>
              

              <div className="post-preview-003__category category pb-2 mt-5 absolute w-full flex flex-wrap bottom-0 left-0 pl-2.5 pr-2.5 pt-0 pb-0 bg-[#ffffffde]">
                {tags.slice(0, 8).map(({ name, slug  }, index) => (
                      <Link href={`/tag/${slug}`} key={name}> 
                        <a className="text-sm font-medium italic flex flex-wrap text-tertiary-full hover:text-tertiary-hover gap-x-1.5 mr-2">
                          {/* {`#${ index < tags.length - 1 ? name+',' : name}`} */}
                          {`#${ (index < 7 && index < tags.length - 1) ? name+',' : name}`}
                        </a>
                        
                      </Link>
            
                  ))}
              </div>
          
            </div>


          <div className="w-full mt-5 pl-3 pr-3 pb-2 text-white">
            
              <Link href={`/${slug}`}>
                <a className="text-lg font-bold uppercase hover:underline">{title}</a>
              </Link>


              <div className="flex flex-row justify-between mt-4">
                <div className="flex flex-row text-current">
                    {/* User Image */}
                    <Avatar
                        name={_highlightResult.authors[0].name.value}
                        picture={''}
                        date=''
                        color='current'
                        show_name = 'true'
                      />
                  </div>
                {/* <div className="flex flex-row text-sm justify-end mt-2 font-thin">
                    <Date dateString={published_at}/>
                </div> */}
              </div>

          </div>

      </div>
  )
}
