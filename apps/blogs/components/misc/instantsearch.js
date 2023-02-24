import React from 'react'
import { useState } from 'react'
import {
  RefinementList,
  Hits,
  Configure,
  Highlight,
  InstantSearch,
  createConnector,
} from 'react-instantsearch-dom'
import PostPreviewFourth from '@/components/shared/post-preview-004'
import Image from 'next/image'
import { Sugestions } from '@/components/misc/sugestions'
import ConnectSearchBox from '@/components/misc/searchbox'
import ConnectPagination from '@/components/misc/pagination'

const handleClick = (e) => {
  document.querySelector('.modal-close').click()
}

export function SearchApp(props) {
  const HitComponent = ({ hit }) => (
    <div className="hit w-full px-5 pb-10" onClick={handleClick}>
      <PostPreviewFourth post={hit} tags={hit.tags} />
    </div>
  )

  const numberOfHits = 12

  return (
    <InstantSearch {...props}>
      <Configure hitsPerPage={numberOfHits} />
      <div className="search">
        <header className="">
          <div className="border-b-4 border-white border-solid w-full lg:w-2/3 flex flex-wrap items-center">
            <div className="w-[40px] md:w-[40px]">
              <div className="w-[20px] h-[20px] md:w-[30px] md:h-[30px] relative">
                <Image
                  src="/artigos/vectors/search.svg"
                  alt="search-icon"
                  layout="fill"
                />
              </div>
            </div>
            <div className="search__input">
              <ConnectSearchBox props={props} />
            </div>

            <div id="autocomplete"></div>
          </div>
          <div className="text-sm text-white mt-2 font-thin mb-2">
            Por favor digite ao menos 3 personagens
          </div>
        </header>
        <main>
          <div className="menu">
            <RefinementList attribute="tags" />
          </div>
          <div className="container px-0">
            <div className="flex flex-wrap justify-end">
              <ConnectPagination showFirst={false} />
            </div>

            <div className="results flex flex-wrap -ml-5 -mr-5">
              <Hits hitComponent={HitComponent} />
            </div>
          </div>
        </main>
      </div>
    </InstantSearch>
  )
}
