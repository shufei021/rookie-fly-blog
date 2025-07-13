---
url: /learning/vue/modules/page10.md
---
# watch vs watchEffect

在Vue 3中，`watch`和`watchEffect`都是用于监听数据变化并执行相应的副作用（side effects），但它们之间存在一些关键差异。理解这些差异对于前端面试来说非常重要。

### watch

* **基本用法**：`watch`需要明确指定要监听的数据源。它可以监听一个或多个响应式数据的变化。
* **惰性执行**：仅当被监听的数据发生变化时，回调函数才会被执行。这意味着初始渲染时不会自动触发回调。
* **支持清除副作用**：如果监听器的逻辑创建了可以清理的副作用（如定时器、事件监听器等），可以通过返回一个清理函数来实现。
* **异步支持**：可以直接在回调函数中使用异步操作，而无需额外的封装。

示例：

```javascript
import { ref, watch } from 'vue';

const count = ref(0);

watch(count, (newVal, oldVal) => {
  console.log(`count changed from ${oldVal} to ${newVal}`);
});
```

### watchEffect

* **自动追踪依赖**：不需要手动指定监听的数据源，而是根据函数体内使用的响应式数据自动追踪依赖。一旦这些依赖发生改变，回调就会重新执行。
* **立即执行**：与`watch`不同的是，`watchEffect`会在初次运行时立即执行一次，以捕获当前状态，并且之后每当依赖项更新时都会再次执行。
* **副作用清理**：类似于`watch`，如果在`watchEffect`内部创建了副作用，也可以通过返回一个函数来定义如何清理这些副作用。
* **同步执行**：默认情况下，`watchEffect`是同步执行的，但如果需要处理异步逻辑，则需要自行管理异步代码。

示例：

```javascript
import { ref, watchEffect } from 'vue';

const count = ref(0);

watchEffect(() => {
  console.log(`current count is: ${count.value}`);
});
```

### 主要区别

* **初始化执行**：`watch`不会在首次创建时立即执行回调，而`watchEffect`会。
* **依赖声明**：`watch`需要明确指出要监听的数据，而`watchEffect`会自动收集依赖。
* **使用场景**：如果你需要更细粒度地控制何时以及为何种数据变化触发回调，`watch`可能是更好的选择。而当你想要自动追踪任何在回调中使用的响应式数据的变化时，`watchEffect`则更加方便。

了解这两种监听机制的特点和适用场景，可以帮助你在实际开发中做出更好的决策，同时也能在面试中展示出对Vue 3深入的理解。
