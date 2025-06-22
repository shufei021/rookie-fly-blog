---
url: /Interview/js/pages/page11.md
---
# 事件轮询（Event Loop）

## 🧠 简要定义

> JavaScript 是一门单线程语言，为了不阻塞主线程，它采用了一种叫做事件轮询（Event Loop）的机制来处理异步操作。简单来说，`事件轮询就是 JavaScript 引擎中用来协调代码执行、处理事件和回调函数的一种机制`。

> js代码执行流程是：同步执行完了，才会走到事件轮询，进入到事件轮询：请求、事件、宏任务
> 事件轮询中包含：宏任务、微任务

## 🧱 基本组成与流程

我们可以将 Event Loop 拆解为几个核心部分来理解：

**1. 调用栈（Call Stack）**

* JavaScript 主线程中的一个数据结构，用于记录当前正在执行的函数。
* 后进先出（LIFO）结构。

**2. 堆（Heap）**
存放对象等动态数据的地方。

**3. 队列（Callback Queue）**

* 包括：
  * 宏任务队列（Macro Task Queue）如 setTimeout, setInterval, I/O 等。
  * 微任务队列（Micro Task Queue）如 Promise.then, MutationObserver, queueMicrotask 等。

::: details {open}

* 宏任务： script （主代码块）、setTimeout 、setInterval 、setImmediate 、I/O 、UI rendering
* 微任务：process.nextTick（Nodejs） 、Promise 、Object.observe 、MutationObserver
  :::
  **4. 事件循环本身（Event Loop）**

负责监听调用栈是否为空，一旦为空就从队列中取出任务放入调用栈执行。

## 🔁 事件轮询的工作流程

* 所有同步代码首先在调用栈中执行完毕。
* 遇到异步操作（如 setTimeout, fetch, DOM 事件），交给浏览器其他线程处理。
* 当这些异步任务完成时，它们的回调会被放入相应的任务队列中：
  * 宏任务 → 宏任务队列
  * 微任务 → 微任务队列
* 当调用栈清空后，事件循环会：
  * 先检查微任务队列，全部执行完；
  * 然后从宏任务队列中取出一个任务执行；
  * 重复这个过程。

## ⚠️ 关键点：微任务优先于宏任务

举个例子说明一下：

```js
console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise');
});

console.log('End');
```

输出顺序是：

```js
Start
End
Promise
Timeout
```

解释：

```js
Promise.then 是微任务，会在本轮事件循环结束前执行；
setTimeout 是宏任务，会在下一轮事件循环中执行。

```

## ✅ 总结

> 事件轮询是 JavaScript 实现异步非阻塞编程的核心机制。理解宏任务与微任务的区别，以及它们的执行顺序，对于写出高性能、无阻塞的应用至关重要。
