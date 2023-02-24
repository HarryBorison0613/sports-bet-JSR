import React from 'react'

export interface ITextSummaryState {
  original: string[]
  summarizedText: string[]
  label: string
  type: TextSummaryActionType
}

export type TextSummaryActionType = 'more' | 'less'

export type ITextSummaryAction = {
  type: TextSummaryActionType
}

const summarizeContent = (original: string[]): string[] =>
  original.map((x) => `${x?.slice(0, 120)}...`)

const reducer = (
  state: ITextSummaryState,
  action: ITextSummaryAction
): ITextSummaryState => {
  switch (action.type) {
    case 'less':
      return {
        ...state,
        label: 'Mais',
        summarizedText: summarizeContent(state?.original),
        type: 'less',
      }
    case 'more':
    default:
      return {
        ...state,
        summarizedText: state?.original,
        label: 'Menos',
        type: 'more',
      }
  }
}

const useTextSummary = (original: string[]) => {
  const [state, dispatch] = React.useReducer<
    React.Reducer<ITextSummaryState, ITextSummaryAction>
  >(reducer, {
    original,
    summarizedText: summarizeContent(original),
    label: 'Mais',
    type: 'less',
  })

  const onToggleTextSummary = React.useCallback(() => {
    return dispatch({ type: state?.type === 'more' ? 'less' : 'more' })
  }, [state?.type])

  return {
    ...state,
    onToggleTextSummary,
  }
}

export default useTextSummary
