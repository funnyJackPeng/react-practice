import Mock from "mockjs";
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
import permissionApi from "./mockServeData/permission";

Mock.mock(/home\/getData/,'get',homeApi.getStatisticalData)
Mock.mock(/user\/getData/,'get',userApi.getUserList)
Mock.mock(/user\/create/,'post',userApi.createUser)
Mock.mock(/user\/update/,'post',userApi.updateUser)
Mock.mock(/user\/delete/,'delete',userApi.deleteUser)
Mock.mock(/permission\/getMenu/,'get',permissionApi.getMenu)
