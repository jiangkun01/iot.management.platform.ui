import { config } from 'utils'
import axios from 'axios'

const { api } = config
const { roleList } = api
const token = window.localStorage.getItem('token')
export async function query (param) {
  return axios({
    baseURL: roleList,
    method: 'get',
    type: 'josn',
    headers: { Authorization: token },
    params: param,
  })
}
