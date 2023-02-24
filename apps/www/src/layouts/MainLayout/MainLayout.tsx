import { useRouter } from 'next/router'
import BaseLayout from 'src/layouts/BaseLayout/BaseLayout'
import dynamic from 'next/dynamic'

const SportTabBar = dynamic(
  () => import('src/components/SportTabBar/SportTabBar'),
  { ssr: true }
)

const MatchTabBar = dynamic(
  () => import('src/components/MatchTabBar/MatchTabBar'),
  { ssr: true }
)

const MainLayout: React.FC<React.PropsWithChildren<any>> = ({ children }) => {
  const { pathname } = useRouter()

  return (
    <BaseLayout>
      <SportTabBar />

      {!pathname.endsWith('vivo') && <MatchTabBar />}

      {children}
    </BaseLayout>
  )
}

export default MainLayout
