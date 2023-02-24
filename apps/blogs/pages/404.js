import Layout from "@/components/layouts/layout"
import Meta from "@/components/meta/meta"
import { defaultSettings } from "@/lib/env"
import {searchBanners} from "@/lib/const"
import { useState,  useRef, useLayoutEffect } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Custom404() {
  
    const emptyArray = {defaultSettings: defaultSettings};
    //Calculate the width of the ref div on portrait
    const ref = useRef(null);
    const [width, setWidth] = useState(0);


    useLayoutEffect(() => {
        setWidth(ref.current.offsetWidth);
    }, []);

    const heightProportion = (img_size) => {
        return img_size[1] / img_size[0];

    };

    return (
        <>
          <Meta article='' settings={emptyArray} articlesTags=''/>
          <Layout settings={emptyArray}>
            <article className="404">
                <div className="container md:py-20 relative" >
                    <div className="text-[120px] lg:text-[160px] text-center">
                        404
                    </div>

                    <div className="text-[40px] lg:text-[80px] text-center">
                        Opa! algo deu errado
                    </div>
                    
                    <div className="mt-5 mt-10">
                        <div className="text-sm text-white font-bold">
                            Acesso rápido:
                        </div>
                        <div className="mt-2 flex flex-wrap mb-20">
                            {searchBanners.map((banner, index) => (
                                <div className="w-full md:w-1/2 lg:w-1/4 px-2" key={index}>
                                    <div className="search__image relative mb-5" ref={ref}>
                                        <Link href={banner.link}>
                                            <a className="block">
                                                <Image
                                                src={banner.image}
                                                alt={banner.title}
                                                width={width}
                                                height={width * heightProportion(banner.img_size)}
                                                />
                                            </a>
                                            </Link>
                                        
                                    </div>
                                    
                                </div>   
                            ))}
                            
                        </div>
                    </div>
                    
                </div>
              
            </article>
            
    
            
          </Layout>
          
        </>
      )
    
  }
