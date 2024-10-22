import request from "./axios"

export const getData = () => {
    return request({
        url: '/home/getData',
        method: 'get',
       
    })
}

export const getUser = (param) => {
    return request({
        url: '/user/getData',
        method: 'get',
        param
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
