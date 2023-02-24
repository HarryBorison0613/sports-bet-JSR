import validator from 'validator'
import isEmpty from './isEmpty'

const validateProfile = (data: any) => {
  let errors: any = {}

  data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : ''
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : ''

  if (!validator.isLength(data.newPassword, { min: 8 })) {
    errors.newPassword = 'Password must be at least 8 characters'
  }
  if (!validator.equals(data.newPassword, data.confirmPassword)) {
    errors.confirmPassword = 'Passwords must match'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}

export default validateProfile
