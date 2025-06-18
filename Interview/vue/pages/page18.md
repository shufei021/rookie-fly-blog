---
url: /Interview/vue/pages/page18.md
---
# watch 与 computed 的区别是什么以及他们的使用场景分别是什么

**区别：**

* 都是观察数据变化的（相同）
* 计算属性将会混入到 vue 的实例中，所以需要监听自定义变量；watch 监听 data 、props 里面数据的变化；
* computed 有缓存，它依赖的值变了才会重新计算，watch 没有；
* watch 支持异步，computed 不支持；
* watch 是一对多（监听某一个值变化，执行对应操作）；computed 是多对一（监听属性依赖于其他属性）
* watch 监听函数接收两个参数，第一个是最新值，第二个是输入之前的值；
* computed 属性是函数时，都有 get 和 set 方法，默认走 get 方法，get 必须有返回值（return）

**watch 的 参数：**

* deep：深度监听
* immediate ：组件加载立即触发回调函数执行

**computed 缓存原理：**

conputed本质是一个惰性的观察者；当计算数据存在于 data 或者 props里时会被警告；

vue 初次运行会对 computed 属性做初始化处理（initComputed），初始化的时候会对每一个 computed 属性用 watcher 包装起来 ，这里面会生成一个 dirty 属性值为 true；然后执行 defineComputed 函数来计算，计算之后会将 dirty 值变为 false，这里会根据 dirty 值来判断是否需要重新计算；如果属性依赖的数据发生变化，computed 的 watcher 会把 dirty 变为 true，这样就会重新计算 computed 属性的值。
