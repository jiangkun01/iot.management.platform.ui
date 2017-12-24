import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Table, Button, Row, Col, Popconfirm } from 'antd'
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
    loading: loadingSpin,
  }
  const rowSelection = {
    onChange: (selectedRowKeys) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`)
      dispatch({
        type: 'userController/selectedRowKeys',
        selectedRowKey: selectedRowKeys,
      })
    },
  }
  const handleDeleteItems = () => {
    console.log(1)
    // dispatch({
    //   type: 'newSourceList/multiDelete',
    //   payload: {
    //     ids: selectedRowKeys,
    //   },
    // })
  }
  // rowSelection 是check
  return (
    <div>
      <Button type="primary">新增</Button>
      {
        userController.selectedRowKey.length > 0 &&
        <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
          <Col>
            {`选中 ${userController.selectedRowKey.length} 条 `}
            <Popconfirm title={'确定删除选中的全部吗?'} placement="left" onConfirm={handleDeleteItems}>
              <Button type="primary" size="large" style={{ marginLeft: 8 }}>删除</Button>
            </Popconfirm>
          </Col>
        </Row>
      }
      <div>
        <Table rowSelection={rowSelection} rowKey={record => record.userId} columns={columns} scroll={{ x: 980 }} dataSource={userController.list} pagination={pagination} onChange={tableChange} loading={loadingSpin} />
      </div>
    </div>
  )
}
List.propTypes = {
  userController: PropTypes.object,
  dispatch: PropTypes.func,
}
export default connect(({ userController }) => ({ userController }))(List)
