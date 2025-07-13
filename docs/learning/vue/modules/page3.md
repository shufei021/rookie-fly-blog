# Vue 的自定义指令

- `v-focus`：自动聚焦输入框；
- `v-permission`：权限控制；
- `v-lazy`：图片懒加载；
- `v-throttle`：防抖节流；
- `v-draggable`：拖拽行为。

```js
// 注册自定义指令 v-focus
app.directive("focus", {
  mounted(el) {
    el.focus();
  },
});
```