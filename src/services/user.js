import { config } from 'utils'
import md5 from 'md5'
import axios from 'axios'

const { api } = config
const { userList, deleteUser, deleteUserMu, createUser, updateUser, validateByUserName } = api
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
export async function create (user) {
  user.user.password = md5(user.user.password)
  return axios({
    baseURL: createUser,
    method: 'post',
    type: 'josn',
    headers: { Authorization: token },
    data: user,
  })
}
export async function update (user) {
  if (user.user.password && user.user.password !== '') {
    user.user.password = md5(user.user.password)
  }
  return axios({
    baseURL: updateUser,
    method: 'post',
    type: 'josn',
    headers: { Authorization: token },
    data: user,
  })
}
export async function vaUserName (username) {
  return axios({
    baseURL: validateByUserName,
    method: 'get',
    type: 'josn',
    headers: { Authorization: token },
    params: username,
  })
}

