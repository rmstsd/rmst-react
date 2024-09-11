import axiosRequest from './axiosRequest'

const loginParameter = {
  account: '18842542125',
  clientFlag: 2,
  loginType: 1,
  type: 1,
  password: 'TAolPwsK302qSHlw4KAHtg==',
  remember: 1,
  source: 2,
  clientId: '5ca7e713-03de-4d67-8282-bd64e042e64e',
}

export function refreshToken(): Promise<string> {
  return axiosRequest.post<any, any>('/user/eu/v4/login', loginParameter).then(res => res.token)
}

type ff = number []
