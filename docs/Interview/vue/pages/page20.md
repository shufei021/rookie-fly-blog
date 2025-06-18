# 如何实现 vue 项目中的性能优化

**编码阶段**

+ 尽量减少 data 中的数据，data 中的数据都会增加 getter 和 setter，会收集对应的 watcher
+ v-if 和 v-for 不能连用
+ 如果需要使用 v-for 给每项元素绑定事件时使用事件代理
+ SPA 页面采用 keep-alive 缓存组件
+ 在更多的情况下，使用 v-if 替代 v-show
+ key 保证唯一
+ 使用路由懒加载、异步组件
+ 防抖、节流
+ 第三方模块按需导入
+ 长列表滚动到可视区域动态加载
+ 图片懒加载

**SEO 优化**

+ 预渲染
+ 服务端渲染 SSR

**打包优化**

+ 压缩代码
+ Tree Shaking/Scope Hoisting
+ 使用 cdn 加载第三方模块
+ 多线程打包 happypack
+ splitChunks 抽离公共文件
+ sourceMap 优化

**用户体验**

+ 骨架屏
+ PWA

