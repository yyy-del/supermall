import Toast from './Toast'
const obj = {}
obj.install = function(Vue) {
    // 1 创建组件构造器
    const toastConstrustor = Vue.extend(Toast)
        //2 new的方式，根据组件构造器，可以创建一个组件对象
    const toast = new toastConstrustor()
        // 3 将创建的组件对象挂载（$mount）到某个元素上
    toast.$mount(document.createElement('div'))
        // 4 挂载后，toast.$el 就是对应的div
    document.body.appendChild(toast.$el)

    //将Toast添加到vue原型上
    Vue.prototype.$toast = toast
}

export default obj