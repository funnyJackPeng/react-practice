import { Button, Form, Input, Popconfirm, Table } from "antd"
import React, { useEffect, useState } from "react"
import './index.css'
import { getUser } from "../../api"

const User = () => {
    const [searchParam,setSearchParam] = useState({
        param:''
    })

    const [tableData,setTableData] = useState([])
    
    const tableColumns=[
        {
            title:"姓名",
            dataIndex:"name"
        },
        {
            title:"年龄",
            dataIndex:"age",
        },
        {
            title:"性别",
            dataIndex:"sex",
            render:(val)=>{
                    return val ? '男':'女'
            }
        },
        {
            title:"生日",
            dataIndex:"birth"
        },
        {
            title:"地址",
            dataIndex:"addr"
        },
        {
            title:"操作",
            render:(res)=>{
                    return(
                        <div>
                                <Button type="primary" onClick={()=>handleClick('edit',res)}>编辑</Button>
                                <Popconfirm
                                title="提示"
                                description="确认要删除吗？"
                                onConfirm={()=>handleDelete(res)}
                                okText="确认"
                                cancelText="取消"
                                >
                                <Button style={{marginLeft:'5px'}} type="primary" danger>删除</Button>
                                </Popconfirm>
                        </div>
                    );
            }
        }
    ]
    useEffect(() => {
        getUser().then(res => {
            setTableData(res.data.list)
        })
    }, [])
    
    const handleClick = (clickType,columnData) => {
        console.log(clickType)
        console.log(columnData)
    }

    const handleFinish = (e) => {
        setSearchParam({
            name:e.searchContent
        })
        getUser(searchParam).then(res => {
            setTableData(res.data.list)
            console.log("搜索了")
            console.log(searchParam)
            console.log("返回内容为：")
            console.log(res.data.list)
        })
    }

    const handleDelete = (res) =>{
        console.log("删除了")
        console.log(res)
    }
    
    return <div>
        <div className="flex-box">
            <Button type="primary" onClick={() => handleClick('add')}>+新增</Button>
            <Form
                layout="inline"
                onFinish={handleFinish}
            >
                <Form.Item name="searchContent">
                    <Input placeholder="请输入搜索内容" />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary">搜索</Button>
                </Form.Item>
            </Form>
        </div>
        <Table rowKey={'id'} columns={tableColumns} dataSource={tableData} />
    </div>
}

export default User
