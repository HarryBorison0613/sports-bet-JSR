import React from 'react'
import { paginateArray } from 'src/utils/array'
const PAGE_SIZE = 6

export interface IPaginatedState<T> {
  activePageIndex: number
  original: T[]
  paginatedData: T[]
  completed: boolean
  pageSize: number
}

export type IPaginationAction = {
  type: 'next'
}

const getNextPage = <T>(
  state: IPaginatedState<T>,
  action: IPaginationAction
) => {
  const original = state?.original ?? []
  const activePageIndex = state?.activePageIndex + 1

  const paginatedData = [
    ...state.paginatedData,
    ...paginateArray([...original], state?.pageSize, activePageIndex),
  ]

  return {
    ...state,
    original,
    activePageIndex,
    paginatedData,
    completed: original?.length === paginatedData?.length,
  }
}

const reducer = <T>(
  state: IPaginatedState<T>,
  action: IPaginationAction
): IPaginatedState<T> => {
  switch (action.type) {
    case 'next':
    default:
      return getNextPage(state, action)
  }
}

const usePaginatedData = <T>(data: T[], pageSize = 6) => {
  const [state, dispatch] = React.useReducer<
    React.Reducer<IPaginatedState<T>, IPaginationAction>
  >(reducer, {
    pageSize,
    activePageIndex: 0,
    completed: data?.length <= pageSize,
    original: data,
    paginatedData: paginateArray([...data], pageSize, 0),
  })

  const nextPage = React.useCallback(() => {
    dispatch({ type: 'next' })
  }, [])

  return {
    ...state,
    nextPage,
  }
}

export default usePaginatedData
