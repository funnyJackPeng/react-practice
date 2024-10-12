import React from "react";
import { Avatar } from "antd";
import { Button, Layout, Dropdown } from 'antd';
import { useDispatch } from 'react-redux'
import { collapseMenu } from "../../store/reducers/tab";
import { MenuFoldOutlined } from '@ant-design/icons'
import './index.css'
const { Header } = Layout;
const CommonHeader = ({ collapsed }) => {
  const logout = () => {
    console.log("成功登出");
  }
  const personalCenter = () => {
    console.log("进入个人中心")
  }
  const dispatch = useDispatch()
  const setCollapsed = () => {
    dispatch(collapseMenu())
  }
  const items = [
    {
      key: '1',
      label: (
        <a onClick={personalCenter} target="_blank" rel="noopener noreferrer">
          个人中心
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a onClick={logout} target="_blank" rel="noopener noreferrer">
          退出
        </a>
      ),
    },
  ];
  return (
    <Header className="header-container">
      <Button
        type="text"
        icon={<MenuFoldOutlined />}
        style={{
          fontSize: '16px',
          width: 64,
          height: 32,
          backgroundColor: '#fff'
        }}
        onClick={setCollapsed}
      />
      <Dropdown menu={{ items }}>
        <Avatar size={"large"} src={<img src={require("../../assets/images/user.png")} />} />
      </Dropdown>
    </Header>
  );
}

export default CommonHeader