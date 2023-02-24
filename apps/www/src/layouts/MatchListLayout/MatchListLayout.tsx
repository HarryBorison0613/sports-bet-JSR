import About from 'src/components/About/About'
import Container from 'src/components/Container/Container'
import MainLayout from 'src/layouts/MainLayout/MainLayout'

const MatchListLayout: React.FC<React.PropsWithChildren<any>> = ({
  children,
}) => {
  return (
    <MainLayout>
      <Container className="lg:w-8/12 grid gap-4">
        {children}
        <About />
      </Container>
    </MainLayout>
  )
}

export default MatchListLayout
