import { request } from './request';

// 分类列表数据
export function getAllCategory() {
    return request({
        url: '/category'
    })
}
//分类商品数据
export function getSubCategory(maitKey) {
    return request({
        url: '/subcategory',
        params: {
            maitKey
        }
    })
}
//分类详情数据
export function getCategoryDetail(miniWallkey, type) {
    return request({
        url: '/subcategory/detail',
        params: {
            miniWallkey,
            type
        }
    })
}