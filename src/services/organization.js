import { config } from 'utils'
import axios from 'axios'

const { api } = config
const { organizationsList } = api
const token = window.localStorage.getItem('token')

export async function query (payload) {
  return axios({
    baseURL: organizationsList,
    method: 'get',
    type: 'josn',
    headers: { Authorization: token },
    params: payload,
  })
}

