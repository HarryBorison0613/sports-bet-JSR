import cx from 'classnames'
import { Confirm } from 'src/components/common/Confirm'
import { confirmAlert } from 'react-confirm-alert'
import Axios from 'axios'
import { toast } from 'react-toastify'

import styles from './FavoritesTeams.module.css'
import useGlobalContext from '../../hooks/useGlobalContext/useGlobalContext'

const FavoritesTeams: React.FC = () => {
  const { FavoritesTeams, dispatchUserInfo } = useGlobalContext()

  const handleRemove = (id: number, userId: number) => {
    confirmAlert(
      Confirm(() => {
        const data = {
          id: id,
          userId: userId,
        }
        Axios.post(`/api/myaccount/favoriteteam/_delete`, data)
          .then((res) => {
            dispatchUserInfo({
              type: 'resolved',
              data: {
                FavoriteTeamsData: res.data.teamData,
              },
            })
            toast.success(res.data.message, {
              position: toast.POSITION.TOP_RIGHT,
            })
          })
          .catch((err) => {
            toast.error('Server Error!', {
              position: toast.POSITION.TOP_RIGHT,
            })
          })
      })
    )
  }
  return (
    <>
      <div
        className={cx(styles.base, styles.text, 'container', 'overflow-auto')}
      >
        <p className="text-base text-customize-indigo pt-2">Favorites Teams</p>
        {FavoritesTeams?.length === 0 ||
        FavoritesTeams?.length === undefined ? (
          <p className="mt-[50%] ml-[30%] text-base">No FavoriteTeam</p>
        ) : (
          FavoritesTeams?.map((data: any, index: any) => (
            <div key={index}>
              <div className="flex mt-2">
                <img
                  src={`https://www.bets.com.br/_next/image?url=%2Flogos%2Fteams-v2%2F${data.favoriteteamID}.png&w=64&q=75`}
                  className="w-[25.6px] h-[26px]"
                />
                <a
                  target="_blank"
                  href={data.favoriteteamURL}
                  className="text-[15px] mx-1 my-auto cursor-pointer capitalize"
                >
                  {data.favoriteteamName}
                </a>
                <p
                  className="text-[14px] text-customize-indigo capitalize my-auto cursor-pointer ml-auto hover:underline"
                  onClick={() => handleRemove(data.id, data.userId)}
                >
                  Remove
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default FavoritesTeams
