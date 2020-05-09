import axios from 'axios'
import {getXAccessTokenFromCookie} from '@/utils/utils'


export const vueAxios = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'x-access-token': getXAccessTokenFromCookie(),
  },
  timeout: 10000
})

// if (localStorage.getItem('token')) {
//   VueAxios.defaults.headers.common['Authorization'] = 'Bearer: ' + localStorage.getItem('token')
// } else {
//   VueAxios.defaults.headers.common['Authorization'] = ''
// }

// export default VueAxios