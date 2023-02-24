import Image from "next/image";
import {Fragment } from "react"


export default function HeroTag({ tag }) {


 const featuredImage = () => {
  if(tag.feature_image) {
    return (
      <Fragment>
         <div className="text-center text-lg lg:text-2xl relative w-[200px] h-[200px] rounded-full overflow-hidden mx-auto mt-10 mb-10 border-solid border-white border-8">
          <Image
            src={tag.feature_image}
            alt={tag.title}
            layout='fill'
          />
        </div>
      </Fragment>
     
    )
  } 
 }
  
  return (
    <section className="hero-tag bg-body min-h-[100px] md:min-h-[200px] pt-5 lg:pt-10 pb-5 lg:pb-10 overflow-x-hidden">
      <div className="container">
        <h1 className="hero-tag__title text-white text-center text-3xl md:text-7xl lg:text-8xl leading-normal font-bold relative w-fit mx-auto">
          {tag.name}
        </h1>
        <h2 className="text-white text-center text-lg lg:text-2xl">
          {tag.description}
        </h2>
        {featuredImage()}
      </div>
    </section>
  );
}
