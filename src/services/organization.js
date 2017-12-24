import { config } from 'utils'
import axios from 'axios'

const { api } = config
const { organizationsList, deleteOrganization, deleteOrganizationMu, createOrganization, updateOrganization } = api
const token = window.localStorage.getItem('token')
export async function query (payload) {
  if (payload.createTime !== undefined) {
    const cofig = {
      name: payload.name,
      createTime: payload.createTime[0],
      endTime: payload.createTime[1],
      page: payload.page,
      pageSize: payload.pageSize,
    }
    return axios({
      baseURL: organizationsList,
      method: 'get',
      type: 'josn',
      headers: { Authorization: token },
      params: cofig,
    })
  }
  return axios({
    baseURL: organizationsList,
    method: 'get',
    type: 'josn',
    headers: { Authorization: token },
    params: payload,
  })
}
export async function rm (payload) {
  return axios({
    baseURL: deleteOrganization,
    method: 'get',
    type: 'josn',
    headers: { Authorization: token },
    params: payload,
  })
}
export async function rmMu (payload) {
  return axios({
    url: deleteOrganizationMu,
    method: 'post',
    type: 'josn',
    headers: { Authorization: token },
    data: payload,
  })
}
export async function create (payload) {
  return axios({
    url: createOrganization,
    method: 'post',
    type: 'josn',
    headers: { Authorization: token },
    data: payload,
  })
}
export async function update (payload) {
  return axios({
    url: updateOrganization,
    method: 'post',
    type: 'josn',
    headers: { Authorization: token },
    data: payload,
  })
}
