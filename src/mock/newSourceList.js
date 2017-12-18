const Mock = require('mockjs')
const config = require('../utils/config')

const { apiPrefix } = config
let newSourceListData = Mock.mock({
  'data|80-100': [
    {
      'index|+1': 1,
      id: '@id',
      name: '定位器',
      nickName: '新资源入库',
      phone: /^1[34578]\d{9}$/,
      'age|11-100.1-2': 1,
      address: '张三',
      isMale: '@boolean',
      email: '备注',
      createTime: '@datetime',
    },
  ],
})
let database = newSourceListData.data
module.exports = {
  [`GET ${apiPrefix}/newSourceList`] (req, res) {
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1

    let newData = database
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            if (key === 'address') {
              return other[key].every(iitem => item[key].indexOf(iitem) > -1)
            } else if (key === 'createTime') {
              const start = new Date(other[key][0]).getTime()
              const end = new Date(other[key][1]).getTime()
              const now = new Date(item[key]).getTime()

              if (start && end) {
                return now >= start && now <= end
              }
              return true
            }
            return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1
          }
          return true
        })
      }
    }
    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    })
  },
}

