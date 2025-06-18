---
url: /Interview/vue/pages/page9.md
---
# Vue的路由实现, hash路由和history路由实现原理说一下

`location.hash`的值实际就是URL中`#`后面的东西。

history实际采用了HTML5中提供的API来实现，主要有history.pushState()和history.replaceState()。
