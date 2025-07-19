# 系统性的温故而知新

## 浏览器与网络

+ 浏览器输入URL到渲染过程 ✅
::: details 详解
###### 一、用户输入URL
 + 用户输入`URL`，按下`Enter`，浏览器检查输入的`URL`是否完整，如果不完整则当关键词搜索处理，跳转到默认的搜索引擎

###### 二、URL解析
 + 提取出协议、域名、端口和路径等信息

###### 三、DNS解析(域名解析)
 + 依次按 `浏览器缓存`、`操作系统缓存`、`路由器缓存`、`ISP DNS 服务器缓存`查询，如果都没有命中缓存，则依次从`根域名`、`顶级域名`、`权威域名服务器`递归和迭代查询，最终找到该域名的IP地址和更新各级缓存

**`优化点`：** dns-prefetch 和 preconnect，让资源提前DNS 解析和 连接，首屏优化非常有效
###### 四、TCP连接（三次握手）
 + 客户端->服务端发送`SYN`: 请求简历连接
 + 服务端->客户端发送`SYN-ACK`: 接收到请求，并同意连接
 + 客户端->服务端发送`ACK`: 连接成功
 + HTTPS TLS 握手
   + `Client Hello`: 浏览器->服务端发送发送 TLS 版本、随机数、加密套件列表
   + `Server Hello`: 服务端->浏览器发送 随机数、加密套件、证书（含公钥）
   + 密钥生成：客户端生成主密钥，用含公钥加密发送给服务端
   + 密钥会话生成后，后续通信都使用对称加密

###### 五、发起 HTTP(s) 请求
+ 发送请求报文，包含请求行(user-agent、accept、content-type)、请求头、请求体
###### 六、服务端接收请求并响应
+ CDN分发
  + 如果是缓存的静态资源，该请求有可能被分发到就近的服务器进行处理
+ 缓存检查
  + 如果是强缓存（Cache-Control: max-age=xxx）的资源，则直接返回缓存，状态码200
  + 如果是协商缓存（Last-Modified/if-Modified-Since、Etag/if-none-match）的资源，则检查缓存，返回304 Not Modified
+ 重定向检查
  + 如果返回的是301，永久性重定向到新的URL，下次访问直接访问新地址
  + 如果返回的是302，临时性重定向到新的URL，下次访问该网站依然还是会重定向
+ 业务逻辑处理
  + 查询数据库、模板渲染SSR
+ 返回响应报文，包含状态码、响应头、响应体
###### 七、接收响应并解析
+ 解析HTML：构建DOM树
+ 解析CSS：构建CSSOM树
+ 合并CSSOM树和DOM树成render树
+ 布局：计算每个元素的大小和位置
+ 绘制：将每个元素的绘制到屏幕上
+ 合并：合并多个图层，优化渲染
###### 八、加载子资源
+ 在HTML解析的过程中，会加载js、css、图片等资源
+ 会重绘和回流
+ 会请求资源和请求数据加载数据渲染

**`优化点：`**
+ 图片优化
    + 图片最好设置固定宽高，不然有闪烁问题
    + 图片懒加载和压缩
+ 加载优化    
    + 由于多个资源加载，可以开启HTTP2/3, 多路复用，提升并发多个请求的加载速度
    + 静态资源可以放在CDN，提升访问速度
    + 可以设置延迟加载，比如async、defer，或者使用懒加载
    + 静态资源可以进行压缩，比如gzip、brotli
    + 非首屏资源可以进行懒加载
    + 字体资源可以先设置font-display: swap
    + prefetch 、preconnect关键资源提前加载，非关键资源延时加载
    + 内联CSS样式，减少请求数
    + 使用 SSR（服务端渲染）或 SSG（静态生成）
    + 对关键资源使用 < link rel="preload"> 预加载。
    + 减少 DOM 嵌套层级，提高查找效率。
    + 将 JS 放在 < body> 底部，避免阻塞渲染。
