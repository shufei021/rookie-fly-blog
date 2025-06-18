---
url: /Interview/vue/pages/page8.md
---
# vue组件通信方式有哪些及原理

## 父传后代

> 后代拿到了父的数据

* `props`：父传子很方便，父传孙很麻烦（父=>子=>孙），这种方式子不能修改父组件的数据
* `$parent`: 这种方式子能修改父组件的数据
* `provide`&`inject`：依赖注入，优势父组件可以直接向某个后代传值，不用一级一级的传递,官方不推荐使用，但是写组件库时很常用
* `$attrs` &`$listeners`：透传属性/事件
  * `$attrs`：接收父组件非 props 的属性
  * `$listeners`：接收父组件所有事件监听器。
  ```vue
    <!-- 中间组件 -->
    <Grandchild v-bind="$attrs" v-on="$listeners" />
  ```

## 后代传父

> 父拿到了后代的数据

* 子组件传给父组件用 `this.$emit`
* 父组件直接拿子组件数据 `this.$refs.子组件ref`

## 兄弟间传值

* `eventBus`，实际上就是 `new Vue()`

## 其他

**Vuex**
