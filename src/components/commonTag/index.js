import React from 'react';
import { Space, Tag } from 'antd';
import './index.css'
import { useSelector } from 'react-redux';

const CommonTag = () => {
    const tabList = useSelector(state=>state.tab.tabList)
    console.log('tabList is ',tabList)
    const handleClose = ()=>{
        console.log('关闭了')
    }
    return (
        <Space className='common-tag'>
            <Tag> tag 1</Tag>
            <Tag color='#55acee' closeIcon onClose={()=>handleClose()}>
                Prevent Default
            </Tag>
        </Space>
    );
}

export default CommonTag
