import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Table, Spin } from 'antd'
import { DropOption } from 'components'

const List = ({ dispatch, userController }) => {
  const columns = [{
    title: '编号',
    dataIndex: 'userId',
    key: 'userId',
  }, {
    title: '姓名',
    dataIndex: 'username',
    key: 'username',
  }, {
    title: '操作',
    key: 'operation',
    width: 100,
    render: () => {
      return <DropOption  menuOptions={[{ key: '1', name: '修改' }, { key: '2', name: '删除' }]} />
    },
  }]
  const tableChange = (page) => {
    dispatch({
      type: 'userController/initList',
      page: page.current,
      pageSize: page.pageSize,
    })
  }
  const loadingSpin = {
    size: 'large',
    spinning: userController.loading,
  }
  const pagination = { // 这是底部分页
    showQuickJumper: true,
    showSizeChanger: true,
    defaultPageSize: 10,
    pageSizeOptions: ['10', '20', '30'],
    total: userController.total,
    showTotal: total => `共 ${total} 条`,
    scroll: { x: 400 },
    loading: loadingSpin,
  }

  return (
    <Table columns={columns} dataSource={userController.list} pagination={pagination} onChange={tableChange} loading={loadingSpin} />
  )
}
List.propTypes = {
  userController: PropTypes.object,
  dispatch: PropTypes.func,
}
export default connect(({ userController}) => ({ userController }))(List)
