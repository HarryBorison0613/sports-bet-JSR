import React from 'react'

import AccountLayout from 'src/layouts/AccountLayout/AccountLayout'
import Login from 'src/components/Login/Login'
import MyAccount from 'src/components/MyAccount/MyAccount'
import useGlobalContext from '../../hooks/useGlobalContext/useGlobalContext'

import Spinner from 'src/components/Spinner/Spinner'

const AccountPage: React.FC = (props) => {
  const { isLogin, dispatchUserInfo } = useGlobalContext()

  return (
    <>
      {isLogin === true ? (
        <MyAccount />
      ) : isLogin === false ? (
        <Login />
      ) : (
        <div className="h-[300px]">
          <Spinner />
        </div>
      )}
    </>
  )
}

;(AccountPage as any).Layout = AccountLayout

export default AccountPage
