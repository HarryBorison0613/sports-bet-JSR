import validator from 'validator'
import isEmpty from './isEmpty'

const validateRecoverPassword = (data: any) => {
  let errors: any = {}

  data.username = !isEmpty(data.username) ? data.username : ''
  // data.phonenumber = !isEmpty(data.phonenumber) ? data.phonenumber : ''

  if (validator.isEmpty(data.username)) {
    errors.username = 'Username field is required!'
  }

  // if (validator.isEmpty(data.phonenumber)) {
  //   errors.phonenumber = 'Phonenumber field is required!'
  // }
  return {
    errors,
    isValid: isEmpty(errors),
  }
}

export default validateRecoverPassword
