---
url: /Interview/vue/pages/page25.md
---
# 你的接口请求一般放在哪个生命周期中？为什么要这样做？

接口请求可以放在钩子函数 created、beforeMount、mounted 中进行调用，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。

但是推荐在 created 钩子函数中调用异步请求，因为在 created 钩子函数中调用异步请求有以下优点：

能更快获取到服务端数据，减少页面 loading 时间
SSR 不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于代码的一致性

created 是在模板渲染成 html 前调用，即通常初始化某些属性值，然后再渲染成视图。如果在 mounted 钩子函数中请求数据可能导致页面闪屏问题
