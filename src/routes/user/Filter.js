import React from 'react'
import PropTypes from 'prop-types'
import { Form, Select, Row, Col, Input, Button } from 'antd'

const Filter = ({ form, dispatch, userController }) => {
  const { Option } = Select
  const loadingState = () => {
    dispatch({
      type: 'userController/loadingState',
      loading: true,
    })
  }
  const pageState = () => {
    dispatch({
      type: 'userController/pageState',
      page: 1,
    })
  }
  let options = userController.roleList.map((roleOp) => {
    return <Option key={roleOp.id}>{roleOp.roleName}</Option>
  })
  const searchList = () => {
    pageState()
    loadingState()
    dispatch({
      type: 'userController/initList',
      name: form.getFieldValue('name'),
      role: form.getFieldValue('role'),
    })
  }
  const reset = () => {
    form.resetFields()
    loadingState()
    pageState()
    dispatch({
      type: 'userController/initList',
      name: '',
      role: '',
    })
  }
  const create = () => {
    dispatch({
      type: 'userController/isVisible',
      isVisible: true,
      isPassswordRequired: true,
      user: {},
      title: '新建',
    })
  }
  return (
    <div>
      <Form layout="vertical" hideRequiredMark>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item >
              {form.getFieldDecorator('name')(<Input placeholder="用户名" />)}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item >
              {form.getFieldDecorator('role')(
                <Select placeholder="请选择管理员">
                  <Option key="1">全部</Option>
                  {options}
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button type="dashed" onClick={create}>新增</Button>
          </Col>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit" onClick={searchList}>查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={reset}>重置</Button>
          </Col>
        </Row>
      </Form>
      <br />
    </div>
  )
}

Filter.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  userController: PropTypes.object,
}

export default (Form.create())(Filter)
