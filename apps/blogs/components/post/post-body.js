import { useLayoutEffect, useRef, useState } from "react";
import Normalize from "@/lib/normalize";
import SocialShare from "@/components/shared/social-share";
import BannerLandscape from "@/components/shared/banners-lanscape"
import { landscapeBanners, portraitBanners } from "../../lib/const"
import BannerPortraits from "@/components/shared/banners-portrait"
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { WindowScroll } from "../misc/WindowScroll";
import { topTags, secondaryTags } from "../../lib/siteDefault";
import { categoriesFotball, categoriesAmericanFutebol, categoriesBasketball, baseball, Hockey } from "../../lib/const";

export default function PostBody({ content, settings, title, post }) {
  const {url} = settings;
  const customTagLink = '/tag/'+post.tags[0].slug;


  const primaryTag = post.primary_tag.slug;
  const allTagsNames = post.tags.map((item) => item.name);

  const filteredArray = topTags.filter(value => allTagsNames.includes(value));
  const categoriesList = (menu) => {
    return (
      
           
          <ul>
            <h3 className="text-2xl md:text-lg w-full font-bold tracking-tighter leading-tight home__level-2-title relative uppercase overflow-x-hidden">CATEGORIAS</h3>
              <div className="league-menu-items mt-2 lg:mt-5">
                {menu.map((item, index) => (
                    <Link href={item.href} key={item.name+item.id}>
                      <a className="flex items-center text-lg font-normal mb-2">
                        <div className="w-[30px] mr-2.5">
                          <Image
                          src={item.icon}
                          alt={item.icon}
                          width={25}
                          height={25}
                        />
                        </div>
                        
                        {item.name}
                      </a>
                    </Link>
                  ))}
              </div>
            
          </ul>
    )
  }

  const showSidebarMenu = () => {
    if(filteredArray[0] === "Futebol") {
      return (
        <div className="league-menu mb-5 lg:mb-14 mt-5 lg:mt-0">
            {categoriesList(categoriesFotball)}
        </div>
            
      )
    } else if(filteredArray[0] === "Basquete") {
      return (
        <div className="league-menu mb-5 lg:mb-14">
            {categoriesList(categoriesBasketball)}
        </div>
      
      )
    } else if(filteredArray[0] === "Futebol americano" || filteredArray[0] === "Futebol Americano") {
      return (
        <div className="league-menu mb-5 lg:mb-14">
            {categoriesList(categoriesAmericanFutebol)}
        </div>
      
      )
    } else if(filteredArray[0] === "Hoquei" || filteredArray[0] ==="Hóquei") {
      return (
        <div className="league-menu mb-5 lg:mb-14">
            {categoriesList(Hockey)}
        </div>
      
      )
    } else if(filteredArray[0] === "Baseball") {
      return (
        <div className="league-menu mb-5 lg:mb-14">
            {categoriesList(baseball)}
        </div>
      
      )
    } else {
      return null;
    }

  }
  
  //console.log('this is content', post);

   //Banners
   const selectedBannerLandscape = landscapeBanners.banner002;

   //Calculate the width of the ref div on landscape
   const refland = useRef(null);
   const [widthland, setWidthland] = useState(0);
 
   useLayoutEffect(() => {
     setWidthland(refland.current.offsetWidth);
   }, []);

   //Banners
   const selectedBannerPortrait = portraitBanners.banner003;

     //Calculate the width of the ref div on portrait
     const ref = useRef(null);
     const [width, setWidth] = useState(0);
   
     useLayoutEffect(() => {
       setWidth(ref.current.offsetWidth);
     }, []);

  const scrollDirection = WindowScroll();

  return (
    <section className="post">
      <div className="container">
      
          <SocialShare post={post} settings={settings}/>
          <article className="overflow-x-hidden">
            <div className="flex flex-wrap lg:my-20">
              <div className="w-full lg:w-4/5 lg:pr-20">
                {Normalize(content, url)}

                <div className="text-center mt-10 lg:mt-20 mb-10 lg:mb-20">
                  <Link href={customTagLink}>
                      <a className="py-4 px-10 min-w-[180px] rounded bg-primary hover:bg-secondary text-white uppercase font-bold">
                        CARREGUE MAIS
                      </a>
                  </Link>
                </div>

                <div className="" ref={refland}>
                  {<BannerLandscape id={selectedBannerLandscape.id} slug={selectedBannerLandscape.slug} img_desktop={selectedBannerLandscape.image_desktop} img_mobile={selectedBannerLandscape.image_mobile} banner_width={widthland} img_size={selectedBannerLandscape.img_size} img_size_mobile={selectedBannerLandscape.img_size_mobile} place="bottom_banner_post"/>}
                </div>
                
              </div>

              <div className="w-full lg:w-1/5 mb-10 lg:mb-20" ref={ref}>
                {showSidebarMenu()}
                <BannerPortraits id={selectedBannerPortrait.id} slug={selectedBannerPortrait.slug} img_desktop={selectedBannerPortrait.image_desktop} img_mobile={selectedBannerPortrait.image_mobile} banner_width={width} img_size={selectedBannerPortrait.img_size} img_size_mobile={selectedBannerPortrait.img_size_mobile} place="right_banner_post"/>
              </div>

            </div>
          </article>
      </div>

    </section>
  
  );
}
