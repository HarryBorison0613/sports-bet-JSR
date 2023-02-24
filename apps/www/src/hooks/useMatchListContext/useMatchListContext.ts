import React from 'react'
import { MatchListContext } from 'src/context/MatchListContext/MatchListContext'

const useMatchListContext = () => {
  return React.useContext(MatchListContext)
}

export default useMatchListContext
