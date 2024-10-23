import React, { useEffect } from 'react';
import { Space, Tag } from 'antd';
import './index.css'
import { useDispatch, useSelector } from 'react-redux';
import { closeTab, setCurrentTab } from '../../store/reducers/tab';
import { useNavigate } from 'react-router-dom';

const CommonTag = () => {
    const tabList = useSelector(state => state.tab.tabList)
    const currentTab = useSelector(state => state.tab.currentTab)
    const dispath = useDispatch()
    const navigate = useNavigate()
    const setTag = (isSelect, item, index) => {
        return (
            isSelect
                ? <Tag color='#55acee' closeIcon={ tabList.length>1 } onClose={() => handleClose(item, index)} key={item.name}>{item.label}</Tag>
                : <Tag onClick={() => { handleChange(item) }} key={item.name}>{item.label}</Tag>
        );
    }
    const handleClose = (item, index) => {
        //调用 closetab 函数
        dispath(closeTab({...item,index}))
    }

    const handleChange = (item) => {
        //切换 current tab
        dispath(setCurrentTab(item))
    }
    //每当 currentTab 发生变化时，跳转路由
    useEffect(()=>{
        navigate(currentTab.path)
    },[currentTab])

    return (
        <Space className='common-tag'>
            {tabList.map((item, index) => setTag(item.label === currentTab.label, item, index))}
        </Space>
    );
}

export default CommonTag
