import { request, config } from 'utils'

const { api } = config
const { newSourceList } = api

export async function query (params) {
  return request({
    url: newSourceList,
    method: 'get',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: newSourceList,
    method: 'delete',
    data: params,
  })
}
