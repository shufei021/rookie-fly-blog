# 事件轮询（Event Loop）

事件触发线程管理的任务队列是如何产生的呢？事实上这些任务就是从JS引擎线程本身产生的，主线程在运行时会产生执行栈，栈中的代码调用某些异步API时会在任务队列中添加事件，栈中的代码执行完毕后，就会读取任务队列中的事件，去执行事件对应的回调函数，如此循环往复，形成事件循环机制。JS中有两种任务类型：微任务（microtask）和宏任务（macrotask），在ES6中，microtask称为 jobs，macrotask称为 task：

+ **宏任务**： script （主代码块）、setTimeout 、setInterval 、setImmediate 、I/O 、UI rendering
+ **微任务**：process.nextTick（Nodejs） 、Promise 、Object.observe 、MutationObserver


Node.js中Event Loop和浏览器中Event Loop有什么区别？

Node.js中宏任务分成了几种类型，并且放在了不同的task queue里。不同的task queue在执行顺序上也有区别，微任务放在了每个task queue的末尾：

+ setTimeout/setInterval 属于 timers 类型；
+ setImmediate 属于 check 类型；
+ socket 的 close 事件属于 close callbacks 类型；
+ 其他 MacroTask 都属于 poll 类型。
+ process.nextTick 本质上属于 MicroTask，但是它先于所有其他 MicroTask 执行；
+ 所有 MicroTask 的执行时机在不同类型的 MacroTask 切换后。
+ idle/prepare 仅供内部调用，我们可以忽略。
+ pending callbacks 不太常见，我们也可以忽略。

