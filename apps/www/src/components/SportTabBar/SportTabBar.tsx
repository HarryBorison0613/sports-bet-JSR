import TabBar from 'src/components/TabBar/TabBar'
import useSportTabBar from 'src/hooks/useSportTabBar/useSportTabBar'

const SportTabBar: React.FC = () => {
  const { items } = useSportTabBar()

  return <TabBar items={items} />
}

export default SportTabBar
