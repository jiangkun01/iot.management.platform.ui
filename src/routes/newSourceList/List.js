import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, isMotion, location, ...tableProps }) => {
  location.query = queryString.parse(location.search)

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '确认删除吗?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [
    {
      title: '序号',
      width: 64,
      value: 1,
    }, {
      title: '设备编号',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <Link to={`user/${record.id}`}>{text}</Link>,
    }, {
      title: '设备类型',
      dataIndex: 'nickName',
      key: 'nickName',
    }, {
      title: '成本价',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '入库时间',
      dataIndex: 'isMale',
      key: 'isMale',
      render: text => (<span>{text
        ? 'Male'
        : 'Female'}</span>),
    }, {
      title: '入库类型',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '备注',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: '操作人',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '修改' }, { key: '2', name: '删除' }]} />
      },
    },
  ]
  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  }
  console.log(getBodyWrapperProps)
  const getBodyWrapper = (body) => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
