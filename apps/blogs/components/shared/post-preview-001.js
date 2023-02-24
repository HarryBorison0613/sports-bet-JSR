import Date from "@/components/misc/date";
import Image from "next/image";
import Link from "next/link";
import Avatar from "@/components/misc/avatar";
import { baseImage } from "../../lib/const";
import WindowsBreackpoint from "../../lib/helpers/breackpoint";

export default function PostPreview({ post }) {
  const { title, feature_image, published_at, excerpt, custom_excerpt, primary_author, slug, reading_time, tags, key } = post;
  const truncate = (str, n) => {
		return str?.length > n ? str.substr(0, n - 1) + "..." : str;
	};

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
   var  width = '70vw'
  } else if(desktopScreen === true) {
    var width = '60vw'
  } else {
    var width = '40vw'
  }

  return (

      <div className="post-preview-001 max-w-full relative mb-10 md:mb-20 lg:mb-16 relative" key={key}>
       

        <div className="h-[350px] w-full cover relative post-preview__image">
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

            <div className="bg-slate-900 flex flex-wrap absolute p-2 bottom-7 md:bottom-16 drop-shadow-lg">
                  {tags.slice(0, 8).map(({ name, slug  }, index) => (
                      <Link href={`/tag/${slug}`} key={name}> 
                        <a className="md:text-sm text-[12px] font-medium italic text-white hover:text-quartenary gap-x-1.5 mr-2">
                          {/* {`#${ index < tags.length - 1 ? name+',' : name}`} */}
                          {`#${ (index < 7 && index < tags.length - 1) ? name+',' : name}`}
                        </a>
                        
                      </Link>
            
                  ))}
            </div>
        
        </div>

        

        <div className="pl-2.5 md:pl-5 pr-2.5 md:pr-5 pt-5 mt-[-40px] index-10 relative">
          <Link href={`/${slug}`}>
            <a className="text-2xl md:text-3xl font-bold bg-quartenary">{title}</a>
          </Link>
    
          <p className="text-sm md:text-[18px] mt-5 md:mt-[30px] mb-5 overflow-x-hidden">
            {truncate(custom_excerpt || excerpt, 250)}
          </p>
          <div className="md:flex lg:block xl:flex flex-row justify-between mt-1 items-center">
            <div className="flex flex-row text-current">
              {/* User Image */}
              <Avatar
                  name={primary_author.name}
                  picture={primary_author.profile_image}
                  date={published_at}
                  color='current'
                  show_name = 'false'
                />
            </div>
            <div className="text-base font-thin">{reading_time} em minutos de leitura</div>
          </div>
        </div>
      </div>
  )
}
