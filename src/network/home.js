import { request } from '@/network/request'


export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}
//请求goods数据
export function getHomeGoodsData(type, page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}