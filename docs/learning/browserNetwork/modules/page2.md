# 事件轮询（Event Loop）

### 一、整体概述

> **一句话总结**：
> 事件轮询是 JavaScript 引擎用来协调代码执行、处理异步任务的一种机制，确保主线程不会被阻塞，并保证异步操作能按顺序执行。

JavaScript 是单线程语言，意味着同一时间只能做一件事。为了实现异步非阻塞的能力，JavaScript 引擎通过 **调用栈（Call Stack）**、**消息队列（Callback Queue）** 和 **事件循环机制** 来管理任务调度。

---

### 二、核心组成部分与工作流程

#### 1. 调用栈（Call Stack）
- JS 引擎用来记录当前正在执行的函数调用。
- 函数调用时入栈，执行完成后出栈。

#### 2. 浏览器 API（Web APIs）
- 包括 `setTimeout`、`setInterval`、`DOM 事件`、`fetch` 等浏览器原生功能。
- 当这些异步操作完成时，它们会将回调函数交给“消息队列”。

#### 3. 消息队列（Callback Queue）
- 存放已经完成异步操作的回调函数。
- 例如：`setTimeout` 到时间后，其回调会被放入这个队列。

#### 4. 事件循环（Event Loop）
- 不断检查调用栈是否为空，如果空了，就从消息队列取出第一个回调推入调用栈执行。
- 这就是事件循环的核心逻辑。

---

### 三、宏任务 & 微任务（Microtask）

这是理解事件循环的关键点之一。

| 类型 | 示例 | 特点 |
|------|------|------|
| 宏任务（Macro Task） | `setTimeout`, `setInterval`, `I/O`, `UI 渲染`, `script` 整体代码 | 每次事件循环执行一个宏任务 |
| 微任务（Micro Task） | `Promise.then/catch/finally`, `MutationObserver`, `queueMicrotask` | 在当前宏任务结束后立即执行，优先于下一个宏任务 |

#### ✅ 执行顺序规则：
1. 执行同步代码（整个 script 是宏任务）
2. 同步代码执行完，清空微任务队列
3. 取出一个宏任务执行，重复上述过程

#### 🧪 示例说明：

```js
console.log('start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(() => {
  console.log('promise then');
});

console.log('end');

// 输出顺序：
// start → end → promise then → setTimeout
```

---

### 四、实际应用和常见问题

#### 1. 为什么 Promise 比 setTimeout 快？
- 因为 `Promise.then` 是微任务，会在当前宏任务结束后立即执行；
- 而 `setTimeout` 是宏任务，必须等到下一轮事件循环才会执行。

#### 2. 微任务堆积问题
- 如果有大量微任务（如递归调用 `Promise.then`），会导致页面无法渲染（因为渲染是宏任务），造成“饥饿”现象。
- 应避免无限递归微任务。

#### 3. DOM 更新延迟
- DOM 的更新通常发生在宏任务之间，所以即使你修改了 DOM，也可能不会立刻反映到界面上，直到当前宏任务结束。

---

### 五、总结归纳（适合结尾）

> 我可以用一句话总结事件轮询：
> “**事件轮询负责协调调用栈、消息队列和微任务队列，确保 JavaScript 在单线程下依然可以高效地处理异步操作。**”

掌握事件循环不仅可以帮助我们写出更高效的异步代码，还能解释很多看似奇怪的行为，比如为什么 `Promise.then` 总比 `setTimeout` 先执行，以及如何避免微任务堆积等问题。

---

## 🧠 延伸建议（加分项）

如果你在面试中能提到以下内容，会让你脱颖而出：

- Node.js 中的事件循环与浏览器的区别（Node 有多个阶段的宏任务队列）
- 使用 `queueMicrotask()` 或 `MutationObserver` 实现异步更新
- 如何利用微任务实现“异步安全”的状态更新（Vue.next(), React 的 flushSync）

---

## 📝 延申问题

1. `setTimeout(fn, 0)` 和 `Promise.then(fn)` 有什么区别？
2. 如何判断一个任务是宏任务还是微任务？
3. 什么是事件循环的 tick？
4. 为什么不能在微任务中频繁操作 DOM？
5. 微任务队列和回调队列的关系？

