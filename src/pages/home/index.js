import React, { useEffect, useState } from "react"
import { Col, Row, Card, Table } from 'antd';
import './index.css'
import { getData } from '../../api'

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

const Home = () => {
  const userImg = require("../../assets/images/user.png")
  const [columnData, setColumnData] = useState([])
  useEffect(() => {
    getData().then((res) => {
      console.log(res)
      console.log(res.data.data.tableData)
      setColumnData(res.data.data.tableData)
    })
  },
    []
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

      <Col span={16}> test2 </Col>
    </Row>
  );
}

export default Home
