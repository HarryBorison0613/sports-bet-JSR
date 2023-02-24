import React from 'react'
import { connectPagination } from 'react-instantsearch-dom'
import Image from 'next/image'

const range = (start, end) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i)
export default connectPagination(
  ({ padding = 3, refine, currentRefinement, nbPages }) => (
    <div className="text-white mb-10 flex flex-wrap items-center">
      <button
        onClick={() =>
          refine(currentRefinement >= 1 ? currentRefinement - 1 : 1)
        }
        className={`w-5 h-5 relative rotate-90 ${
          currentRefinement <= 1 ? 'hidden' : 'block'
        }`}
      >
        <Image src="/artigos/vectors/arrow.svg" alt="move" layout="fill" />
      </button>
      {range(
        Math.max(1, currentRefinement - padding),
        Math.min(nbPages, currentRefinement + padding)
      ).map((page) => (
        <button
          key={page}
          onClick={() => refine(page)}
          style={{
            color: currentRefinement === page ? '#930000' : 'unset',
          }}
          className="mx-2.5"
        >
          {page}
        </button>
      ))}
      <button
        onClick={() =>
          refine(
            currentRefinement != nbPages
              ? currentRefinement + 1
              : currentRefinement
          )
        }
        className={`w-5 h-5 relative -rotate-90 ${
          currentRefinement >= nbPages || !nbPages ? 'hidden' : 'block'
        }`}
      >
        <Image src="/artigos/vectors/arrow.svg" alt="move" layout="fill" />
      </button>
    </div>
  )
)