###### 九、页面加载完成
+ window.onload 事件触发
###### 十、断开连接
+ 客户端->服务器发送FIN： 请求断开连接
+ 服务器->客户端发送ACK： 同意断开连接
+ 服务器->客户端发送FIN： 请求断开连接
+ 客户端->服务器发送ACK： 同意断开连接
+ 等待2MSL 时间后，等待最后一个ACK包被接收，TCP 断开连接
   
:::
+ 事件轮询
::: details 详解
##### 作用
+ 事件轮询是 JavaScript 引擎用来协调代码执行、处理异步任务的一种机制，确保主线程不会被阻塞，并保证异步操作能按顺序执行
##### 概念
+ JavaScript 是单线程语言，意味着同一时间只能做一件事。为了实现异步非阻塞的能力，JavaScript 引擎通过 调用栈（Call Stack）、消息队列（Callback Queue） 和 事件循环机制 来管理任务调度。
##### 工作流程
###### 1. 调用栈（Call Stack）
- JS 引擎用来记录当前正在执行的函数调用。
- 函数调用时入栈，执行完成后出栈。
###### 2. 浏览器 API（Web APIs）
- 包括 `setTimeout`、`setInterval`、`DOM 事件`、`fetch` 等浏览器原生功能。
- 当这些异步操作完成时，它们会将回调函数交给“消息队列”。
###### 3. 消息队列（Callback Queue）
- 存放已经完成异步操作的回调函数。
- 例如：`setTimeout` 到时间后，其回调会被放入这个队列。
###### 4. 事件循环（Event Loop）
- 不断检查调用栈是否为空，如果空了，就从消息队列取出第一个回调推入调用栈执行。
- 这就是事件循环的核心逻辑。


#### 宏任务 & 微任务（Microtask）
| 类型 | 示例 | 特点 |
|------|------|------|
| 宏任务（Macro Task） | `setTimeout`, `setInterval`, `I/O`, `UI 渲染`, `script` 整体代码 | 每次事件循环执行一个宏任务 |
| 微任务（Micro Task） | `Promise.then/catch/finally`, `MutationObserver`, `queueMicrotask` | 在当前宏任务结束后立即执行，优先于下一个宏任务 |

#### 执行顺序规则：
1. 执行同步代码（整个 script 是宏任务）
2. 同步代码执行完，清空微任务队列
3. 取出一个宏任务执行，重复上述过程
:::
+ 跨域
::: details 详解
 ##### 什么是跨域？为什么会出现跨域？
 + 跨域是指浏览器因为**同源策略（Same-origin policy）**的限制，阻止从一个不同协议（HTTP/HTTPS）、不同域名、不同端口加载资源的行为。
 + 同源策略的三个条件
   + 协议相同
   + 域名相同
   + 端口号相同
   + 只要有一个不相同，就会触发跨域
#### 常见解决方案
+ 后端设置 CORS（推荐）
  + CORS（Cross-Origin Resource Sharing） 是一种 W3C 标准，后端通过设置响应头允许跨域
  + 常用响应头：
  ```JS
  Access-Control-Allow-Origin: * 或 http://example.com
  Access-Control-Allow-Credentials: true
  Access-Control-Allow-Methods: GET, POST, PUT, DELETE
  Access-Control-Allow-Headers: Content-Type, Authorization
  ```  
+ 使用 Nginx 反向代理（上线推荐）
+ WebSocket 跨域 :WebSocket 本身不受同源策略限制，可以直接跨域连接。但服务端仍可做限制
#### 常见问题
+ 1. 为什么浏览器要限制跨域？
  + 为了防止 **CSRF（跨站请求伪造）** 攻击，保护用户数据安全
+  CORS 是如何工作的？
  + 浏览器在发送请求时自动加上 Origin 头，服务器响应时带上 Access-Control-Allow-Origin，如果匹配，浏览器才允许前端访问响应内容。
+  OPTIONS 预检请求是什么？
  + 对于复杂请求（如带 Authorization、Content-Type: application/json 的 POST 请求），浏览器会先发送一个 OPTIONS 请求进行预检，确认服务器是否允许该请求。
