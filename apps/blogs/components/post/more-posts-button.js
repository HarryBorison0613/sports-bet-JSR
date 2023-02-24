import { useEffect, useState, Fragment } from "react"
import PostPreviewSecond from "@/components/shared/post-preview-002"
import PostPreviewThird from "@/components/shared/post-preview-003"
import WindowsBreackpoint from "../../lib/helpers/breackpoint"


  // Make sure you are pulling ALL your posts from the ghost API [No limit]

  export default function LatestPostMoreButton(props) {

    //console.log(props)

    //Screen size
    const screenSize = WindowsBreackpoint(760).isBreakpoint;

    const changeArray = WindowsBreackpoint(1023).isBreakpoint;

    const [posts, setPosts] = useState(props.props.posts)
    const [meta, setMeta] = useState(props.props.meta)
    const [procesing, setProcesing] = useState(false)
   

    

    const getPostFromAPI = async (page = 1) => {
      const res = await fetch(`/artigos/api/v1/post?page=${page}`)
      return await res.json()
    }
  
    const getMorePost = async () => {
      setProcesing(true)
      const result = await getPostFromAPI(meta.pagination.next)
      if (result) {
        setProcesing(false)
      }
      // set new post and new meta
      setPosts((post) => post.concat(result.posts))
      setMeta(result.meta)
    }

    const firstPart = posts.filter(function(value, index, Arr) {
        return index % 2 == 0;
    });

    const secondPart = posts.filter(function(value, index, Arr) {
      return index % 2 != 0;
    });

    
    //Split the amount of posts to have 2 columns
    var halfWayIndex = Math.ceil(posts.length / 2)
  
    //Create 2 new arrays
    const firstHalf = posts.slice(0, (halfWayIndex))
    const secondHalf = posts.slice((halfWayIndex))

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

  
    //Load the right post cards on left
    const LoadRightPostCardLeft = (post) => {
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

    const loader = () => {
      if(procesing) {
        return (
          <span className="lds-dual-ring absolute"></span>
        )
      }
    }
    
  
  //Load more posts on click
    function loadMore() {
      getMorePost();
    }
    return (
          <Fragment>  
            <div className="flex flex-wrap mt-10">
              <div className="home-content__right-first w-full lg:w-1/2 lg:pl-[40px]">
            
                {leftPosts().map((post) => (
                  LoadRightPostCardLeft(post)
                  
                ))}
              </div>
              <div className="home-content__right-second w-full lg:w-1/2 lg:pl-[40px]">
                {rightPosts().map((post) => (
                  <Fragment key={post.id}>  
                    <PostPreviewSecond post={post} tags={post.tags} />
                  </Fragment>  
                  
                ))}
              </div>

            </div>

            <div className="flex justify-center mb-[50px] lg:mb-[100px] w-full">
              <button className="p-4 min-w-[180px] rounded bg-primary text-white uppercase font-bold" onClick={loadMore}>CARREGUE MAIS{loader()}</button>
            </div>
          
          </Fragment>  
      )
}