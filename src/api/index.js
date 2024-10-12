import request from "./axios"

const getData = () => {
    request({
        url: '/home/getData',
        method: 'get',
        params: {}
    })
}
