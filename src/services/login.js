import { config } from 'utils'
import md5 from 'md5'
import axios from 'axios'

const { api } = config
const { userLogin } = api
export async function login (params) {
  const configUser = {
    username: params.username,
    password: md5(params.password),
    grant_type: 'password',
    scope: 'web',
    client_id: 'uTXPb6w3QQLQQj2RrCd',
    client_secret: 'c9yuCNT7Wgv53kXrh2r',
    source_id: 'oauth2-resource',
  }
  return axios({
    baseURL: userLogin,
    method: 'post',
    type: 'josn',
    params: configUser,
  })
    .then((result) => {
      const { data } = result
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('userName')
      const { access_token } = data
      window.localStorage.setItem('token', 'Bearer '+access_token)
      window.localStorage.setItem('userName', params.username)
      return result
    })
    .catch((error) => {
      const { response } = error
      console.log(response)
      return response
    })
}

