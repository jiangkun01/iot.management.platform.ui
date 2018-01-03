import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Button, Select, message } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
const modal = ({ form: { validateFields, getFieldDecorator, resetFields, }, userController, dispatch }) => {
  const loadingState = () => {
    dispatch({
      type: 'userController/loadingState',
      loading: true,
    })
  }
  // componentWillMount(){
  //   // To disabled submit button at the beginning.
  //   validateFields()
  // }
  const { Option } = Select
  let selectFlag = true
  let options = userController.roleList.map((roleOp, index) => {
    if (index === 0) {
      return <Option key={roleOp.id} selected={selectFlag}>{roleOp.roleName}</Option>
    }
    return <Option key={roleOp.id}>{roleOp.roleName}</Option>
  })

  let initSelect = ''
  let username = ''
  if (userController.roleList.length > 0) {
    initSelect = userController.roleList[0].id
  }
  if (userController.user && userController.user.roleId) {
    initSelect = userController.user.roleId
    username = userController.user.username
  }
  const hideModal = () => {
    resetFields()
    dispatch({
      type: 'userController/isVisible',
      isVisible: false,
      isPassswordRequired: true,
      title: '',
      user: {},
    })
  }
  const validateUniqueByUsername = (rule, value, callback) => {
    if (userController.title === '新建') {
      dispatch({
        type: 'userController/validateUniqueByUsername',
        username: value,
        callbackV: callback,
      })
    } else if (userController.title === '修改') {
      if (userController.user.username === value) {
        callback()
      } else {
        dispatch({
          type: 'userController/validateUniqueByUsername',
          username: value,
          callbackV: callback,
        })
      }
    }
  }
  const onOk = () => {
    validateFields((err, values) => {
      if (err) {
        message.error('请检查填写！')
      } else {
        loadingState()
        if (userController.title === '新建') {
          dispatch({
            type: 'userController/create',
            user: values,
          })
        } else {
          values.userId = userController.user.userId
          dispatch({
            type: 'userController/update',
            user: values,
          })
        }
        hideModal()
      }
    })
  }
  return (
    <Modal visible={userController.isVisible} onOk={hideModal} onCancel={hideModal} title={userController.title} footer={[<Button key="back" onClick={hideModal} >取消</Button>, <Button onClick={onOk} key="submit" type="primary" >确定</Button>]}>
      <Form layout="horizontal">
        <FormItem label="姓名"hasFeedback {...formItemLayout} >
          {getFieldDecorator('username', {
            initialValue: username,
            rules: [
              {
                required: true,
                message: '请填写用户名',
              }, {
                max: 20,
                message: '用户名不能大于20位',
              }, {
                validator: validateUniqueByUsername,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="密码"hasFeedback {...formItemLayout} >
          {getFieldDecorator('password', {
            rules: [
              {
                required: userController.isPassswordRequired,
                message: '请填写密码',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="角色" hasFeedback {...formItemLayout}>
          {getFieldDecorator('roleId', { initialValue: initSelect })(
            <Select >
              {options}
            </Select>
          )}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  item: PropTypes.object,
  userController: PropTypes.object,
  dispatch: PropTypes.func,
}

export default Form.create()(modal)
