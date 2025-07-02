---
url: /Interview/old/pages/page6.md
---
# 前端事件轮询

## 一、什么是事件轮询（Event Loop）？

事件轮询是 JavaScript 引擎处理异步操作的一种机制。它使得 JavaScript 在单线程的限制下依然可以处理并发任务，比如定时器、网络请求、用户交互等。

JavaScript 最初设计为单线程语言，主要是为了避免多线程带来的复杂性（如死锁）。但这也意味着同一时间只能执行一个任务。为了在不阻塞主线程的前提下处理异步任务，JavaScript 引入了 **事件轮询机制**。

## 二、事件轮询的核心组成部分

事件轮询依赖于几个关键的概念：

### 1. 调用栈（Call Stack）

* 是 JavaScript 执行代码的地方。
* 函数被调用时会被压入调用栈，执行完毕后弹出。

### 2. 消息队列（Callback Queue / Task Queue）

* 存放等待执行的回调函数。
* 比如：`setTimeout`、`setInterval`、`DOM 事件`触发后的回调。

### 3. 微任务队列（Microtask Queue）

* 存放优先级更高的任务，比如：
  * `Promise.then` / `catch` / `finally`
  * `MutationObserver`
  * `queueMicrotask`
* 微任务会在当前宏任务结束后立即执行所有微任务，然后再继续下一个宏任务。

### 4. 事件轮询（Event Loop）

* 不断检查调用栈是否为空。
* 如果为空，则从消息队列或微任务队列中取出第一个任务推入调用栈执行。

***

## 三、事件轮询的工作流程

1. 所有同步代码先执行，进入调用栈。
2. 遇到异步操作（如 setTimeout、Promise），交给浏览器其他线程（如定时器线程、网络线程）处理。
3. 当这些异步任务完成后，它们的回调会被放入相应的任务队列：
   * 宏任务 → 宏任务队列（如 setTimeout 回调）
   * 微任务 → 微任务队列（如 Promise.then 回调）
4. 当调用栈为空时，事件循环会：
   * 先清空微任务队列中的所有任务
   * 然后从宏任务队列中取一个任务执行
5. 这个过程不断重复，形成了“事件轮询”。

**执行顺序**

* 1、先执行主线程
* 2、遇到宏队列（macrotask）放到宏队列（macrotask）
* 3、遇到微队列（microtask）放到微队列（microtask）
* 4、主线程执行完毕
* 5、执行微队列（microtask），微队列（microtask）执行完毕
* 6、执行一次宏队列（macrotask）中的一个任务，执行完毕
* 7、执行微队列（microtask），执行完毕
* 8、依次循环。。。

## 四、宏任务 vs 微任务

| 类型     | 示例                              | 特点                                       |
|----------|-----------------------------------|--------------------------------------------|
| 宏任务   | setTimeout, setInterval, I/O      | 每次事件循环处理一个宏任务                 |
| 微任务   | Promise.then, MutationObserver    | 优先级更高，宏任务之后立即清空所有微任务   |

举个例子：

```js
console.log("Start");

setTimeout(() => {
  console.log("setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise.then");
});

console.log("End");
```

输出顺序为：

```bash
Start
End
Promise.then
setTimeout
```

解释：

* 同步代码先执行（Start、End）
* setTimeout 是宏任务，Promise.then 是微任务
* 所以微任务先执行，宏任务最后执行

***

## 五、实际应用和常见问题

### 1. 避免长时间阻塞主线程

* 大量计算或长循环会影响页面渲染和响应用户交互，应使用 Web Worker 或分片执行。

### 2. 微任务过多可能影响性能

* 如果微任务链太长，可能会导致 UI 渲染延迟，因为微任务会在每个宏任务之间全部执行完。

### 3. Vue/React 中的 nextTick/Microtask 使用

* Vue 的 `$nextTick()` 和 React 的某些更新机制都利用了微任务来确保 DOM 更新完成后再执行回调。

***

## 六、总结

事件轮询是 JavaScript 实现异步编程的核心机制，理解它有助于我们写出更高效、无阻塞的代码。其核心在于：

* JavaScript 是单线程的
* 异步任务由浏览器其他线程处理
* 回调进入任务队列
* 事件轮询负责将任务推入调用栈执行
* 微任务优先于宏任务执行
