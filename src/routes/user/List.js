import React from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Row, Col, Popconfirm, Modal } from 'antd'
import { DropOption } from 'components'

const List = ({ dispatch, userController }) => {
  const { selectedRowKey } = userController
  const loadingState = () => {
    dispatch({
      type: 'userController/loadingState',
      loading: true,
    })
  }
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      dispatch({
        type: 'userController/isVisible',
        isVisible: true,
        isPassswordRequired: false,
        user: record,
        title: '修改',
      })
    } else if (e.key === '2') {
      Modal.confirm({
        title: '确认删除吗?',
        onOk () {
          loadingState()
          dispatch({
            type: 'userController/rm',
            userId: record.userId,
          })
        },
      })
    }
  }
  const columns = [{
    title: '序号',
    key: 'index',
    render: (text, record, index) => {
      return (index + 1)
    },
  }, {
    title: '编号',
    dataIndex: 'userId',
    key: 'userId',
  }, {
    title: '姓名',
    dataIndex: 'username',
    key: 'username',
  }, {
    title: '角色',
    dataIndex: 'roleName',
    key: 'roleName',
  }, {
    title: '操作',
    key: 'operation',
    width: 100,
    render: (text, record) => {
      return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改' }, { key: '2', name: '删除' }]} />
    },
  }]
  const tableChange = (page) => {
    loadingState()
    dispatch({
      type: 'userController/initList',
      page: page.current,
      pageSize: page.pageSize,
      name: userController.name,
      role: userController.role,
    })
  }
  const loadingSpin = {
    size: 'large',
    spinning: userController.loading,
  }
  const pagination = { // 这是底部分页
    showQuickJumper: true,
    showSizeChanger: true,
    defaultPageSize: userController.pageSize,
    current: userController.page,
    pageSizeOptions: ['10', '20', '30'],
    total: userController.total,
    showTotal: total => `共 ${total} 条`,
    loading: loadingSpin,
  }
  // const rowSelection = {
  //   selectedRowKey,
  //   onChange: (keys) => {
  //
  //     console.log(keys)
  //     dispatch({
  //       type: 'userController/selectedRowKeys',
  //       selectedRowKey: keys,
  //     })
  //   },
  // }
  const handleDeleteItems = () => {
    loadingState()
    dispatch({
      type: 'userController/rmMu',
      userIds: selectedRowKey,
    })
  }
  // rowSelection 是check
  // rowSelection={rowSelection}
  return (
    <div>
      {
        selectedRowKey.length > 0 &&
        <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
          <Col>
            {`选中 ${selectedRowKey.length} 条 `}
            <Popconfirm title={'确定删除选中的全部吗?'} placement="left" onConfirm={handleDeleteItems}>
              <Button type="primary" size="large" style={{ marginLeft: 8 }}>删除</Button>
            </Popconfirm>
          </Col>
        </Row>
      }
      <div>
        <Table rowKey={record => record.userId} columns={columns} scroll={{ x: 980 }} dataSource={userController.list} pagination={pagination} onChange={tableChange} loading={loadingSpin} />
      </div>
    </div>
  )
}
List.propTypes = {
  userController: PropTypes.object,
  dispatch: PropTypes.func,
}
export default List
