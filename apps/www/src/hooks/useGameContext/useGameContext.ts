import React from 'react'
import { GameContext } from 'src/context/GameContext/GameContext'

const useGameContext = () => {
  return React.useContext(GameContext)
}

export default useGameContext
