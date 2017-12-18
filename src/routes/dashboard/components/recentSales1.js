import React from 'react'
import PropTypes from 'prop-types'
import { Table, Tag } from 'antd'
import { color } from 'utils'
import styles from './recentSales.less'

const status = {
  1: {
    color: color.green,
    text: '启动',
  },
  2: {
    color: color.red,
    text: '停止',
  },
  3: {
    color: color.red,
    text: '停止',
  },
  4: {
    color: color.green,
    text: '启动',
  },
}

function RecentSales1 ({ data }) {
  const columns = [
    {
      title: '设备编号',
      dataIndex: 'id',
    },
    {
      title: '设备名称',
      dataIndex: 'name',
    }, {
      title: '应用状态',
      dataIndex: 'status',
      render: text => <Tag color={status[text].color}>{status[text].text}</Tag>,
    }, {
      title: '入库时间',
      dataIndex: 'date',
      render: text => new Date(text).format('yyyy-MM-dd'),
    }, {
      title: '操作',
      dataIndex: 'price',
    },
  ]
  return (
    <div className={styles.recentsales}>
      <Table pagination={false} columns={columns} rowKey={(record, key) => key} dataSource={data.filter((item, key) => key < 5)} />
    </div>
  )
}

RecentSales1.propTypes = {
  data: PropTypes.array,
}

export default RecentSales1
