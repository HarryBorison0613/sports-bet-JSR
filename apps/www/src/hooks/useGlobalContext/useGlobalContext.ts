import React from 'react'
import { GlobalContext } from 'src/context/GlobalContext/GlobalContext'

const useGlobalContext = () => {
  return React.useContext(GlobalContext)
}

export default useGlobalContext