+ 如何解决上传文件跨域
  + 上传文件时使用 FormData + fetch 或 XMLHttpRequest，后端需设置 Access-Control-Allow-Origin 和允许的 Content-Type 类型。      
:::
+ HTTP1.1 与 HTTP2 区别
::: details 详解
+ HTTP2 是二进制传输，HTTP1.1 是文本传输，HTTP1.1 是明文
+ HTTP2 支持开启多路复用，可以同时处理多个请求
+ HTTP2 支持头部HAPCK压缩
+ HTTP2 支持设置优先级
+ HTTP2 服务器推送
+ HTTP2 通常加密（推荐TLS）
:::
+ OPTIONS 预请求
::: details 详解
##### 定义
OPTIONS 请求是浏览器在发送某些跨域请求之前，自动发起的一个“探路”请求，用于确认服务器是否允许该跨域请求，这就是 CORS 中的预检机制（Preflight）
##### 触发 OPTIONS 预检请求条件
+ 使用了除 GET、HEAD、POST 以外的方法
+ 设置了自定义请求头
+ 设置了自定义的 Content-Type 
##### OPTIONS 请求工作流程
+ 浏览器向目标服务器发送一个 OPTIONS 请求。
+ 服务器根据这些options请求头信息决定是否允许请求，并返回相应的响应头
+ 如果服务器允许，则浏览器继续发送真正的请求；否则，阻止请求并报错
:::
+ 状态码详解
::: details 详解
1. **信息性状态码（100–199）**：
   - 100 Continue：服务器已接收到请求头，客户端应继续发送请求体。
   - 101 Switching Protocols：服务器已理解客户端的请求，并将通过升级协议来完成后续通信。

2. **成功状态码（200–299）**：
   - 200 OK：请求成功，所希望的回应头或数据体将随此回应返回。
   - 201 Created：请求已被实现，且有一个新的资源依据请求的需要而建立。
   - 204 No Content：服务器成功处理了请求，但不需要返回任何实体内容。

3. **重定向状态码（300–399）**：
   - 301 Moved Permanently：请求的资源已被永久地移动到新URI，返回信息会包括新的URI。
   - 302 Found：请求的资源临时从不同的URI响应请求。
   - 304 Not Modified：资源未被修改，可以使用缓存的版本。

4. **客户端错误状态码（400–499）**：
   - 400 Bad Request：服务器无法理解请求的格式，客户端应该修改请求后再试。
   - 401 Unauthorized：当前请求需要用户验证。
   - 403 Forbidden：服务器已经理解请求，但是拒绝执行它。
   - 404 Not Found：请求失败，请求所期望找到的资源在服务器上不存在。

5. **服务器错误状态码（500–599）**：
   - 500 Internal Server Error：服务器遇到未知情况，使其无法完成请求。
   - 501 Not Implemented：服务器不支持当前请求所需要的功能。
   - 502 Bad Gateway：作为网关或者代理工作的服务器尝试执行请求时，未能及时从上游服务器（如DNS服务器、网关、代理服务器等）收到响应。
   - 503 Service Unavailable：由于临时的服务器维护或过载，服务器暂时无法处理请求。
:::
+ WebSocket 
::: details 详解
##### WebSocket 是什么
+ WebSocket 是一种全双工通信协议，允许客户端和服务器之间建立一个持久连接，并且可以双向实时通信。它通过 ws://（不加密）或 wss://（加密）协议进行通信
##### WebSocket 和 HTTP 有什么区别
+ HTTP 是一种请求-响应模型的协议，客户端发送请求，服务器返回响应，通信是单向的。即使使用 HTTP/2 或 Server Push，本质上还是基于请求驱动的
+ 所以 WebSocket 更适合需要实时性高、低延迟的场景，比如聊天、股票行情、在线游戏等
##### WebSocket 是如何建立连接的？握手过程是怎样的
WebSocket 的建立过程是基于 HTTP 协议的，称为握手（Handshake）
+ 客户端发送一个 HTTP 请求，请求头中包含：
+ 服务端如果支持 WebSocket，会返回一个 101 状态码（Switching Protocols）并带上相应的响应头
+ 握手完成后，连接就升级为 WebSocket 协议，后续的通信就不再是 HTTP 请求/响应模式，而是真正的双向数据传输。
:::
## 性能优化 ❌
+ 前端性能优化
::: details 详解
#### 一、加载优化
1. **预加载（Preload）**
   - 使用 `<link rel="preload">` 提前加载关键资源，如字体、CSS、JS等。
   - 示例：`<link rel="preload" href="/styles.css" as="style">`
