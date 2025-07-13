---
url: /learning/vue/modules/page13.md
---
# nextTick 的作用是什么？他的实现原理是什么

`nextTick` 是一个在多个前端框架（如 Vue.js）中使用的方法，主要用于在下次 DOM 更新循环结束之后执行延迟回调。它的主要作用是在数据变化后等待 DOM 更新完成，然后执行指定的回调函数。

### 作用

当你修改了某些数据时，Vue 不能立即更新 DOM 以反映这些更改。它会在当前事件循环“tick”结束之后、新的渲染发生之前，将所有待处理的 DOM 更新刷新。使用 `nextTick` 可让你在 DOM 更新完成后执行代码。

例如，如果你需要在状态更新后立即操作新渲染的 DOM 元素，可以使用 `nextTick` 来确保 DOM 已经更新：

```javascript
// 修改数据
this.message = 'changed';

// 在 DOM 更新后执行
this.$nextTick(function() {
  // 操作更新后的 DOM
});
```

### 实现原理

`nextTick` 的实现依赖于环境。在浏览器环境中，它会尝试使用以下几种方式来安排回调函数的执行，按优先级顺序如下：

1. **Promise**：如果环境支持 Promise，则使用 Promise.resolve().then(callback) 安排回调。
2. **MutationObserver**：对于不支持 Promise 但支持 MutationObserver 的旧版浏览器，Vue 使用 MutationObserver 来调度微任务。
3. **setImmediate**：这是一个仅在 IE 中可用的方法，用于安排宏任务。
4. **setTimeout**：作为最后的选择，使用 setTimeout(callback, 0) 来安排回调。

通过这种方式，`nextTick` 能够尽可能地利用现代浏览器提供的高效异步执行机制，保证回调函数在当前调用栈清空且 DOM 渲染完毕之后尽快执行。这种机制使得 `nextTick` 成为一种非常有效的方式，可以在数据变更导致的 DOM 更新完成后进行后续操作。
