import Avatar from "@/components/misc/avatar";
import Image from "next/image";
import Date from "@/components/misc/date";
import CoverImage from "@/components/shared/cover-image";
import Link from "next/link";
import { topTags, secondaryTags } from "../../lib/siteDefault";
import WindowsBreackpoint from "../../lib/helpers/breackpoint";


export default function HeroPost({ posts }) {
  // console.log(posts)

  const importantTags =  topTags.concat(secondaryTags);

  //Screen size
  const mobileScreen = WindowsBreackpoint(600).isBreakpoint;

  const tabletScreen = WindowsBreackpoint(992).isBreakpoint;

  const desktopScreen = WindowsBreackpoint(1440).isBreakpoint;

 
  if(mobileScreen === true) {
   var width = '80vw'
  } else if(tabletScreen === true) {
   var  width = '70vw'
  } else if(desktopScreen === true) {
    var width = '60vw'
  } else {
    var width = '50vw'
  }
  
  return (
    <section className="hero bg-secondary">
      <div className="container-fluid hero__card flex relative flex-wrap md:grid md:lg:grid-cols-4 md:grid-rows-2 lg:h-[650px]">
        { posts.map(({ title, feature_image, published_at, excerpt, primary_author, slug, reading_time, tags }, index) => (
          
            <div
              key={title}
              className={`${
                index === 0
                  ? "md:col-span-2 md:row-span-2 px-8 min-h-[450px] w-full"
                  : index === 1
                  ? "md:row-span-2 px-5 md:min-h-[450px] min-h-[350px] w-full"
                  : "md:col-span-1 md:row-span-1 px-5 min-h-[300px] w-1/2 md:w-full"
              } bg-cover bg-center flex flex-col justify-end py-3 relative hero__post`}
            >

{
                  <Image
                    loading="lazy"
                    src={feature_image}
                    alt={title}
                    layout='fill'
                    sizes={width}
                    quality="60"
                    decoding="async"
                    className="z-0"
                    objectFit="cover"
                  />
                }


              <Link href={`/${slug}`}>
                <a className="absolute w-full h-full hero__absolute-link bg-primary z-0">
                  {title}
                </a>
              </Link>

              <Link href={`/${slug}`}>
                <a className={`${ index === 0 ? '2xl:text-5xl xl:text-4xl text-3xl xl:leading-[3rem]' : '2xl:text-2xl text-1xl'} uppercase font-bold relative z-10`}>
                  <h2 className={`${ index === 0 ? '2xl:w-2/3 xl:w-3/4 w-full' : 'w-7/8'} uppercase font-bold`}>
                    <span className="bg-quartenary">{title}</span>
                  </h2>
                </a>
              </Link>

              

              

              <div className="tags mt-2 mb-3 relative z-10 flex flex-wrap">
                
                {tags.map(({ name, slug  }, index) => (
                
                 
                    <Link href={`/tag/${slug}`} key={name}> 
                      <a className="text-sm italic text-white hover:text-quartenary mr-1">
                        {`#${ index < tags.length - 1 ? name+',' : name}`}
                      </a>
                      
                    </Link>
          
                ))}

              </div>

              <div className={`hero__post-author relative z-10 ${ index > 0 ? 'hidden md:block': null }` }>
                <Avatar
                  name={primary_author.name}
                  picture={primary_author.profile_image}
                  date={published_at}
                  color='white'
                />
              </div>
             
            </div>
          )
        )}
      </div>
    </section>
  );
}