2. **懒加载（Lazy Load）**
   - 对图片、视频等大文件采用懒加载技术，仅当用户滚动到视口内时才加载。
   - 示例：使用 `loading="lazy"` 属性。
3. **延迟加载（Defer/Async Script Loading）**
   - 通过 `defer` 或 `async` 加载脚本，避免阻塞页面渲染。
   - `defer` 按顺序执行脚本，而 `async` 不保证顺序但异步加载。
4. **资源合并**
   - 将多个小文件合并为一个，减少HTTP请求次数。
   - 注意平衡文件大小与浏览器缓存效率。
5. **资源压缩**
   - 使用工具压缩HTML、CSS、JavaScript代码，去除不必要的空格和注释。
6. **CDN**
   - 使用内容分发网络(CDN)加速静态资源的访问速度。
7. **HTTP2/3**
   - 升级到HTTP/2或HTTP/3以利用多路复用、头部压缩等功能提升性能。
8. **强缓存/协商缓存**
   - 合理设置 `Cache-Control` 和 `ETag` 头部来控制缓存行为。
9. **字体资源使用font-display：swap**
   - 设置 `font-display: swap;` 确保文本在自定义字体加载前可见。

#### 二、构建优化
1. **Tree-shaking**
   - 利用Webpack等打包工具移除未使用的代码部分，减小最终包大小。
2. **打包分块：第三方和业务分离**
   - 分离第三方库与业务逻辑代码，利用长期缓存机制提高加载效率。
3. **代码分割**
   - 根据路由或组件动态加载模块，减少初始加载时间。
4. **按需加载**
   - 实现功能或页面级别的懒加载，只加载当前需要的部分。

#### 三、渲染优化
1. **骨架屏**
   - 在内容加载前显示占位符，改善用户体验。
2. **虚拟滚动加载**
   - 针对长列表，仅渲染视口内的元素，减少DOM操作成本。
3. **SSR (Server Side Rendering)**
   - 在服务器端完成页面首次渲染，加快首屏加载速度。
4. **减少重绘和回流**
   - 批量修改样式，尽量使用类名代替直接操作样式属性。
5. **内存泄漏减少**
   - 定期检查并清理不再使用的变量和事件监听器。
6. **编写复用函数和组件**
   - 提高代码复用性，降低维护成本。
7. **内连CSS**
   - 对于关键路径上的CSS，可以考虑内联至HTML中以减少额外请求。
8. **动画使用transform和opacity GPU加速动画**
   - 使用 `transform` 和 `opacity` 来创建平滑的GPU加速动画，避免触发布局重排。
#### 四、图像优化
1. **格式WEBP**
   - 转换图像格式为WebP，相比JPEG/PNG有更高的压缩率。
2. **压缩**
   - 使用工具压缩图片，保持视觉质量的同时减小文件大小。
3. **懒加载+占位图**
   - 结合懒加载技术和占位图，确保图像加载流畅且高效。
#### 五、监控分析
1. **前端埋点和上报**
   - 收集用户行为数据，用于后续分析和优化决策。
2. **性能面包分析和追踪**
   - 使用Lighthouse等工具定期评估网站性能，并跟踪改进效果。
3. **持续优化**
   - 基于监控数据不断调整和优化网站性能。
:::
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



