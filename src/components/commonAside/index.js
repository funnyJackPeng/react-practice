import React from "react";
import * as Icon from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import MenuConfig from "../../config";
import { useNavigate } from "react-router-dom";
const { Sider } = Layout;

const generateElement = (name) => React.createElement(Icon[name])

const items = MenuConfig.map((item) => {
    const child = {
        key: item.path,
        icon: generateElement(item.icon),
        label: item.label
    }
    if (item.children) {
        child.children = item.children.map((child) => {
            return {
                key: child.path,
                icon: generateElement(child.icon),
                label: child.label
            }
        })
    }
    return child
})

const CommonAside = ({ collapsed }) => {
    const navigate = useNavigate()
    const selectMenu = ({key})=>{
            navigate(key)
    }
    return (
        <Sider trigger={null} collapsed={collapsed}>
            <h3 className="app-name">{collapsed ? '后台' : '后台管理系统'}</h3>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={items}
                onClick={selectMenu}
                style={{
                    height: '100%'
                }} />
        </Sider>
    );
}

export default CommonAside