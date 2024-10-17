import { Button, Form, Input } from "antd"
import React from "react"
import './index.css'

const User = ()=>{
    const handleClick = (clickType)=>{
        console.log(clickType)
    }

    const handleFinish =(e)=>{
        console.log(e)
    }

    return <div>
        <div className="flex-box">
        <Button type="primary" onClick={()=>handleClick('add')}>+新增</Button>
        <Form
        layout="inline"
        onFinish={handleFinish}
        >
            <Form.Item name="searchContent">
            <Input placeholder="请输入搜索内容"/>
            </Form.Item>
            <Form.Item>
            <Button htmlType="submit" type="primary">搜索</Button>
            </Form.Item>
        </Form>
        </div>
    </div>
}

export default User
