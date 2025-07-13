---
url: /learning/vue/modules/page1.md
---
# Vue 的双向数据绑定原理

`Vue` 使用 `Object.defineProperty` 或 `Proxy` 劫持数据，结合 `Watcher` 实现依赖收集。当数据变化时，通知视图更新；当视图中表单等发生变化时，也会同步更新数据，从而实现双向绑定。”

::: details {open}
Vue 的双向绑定本质是`数据劫持 + 发布订阅模式`。在 Vue 2 中通过 Object.defineProperty 递归转换 data 的每个属性为 getter/setter，在 getter 中收集依赖（Watcher），在 setter 中通知更新。视图层通过 v-model 指令实现双向绑定，它本质是 value 属性绑定和 input 事件监听的语法糖。

Vue 3 改用 Proxy 实现，优势在于能直接监听整个对象且自动处理新增属性。整个系统还包含异步批量更新和虚拟 DOM diff 等优化机制，既保持了开发便捷性又保证了性能。
:::

```js
// Vue2 实现
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      return val;
    },
    set(newVal) {
      if (val !== newVal) {
        val = newVal;
        console.log("数据更新了");
      }
    },
  });
}

const data = { name: "Vue" };
defineReactive(data, "name", data.name);
data.name = "Vue3"; // 控制台输出 "数据更新了"
```
