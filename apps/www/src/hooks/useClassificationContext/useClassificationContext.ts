import React from 'react'
import { ClassificationContext } from 'src/context/ClassificationContext/ClassificationContext'

const useClassificationContext = () => {
  return React.useContext(ClassificationContext)
}

export default useClassificationContext
