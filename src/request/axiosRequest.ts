import axios, { type AxiosInstance } from 'axios'

import { refreshToken } from './user'
const Base_Url = 'https://enterprise.naturobot.com'

const axiosRequest: AxiosInstance = axios.create({
  baseURL: Base_Url
})

let token = 'f277681eec834c509fcf002960ab4ff1'

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
