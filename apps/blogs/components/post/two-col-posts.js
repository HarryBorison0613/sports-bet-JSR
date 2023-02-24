import { useState, Fragment, useRef, useLayoutEffect } from "react"
import PostPreviewFirst from "@/components/shared/post-preview-001"
import PostPreviewSecond from "@/components/shared/post-preview-002"
import PostPreviewThird from "@/components/shared/post-preview-003"
import BannerPortraits from "@/components/shared/banners-portrait"
import { portraitBanners} from "../../lib/const"
import WindowsBreackpoint from "../../lib/helpers/breackpoint";


  // Make sure you are pulling ALL your posts from the ghost API [No limit]

  export default function TwoColPosts(firstposts) {
    
    const place_banner = firstposts.place_banner;

    //Screen size
    const screenSize = WindowsBreackpoint(760).isBreakpoint;
    const changeArray = WindowsBreackpoint(1023).isBreakpoint;
  

    //Banners
    const selectedBannerPortrait = portraitBanners.banner001;

      //Calculate the width of the ref div on portrait
      const ref = useRef(null);
      const [width, setWidth] = useState(0);
    
      useLayoutEffect(() => {
        setWidth(ref.current.offsetWidth);
      }, []);

      
    const posts = firstposts.firstposts;
    const singlePost = posts.slice(0, 1);
    const secondPartPosts = posts.slice(1);



    const firstPart = secondPartPosts.filter(function(value, index, Arr) {
      return index % 2 == 0;
    });


    const secondPart = secondPartPosts.filter(function(value, index, Arr) {
      return index % 2 != 0;
    });
    
    //Split the amount of posts to have 2 columns
    const halfWayIndex = Math.ceil((secondPartPosts.length / 2) + 1)
  
    //Create 2 new arrays
    const firstHalf = secondPartPosts.slice(0, halfWayIndex)
    const secondHalf = secondPartPosts.slice(halfWayIndex)

     //Different arrays depending on screen size
    const leftPosts = () => {
      if(!changeArray) {
        return (
          firstPart
        )
      } else {
        return (
          firstHalf
        )
      }
      
    }



    const rightPosts = () => {
      if(!changeArray) {
        return (
          secondPart
        )
      } else {
        return (
          secondHalf
        )
      }
      
    }


    //If there is just one post, show it 
    const singlePostArray = () => {
      if(posts.length === 1) {
        return (
          <Fragment key={singlePost[0].id}>  
            <PostPreviewFirst post={singlePost[0]} tags={singlePost[0].tags} />  
          </Fragment>
        )
      } else {
        return null;
      }
      
    }

    //Load the right post cards on left
    const LoadRightPostCardLeft = (post, index) => {
      if(index == 0) {
        return (
            <Fragment key={post.id+index}>
              <Fragment key={singlePost[0].id}>  
                <PostPreviewFirst post={singlePost[0]} tags={singlePost[0].tags} />  
              </Fragment>
              <Fragment key={post.id}>  
                <PostPreviewSecond post={post} tags={post.tags} />  
              </Fragment>  
            </Fragment>
             
        )
      } else {
        if(screenSize) {
          return (
              <Fragment key={post.id}>  
                <PostPreviewThird post={post} tags={post.tags}/>
              </Fragment> 
          )
        } else {
          return (
              <Fragment key={post.id}>  
                <PostPreviewSecond post={post} tags={post.tags}/>
              </Fragment> 
          )
        }
        
      }
    }

    //Load the right post cards on right
    const LoadRightPostCardRight = (post, index) => {

      if(index == 0) {
        return (
          <Fragment key={post.id}>  
            <div className="mb-10">
              <BannerPortraits id={selectedBannerPortrait.id} slug={selectedBannerPortrait.slug} img_desktop={selectedBannerPortrait.image_desktop} img_mobile={selectedBannerPortrait.image_mobile} banner_width={width} img_size={selectedBannerPortrait.img_size} img_size_mobile={selectedBannerPortrait.img_size_mobile} place={place_banner}/>
            </div>
            
            <PostPreviewThird post={post} tags={post.tags}/> 
          </Fragment> 
        )
      } else {
        return (
          <Fragment key={post.id}>  
            <PostPreviewThird post={post} tags={post.tags} />
          </Fragment> 
        )
      }
    }

  
    return (
  
          <Fragment>  
            <div className="flex flex-wrap">
              <div className="home-content__right-first w-full lg:w-3/4 lg:pr-[40px] lg:pl-[40px]">
            
                {singlePostArray()}
                {leftPosts().map((post, index) => (
                  LoadRightPostCardLeft(post, index)
                  
                ))}
                
              </div>
              <div className="home-content__right-second w-full lg:w-1/4" ref={ref}>
                {rightPosts().length <= 0 && <BannerPortraits id={selectedBannerPortrait.id} slug={selectedBannerPortrait.slug} img_desktop={selectedBannerPortrait.image_desktop} img_mobile={selectedBannerPortrait.image_mobile} banner_width={width} img_size={selectedBannerPortrait.img_size} img_size_mobile={selectedBannerPortrait.img_size_mobile}/>}
                {rightPosts().map((post, index) => (
                  LoadRightPostCardRight(post, index)
                  
                ))}
              </div>

            </div>

           
          
          </Fragment>  
      )
}

