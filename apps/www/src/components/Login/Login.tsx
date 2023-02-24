import React from 'react'
import cx from 'classnames'
import Axios from 'axios'

import { toast } from 'react-toastify'

import Link from '@app/link'
import styles from './Login.module.css'
import { ILoginParams } from 'src/interface'

import useGlobalContext from 'src/hooks/useGlobalContext/useGlobalContext'
import InputTextField from 'src/components/common/InputTextField'

import validateLoginInput from 'src/validation/login'

const Login: React.FC<ILoginParams> = () => {
  const { dispatchUserInfo } = useGlobalContext()

  const [loginInfo, setLoginInfo] = React.useState({
    username: '',
    password: '',
  })

  const [errorForm, setErrorForm] = React.useState({
    username: '',
    password: '',
  })

  const handleChange = async (e: any) => {
    await setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
  }
  const { errors, isValid } = validateLoginInput(loginInfo)

  const handleFormSubmit = (e: any) => {
    e.preventDefault()

    if (!isValid) {
      setErrorForm(errors)
    } else {
      Axios.post('/api/login/login', loginInfo)
        .then((res) => {
          if (res.data.data.type === 'referrer') {
            dispatchUserInfo({
              type: 'resolved',
              data: {
                isLogin: true,
                userData: res.data.data,
                allUserData: res.data.allUser,
                FavoriteTeamsData: res.data.FavoriteTeam,
                FavoriteLeaguesData: res.data.FavoriteLeagues,
              },
            })
          } else {
            dispatchUserInfo({
              type: 'resolved',
              data: {
                isLogin: true,
                userData: res.data.data,
                FavoriteTeamsData: res.data.FavoriteTeam,
                FavoriteLeaguesData: res.data.FavoriteLeagues,
              },
            })
          }
          localStorage.setItem(
            'MyAccountToken',
            JSON.stringify(res?.data?.token)
          )
          toast.success('Sucessfully logged in', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'w-[110%]',
          })
        })
        .catch((err) => {
          toast.error(err.response.data.errors, {
            position: toast.POSITION.TOP_CENTER,
            className: 'w-[110%]',
          })
        })
    }
  }

  return (
    <div className={cx(styles.base, 'container')}>
      <p
        className={cx(
          styles.text,
          'text-[20px]',
          'leading-6',
          'text-center',
          'pt-9'
        )}
      >
        Login
      </p>
      <form>
        <InputTextField
          label="Username"
          htmlFor="username"
          name="username"
          onChange={handleChange}
          id="username"
          type="text"
          margin="mt-2"
          disable={false}
          style={styles.input}
          error={errorForm.username}
        />
        <InputTextField
          label="Password"
          htmlFor="password"
          name="password"
          onChange={handleChange}
          id="password"
          type="password"
          margin="mt-2"
          disable={false}
          style={styles.input}
          error={errorForm.password}
        />
        <div className="flex mt-8">
          <button
            type="submit"
            className={styles.button}
            onClick={handleFormSubmit}
          >
            Login
          </button>
        </div>
      </form>
      <div className="flex font-jost font-normal leading-[19px] mt-4 text-[13px] justify-center">
        <p className="text-black text-center">Forgot your password?</p>
        <Link href="/conta/recuperar-senha">
          <p className="ml-2 text-[#0057A3] cursor-pointer hover:underline">
            Request a new password
          </p>
        </Link>
      </div>
    </div>
  )
}

export default Login

export const Logout = () => {
  localStorage.removeItem('MyAccountToken')
}
