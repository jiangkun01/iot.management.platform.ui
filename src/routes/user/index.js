import React from 'react'
import { connect } from 'dva'
import { Page } from 'components'
import PropTypes from 'prop-types'
import List from './List'
// 传递model 里面的 state属性

const or = ({ dispatch }) => {
  return (
    <Page inner>
      <List />
    </Page>
  )
}
or.propTypes = { // 验证
  dispatch: PropTypes.func,
}
// coments 标签名称
// connect <Button type="primary" onClick={ale1}>Primary</Button>
// 这个其实很好理解
// 如果说你的ui里面需要用到model里面的数据的话 那么就可以直接用这个 将model里面的元素 当做props的方式 传递进来
// export default connect(({ loading }) => ({ loading }))(or)
export default or
