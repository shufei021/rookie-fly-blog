---
url: /Interview/vue/pages/page3.md
---
# vue3和vue2的区别

## 双向绑定

* `双向绑定的方法不一样`： Vue3 使用了new Proxy，Vue2 使用了Object.defineProperty

- `响应式系统提升`：Vue3中响应式数据原理改成proxy，可监听动态新增删除属性，以及数组变化

## 代码组织

* `Vue2` 是选项式 API，Vue3 向下兼容，可以是 选项式 也可以 是组合式，语法糖 setup

## 编译优化

* `编译优化`：vue2通过标记静态根节点优化diff，Vue3 标记和提升所有静态根节点，diff的时候只需要对比动态节点内容

## 打包体积优化

* `打包体积优化`：移除了一些不常用的api（inline-template、filter）

## 生命周期的变化

* beforeDestroy -> beforeUnmount,destroyed -> unmounted
* beforeCreate 和 created 被 setup() 函数本身替代

## 其它

* `$set` 在Vue3中没有，因为 `new Proxy` 不需要

- `Vue2` v-for 优先级大于 v-if，Vue3 是 v-if 大于 v-for
- `源码组织方式变化`：使用 TS 重写
- `Vue3` 的 template 模板支持多个根标签
- Vuex状态管理：创建实例的方式改变,Vue2为new Store , Vue3为createStore
- Route 获取页面实例与路由信息：vue2通过this获取router实例，vue3通过使用 getCurrentInstance/ userRoute和userRouter方法获取当前组件实例
- Props 的使用变化：vue2 通过 this 获取 props 里面的内容，vue3 直接通过 props
- 父子组件传值：vue3 在向父组件传回数据时，如使用的自定义名称，如 backData，则需要在 emits 中定义一下
