import { Button, Form, Input, message } from "antd";
import React from "react"
import './index.css'
import { getMenu } from "../../api";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    // 已有 token 的话直接跳转到 home
    if(localStorage.getItem('token')){
        //不能用 navigate 方法，不起效果
        return <Navigate to='/home'/>
    }
    const handleSubmit = (val) => {
        console.log(val)
        if(!val.username || !val.password){
            return message.open({type:'warning',content:'请输入账号和密码'})
        }

        getMenu(val).then((res) => {
            const token = res.data.data.token
            if(!token){
                return message.open({type:'error',content:'账号或密码错误'})
            }
            localStorage.setItem('token',token)
            navigate('/home')
        })
    }
    return (
        <Form className="login-container" onFinish={handleSubmit}>
            <div className="login_title">登录界面</div>
            <Form.Item
                label="账号"
                name='username'
                className="el-input">
                <Input placeholder="输入用户名" />
            </Form.Item>
            <Form.Item
                label="密码"
                name='password'
                className="el-input">
                <Input.Password placeholder="输入密码" />
            </Form.Item>
            <Form.Item className="login-button">
                <Button type="primary" htmlType="submit">登录</Button>
            </Form.Item>
        </Form>

    );
}

export default Login