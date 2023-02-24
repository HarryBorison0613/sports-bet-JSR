/** @format */


export const generateRandomPassword = (len) => {
  const permitted_chars =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let password = ''

  for (let i = 0; i < len; i++) {
    password += permitted_chars.charAt(
      Math.floor(Math.random() * permitted_chars.length)
    )
  }

  return password
}
