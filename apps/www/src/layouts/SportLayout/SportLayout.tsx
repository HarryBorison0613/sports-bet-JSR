import Container from 'src/components/Container/Container'
import MainLayout from 'src/layouts/MainLayout/MainLayout'

const SportLayout: React.FC<React.PropsWithChildren<any>> = ({ children }) => {
  return (
    <MainLayout>
      <Container>{children}</Container>
    </MainLayout>
  )
}

export default SportLayout
