import { Command } from 'src/module/detectCommandVersion/type'
import axiosRequest from './axiosRequest'

export function getCommandTreeData(): Promise<Command[]> {
  return axiosRequest.get('/studio/command/getCommandTree')
}
