const { config } = require('./common')

const { apiPrefix } = config
let database = [
  {
    id: '1',
    icon: 'laptop',
    name: '首页',
    route: '/dashboard',
  },
  {
    id: '2',
    bpid: '1',
    name: '用户管理',
    icon: 'user',

  },
  {
    id: '21',
    bpid: '2',
    mpid: '2',
    name: '用户列表维护',
    route: '/user',
  },
  {
    id: '22',
    bpid: '2',
    mpid: '2',
    name: '权限管理',
    route: '',
  },
  {
    id: '3',
    bpid: '1',
    name: '部署管理',
    icon: 'api',
    route: '/request',
  },
  {
    id: '31',
    bpid: '3',
    mpid: '3',
    name: '应用服务管理',
    icon: '',
    route: '',
  },
  {
    id: '32',
    bpid: '3',
    mpid: '3',
    name: '数据存储管理',
    icon: '',
    route: '',
  },
  {
    id: '4',
    bpid: '1',
    name: '单位管理',
    icon: 'api',
  },
  {
    id: '41',
    bpid: '4',
    mpid: '4',
    name: '单位列表',
    icon: '',
    route: '/organization/list',
  },
  {
    id: '42',
    bpid: '4',
    mpid: '4',
    name: '组织架构管理',
    icon: '',
    route: '/UIElement/dataTable',
  },
  {
    id: '5',
    bpid: '1',
    name: '资源管理',
    icon: 'code-o',
  },
  {
    id: '51',
    bpid: '5',
    mpid: '5',
    name: '资源列表',
    icon: '',
    route: '/source/newSourceList',
  },
  {
    id: '52',
    bpid: '5',
    mpid: '5',
    name: '资源信息查询统计',
    icon: '',
    route: '/chart/highCharts',
  },
  {
    id: '53',
    bpid: '5',
    mpid: '5',
    name: '运单管理',
    icon: '',
    route: '/chart/Recharts',
  },
  {
    id: '6',
    bpid: '1',
    name: '运维管理',
    icon: 'setting',
  },
  {
    id: '61',
    bpid: '6',
    mpid: '6',
    name: '单位服务周期列表',
    route: '/navigation/navigation1',
  },
  {
    id: '62',
    bpid: '6',
    mpid: '6',
    name: '设备数据查询统计',
    route: '/navigation/navigation2',
  },
  {
    id: '63',
    bpid: '6',
    mpid: '6',
    name: 'SIM卡数据查询统计',
    route: '/navigation/navigation2/navigation1',
  },
  {
    id: '64',
    bpid: '6',
    mpid: '6',
    name: '派工登记及查询统计',
    route: '/navigation/navigation2/navigation2',
  },
  {
    id: '65',
    bpid: '6',
    mpid: '6',
    name: '售后记录查询统计',
    route: '',
  },
  {
    id: '7',
    bpid: '1',
    name: '费用管理',
    icon: 'api',
    route: '',
  },
  {
    id: '71',
    bpid: '7',
    mpid: '7',
    name: '单位运营收缴情况管理',
    icon: '',
    route: '',
  },
  {
    id: '72',
    bpid: '7',
    mpid: '7',
    name: 'SIM卡流量费用管理',
    icon: '',
    route: '',
  },
  {
    id: '73',
    bpid: '7',
    mpid: '7',
    name: '云服务器费用管理',
    icon: '',
    route: '',
  },
  {
    id: '74',
    bpid: '7',
    mpid: '7',
    name: '外部平台费用管理',
    icon: '',
    route: '',
  },
  {
    id: '75',
    bpid: '7',
    mpid: '7',
    name: '维修成本费用管理',
    icon: '',
    route: '',
  },
  {
    id: '76',
    bpid: '7',
    mpid: '7',
    name: '运费管理',
    icon: '',
    route: '',
  },
  {
    id: '77',
    bpid: '7',
    mpid: '7',
    name: '外派人员支出费用管理',
    icon: '',
    route: '',
  },
  {
    id: '78',
    bpid: '7',
    mpid: '7',
    name: '盈亏管理',
    icon: '',
    route: '',
  },
  {
    id: '8',
    bpid: '1',
    name: '外部平台对接',
    icon: 'api',
    route: '',
  },
  {
    id: '81',
    bpid: '8',
    mpid: '8',
    name: '定位平台',
    icon: '',
    route: '',
  },
  {
    id: '82',
    bpid: '8',
    mpid: '8',
    name: '移动平台',
    icon: '',
    route: '',
  },
  {
    id: '83',
    bpid: '8',
    mpid: '8',
    name: '短信平台',
    icon: '',
    route: '/test',
  },
]

module.exports = {

  [`GET ${apiPrefix}/menus`] (req, res) {
    res.status(200).json(database)
  },
}
