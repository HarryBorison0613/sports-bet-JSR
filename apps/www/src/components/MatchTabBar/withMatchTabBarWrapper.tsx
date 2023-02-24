import Container from 'src/components/Container/Container'
import MatchTabBarDatePicker from './MatchTabBarDatePicker'

export const withMatchTabBarWrapper = (App: React.FC<any>) => {
  const Wrapper: React.FC<any> = (props) => (
    <Container className="hidden lg:block">
      <MatchTabBarDatePicker>
        <App {...props} />
      </MatchTabBarDatePicker>
    </Container>
  )

  return Wrapper
}
