import axios from 'axios'

const VueAxios = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000
})

// if (localStorage.getItem('token')) {
//   VueAxios.defaults.headers.common['Authorization'] = 'Bearer: ' + localStorage.getItem('token')
// } else {
//   VueAxios.defaults.headers.common['Authorization'] = ''
// }

export default VueAxios