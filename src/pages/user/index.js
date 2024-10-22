import { Button, DatePicker, Form, Input, InputNumber, Modal, Popconfirm, Select, Table } from "antd"
import React, { useEffect, useState } from "react"
import './index.css'
import { getUser, createUser, updateUser } from "../../api"
import dayjs from "dayjs"

const User = () => {
    const [searchParam, setSearchParam] = useState({
        param: ''
    })

    const [tableData, setTableData] = useState([])
    const [isAddUser, setIsAddUser] = useState(true)
    const [isOpenModal, setisOpenModal] = useState(false)
    //表单实例
    const [form] = Form.useForm()
    const tableColumns = [
        {
            title: "姓名",
            dataIndex: "name"
        },
        {
            title: "年龄",
            dataIndex: "age",
        },
        {
            title: "性别",
            dataIndex: "sex",
            render: (val) => {
                return val ? '男' : '女'
            }
        },
        {
            title: "生日",
            dataIndex: "birth"
        },
        {
            title: "地址",
            dataIndex: "addr"
        },
        {
            title: "操作",
            render: (res) => {
                return (
                    <div>
                        <Button type="primary" onClick={() => handleClick('edit', res)}>编辑</Button>
                        <Popconfirm
                            title="提示"
                            description="确认要删除吗？"
                            onConfirm={() => handleDelete(res)}
                            okText="确认"
                            cancelText="取消"
                        >
                            <Button style={{ marginLeft: '5px' }} type="primary" danger>删除</Button>
                        </Popconfirm>
                    </div>
                );
            }
        }
    ]

    const getTableData = () => {
        getUser().then(res => {
            setTableData(res.data.list)
        })
    }

    useEffect(() => {
        getTableData()
    }, [])

    const handleClick = (clickType, columnData) => {
        setisOpenModal(!isOpenModal)
        if (clickType === 'add') {
            setIsAddUser(true)
        } else {
            const deepCloneData = JSON.parse(JSON.stringify(columnData))
            setIsAddUser(false)
            deepCloneData.birth = dayjs(deepCloneData.birth)
            form.setFieldsValue(deepCloneData)
        }
    }

    const handleOk = () => {
        form.validateFields().then((val) => {
            val.birth = dayjs(val.birth).format('YYYY-MM-DD')
            if (isAddUser) {
                createUser(val).then(() => {
                    getTableData()
                    handleCancel()
                })
            } else {
                updateUser(val).then(() => {
                    getTableData()
                    handleCancel()
                })
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    const handleCancel = () => {
        setisOpenModal(!isOpenModal)
        form.resetFields()
    }

    const handleFinish = (e) => {
        setSearchParam({
            name: e.searchContent
        })
        getUser(searchParam).then(res => {
            setTableData(res.data.list)
            console.log("搜索了")
            console.log(searchParam)
            console.log("返回内容为：")
            console.log(res.data.list)
        })
    }

    const handleDelete = (res) => {
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
        <Modal
            title={isAddUser ? '添加用户' : '编辑用户'}
            open={isOpenModal}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                labelAlign="left"
            >
                {
                    !isAddUser &&
                    <Form.Item
                        name='id'
                        hidden='true'
                    >
                        <Input />
                    </Form.Item>
                }
                <Form.Item
                    label="姓名"
                    name="name"
                    rules={
                        [{ required: true, message: "请输入姓名" }]
                    }
                >
                    <Input placeholder="输入姓名" />
                </Form.Item>
                <Form.Item
                    label="年龄"
                    name="age"
                    rules={[
                        { required: true, message: "请输入年龄" },
                        { type: "number", message: "年龄必须是数字" }
                    ]
                    }
                >
                    <InputNumber placeholder="输入年龄" />
                </Form.Item>
                <Form.Item
                    label="性别"
                    name="sex"
                    rules={[
                        { required: true, message: "请选择性别" },

                    ]
                    }
                >
                    <Select placeholder="请选择性别" options={[
                        {
                            value: 1,
                            label: "男",
                        },
                        {
                            value: 0,
                            label: "女",
                        }
                    ]} />
                </Form.Item>
                <Form.Item
                    label="出生日期"
                    name="birth"
                    rules={[
                        { required: true, message: "请选择出生日期" },

                    ]
                    }
                >
                    <DatePicker placeholder="请选择" format="YYYY/MM/DD" />
                </Form.Item>
                <Form.Item
                    label="地址"
                    name="addr"
                    rules={[
                        { required: true, message: "请输入地址" },

                    ]
                    }
                >
                    <Input placeholder="请输入地址" />
                </Form.Item>
            </Form>
        </Modal>
    </div>
}

export default User
