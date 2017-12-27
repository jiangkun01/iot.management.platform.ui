import { config } from 'utils'
import axios from 'axios'

const { api } = config
const { userList, deleteUser, deleteUserMu } = api
const token = window.localStorage.getItem('token')
export async function query (param) {
  return axios({
    baseURL: userList,
    method: 'get',
    type: 'josn',
    headers: { Authorization: token },
    params: param,
  })
}
export async function rm (param) {
  return axios({
    baseURL: deleteUser,
    method: 'get',
    type: 'josn',
    headers: { Authorization: token },
    params: param,
  })
}
export async function rmMu (param) {
  return axios({
    baseURL: deleteUserMu,
    method: 'post',
    type: 'josn',
    headers: { Authorization: token },
    data: param,
  })
}
