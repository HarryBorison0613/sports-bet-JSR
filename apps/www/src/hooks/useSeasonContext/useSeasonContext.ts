import React from 'react'
import { SeasonContext } from 'src/context/SeasonContext/SeasonContext'

const useSeasonContext = () => {
  return React.useContext(SeasonContext)
}

export default useSeasonContext
