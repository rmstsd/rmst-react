import axiosRequest from './axiosRequest'

export function getCommandTreeData(): Promise<any[]> {
  return axiosRequest.get('/studio/command/getCommandTree')
}
