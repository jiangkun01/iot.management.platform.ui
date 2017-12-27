import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import * as userService from 'services/user'
import * as roleService from 'services/role'


export default modelExtend({
  namespace: 'userController', // model 的命名空间，同时也是他在全局 state 上的属性，只能用字符串，不支持通过 . 的方式创建多层命名空间。
  state: { // 初始值，优先级低于传给 dva() 的 opts.initialState。
    list: [],
    roleList: [],
    loading: true,
    total: 0,
    selectedRowKey: [],
    name: '',
    role: '',
    page: 1,
    pageSize: 10,
  },
  subscriptions: { // 因为此类框架都是无状态的，所以 subscriptions 基本可以理解为 当页面加载完后的处理， 比如：路由匹配后从接口获取数据，接收到键盘或者触摸事件后的自动处理等等，以 key/value 格式定义 subscription。subscription 是订阅，用于订阅一个数据源，然后根据需要 dispatch 相应的 action。在 app.start() 时被执行，数据源可以是当前的时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等。
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/user') { // 监听路由的变化 加载页面
          dispatch({ // 数据的改变通常发生在用户交互行为或者浏览器行为（如路由跳转等），当此类行为改变数据的时候可以通过 dispatch 发起一个 action，如果是同步行为会直接通过 Reducers 改变 State ，如果是异步行为会先触发 Effects 然后流向 Reducers 最终改变 State，所以在 dva 中，数据流向非常清晰简明，并且思路基本跟开源社区保持一致。
            type: 'initList', // 传递 执行
            page: 1,
            pageSize: 10,
          }) // 函数内部可以作为一个 action*/
        }
      })
    },
  },
  effects: { // 以 key/value 格式定义 effect。用于处理异步操作和业务逻辑，不直接修改 state。由 action 触发，可以触发 action，可以和服务器交互，可以获取全局 state 的数据等等。Action 是一个普通 javascript 对象，它是改变 State 的唯一途径。无论是从 UI 事件、网络回调，还是 WebSocket 等数据源所获得的数据，最终都会通过 dispatch 函数调用一个 action，从而改变对应的数据。** 需要注意的是 dispatch 是在组件 connect Models以后，通过 props 传入的。**
    * initList ({ page, pageSize, name, role }, { call, put }) {
      const roledata = yield call(roleService.query)
      const data = yield call(userService.query, { page, pageSize, name, role })
      yield put({
        type: 'initListSuccess',
        list: data.data.body.list,
        total: data.data.body.total,
        roleList: roledata.data.body.list,
        page: page,
        name: name,
        role: role,
        pageSize: pageSize,
        loading: false,
      })
    },
    * rm ({ userId }, { select, call, put }) {
      const data = yield call(userService.rm, { userId })
      if (data.data.ok) {
        message.success('删除成功')
        const stateUserController = yield select(state => state.userController)
        yield put({
          type: 'initList',
          page: stateUserController.page,
          pageSize: stateUserController.pageSize,
          name: stateUserController.name,
          role: stateUserController.role,
        })
      } else {
        message.error(data.data.message)
      }
    },
    * rmMu ({ userIds }, { call, put, select }) {
      const data = yield call(userService.rmMu, { userIds })
      if (data.data.ok) {
        message.success('删除成功')
        const stateUserController = yield select(state => state.userController)
        yield put({
          type: 'selectedRowKeys',
          selectedRowKey: [],
        })
        yield put({
          type: 'initList',
          page: stateUserController.page,
          pageSize: stateUserController.pageSize,
          name: stateUserController.name,
          role: stateUserController.role,
        })
      } else {
        message.error(data.data.message)
      }
    },
  },
  reducers: { // 以 key/value 格式定义 reducer。用于处理 同步操作 ，唯一可以修改 state 的地方。由 action 触发。
    initListSuccess (state, { list, total, roleList, page, name, role, pageSize, loading }) {
      return { ...state, list, total, roleList, page, name, role, pageSize, loading }
    },
    loadingState (state, { loading }) {
      return { ...state, loading }
    },
    selectedRowKeys (state, { selectedRowKey }) {
      return { ...state, selectedRowKey }
    },
    pageState (state, { page }) {
      return { ...state, page }
    },
  },
})
