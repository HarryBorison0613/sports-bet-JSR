import FavoritesTeams from 'src/components/FavoritesTeams/FavoritesTeams'
import FavoritesLeagues from '../FavoritesLeagues/FavoritesLeagues'
import Profile from '../Profile/Profile'
import ReferrerTable from '../ReferrerTable/ReferrerTable'

import useGlobalContext from 'src/hooks/useGlobalContext/useGlobalContext'

const MyAccount: React.FC = () => {
  const { userState } = useGlobalContext()

  return (
    <>
      <div className="flex justify-center flex-wrap gap-[15px]">
        <Profile />

        <FavoritesTeams />

        <FavoritesLeagues />
      </div>
      {userState?.data?.userData?.type === 'referrer' ? (
        <div>
          <ReferrerTable />
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default MyAccount
