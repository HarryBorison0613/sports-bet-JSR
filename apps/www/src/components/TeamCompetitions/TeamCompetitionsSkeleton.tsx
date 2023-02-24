import React from 'react'
import Card, { ICardProps } from 'src/components/Card/Card'
import Skeleton from 'src/components/Skeleton/Skeleton'
import cx from 'classnames'

export const TeamCompetitionsSkeleton: React.FC<ICardProps> = ({
  className,
  ...restProps
}) => {
  return (
    <Card
      title="Competições"
      className={cx('animate-pulse', className)}
      {...restProps}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {[...Array(6)].map((_, index) => (
          <Skeleton.Profile key={index} />
        ))}
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 border-t">
        {[...Array(2)].map((_, index) => (
          <Card.Content key={index} className="border-r lg:border-r-0">
            <Skeleton.List />
          </Card.Content>
        ))}
      </div> */}
    </Card>
  )
}
