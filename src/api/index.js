import request from "./axios"

export const getData = () => {
    return request({
        url: '/home/getData',
        method: 'get',
       
    })
}

export const getUser = (params) => {
    return request({
        url: '/user/getData',
        method: 'get',
        params
    })
}

export const createUser = (data) => {
    return request({
        url: '/user/create',
        method: 'post',
         data
    })
}

export const updateUser = (data) => {
    return request({
        url: '/user/update',
        method: 'post',
         data
    })
}

export const deleteUser = (data) => {
    return request({
        url: '/user/delete',
        method: 'delete',
         data
    })
}

export const getMenu = (data) => {
    return request({
        url: '/permission/getMenu',
        method: 'get',
         data
    })
}
