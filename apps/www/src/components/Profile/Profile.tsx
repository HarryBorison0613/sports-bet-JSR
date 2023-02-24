import React from 'react'
import cx from 'classnames'
import InputTextField from 'src/components/common/InputTextField'
import Axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/dist/client/router'

import validateProfile from 'src/validation/profile'
import styles from './Profile.module.css'
import useGlobalContext from 'src/hooks/useGlobalContext/useGlobalContext'

const Profile: React.FC = () => {
  const [openEdit, setOpenEdit] = React.useState(false)

  const { userState, dispatchUserInfo } = useGlobalContext()

  const router = useRouter()

  const MyInfoData = userState.data.userData

  const [editInfo, setEditInfo] = React.useState({
    phonenumber: MyInfoData.phonenumber,
    editName: MyInfoData.name,
    userName: MyInfoData.username,
    email: MyInfoData?.mail,
    newPassword: '',
    confirmPassword: '',
  })

  const [errorForm, setErrorForm] = React.useState({
    newPassword: '',
    confirmPassword: '',
  })

  const handleOpenEdit = () => {
    setOpenEdit(!openEdit)
  }

  const handleChange = (e: any) => {
    setEditInfo({ ...editInfo, [e.target.name]: e.target.value })
  }

  const { errors, isValid } = validateProfile(editInfo)

  let token = JSON.parse(localStorage.MyAccountToken)

  const handleEditSubmit = (e: any) => {
    e.preventDefault()

    if (editInfo.newPassword) {
      if (!isValid) {
        setErrorForm(errors)
        return
      }
    }
    Axios.post('/api/profile/editProfile', editInfo, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        setOpenEdit(false)
        setErrorForm({
          newPassword: '',
          confirmPassword: '',
        })
        toast.success('Successfully update!', {
          position: toast.POSITION.TOP_RIGHT,
        })
        dispatchUserInfo({ type: 'resolved', data: { isLogin: false } })
        router.push('/conta')
      })
      .catch((err) => {
        setErrorForm({
          newPassword: '',
          confirmPassword: '',
        })
        toast.error('Server Error!', {
          position: toast.POSITION.TOP_RIGHT,
        })
      })
  }
  return (
    <>
      <div className={cx(styles.base, styles.text, 'container')}>
        <div className="flex justify-between pt-2">
          <p className="text-customize-indigo text-base">{MyInfoData.name}</p>
          <p className="text-[14px] my-auto capitalize"> {MyInfoData.type}</p>
        </div>
        <p className="text-[15px] mt-2">{MyInfoData.phonenumber}</p>
        <div className="flex justify-between">
          <p className="text-[15px]">{MyInfoData?.mail}</p>
          <p
            className="text-[14px] text-customize-indigo cursor-pointer hover:underline my-auto"
            onClick={handleOpenEdit}
          >
            Edit
          </p>
        </div>
        <div className="my-4">
          <a href="https://pro.bets.com.br/trade" target="_blank">
            <button className={cx(styles.button)}>Bet now</button>
          </a>
        </div>
        {openEdit ? (
          <div className="border-t border-[#979797] text-[13px]">
            <p className="mt-3 text-base text-customize-indigo">
              Edit your details:
            </p>
            <form>
              <InputTextField
                label="Edit your name"
                htmlFor="editName"
                name="editName"
                onChange={handleChange}
                id="editName"
                type="text"
                style={styles.input}
                margin="mt-0"
                error={''}
                value={editInfo.editName}
                disable={false}
              />
              <InputTextField
                label="Edit your username"
                htmlFor="username"
                name="username"
                onChange={handleChange}
                id="userName"
                type="text"
                margin="mt-0"
                style={styles.input}
                error={''}
                value={editInfo.userName}
                disable={true}
              />
              <InputTextField
                label="Edit your email"
                htmlFor="email"
                name="email"
                onChange={handleChange}
                id="email"
                type="text"
                style={styles.input}
                margin="mt-0"
                error={''}
                value={editInfo?.email}
                disable={false}
              />
              <InputTextField
                label="Add a new Password"
                htmlFor="newPassword"
                name="newPassword"
                onChange={handleChange}
                id="newPassword"
                type="password"
                style={styles.input}
                margin="mt-0"
                error={errorForm.newPassword}
                disable={false}
              />
              <InputTextField
                label="Confirm the new password"
                htmlFor="confirmPassword"
                name="confirmPassword"
                onChange={handleChange}
                id="confirmPassword"
                type="password"
                style={styles.input}
                margin="mt-0"
                error={errorForm.confirmPassword}
                disable={false}
              />
              <div className="my-4 text-[14px]">
                <button
                  type="submit"
                  className={styles.button}
                  onClick={handleEditSubmit}
                >
                  Update details
                </button>
              </div>
            </form>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default Profile
