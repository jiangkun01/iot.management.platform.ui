import { routerRedux } from 'dva/router'
import { login } from 'services/login'

export default {
  namespace: 'login',

  state: {},

  effects: {
    * login ({
      payload,
    }, { put, call, select }) {
      const data = yield call(login, payload)
      yield put({ type: 'app/query' })
      if (data.status !== 200) {
        window.alert('请检查用户名密码是否正确')
      } else {
        yield put(routerRedux.push('/dashboard'))
      }
    },
  },

}
