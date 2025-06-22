# js宏任务和微任务

+ js是单线程的语言

+ js代码执行流程是：同步执行完了，才会走到事件轮询，进入到事件轮询：请求、事件、宏任务

+ 事件轮询中包含：宏任务、微任务

**宏任务**： script （主代码块）、setTimeout 、setInterval 、setImmediate 、I/O 、UI rendering
**微任务**：process.nextTick（Nodejs） 、Promise 、Object.observe 、MutationObserver


