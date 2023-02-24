import { useRouter } from 'next/router'
import BaseLayout from 'src/layouts/BaseLayout/BaseLayout'
import Container from 'src/components/Container/Container'
import dynamic from 'next/dynamic'

const SportTabBar = dynamic(
  () => import('src/components/SportTabBar/SportTabBar'),
  { ssr: true }
)


const MainLayout: React.FC<React.PropsWithChildren<any>> = ({ children }) => {
  const { pathname } = useRouter()
  
  return (
    <BaseLayout>
      <SportTabBar />
      <Container className="2xl:w-8/12 grid gap-4">
      {children}
      </Container>
    </BaseLayout>
  )
}

export default MainLayout
