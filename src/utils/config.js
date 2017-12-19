const APIV1 = '/api/v1'
const APIV2 = '/api/v2'

module.exports = {
  name: 'iot.management.platform',
  prefix: 'antdAdmin',
  footerText: 'iot.mangement.platform  © 2017 fy',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  APIV1,
  APIV2,
  api: {
    userLogin: '/oauth/token',
    organizationsList: '/api/core/organization/list',
    deleteOrganization: '/api/core/organization/delete',
    deleteOrganizationMu: '/api/core/organization/deleteMu',
    createOrganization: '/api/core/organization/create',
    updateOrganization: '/api/core/organization/update',
    users: `${APIV1}/users`,
    newSourceList: `${APIV1}/newSourceList`,
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    weather: `${APIV1}/weather`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
  },
}
