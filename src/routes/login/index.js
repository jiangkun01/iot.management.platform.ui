import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input } from 'antd'
import { config } from 'utils'
import styles from './index.less'

const FormItem = Form.Item

const Login = ({
  loading,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'login/login', payload: values })
    })
  }

  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <img alt={'logo'} src={config.logo} />
        <span><small style={{color:'#108ee9',fontSize:'1px'}}>登陆</small></span>
      </div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input size="large" onPressEnter={handleOk} placeholder="用户名" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input size="large" type="password" onPressEnter={handleOk} placeholder="密码" />)}
        </FormItem>
        <Row>
          <Button type="primary" size="large" onClick={handleOk} loading={loading.effects.login}>
            登陆
          </Button>
          <p>
            <span>忘记用户名？|</span>
            <span>忘记密码？</span>
          </p>
        </Row>

      </form>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ loading }) => ({ loading }))(Form.create()(Login))
