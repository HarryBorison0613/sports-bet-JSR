import React from 'react'
import type { CellProps } from 'react-table'
import { ISportEventSummary } from 'src/interface'
import Card, { ICardProps } from 'src/components/Card/Card'
import { MatchTableContent } from './MatchTableContent'
import TableSkeleton from 'src/components/TableSkeleton/TableSkeleton'
import cx from 'classnames'

export interface IMatchTable extends ICardProps {
  summaries?: ISportEventSummary[]
  loading?: boolean
}

export type CustomCell = CellProps<ISportEventSummary>

export type CustomRow = {
  original: ISportEventSummary
}

const MatchTable: React.FC<IMatchTable> = ({
  summaries,
  loading,
  className,
  ...restProps
}) => {
  // Loading
  if (!summaries) {
    return (
      <Card title={restProps?.title} className={cx('animate-pulse', className)}>
        <TableSkeleton />
      </Card>
    )
  }

  // Empty state
  if (summaries?.length === 0) {
    return <></>
  }

  return (
    <MatchTableContent
      summaries={summaries}
      className={className}
      {...restProps}
    />
  )
}

export default MatchTable
