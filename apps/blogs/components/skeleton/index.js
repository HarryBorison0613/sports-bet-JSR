import Skeleton from "react-loading-skeleton"

export function PostSkeleton() {
  return (
    <>
    <section className="post-header bg-body flex md:min-h-[350px] lg:min-h-[500px] py-5 md:py-10">
      <div className="container relative">
         <div className="post-header__wrap flex flex-wrap">
           {/* Title */}
          <div className="w-full md:w-2/3 lg:w-4/5 md:pr-20 lg:pr-40">
            <div className="">
                <div>
                  <Skeleton height={36} width={400} />
                </div>
                
                <div className="single-page__wrapper  mt-[25px]   ">
                  <div className="bg-quartenary  flex md:p-4 p-2 flex-wrap w-fit">
                    <Skeleton height={50} width={500} />
                  </div>
                </div>

                <div className="h-20 !overflow-visible mt-5 md:mt-[50px] ">
                    <div className="single-page__author items-center lg:flex flex-wrap justify-between">
                      <Skeleton height={24} width={500} />
                    </div>
                </div>
            </div>
            
          </div>
          
          <div className="post-header__image w-full md:w-1/3 lg:w-1/5 md:right-0">
            <div className="rounded overflow-hidden lg:absolute">
              
              <Skeleton height={550} width={300} />
            </div>
              
          </div>


        </div>
      </div>
     
    </section>
 
    </>
  )
}

export function PostPreviewSkeleton() {
  return (
    <div className="my-4">
      <Skeleton height={200} width={200} />
      <Skeleton height={200} width={200} />
      <Skeleton height={200} width={200} />
    </div>
  )
}
