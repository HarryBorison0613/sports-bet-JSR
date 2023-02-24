import React from 'react'
import { TeamContext } from 'src/context/TeamContext/TeamContext'

const useTeamContext = () => {
  return React.useContext(TeamContext)
}

export default useTeamContext
