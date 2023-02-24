//import Search from "@/components/layouts/search";
import { useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { searchBanners } from "@/lib/const";
import Link from "next/link";
import SearchAppFields from "@/components/shared/search";

export default function SearchPopUp({ settings }) {
  const [isActive, setActive] = useState("false");
  const searchToggle = () => {
    setActive(!isActive);
  };

  const handleClick = (e) => {
    document.querySelector(".modal-close").click();
  };

  const heightProportion = (img_size) => {
    return img_size[1] / img_size[0];
  };

  //Calculate the width of the ref div on portrait
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
  }, []);

  return (
    <>
      <div
        className="h-[30px] w-[250px] rounded-full border border-white overflow-hidden flex"
        onClick={searchToggle}
      >
        <input
          type="text"
          className="flex-1 h-full bg-transparent outline-none text-white px-2.5"
          placeholder="Buscar"
          disabled
        />

        <div className="bg-secondary hover:bg-primary flex items-center justify-center px-2 border-l border-l-white cursor-pointer">
          <Image
            src="/artigos/vectors/search.svg"
            alt="search-icon"
            width={16}
            height={16}
          />
        </div>
      </div>

      <div className={`search__modal ${!isActive ? "active" : ""}`}>
        <div className="container py-20 h-[100vh] relative">
          <SearchAppFields />

          <div className="mt-5 mt-10">
            <div className="text-sm text-white font-bold">Acesso rápido:</div>
            <div className="mt-2 flex flex-wrap mb-20">
              {searchBanners.map((banner, index) => (
                <div
                  className="w-full md:w-1/2 lg:w-1/4 px-2"
                  key={index}
                  onClick={handleClick}
                >
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
          {/* <Search /> */}

          <button
            className="text-white absolute right-5 lg:right-0 top-5 lg:top-10 w-6 lg:w-8 h-6 lg:h-8 modal-close"
            onClick={searchToggle}
          >
            <Image src="/artigos/vectors/plus.svg" alt="search-close" layout="fill" />
          </button>
        </div>
      </div>
    </>
  );
}
