import Date from "@/components/misc/date";
import Image from "next/image";
import Link from "next/link";
import { baseImage } from "../../lib/const";
import WindowsBreackpoint from "../../lib/helpers/breackpoint"

export default function PostPreview({ post }) {
  const { title, feature_image, published_at, excerpt, custom_excerpt, primary_author, slug, reading_time, tags, key } = post;
  
  if(feature_image) {
    var featured = feature_image;
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
     var  width = '50vw'
    } else if(desktopScreen === true) {
      var width = '20vw'
    } else {
      var width = '12vw'
    }

  return (

      <div className="max-w-full relative mb-10 post-preview-003 shadow" key={key}>
    
            <div className="h-[280px] w-full cover relative post-preview__image">
              <Image
                src={featured}
                alt={title}
                layout='fill'
                placeholder="blur"
                blurDataURL="/artigos/vectors/bets.svg"
                loading="lazy"
                sizes={width}
                quality="60"
                decoding="async"
              />
              <Link href={`/${slug}`}>
              <a className="box-link absolute left-0 right-0 bottom-0 top-0 opacity-0 text-transparent">{title}</a>
              </Link>
              

              <div className="post-preview-003__category category flex flex-wrap pb-2 mt-5 absolute bottom-0 left-0 pl-2.5 pr-2.5 pt-0 pb-0 bg-[#ffffffde]">
                {tags.slice(0, 8).map(({ name, slug  }, index) => (
                      <Link href={`/tag/${slug}`} key={name}> 
                        <a className="text-sm font-medium italic text-tertiary-full hover:text-tertiary-hover gap-x-1.5 mr-2">
                          {/* {`#${ index < tags.length - 1 ? name+',' : name}`} */}
                          {`#${ (index < 7 && index < tags.length - 1) ? name+',' : name}`}
                        </a>
                        
                      </Link>
            
                  ))}
              </div>
          
            </div>


          <div className="w-full mt-5 pl-3 pr-3 pb-2.5">
            
              
                <Link href={`/${slug}`}>
                  <a className="text-lg font-bold uppercase hover:text-primary">
                    <h3>
                      {title}
                    </h3>
                  </a>
                </Link>
              
              


              <div className="flex flex-row text-sm justify-end mt-2 font-thin">
                  <Date dateString={published_at}/>
                </div>

          </div>
      </div>
  )
}
