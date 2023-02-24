import Link from '@app/link'
import React from 'react'
import CardList from 'src/components/CardList/CardList'
import CardListButton from 'src/components/CardListButton/CardListButton'
import usePaginatedData from 'src/hooks/usePaginatedData/usePaginatedData'
import type { ISportCategorySummary } from 'src/interface'
import styles from './SportCategories.module.css'

export interface ISportCategoriesMainContentProps {
  title: string
  query: any
  categories: ISportCategorySummary[]
}

export const SportCategoriesMainContent: React.FC<
  ISportCategoriesMainContentProps
> = ({ categories, query, title }) => {
  const { paginatedData, completed, nextPage } = usePaginatedData(categories)

  return (
    <CardList
      title={title}
      className={styles.base}
      viewMore={!completed}
      onClickViewMore={nextPage}
    >
      {paginatedData?.map((x, index) => (
        <Link
          key={x?.id}
          href={{
            pathname: '/[sport]/[category]/[league_id]',
            query: {
              sport: query?.sport,
              category: x?.slug,
              league_id: x?.latest_competition?.league_id,
            },
          }}
        >
          <CardListButton
            data-category-id={x?.category_id}
            icon={x?.country_info?.icon}
            label={x?.name}
            active={query?.category === x?.slug}
          />
        </Link>
      ))}
    </CardList>
  )
}
