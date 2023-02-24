import { useState, Fragment } from "react"
import PostPreviewThird from "@/components/shared/post-preview-003"

export default function ListedPosts(posts) {
  const tagPosts = useState(posts.posts)[0]

  return (
    <>
    {tagPosts.map((post, index) => (
      <Fragment key={post.id}>  
        <PostPreviewThird post={post} tags={post.tags} />
      </Fragment> 
      
    ))}
    </>
  )
}
