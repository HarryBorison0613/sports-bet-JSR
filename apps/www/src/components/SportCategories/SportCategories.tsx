import { useI18n } from '@corex/use-i18n'
import CardList from 'src/components/CardList/CardList'
import useGlobalContext from 'src/hooks/useGlobalContext/useGlobalContext'
import { SportCategoriesMainContent } from './SportCategoriesMainContent'

const SportCategories: React.FC = () => {
  const { categories, query, isLoadingGlobalContext } = useGlobalContext()

  const { t } = useI18n()

  // Loading State
  if (isLoadingGlobalContext) {
    return <CardList title={t('country')} loading={true} />
  }

  // Empty State
  if (!categories || categories?.length === 0) {
    return <></>
  }

  return (
    <SportCategoriesMainContent
      title={t('country')}
      categories={categories}
      query={query}
    />
  )
}

export default SportCategories
