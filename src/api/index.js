import request from "./axios"

export const getData = () => {
    return request({
        url: '/home/getData',
        method: 'get',
        params: {}
    })
}
