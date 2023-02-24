import React from "react"
import { connectSearchBox } from "react-instantsearch-dom";


export default connectSearchBox(({ refine, currentRefinement, className, onFocus }) => (
      
    <form className={className}>
      <input
        className="bg-transparent outline-none text-bold text-white px-2.5 text-2xl md:text-4xl lg:text-6xl w-full"
        type="text"
        placeholder="Buscar"
        aria-label="Buscar"
        onChange={e => refine(e.target.value)}
        value={currentRefinement}
        onFocus={onFocus}
      />
      
    </form>
  )
)

