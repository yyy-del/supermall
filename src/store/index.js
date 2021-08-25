import Vue from 'vue'
import Vuex from 'vuex'

// 1  安装插件
Vue.use(Vuex)
    // 2  创建实例
const store = new Vuex.Store({
        state: {
            cartList: []
        },
        mutations: {
            addCounter(state, payload) {
                payload.count++;
            },
            addToCart(state, payload) {
                payload.checked = true
                state.cartList.push(payload)
            }
        },
        actions: {
            addCart(context, payload) {
                return new Promise((resolve, reject) => {
                    //查找之前是否添加过该商品
                    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
                        // 判断oldProduct
                    if (oldProduct) {
                        context.commit('addCounter', oldProduct)
                        resolve(
                            '商品数量+1'
                        )
                    } else {
                        payload.count = 1
                        context.commit('addToCart', payload)
                        resolve(
                            '商品添加成功')

                    }
                })
            }
        },
        getters: {
            cartLength(state) {
                return state.cartList.length
            },
            cartList(state) {
                return state.cartList
            }
        }
    })
    // 3  导出vuex挂在到vue实例上
export default store