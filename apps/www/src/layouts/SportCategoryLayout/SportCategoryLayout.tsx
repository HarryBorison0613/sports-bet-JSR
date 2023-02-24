import MainLayout from 'src/layouts/MainLayout/MainLayout'
import ThreeColumnLayout from '../ThreeColumnLayout/ThreeColumnLayout'
import { SportCategoryContextProvider } from 'src/context/SportCategoryContext/SportCategoryContext'
import dynamic from 'next/dynamic'

const FeaturedBlogCarousel = dynamic(
  () => import('src/components/FeaturedBlogCarousel/FeaturedBlogCarousel'),
  { ssr: true }
)

const SportCategories = dynamic(
  () => import('src/components/SportCategories/SportCategories'),
  { ssr: true }
)

const MostPopularLeagues = dynamic(
  () => import('src/components/MostPopularLeagues/MostPopularLeagues'),
  { ssr: true }
)

const SocialChannelCard = dynamic(
  () => import('src/components/SocialChannelCard/SocialChannelCard'),
  { ssr: true }
)

const PromoCTA = dynamic(() => import('src/components/PromoCTA/PromoCTA'), {
  ssr: false,
})

const SportCategoryLayout: React.FC<React.PropsWithChildren<any>> = ({
  children,
  ...restProps
}) => {
  return (
    <SportCategoryContextProvider {...restProps}>
      <MainLayout>
        <ThreeColumnLayout
          blogCarousel={
            <>
              <FeaturedBlogCarousel />
            </>
          }
          left={
            <>
              <SportCategories />
            </>
          }
          right={
            <>
              <MostPopularLeagues />
              <SocialChannelCard />
              <PromoCTA />
            </>
          }
        >
          {children}
        </ThreeColumnLayout>
      </MainLayout>
    </SportCategoryContextProvider>
  )
}

export default SportCategoryLayout
