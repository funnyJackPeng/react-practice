import React, { useEffect, useState } from "react"
import { Col, Row, Card, Table } from 'antd';
import './index.css'
import * as Icon from "@ant-design/icons";
import { getData } from '../../api'
import MyEchart from '../../components/echarts'

const columns = [
  {
    title: '课程',
    dataIndex: 'name'
  },
  {
    title: '今日购买',
    dataIndex: 'todayBuy'
  },
  {
    title: '本月购买',
    dataIndex: 'monthBuy'
  },
  {
    title: '总购买',
    dataIndex: 'totalBuy'
  }
]
const countData = [
  {
    "name": "今日支付订单",
    "value": 1234,
    "icon": "CheckCircleOutlined",
    "color": "#2ec7c9"
  },
  {
    "name": "今日收藏订单",
    "value": 3421,
    "icon": "ClockCircleOutlined",
    "color": "#ffb980"
  },
  {
    "name": "今日未支付订单",
    "value": 1234,
    "icon": "CloseCircleOutlined",
    "color": "#5ab1ef"
  },
  {
    "name": "本月支付订单",
    "value": 1234,
    "icon": "CheckCircleOutlined",
    "color": "#2ec7c9"
  },
  {
    "name": "本月收藏订单",
    "value": 3421,
    "icon": "ClockCircleOutlined",
    "color": "#ffb980"
  },
  {
    "name": "本月未支付订单",
    "value": 1234,
    "icon": "CloseCircleOutlined",
    "color": "#5ab1ef"
  }
]
const generateElement = (name) => React.createElement(Icon[name])

const Home = () => {
  const userImg = require("../../assets/images/user.png")
  const [columnData, setColumnData] = useState([])
  const [echartData,setEchartData] = useState({})
  useEffect(() => {
    getData().then((res) => {
      console.log(res.data.data)
      const {tableData,orderData} = res.data.data
      //设置表格数据
      setColumnData(tableData)
      // 设置折线图数据
      const xData = orderData.date
      const keyArrary = Object.keys(orderData.data[0])
      const series = []
      keyArrary.forEach(key=>{
        series.push(
          {
            name:key,
            data: orderData.data.map( item => item[key] ),
            type:'line'
          }
        )
      })
      setEchartData(
        {
          ...echartData,
          orderData:{
            xData:xData,
            series:series
          }
        }
      )
    })
  }, []
  )

  return (
    <Row className="home">
      <Col span={8}>
        <Card hoverable>
          <div className="user">
            <img src={userImg}></img>
            <div className="userinfo">
              <p className="name">Admin</p>
              <p className="access">超级管理员</p>
            </div>
          </div>
          <div className="login-info">
            <p>上次登录时间为: <span>2024-10-12</span></p>
            <p>上次登录地点为: <span>武汉</span></p>
          </div>
        </Card>
        <Card hoverable>
          <Table pagination={false} rowKey={'name'} columns={columns} dataSource={columnData}></Table>
        </Card>
      </Col>

      <Col span={16}>
        <div className="num">
          {
            countData.map((item, index) => {
              return (
                <Card key={index}>
                  <div className="icon-box" style={{ background: item.color }}>
                    {generateElement(item.icon)}
                  </div>
                  <div className="detail">
                    <p className="num">￥{item.value}</p>
                    <p className="txt">{item.name}</p>
                  </div>
                </Card>
              )
            })
          }
        </div>
       { echartData.orderData && <MyEchart chartData={echartData.orderData} style={{height:'280px'}}/> } 
      </Col>
    </Row>
  );
}

export default Home
