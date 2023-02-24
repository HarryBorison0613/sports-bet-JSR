import React from 'react'
import cx from 'classnames'

import styles from './RecoverPassword.module.css'
import InputTextField from 'src/components/common/InputTextField'
import Axios from 'axios'
import { toast } from 'react-toastify'
import validateRecoverPassword from 'src/validation/recoverPassword'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useRouter } from 'next/router'

const RecoverPassword: React.FC = () => {
  const router = useRouter()

  const [loading, setLoading] = React.useState(false)
  const [phoneNumber, setPhoneNumber] = React.useState<any>('')
  const [data, setData] = React.useState({
    username: '',
  })

  const [errorForm, setErrorForm] = React.useState({
    username: '',
  })

  const { errors, isValid } = validateRecoverPassword(data)

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleResetPassword = async (e: any) => {
    e.preventDefault()

    // let phoneValidate = await isValidPhoneNumber(phoneNumber)

    const Data = {
      username: data.username,
      phonenumber: phoneNumber,
    }

    if (!isValid) {
      setErrorForm(errors)
    } else {
      setLoading(true)
      Axios.post('/api/resetpassword/resetPassword', Data)
        .then((res) => {
          setLoading(false)
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          })
          setErrorForm({ ...errorForm, username: '' })
          router.push('/conta')
        })
        .catch((err) => {
          setLoading(false)
          setErrorForm({ ...errorForm, username: '' })

          toast.error(err.response.data.error, {
            position: toast.POSITION.TOP_CENTER,
          })
        })
    }
  }

  return (
    <>
      <div className={cx(styles.base, 'container')}>
        <p
          className={cx(
            styles.text,
            'text-[20px]',
            'leading-6',
            'text-center',
            'text-black',
            'pt-9'
          )}
        >
          Request a new password
        </p>
        <form>
          <InputTextField
            label="Username"
            htmlFor="username"
            name="username"
            onChange={handleChange}
            id="username"
            style={styles.input}
            type="text"
            margin="mt-3"
            error={errorForm.username}
            disable={false}
          />
          <div className="h-[45px]">
            <span
              style={{
                color: 'black',
                fontFamily: 'Jost',
                marginBottom: '10px',
              }}
            >
              Phonenumber
            </span>
            <PhoneInput
              id="phone-Input"
              international
              defaultCountry="BR"
              value={phoneNumber}
              onChange={setPhoneNumber}
            />
          </div>
          <div className="flex mt-6">
            <button
              type="submit"
              style={loading ? { opacity: '0.6', cursor: 'not-allowed' } : {}}
              className={styles.button}
              onClick={handleResetPassword}
            >
              Request now
            </button>
          </div>
        </form>
        <div className="flex font-jost font-normal leading-[19px] mt-4">
          <p className="text-black text-center text-[15px]">
            For security reasons, we will get in touch with your in order to
            reset your password and send you a new one.
          </p>
        </div>
      </div>
    </>
  )
}

export default RecoverPassword
