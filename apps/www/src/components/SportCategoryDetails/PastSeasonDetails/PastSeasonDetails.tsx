import React from 'react'
import useGlobalContext from 'src/hooks/useGlobalContext/useGlobalContext'
import useSportCategoryContext from 'src/hooks/useSportCategoryContext/useSportCategoryContext'
import CategoryDetailsList from '../CategoryDetailsList/CategoryDetailsList'
import { PastSeasonDetailsItem } from './PastSeasonDetailsItem'

const PastSeasonDetails: React.FC = () => {
  const { category } = useGlobalContext()

  const { pastSeasons } = useSportCategoryContext()

  return (
    <CategoryDetailsList title="Temporadas anteriores">
      {pastSeasons?.map((season) => (
        <PastSeasonDetailsItem
          key={season?.season_id}
          season={{
            ...season,
            country_info: category?.country_info!,
          }}
        />
      ))}
    </CategoryDetailsList>
  )
}

export default PastSeasonDetails
