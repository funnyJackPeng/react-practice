import React from "react"
import { Col, Row, Card } from 'antd';
import './index.css'
const Home = () => {

    const userImg = require("../../assets/images/user.png")
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
            </Col>

            <Col span={16}> test2 </Col>
        </Row>
    );
}

export default Home
