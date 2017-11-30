import React from 'react'
import ReactEcharts from 'echarts-for-react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card } from 'antd'
import { Page } from 'components'
import { NumberCard, RecentSales } from './components'
const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
    marginTop: 20
  }
}
function Dashboard ({ dashboard, loading }) {
  const { numbers, recentSales} = dashboard
  const numberCards = numbers.map((item, key) => (<Col key={key} lg={6} md={12}>
    <NumberCard {...item} />
  </Col>))
  const option = {
    title: {
      text: '定位器信息',
      x: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['禁定位', '定位并追踪', '停用'],
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: 335, name: '禁定位' },
          { value: 310, name: '定位并追踪' },
          { value: 234, name: '停用' },
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }
  const option1 = {
    title: {
      text: '警情信息',
      x: 'left',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    legend: {
      data: ['XX 警情', 'YY 警情'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      splitLine: { show: false },
      data: ['11月1日', '11月2日', '11月3日', '11月4日', '11月5日', '11月6日', '11月7日', '11月8日', '11月9日', '11月10日', '11月11日'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'XX 警情',
        type: 'bar',
        stack: 'XX 警情',
        barWidth: 20,
        label: {
          normal: {
            show: true,
            position: 'top',
          },
        },
        data: [900, 345, 393, '300', '300', 135, 178, 286, '300', '300', '300'],
      },
      {
        name: 'YY 警情',
        type: 'bar',
        stack: 'XX 警情',
        barWidth: 20,
        label: {
          normal: {
            show: true,
            position: 'bottom',
          },
        },
        data: ['300', '300', '300', 108, 154, '300', '300', '300', 119, 361, 203],
      },
    ],
  }
  return (
    <Page loading={loading.models.dashboard }>
      <Row gutter={24}>
        {numberCards}

        <Col lg={16} md={24}>
          <Card bordered={false} {...bodyStyle}>
            <div className="examples">
              <div className="parent">
                <ReactEcharts
                  option={option1}
                  style={{ height: 300 }}
                />
              </div>
            </div>
          </Card>
        </Col>
        <Col lg={8} md={24}>
          <Card bordered={false} {...bodyStyle}>
            <div className="examples">
              <div className="parent">
                <ReactEcharts
                  option={option}
                  style={{ height: 300 }}
                />
              </div>
            </div>
          </Card>
        </Col>
        <Col lg={12} md={24}>
          <Card bordered={false} {...bodyStyle}>
            <RecentSales data={recentSales} />
          </Card>
        </Col>
        <Col lg={12} md={24}>
          <Card bordered={false} {...bodyStyle}>
            <RecentSales data={recentSales} />
          </Card>
        </Col>
      </Row>
    </Page>
  )
}
Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}
export default connect(({ dashboard, loading }) => ({ dashboard, loading }))(Dashboard)
