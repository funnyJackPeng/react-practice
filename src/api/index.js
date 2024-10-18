import request from "./axios"

export const getData = () => {
    return request({
        url: '/home/getData',
        method: 'get',
        params: {}
    })
}

export const getUser = () => {
    return request({
        url: '/user/getData',
        method: 'get',
        params: {}
    })
}
