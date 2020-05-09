import Cookies from 'universal-cookie'
import _ from 'lodash'

const cookies = new Cookies()

const changeAxiosInstanceXAccessTokenHeader = (token) => {
  const { vueAxios } = require('@/api/vueAxios')
  vueAxios.defaults.headers['x-access-token'] = token
}

export const getXAccessTokenFromCookie = () => {
  return cookies.get('x-access-token')
}

export const setXAccessToken = (token) => {
  if (_.isNil(token)) {
    cookies.remove('x-access-token')
  } else {
    cookies.set('x-access-token', token)
  }
  changeAxiosInstanceXAccessTokenHeader(token)
}

// export const setUserName = (userName) => {
//   if (_.isNil(userName)) {
//     cookies.remove('userName')
//   } else {
//     cookies.set('x-access-token', token)
//   }
// }
export const formatDate = (date) => {
  return date.substr(0, 10)
}
