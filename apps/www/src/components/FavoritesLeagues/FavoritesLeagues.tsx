import cx from 'classnames'
import { Confirm } from 'src/components/common/Confirm'
import { confirmAlert } from 'react-confirm-alert'
import { toast } from 'react-toastify'
import Axios from 'axios'

import styles from './FavoritesLeagues.module.css'
import useGlobalContext from 'src/hooks/useGlobalContext/useGlobalContext'

const FavoritesLeagues: React.FC = () => {
  const { FavoritesLeagues, dispatchUserInfo } = useGlobalContext()

  const handleRemove = (id: number, userId: number) => {
    confirmAlert(
      Confirm(() => {
        const data = {
          id: id,
          userId: userId,
        }
        Axios.post('/api/myaccount/favoriteleagues/_delete', data)
          .then((res) => {
            dispatchUserInfo({
              type: 'resolved',
              data: {
                FavoriteLeaguesData: res.data.leaguesData,
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
        <p className="text-base text-customize-indigo pt-2">
          Favorites Leagues
        </p>
        {FavoritesLeagues?.length === 0 ||
        FavoritesLeagues?.length === undefined ? (
          <p className="mt-[50%] ml-[23%] text-base">No Favorite Leagues</p>
        ) : (
          FavoritesLeagues?.map((data: any, index: any) => (
            <div key={index}>
              <div className="flex mt-2">
                <img
                  src={`https://www.bets.com.br/_next/image?url=%2Flogos%2Fleagues-v2%2F${data.favoriteleaguesID}.png&w=64&q=75`}
                  className="w-[30px] h-[30px]"
                />
                <a
                  target="_blank"
                  href={data.favoriteleaguesURL}
                  className={cx(
                    styles.text,
                    'text-[15px]',
                    'mx-1',
                    'my-auto',
                    'cursor-pointer',
                    'capitalize'
                  )}
                >
                  {data.favoriteleaguesName}
                </a>
                <p
                  className="text-[14px] text-customize-indigo capitalize my-auto cursor-pointer  ml-auto hover:underline"
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

export default FavoritesLeagues
