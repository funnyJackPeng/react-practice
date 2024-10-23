import React from 'react';
import { Space, Tag } from 'antd';
import './index.css'
import { useSelector } from 'react-redux';

const CommonTag = () => {
    const tabList = useSelector(state => state.tab.tabList)
    const currentTab = useSelector(state => state.tab.currentTab)
    const setTag = (isSelect, item, index) => {
        return (
            isSelect
                ? <Tag color='#55acee' closeIcon onClose={() => handleClose(item, index)} key={item.name}>{item.label}</Tag>
                : <Tag onClick={() => { handleChange(item) }} key={item.name}>{item.label}</Tag>
        );
    }
    const handleClose = (item, index) => {
        console.log('关闭了')
    }
    const handleChange = (item) => {
        console.log('修改了')
    }
    return (
        <Space className='common-tag'>
            {tabList.map((item, index) => setTag(item.label === currentTab.label, item, index))}
        </Space>
    );
}

export default CommonTag
