import { useState, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import Avatar from "@/components/misc/avatar";
import Image from "next/image";
import { baseImage } from "../../lib/const";

const PostTitle = ({ children }) => (
  <div className="text-2xl md:text-6xl md:pt-[50px] text-white font-bold tracking-tighter leading-tight  text-left  py-3 flex justify-between !overflow-visible ">
    <h1>{children}</h1>
  </div>
);

export default function PostHeader({ post }) {
  const {
    title,
    slug,
    feature_image,
    published_at,
    primary_author,
    excerpt,
    reading_time,
    tags,
  } = post;

  if(feature_image) {
    var featured = feature_image;
  } else {
    var featured = baseImage.post_placeholder.url;
  }

  //Calculate the width of the ref div on portrait
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
  }, []);

  return (
    <section className="post-header bg-body flex md:min-h-[350px] lg:min-h-[500px] py-5 md:py-10">
      <div className="container relative">
         <div className="post-header__wrap flex flex-wrap">
           {/* Title */}
          <div className="w-full md:w-2/3 lg:w-4/5 md:pr-20 lg:pr-40">
            <div className="">
                <h1>
                  <PostTitle>{title}</PostTitle>
                </h1>
                

                {/* Tags */}
                <div className="single-page__wrapper  mt-[25px]   ">
                  <div className="bg-quartenary  flex md:p-4 p-2 flex-wrap w-fit">
                    {tags.slice(0, 8).map(({ name, slug }, index) => (
                      <Link href={`/tag/${slug}`} key={name}>
                        <a className="text-base text-sm lg:text-[1.5rem] font-bold text-black hover:text-white gap-x-1.5 mr-2">
                          {`#${
                            index < 7 && index < tags.length - 1 ? name + "," : name
                          }`}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="h-20 !overflow-visible mt-5 md:mt-[50px] ">
                    <div className="single-page__author items-center lg:flex flex-wrap justify-between">
                      <div className="single-page__author-avatar text-current">
                    
                        <Avatar
                          name={primary_author.name}
                          picture={primary_author.profile_image}
                          date={published_at}
                          color='white'
                        />
                      </div>
                      <div className="mt-2 lg:mt-0 text-base font-thin text-white mb-5">
                        {reading_time} em minutos de leitura
                      </div>
                    </div>
                </div>
            </div>
            
          </div>
          
          <div className="post-header__image w-full md:w-1/3 lg:w-1/5 md:right-0" ref={ref}>
            <div className="rounded overflow-hidden lg:absolute">
              <Image
                src={featured}
                alt={title}
                width={width}
                height= {550}
                placeholder="blur"
                blurDataURL="/artigos/vectors/bets.svg"
                loading="lazy"
                quality="60"
                decoding="async"
              />
            </div>
              
          </div>


        </div>
      </div>
     
    </section>
  );
}