import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'


const sourceList = ({ location, dispatch, newSourceList, loading }) => {
  location.query = queryString.parse(location.search)
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = newSourceList
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['user/update'],
    title: `${modalType === 'create' ? 'Create User' : 'Update User'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `newSourceList/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'newSourceList/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['newSourceList/query'],
    pagination,
    location,
    isMotion,
    onChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    onDeleteItem (id) {
      dispatch({
        type: 'newSourceList/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'newSourceList/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'newSourceList/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
  }

  const filterProps = {
    isMotion,
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }))
    },
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/newSourceList',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/newSourceList',
      }))
    },
    onAdd () {
      dispatch({
        type: 'newSourceList/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'newSourceList/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'newSourceList/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
  }

  return (
    <Page inner>
      <Filter {...filterProps} />
      {
        selectedRowKeys.length > 0 &&
        <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
          <Col>
            {`选中 ${selectedRowKeys.length} 条 `}
            <Popconfirm title={'确定删除选中的全部吗?'} placement="left" onConfirm={handleDeleteItems}>
              <Button type="primary" size="large" style={{ marginLeft: 8 }}>删除</Button>
            </Popconfirm>
          </Col>
        </Row>
      }
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </Page>
  )
}

sourceList.propTypes = {
  newSourceList: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ newSourceList, loading }) => ({ newSourceList, loading }))(sourceList)
