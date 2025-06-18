---
url: /Interview/vue/pages/page23.md
---
# 组件中写 name 选项有哪些好处

* 可以通过名字找到对应的组件（ 递归组件：组件自身调用自身 ）
* 可以通过 name 属性实现缓存功能（keep-alive）
* 可以通过 name 来识别组件（跨级组件通信时非常重要）
* 使用 vue-devtools 调试工具里显示的组见名称是由 vue 中组件 name 决定的
