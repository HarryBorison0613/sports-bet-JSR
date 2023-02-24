import Card from 'src/components/Card/Card'
import Skeleton from 'src/components/Skeleton/Skeleton'
import React from 'react'

export const SportCategoryDetailsSkeleton = () => (
  <Card className="animate-pulse">
    <Card.Content>
      <Card.Header.Skeleton />
    </Card.Content>
    <Card.Content>
      <Skeleton.Description />
    </Card.Content>
  </Card>
)
