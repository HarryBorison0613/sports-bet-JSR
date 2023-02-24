import { useRouter } from 'next/router'
import React from 'react'
import useSportCategories from 'src/hooks/useSportCategories/useSportCategories'
import type { ISportCategorySummary } from 'src/interface'
import { Logout } from 'src/components/Login/Login'
import Axios from 'axios'
import jwt_decode from 'jwt-decode'
export interface IGlobalContextPropsProps {
  query?: any
  isLoadingGlobalContext?: boolean
  categories?: ISportCategorySummary[]
  category?: ISportCategorySummary
  pathname?: string
  isLogin: boolean | undefined
  userInfo: object
  userState: UserState
  allUser: object
  FavoritesTeams: any
  FavoritesLeagues: any
  dispatchUserInfo: React.Dispatch<UserStateAction>
}

interface UserState {
  status: string
  data: any
  error?: string
}

interface UserStateAction {
  type: string
  data?: any
  error?: string
}

export const GlobalContext = React.createContext<IGlobalContextPropsProps>(
  {} as any
)

const userReducer = (state: UserState, action: UserStateAction): UserState => {
  switch (action.type) {
    case 'resolved':
      return {
        status: 'resolved',
        data: { ...(state.data ? state.data : {}), ...action.data },
      }
    case 'rejected':
      return { status: 'rejected', data: null, error: action.error }
    case 'pending':
      return { status: 'pending', data: null }
    default:
      return state
  }
}

const GlobalContextProvider: React.FC<React.PropsWithChildren<any>> = ({
  children,
}) => {
  const { query, pathname } = useRouter()

  const { data: categories, isValidating: loadingCategories } =
    useSportCategories(query?.sport as string)

  // const [isLogin, setIsLogin] = React.useState<boolean | undefined>();
  // const [userInfo, setUserInfo] = React.useState({});
  const [userState, dispatchUserInfo] = React.useReducer(userReducer, {
    status: 'idle',
    data: {
      isLogin: null,
      userData: null,
      allUserData: null,
      FavoriteTeamsData: null,
      FavoriteLeaguesData: null,
      error: null,
    },
  })
  // Loading global context
  const isLoadingGlobalContext = React.useMemo(
    () => loadingCategories,
    [loadingCategories]
  )

  const category = React.useMemo(
    () => categories?.find((x) => x.slug === query?.category),
    [categories, query?.category]
  )

  const {
    status,
    data: {
      isLogin,
      userData: userInfo,
      allUserData: allUser,
      FavoriteTeamsData: FavoritesTeams,
      FavoriteLeaguesData: FavoritesLeagues,
    },
  } = userState

  React.useEffect(() => {
    if (localStorage.MyAccountToken) {
      let decoded: any = jwt_decode(localStorage.MyAccountToken)
      if (decoded.exp * 1000 < Date.now()) {
        Logout()
        dispatchUserInfo({ type: 'resolved', data: { isLogin: false } })
      } else {
        Axios.get(`/api/myaccount/${decoded.sub}`)
          .then((res) => {
            if (res.data.data.type === 'referrer') {
              dispatchUserInfo({
                type: 'resolved',
                data: {
                  isLogin: true,
                  userData: res.data.data,
                  allUserData: res.data.allUser,
                  FavoriteTeamsData: res.data.favoriteTeams,
                  FavoriteLeaguesData: res.data.favoriteLeagues,
                },
              })
            } else {
              dispatchUserInfo({
                type: 'resolved',
                data: {
                  isLogin: true,
                  userData: res.data.data,
                  FavoritesTeams: res.data.favoriteTeams,
                  FavoritesLeagues: res.data.favoriteLeagues,
                },
              })
            }
          })
          .catch((err) => console.log(err))
      }
    } else {
      dispatchUserInfo({ type: 'resolved', data: { isLogin: false } })
    }
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        query,
        categories,
        isLoadingGlobalContext,
        category,
        pathname,
        isLogin,
        userInfo,
        userState,
        allUser,
        FavoritesLeagues,
        FavoritesTeams,
        dispatchUserInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider
