const formatUserName = (username) => {
  let subName = username.slice(7, username.length)
  return username.slice(0, 7) + subName.replaceAll(/[0-9]/g, '*')
}

export default formatUserName
