# 归类

## 浏览器与网络

+ 浏览器输入URL到渲染过程 ✅
::: details 答案
1. 用户输入URL
 + 用户输入`URL`，按下`Enter`，浏览器检查输入的`URL`是否完整，如果不完整则当关键词搜索处理，跳转到默认的搜索引擎
2. URL解析
 + 提取出协议、域名、端口和路径等信息
3. DNS解析(域名解析)
 + 依次按 `浏览器缓存`、`操作系统缓存`、`路由器缓存`、`ISP DNS 服务器缓存`查询，如果都没有命中缓存，则依次从`根域名`、`顶级域名`、`权威域名服务器`递归和迭代查询，最终找到该域名的IP地址和更新各级缓存
4. TCP连接（三次握手）
 + 客户端->服务端发送`SYN`: 请求简历连接
 + 服务端->客户端发送`SYN-ACK`: 接收到请求，并同意连接
 + 客户端->服务端发送`ACK`: 连接成功
 + HTTPS TLS 握手
   + `Client Hello`: 浏览器->服务端发送发送 TLS 版本、随机数、加密套件列表
   + `Server Hello`: 服务端->浏览器发送 随机数、加密套件、证书（含公钥）
   + 密钥生成：客户端生成主密钥，用含公钥加密发送给服务端
   + 密钥会话生成后，后续通信都使用对称加密
5. 发起 HTTP(s) 请求
+ 发送请求报文，包含请求行、请求头、请求体

:::
+ 事件轮询
+ 跨域
+ HTTP1.1 与 HTTP2 区别
+ OPTIONS 预请求
+ 状态码详解
+ WebSocket 

## 性能优化 ❌
+ 前端性能优化
+ 前端首屏优化
+ 前端缓存
+ 前端内存泄漏

## JavaScript 核心 ❌

+ ES6 新特性
+ 箭头函数 vs 普通函数
+ 原型和原型链
+ 函数柯里化
+ 事件轮询
+ CommonJS 与 模块化

## Vue 框架

+ Vue 双向绑定原理
+ Vue 生命周期详解
+ Vue 自定义指令
+ Vue 如何优化 SEO
+ Vue2 vs Vue3
+ Vue3 组件通信与原理
+ Vue 路由实现原理
+ Vue keep-alive 原理
+ Vue computed 原理
+ vue3 watch vs watchEffect
+ Vue SSR 的实现原理
+ vue2和 vuex3渲染器的 diff算法
+ Vue nextTick
+ Vue complier 的实现原理
+ Vue 中的 Key
+ ref 和 reactive 的区别
+ toRefs 和 toRaw 的区别

## React 框架

+ React 框架原理

## 样式与布局
+ Flex
+ BFC
+ 两边固定宽度中间自适应方案

## 构建工具及工程化

+ Webpack 的构建流程
+ vite 的构建流程
+ Webpack vs vite
+ TypeScript
+ Uniapp
+ 前端架构


## 其他

+ 大文件上传方案
+ 移动端适配
+ 数据大屏适配
+ 谷歌浏览器插件
+ 脚手架cli
+ vite插件编写
+ vscode插件编写
+ AI 前端功能实现
+ SEO 如何做

## NodeJS

+  流



