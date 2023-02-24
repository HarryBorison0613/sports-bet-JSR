import React from 'react'

const useToggle = (initialOn = false) => {
  const [on, setState] = React.useState(initialOn)

  const setOn = React.useCallback(() => setState(true), [])

  const setOff = React.useCallback(() => setState(false), [])

  const toggleOn = React.useCallback(() => setState((x) => !x), [])

  return {
    on,
    setOn,
    setOff,
    toggleOn,
  }
}

export default useToggle
