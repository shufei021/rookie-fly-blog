---
url: /Interview/vue/pages/page12.md
---
# nextTick 的作用是什么？他的实现原理是什么

在下次 DOM 更新循环结束之后执行延迟回调。nextTick主要使用了宏任务和微任务。根据执行环境分别尝试采用

* Promise
* MutationObserver
* setImmediate
* 如果以上都不行则采用setTimeout

定义了一个异步方法，多次调用nextTick会将方法存入队列中，通过这个异步方法清空当前队列
