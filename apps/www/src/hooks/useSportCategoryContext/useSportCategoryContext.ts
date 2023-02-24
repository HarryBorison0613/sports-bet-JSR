import React from 'react'
import { SportCategoryContext } from 'src/context/SportCategoryContext/SportCategoryContext'

const useSportCategoryContext = () => {
  return React.useContext(SportCategoryContext)
}

export default useSportCategoryContext
