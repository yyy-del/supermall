import Vue from 'vue'
import VueRouter from 'vue-router'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

// 1.安装插件
Vue.use(VueRouter)

// 2.创建路由对象
const home = () =>
    import ('../views/home/home.vue')
const cart = () =>
    import ('../views/cart/cart.vue')
const category = () =>
    import ('../views/category/category.vue')
const profile = () =>
    import ('../views/profile/profile.vue')
const detail = () =>
    import ('../views/detail/Detail.vue')
const routes = [{
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: home
    },
    {
        path: '/cart',
        component: cart
    },
    {
        path: '/category',
        component: category
    },
    {
        path: '/profile',
        component: profile
    },
    {
        path: '/detail/:id',
        component: detail
    }

]

const router = new VueRouter({
        routes,
        mode: 'history'
    })
    // 3.导出路由

export default router