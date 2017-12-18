import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {FilterItem} from 'components'
import {Form, Button, Row, Col, DatePicker, Input, Cascader, Switch} from 'antd'

const Search = Input.Search
const {RangePicker} = DatePicker

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const Filter = ({onAdd, isMotion, switchIsMotion, onFilterChange, filter, form: { getFieldDecorator, getFieldsValue, setFieldsValue}}) => {
  const handleFields = (fields) => {
    const {createTime} = fields
    if (createTime.length) {
      fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')]
    }
    return fields
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    onFilterChange(fields)
  }

  const handleReset = () => {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    handleSubmit()
  }

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    fields = handleFields(fields)
    onFilterChange(fields)
  }
  const {name, address, id } = filter

  let initialCreateTime = []
  if (filter.createTime && filter.createTime[0]) {
    initialCreateTime[0] = moment(filter.createTime[0])
  }
  if (filter.createTime && filter.createTime[1]) {
    initialCreateTime[1] = moment(filter.createTime[1])
  }

  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{span: 4}} md={{span: 8}}>
        {getFieldDecorator('id', {initialValue: id })(<Search placeholder="组织名称" size="large" onSearch={handleSubmit}/>)}
      </Col>
      <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
        <FilterItem label="加入时间">
          {getFieldDecorator('createTime', {initialValue: initialCreateTime})(
            <RangePicker style={{width: '100%'}} size="large" onChange={handleChange.bind(null, 'createTime')}/>
          )}
        </FilterItem>
      </Col>
      <div style={{float:'rigth'}}>
        <Button type="primary" size="large" className="margin-right" onClick={handleSubmit}>查询</Button>
        <Button size="large" onClick={handleReset}>重置</Button>
      </div>
      <br/>
      <Col {...TwoColProps} xl={{span: 10}} md={{span: 24}} sm={{span: 24}}>
        <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
          <div>
            <Button size="large" type="primary" onClick={onAdd} className="margin-right">增加新的组织节点</Button>
            <Button size="large" type="dashed" onClick={onAdd} className="margin-right">资源出库</Button>
          </div>
        </div>
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  isMotion: PropTypes.bool,
  switchIsMotion: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
