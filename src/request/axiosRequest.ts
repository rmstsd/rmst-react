import axios from 'axios'
import { refreshToken } from './user'

const Base_Url = 'http://8.142.164.165:8181'

const axiosRequest = axios.create({
  baseURL: Base_Url
})

let token: string = '9760a92e8fae41e094bada22e1e52f72'

axiosRequest.interceptors.request.use(
  config => {
    config.headers.Authorization = token
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axiosRequest.interceptors.response.use(
  async response => {
    const serviceResponse = response.data
    if (serviceResponse.code === 'success') {
      return serviceResponse.result
    }

    if (serviceResponse.code === 'login_time_out') {
      token = await refreshToken()

      return axiosRequest(response.config)
    }

    return Promise.reject(serviceResponse)
  },
  error => {
    return Promise.reject(error)
  }
)

export default axiosRequest
