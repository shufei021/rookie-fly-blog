---
url: /learning/category/page.md
---
# 系统性的温故而知新

### [系统性主页](/learning/category/page)

## 浏览器与网络

### ✅浏览器输入URL到渲染过程

::: details 详解

###### 一、用户输入URL

* 用户输入`URL`，按下`Enter`，浏览器检查输入的`URL`是否完整，如果不完整则当关键词搜索处理，跳转到默认的搜索引擎

###### 二、URL解析

* 提取出协议、域名、端口和路径等信息

###### 三、DNS解析(域名解析)

* 依次按 `浏览器缓存`、`操作系统缓存`、`路由器缓存`、`ISP DNS 服务器缓存`查询，如果都没有命中缓存，则依次从`根域名`、`顶级域名`、`权威域名服务器`递归和迭代查询，最终找到该域名的IP地址和更新各级缓存

**`优化点`：** dns-prefetch 和 preconnect，让资源提前DNS 解析和 连接，首屏优化非常有效

###### 四、TCP连接（三次握手）

* 客户端->服务端发送`SYN`: 请求简历连接
* 服务端->客户端发送`SYN-ACK`: 接收到请求，并同意连接
* 客户端->服务端发送`ACK`: 连接成功
* HTTPS TLS 握手
  * `Client Hello`: 浏览器->服务端发送发送 TLS 版本、随机数、加密套件列表
  * `Server Hello`: 服务端->浏览器发送 随机数、加密套件、证书（含公钥）
  * 密钥生成：客户端生成主密钥，用含公钥加密发送给服务端
  * 密钥会话生成后，后续通信都使用对称加密

###### 五、发起 HTTP(s) 请求

* 发送请求报文，包含请求行(user-agent、accept、content-type)、请求头、请求体

###### 六、服务端接收请求并响应

* CDN分发
  * 如果是缓存的静态资源，该请求有可能被分发到就近的服务器进行处理
* 缓存检查
  * 如果是强缓存（Cache-Control: max-age=xxx）的资源，则直接返回缓存，状态码200
  * 如果是协商缓存（Last-Modified/if-Modified-Since、Etag/if-none-match）的资源，则检查缓存，返回304 Not Modified
* 重定向检查
  * 如果返回的是301，永久性重定向到新的URL，下次访问直接访问新地址
  * 如果返回的是302，临时性重定向到新的URL，下次访问该网站依然还是会重定向
* 业务逻辑处理
  * 查询数据库、模板渲染SSR
* 返回响应报文，包含状态码、响应头、响应体

###### 七、接收响应并解析

* 解析HTML：构建DOM树
* 解析CSS：构建CSSOM树
* 合并CSSOM树和DOM树成render树
* 布局：计算每个元素的大小和位置
* 绘制：将每个元素的绘制到屏幕上
* 合并：合并多个图层，优化渲染

###### 八、加载子资源

* 在HTML解析的过程中，会加载js、css、图片等资源
* 会重绘和回流
* 会请求资源和请求数据加载数据渲染

**`优化点：`**

* 图片优化
  * 图片最好设置固定宽高，不然有闪烁问题
  * 图片懒加载和压缩
* 加载优化
  * 由于多个资源加载，可以开启HTTP2/3, 多路复用，提升并发多个请求的加载速度
  * 静态资源可以放在CDN，提升访问速度
  * 可以设置延迟加载，比如async、defer，或者使用懒加载
  * 静态资源可以进行压缩，比如gzip、brotli
  * 非首屏资源可以进行懒加载
  * 字体资源可以先设置font-display: swap
  * prefetch 、preconnect关键资源提前加载，非关键资源延时加载
  * 内联CSS样式，减少请求数
  * 使用 SSR（服务端渲染）或 SSG（静态生成）
  * 对关键资源使用 < link rel="preload"> 预加载。
  * 减少 DOM 嵌套层级，提高查找效率。
  * 将 JS 放在 < body> 底部，避免阻塞渲染。

###### 九、页面加载完成

* window.onload 事件触发

###### 十、断开连接

* 客户端->服务器发送FIN： 请求断开连接
* 服务器->客户端发送ACK： 同意断开连接
* 服务器->客户端发送FIN： 请求断开连接
* 客户端->服务器发送ACK： 同意断开连接
* 等待2MSL 时间后，等待最后一个ACK包被接收，TCP 断开连接

:::

### ✅事件轮询

::: details 详解

##### 作用

* 事件轮询是 JavaScript 引擎用来协调代码执行、处理异步任务的一种机制，确保主线程不会被阻塞，并保证异步操作能按顺序执行

##### 概念

* JavaScript 是单线程语言，意味着同一时间只能做一件事。为了实现异步非阻塞的能力，JavaScript 引擎通过 调用栈（Call Stack）、消息队列（Callback Queue） 和 事件循环机制 来管理任务调度。

##### 工作流程

###### 1. 调用栈（Call Stack）

* JS 引擎用来记录当前正在执行的函数调用。
* 函数调用时入栈，执行完成后出栈。

###### 2. 浏览器 API（Web APIs）

* 包括 `setTimeout`、`setInterval`、`DOM 事件`、`fetch` 等浏览器原生功能。
* 当这些异步操作完成时，它们会将回调函数交给“消息队列”。

###### 3. 消息队列（Callback Queue）

* 存放已经完成异步操作的回调函数。
* 例如：`setTimeout` 到时间后，其回调会被放入这个队列。

###### 4. 事件循环（Event Loop）

* 不断检查调用栈是否为空，如果空了，就从消息队列取出第一个回调推入调用栈执行。
* 这就是事件循环的核心逻辑。

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

### ✅跨域

::: details 详解

##### 什么是跨域？为什么会出现跨域？

* 跨域是指浏览器因为 **`同源策略（Same-origin policy）`** 的限制，阻止从一个不同协议（HTTP/HTTPS）、不同域名、不同端口加载资源的行为。
* 同源策略的三个条件
  * 协议相同
  * 域名相同
  * 端口号相同
  * 只要有一个不相同，就会触发跨域

#### 常见解决方案

* 后端设置 CORS（推荐）
  * CORS（Cross-Origin Resource Sharing） 是一种 W3C 标准，后端通过设置响应头允许跨域
  * 常用响应头：
  ```JS
  Access-Control-Allow-Origin: * 或 http://example.com
  Access-Control-Allow-Credentials: true
  Access-Control-Allow-Methods: GET, POST, PUT, DELETE
  Access-Control-Allow-Headers: Content-Type, Authorization
  ```
* 使用 Nginx 反向代理（上线推荐）
* WebSocket 跨域 :WebSocket 本身不受同源策略限制，可以直接跨域连接。但服务端仍可做限制

#### 常见问题

* 1. 为什么浏览器要限制跨域？
  * 为了防止 **CSRF（跨站请求伪造）** 攻击，保护用户数据安全
* CORS 是如何工作的？
* 浏览器在发送请求时自动加上 Origin 头，服务器响应时带上 Access-Control-Allow-Origin，如果匹配，浏览器才允许前端访问响应内容。
* OPTIONS 预检请求是什么？
* 对于复杂请求（如带 Authorization、Content-Type: application/json 的 POST 请求），浏览器会先发送一个 OPTIONS 请求进行预检，确认服务器是否允许该请求。
* 如何解决上传文件跨域
  * 上传文件时使用 FormData + fetch 或 XMLHttpRequest，后端需设置 Access-Control-Allow-Origin 和允许的 Content-Type 类型。\
    :::

### ✅HTTP1.1 与 HTTP2 区别

::: details 详解

* HTTP2 是二进制传输，HTTP1.1 是文本传输，HTTP1.1 是明文
* HTTP2 支持开启多路复用，可以同时处理多个请求
* HTTP2 支持头部HAPCK压缩
* HTTP2 支持设置优先级
* HTTP2 服务器推送
* HTTP2 通常加密（推荐TLS）
  :::

### ✅OPTIONS 预请求

::: details 详解

##### 定义

OPTIONS 请求是浏览器在发送某些跨域请求之前，自动发起的一个“探路”请求，用于确认服务器是否允许该跨域请求，这就是 CORS 中的预检机制（Preflight）

##### 触发 OPTIONS 预检请求条件

* 使用了除 GET、HEAD、POST 以外的方法
* 设置了自定义请求头
* 设置了自定义的 Content-Type

##### OPTIONS 请求工作流程

* 浏览器向目标服务器发送一个 OPTIONS 请求。
* 服务器根据这些options请求头信息决定是否允许请求，并返回相应的响应头
* 如果服务器允许，则浏览器继续发送真正的请求；否则，阻止请求并报错
  :::

### ✅状态码详解

::: details 详解

1. **信息性状态码（100–199）**：
   * 100 Continue：服务器已接收到请求头，客户端应继续发送请求体。
   * 101 Switching Protocols：服务器已理解客户端的请求，并将通过升级协议来完成后续通信。

2. **成功状态码（200–299）**：
   * 200 OK：请求成功，所希望的回应头或数据体将随此回应返回。
   * 201 Created：请求已被实现，且有一个新的资源依据请求的需要而建立。
   * 204 No Content：服务器成功处理了请求，但不需要返回任何实体内容。

3. **重定向状态码（300–399）**：
   * 301 Moved Permanently：请求的资源已被永久地移动到新URI，返回信息会包括新的URI。
   * 302 Found：请求的资源临时从不同的URI响应请求。
   * 304 Not Modified：资源未被修改，可以使用缓存的版本。

4. **客户端错误状态码（400–499）**：
   * 400 Bad Request：服务器无法理解请求的格式，客户端应该修改请求后再试。
   * 401 Unauthorized：当前请求需要用户验证。
   * 403 Forbidden：服务器已经理解请求，但是拒绝执行它。
   * 404 Not Found：请求失败，请求所期望找到的资源在服务器上不存在。

5. **服务器错误状态码（500–599）**：
   * 500 Internal Server Error：服务器遇到未知情况，使其无法完成请求。
   * 501 Not Implemented：服务器不支持当前请求所需要的功能。
   * 502 Bad Gateway：作为网关或者代理工作的服务器尝试执行请求时，未能及时从上游服务器（如DNS服务器、网关、代理服务器等）收到响应。
   * 503 Service Unavailable：由于临时的服务器维护或过载，服务器暂时无法处理请求。
     :::

### ✅WebSocket

::: details 详解

##### WebSocket 是什么

* WebSocket 是一种全双工通信协议，允许客户端和服务器之间建立一个持久连接，并且可以双向实时通信。它通过 ws://（不加密）或 wss://（加密）协议进行通信

##### WebSocket 和 HTTP 有什么区别

* HTTP 是一种请求-响应模型的协议，客户端发送请求，服务器返回响应，通信是单向的。即使使用 HTTP/2 或 Server Push，本质上还是基于请求驱动的
* 所以 WebSocket 更适合需要实时性高、低延迟的场景，比如聊天、股票行情、在线游戏等

##### WebSocket 是如何建立连接的？握手过程是怎样的

WebSocket 的建立过程是基于 HTTP 协议的，称为握手（Handshake）

* 客户端发送一个 HTTP 请求，请求头中包含：
* 服务端如果支持 WebSocket，会返回一个 101 状态码（Switching Protocols）并带上相应的响应头
* 握手完成后，连接就升级为 WebSocket 协议，后续的通信就不再是 HTTP 请求/响应模式，而是真正的双向数据传输。
  :::

## 性能优化 ❌

### ✅前端性能优化

::: details 详解

#### 一、加载优化

1. **预加载（Preload）**
   * 使用 `<link rel="preload">` 提前加载关键资源，如字体、CSS、JS等。
   * 示例：`<link rel="preload" href="/styles.css" as="style">`
2. **懒加载（Lazy Load）**
   * 对图片、视频等大文件采用懒加载技术，仅当用户滚动到视口内时才加载。
   * 示例：使用 `loading="lazy"` 属性。
3. **延迟加载（Defer/Async Script Loading）**
   * 通过 `defer` 或 `async` 加载脚本，避免阻塞页面渲染。
   * `defer` 按顺序执行脚本，而 `async` 不保证顺序但异步加载。
4. **资源合并**
   * 将多个小文件合并为一个，减少HTTP请求次数。
   * 注意平衡文件大小与浏览器缓存效率。
5. **资源压缩**
   * 使用工具压缩HTML、CSS、JavaScript代码，去除不必要的空格和注释。
6. **CDN**
   * 使用内容分发网络(CDN)加速静态资源的访问速度。
7. **HTTP2/3**
   * 升级到HTTP/2或HTTP/3以利用多路复用、头部压缩等功能提升性能。
8. **强缓存/协商缓存**
   * 合理设置 `Cache-Control` 和 `ETag` 头部来控制缓存行为。
9. **字体资源使用font-display：swap**
   * 设置 `font-display: swap;` 确保文本在自定义字体加载前可见。

#### 二、构建优化

1. **Tree-shaking**
   * 利用Webpack等打包工具移除未使用的代码部分，减小最终包大小。
2. **打包分块：第三方和业务分离**
   * 分离第三方库与业务逻辑代码，利用长期缓存机制提高加载效率。
3. **代码分割**
   * 根据路由或组件动态加载模块，减少初始加载时间。
4. **按需加载**
   * 实现功能或页面级别的懒加载，只加载当前需要的部分。

#### 三、渲染优化

1. **骨架屏**
   * 在内容加载前显示占位符，改善用户体验。
2. **虚拟滚动加载**
   * 针对长列表，仅渲染视口内的元素，减少DOM操作成本。
3. **SSR (Server Side Rendering)**
   * 在服务器端完成页面首次渲染，加快首屏加载速度。
4. **减少重绘和回流**
   * 批量修改样式，尽量使用类名代替直接操作样式属性。
5. **内存泄漏减少**
   * 定期检查并清理不再使用的变量和事件监听器。
6. **编写复用函数和组件**
   * 提高代码复用性，降低维护成本。
7. **内连CSS**
   * 对于关键路径上的CSS，可以考虑内联至HTML中以减少额外请求。
8. **动画使用transform和opacity GPU加速动画**
   * 使用 `transform` 和 `opacity` 来创建平滑的GPU加速动画，避免触发布局重排。

#### 四、图像优化

1. **格式WEBP**
   * 转换图像格式为WebP，相比JPEG/PNG有更高的压缩率。
2. **压缩**
   * 使用工具压缩图片，保持视觉质量的同时减小文件大小。
3. **懒加载+占位图**
   * 结合懒加载技术和占位图，确保图像加载流畅且高效。

#### 五、监控分析

1. **前端埋点和上报**
   * 收集用户行为数据，用于后续分析和优化决策。
2. **性能面包分析和追踪**
   * 使用Lighthouse等工具定期评估网站性能，并跟踪改进效果。
3. **持续优化**
   * 基于监控数据不断调整和优化网站性能。
     :::

### ✅前端首屏优化

::: details 详解

##### 一、资源加载优化

1. **优先加载关键资源**
   * **CSS**：将用于首屏渲染的CSS内联至HTML中，确保样式能立即应用。
   * **JS**：对于非必要的JavaScript文件（如广告脚本、分析脚本），使用`async`或`defer`属性延迟加载。
2. **图片优化**
   * 使用**懒加载**技术，仅当图片进入视口时才加载。
   * 将图片格式转换为更高效的格式，如WebP。
   * 使用占位图（placeholder）替代实际图片，直到图片完全加载。
3. **字体优化**
   * 设置`font-display: swap;`，使得文本在自定义字体加载前可见。
   * 考虑使用系统默认字体作为回退方案，避免空白文本闪烁。
4. **使用CDN**
   * 静态资源通过CDN分发，利用地理位置优势加快资源加载速度。
5. **HTTP/2 或 HTTP/3 升级**
   * 利用多路复用、头部压缩等特性减少延迟。
6. **资源合并与压缩**
   * 合并多个CSS和JS文件以减少请求数量，并启用Gzip或Brotli压缩来减小传输体积。
7. **内联关键CSS**
   * 将首屏所需的所有CSS直接嵌入HTML中，避免额外的HTTP请求

##### 二、构建流程优化

1. **代码分割**
   * 按需加载组件或模块，而不是一次性加载所有内容。
   * 动态导入（Dynamic Imports）可以有效地实现按需加载。
2. **Tree Shaking**
   * 移除未使用的代码部分，减小打包后的文件大小。
3. **SSR (Server Side Rendering)**
   * 在服务器端完成页面初次渲染，发送给客户端的HTML已经包含了完整的内容结构，减少了浏览器解析和执行的时间。
4. **Service Worker 缓存**
   * 实现离线访问和快速加载，特别是在重复访问时能够直接从缓存读取数据。

##### 三、渲染性能优化

1. **骨架屏（Skeleton Screen）**
   * 在内容加载之前显示一个简单的UI框架，给用户即时反馈，改善等待体验。
2. **避免阻塞渲染的CSS**
   * 确保CSS不会阻止页面渲染，可以通过媒体查询指定某些样式只在特定条件下加载。
3. **减少重绘和回流**
   * 批量修改DOM元素样式，尽量使用类名切换代替直接操作样式属性。
4. **动画优化**
   * 对于涉及视觉变化的动画，优先使用`transform`和`opacity`，因为它们可以被GPU加速，避免触发布局重排。

##### 四、监控与分析

1. **性能监控工具**
   * 使用Lighthouse、WebPageTest等工具定期评估网站性能，并根据报告进行针对性优化。
2. **前端埋点**
   * 收集用户行为数据，了解用户的交互模式，识别性能瓶颈。
3. **持续优化**
   * 根据监控数据不断调整和优化网站性能，保持最佳状态。
     :::

### ✅Web缓存

::: details 详解

##### 定义和作用

Web缓存是一种临时存储Web文档(如HTML页面、图片等)的技术，目的是减少带宽使用、服务器负载和感知延迟。当用户再次访问相同资源时，可以直接从缓存中获取，而不需要重新从服务器下载。

##### 缓存类型

* 浏览器缓存 - 存储在用户本地设备上
* 代理缓存 - 位于客户端和服务器之间的中间缓存
* 网关缓存(反向代理缓存) - 部署在服务器前端的缓存，如CDN

##### HTTP缓存机制

Cache-Control是HTTP/1.1中定义的最重要的缓存控制头部，它可以指定：

* public/private - 定义资源是否可被共享缓存
* max-age - 资源被认为新鲜的最大时间(秒)
* no-cache - 使用前必须验证
* no-store - 禁止任何缓存
* must-revalidate - 过期后必须重新验证

##### 缓存验证

主要有两种验证机制：

* Last-Modified/If-Modified-Since - 基于时间戳
  * 服务器响应Last-Modified头部
  * 客户端下次请求携带If-Modified-Since
  * 服务器比较时间决定返回304(未修改)或新内容
* ETag/If-None-Match - 基于内容标识符
  * 服务器响应ETag(通常是内容的hash)
  * 客户端下次请求携带If-None-Match
  * 服务器比较ETag决定返回304或新内容

##### 实际应用

`静态资源(JS/CSS/图片):`

* 设置较长的max-age(如1年)
* 使用内容hash作为文件名实现"永不过期"缓存
* 通过CDN分发

`动态内容(HTML/API):`

* 设置较短的max-age(如几分钟)
* 通常使用no-cache或must-revalidate
* 对个性化内容使用private

##### 缓存问题

主要问题有：

* 缓存失效 - 用户看不到最新内容
  * 解决方案：版本化文件名或查询参数
* 敏感数据缓存 - 可能泄露隐私
  * 解决方案：对敏感内容使用private或no-store
* 缓存污染 - 恶意内容被缓存
  * 解决方案：验证输入，对用户生成内容谨慎缓存

##### 本地缓存

* LocalStorage、SessionStorage、IndexedDB、cookie
  :::

### ✅前端内存泄漏

::: details 详解

* 未清除的定时器
* 未移除的事件监听器
* 意外的全局变量
* 滥用闭包
* 游离的DOM元素
* console.log持有引用
* 第三方库使用和管理不当
* 未关闭的WebSocket连接 和 未取消的订阅
* 缓存使用不当
  :::

## JavaScript 核心

### ✅ES6 新特性

::: details 详解

* let/const
* class
* promise
* import/export
* Set/Map
* Proxy/Relect
* async/await
* 模板字符串
* 扩展运算符
* 剩余参数
* 箭头函数
* 默认参数
* 解构赋值
  :::

### ✅箭头函数 vs 普通函数

::: details 详解

* 写法差异
* 没有自己的this
* 没有arguments
* 没有prototype属性
* 无法使用new,不能作为构造函数
* 不能super继承父类的属性和方法

:::

### ✅原型和原型链

::: details 详解

##### 原型

在 JavaScript 中，原型（Prototype）是实现继承和共享属性与方法的一种机制。每个函数都有一个 prototype 属性，它是一个对象，包含了可以被该函数创建的所有实例共享的属性和方法。而每个对象都有一个内部属性 \[\[Prototype]]，通常可以通过 **proto** 访问，它指向其构造函数的 prototype 对象。

##### 原型链

原型链是 JavaScript 实现继承的核心机制。当访问一个对象的属性或方法时，如果该对象本身没有这个属性，JavaScript 引擎会去它的原型对象中查找，如果原型对象也没有，就会继续向上查找它的原型对象的原型，直到查找到 Object.prototype 或者遇到 null 为止，这个查找过程就构成了原型链。

##### **proto** 和 prototype 区别

* `prototype` 是函数对象的一个属性，它是一个对象，用于存放通过该函数构造出的实例可以共享的属性和方法。
* `__proto__` 是每个对象都有的一个内部属性（对应 `[[Prototype]]`），它指向该对象的构造函数的 prototype

##### constructor 是什么？它在原型链中的作用是什么

* constructor 是每个 prototype 对象默认拥有的属性，它指向该原型对象对应的构造函数

```js
function Person() {}
console.log(Person.prototype.constructor === Person); // true
```

**原型是继承的基础，原型链是属性查找的机制**
:::

### ✅函数柯里化

::: details 详解

##### 定义

函数柯里化是一种函数转换技术，它将一个接受多个参数的函数转换成一系列连续的、每次只接受一个参数的嵌套函数。换句话说，原本需要多个参数的函数，被改造成可以通过逐步传参的方式调用。例如，一个函数 add(a, b, c) 可以被柯里化为 add(a)(b)(c)

##### 柯里化实现

```js
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...moreArgs) {
        return curried.apply(this, args.concat(moreArgs));
      };
    }
  };
}
```

使用

```js
function add(a, b, c) {
  return a + b + c;
}

const curryAdd = curry(add);

console.log(curryAdd(1)(2)(3)); // 6
console.log(curryAdd(1, 2)(3)); // 6
console.log(curryAdd(1)(2, 3)); // 6
```

##### 函数柯里化在实际开发中有以下常见应用场景

:::

### ✅CommonJS 与 模块化

::: details 详解

##### 模块化

模块化是一种将代码划分为独立、可复用部分的编程范式。它的目的是：

* 解耦：减少模块之间的依赖
* 可维护性：便于调试和更新
* 复用性：可以在多个项目中重复使用

JavaScript 原生并不支持模块化，直到 ES6 才正式引入模块标准（ES Module）。

##### CommonJS 是什么

CommonJS 是一种模块化规范，最初是为了解决 Node.js 中的模块问题而提出的。
**特点：**

* 使用 require() 同步加载模块
* 使用 module.exports 和 exports 导出模块
* 主要用于服务端（Node.js）

```js
// math.js
exports.add = function(a, b) {
  return a + b;
};

// 或者
module.exports = {
  add: function(a, b) { return a + b; }
};

// app.js
const math = require('./math');
console.log(math.add(1, 2)); // 3
```

**优点：**

* 简单易懂，语法清晰
* Node.js 的默认模块系统

**缺点：**

* 同步加载，不适合浏览器环境
* 不利于异步加载或按需加载

#### ES Module（ESM）

ES6 引入了官方模块系统 —— ECMAScript Module（ESM）

**特点：**

* 使用 import / export 语法
* 支持异步加载
* 静态分析能力强，适合 Tree Shaking

```js
// math.js
export function add(a, b) {
  return a + b;
}

// app.js
import { add } from './math.js';
console.log(add(1, 2));

```

**优点：**

* 官方标准，未来主流
* 支持异步加载
* 可以做静态优化（如 Tree Shaking）

**缺点：**

* 浏览器兼容性早期较差（现已广泛支持）
* 不能直接在旧版 Node.js 中使用（需要配置 type="module"）

#### CommonJS 与 ESM 的区别

CommonJS（CJS）和 ECMAScript 模块（ESM）是JavaScript中两种不同的模块系统，它们在语法、使用场景以及一些特性上有所区别。以下是两者的主要区别：

##### 1. 语法差异

* **CommonJS (CJS)**:

  * 使用`require()`函数来导入模块。
  * 使用`module.exports`或`exports`对象来导出模块内容。

  ```javascript
  // 导入模块
  const moduleA = require('./moduleA');

  // 导出模块
  module.exports = { foo: 'bar' };
  ```

* **ECMAScript 模块 (ESM)**:

  * 使用`import`语句来导入模块。
  * 使用`export`关键字来导出模块内容。

  ```javascript
  // 导入模块
  import { foo } from './moduleB.js';

  // 导出模块
  export const bar = 'foo';
  ```

##### 2. 加载时机

* **CommonJS**: 模块是在运行时加载的，这意味着你可以根据条件动态地决定要加载哪些模块。
* **ESM**: 模块在编译时确定依赖关系，因此具有更严格的依赖图谱，并且不允许动态导入模块路径（尽管有动态`import()`语法，但它的行为与静态`import`不同）。

##### 3. 适用环境

* **CommonJS**最初是为Node.js设计的，在早期版本的Node.js中广泛使用。
* **ESM**是JavaScript标准的一部分，现在也被现代浏览器和Node.js支持。随着标准化进程，它逐渐成为前端和后端开发中的主流选择。

##### 4. 性能考虑

* **ESM**由于其静态结构，可以进行更多优化，比如Tree-shaking（消除未使用的代码），这对于构建高效的应用程序非常重要。

##### 5. 默认导出与命名导出

* **CommonJS**: 主要是默认导出的概念，尽管也可以通过向`exports`添加多个属性实现类似命名导出的功能。
* **ESM**: 明确区分了默认导出(`export default`)和命名导出(`export const ...`等)，提供了更大的灵活性。

:::

## Vue 框架

### ✅Vue 双向绑定原理

::: details 详解

* Vue 的双向绑定本质是数据劫持 + 发布订阅模式。

* 在 Vue 2 中通过 Object.defineProperty 递归转换 data 的每个属性为 getter/setter，在 getter 中收集依赖（Watcher），在 setter 中通知更新。视图层通过 v-model 指令实现双向绑定，它本质是 value 属性绑定和 input 事件监听的语法糖。

* Vue 3 改用 Proxy 实现，优势在于能直接监听整个对象且自动处理新增属性。整个系统还包含异步批量更新和虚拟 DOM diff 等优化机制，既保持了开发便捷性又保证了性能。

```js
// Vue2 实现
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      return val;
    },
    set(newVal) {
      if (val !== newVal) {
        val = newVal;
        console.log("数据更新了");
      }
    },
  });
}

const data = { name: "Vue" };
defineReactive(data, "name", data.name);
data.name = "Vue3"; // 控制台输出 "数据更新了"
```

:::

### ✅Vue 生命周期详解

::: details 详解

* `beforeCreate`:**这个钩子在实例初始化之后、数据观测 (data observer) 和 event/watcher 事件配置之前被调用**,不过，在 Composition API 中，通常使用 setup() 函数来处理这一阶段的逻辑，因此这个钩子不常用。
* `created`：**在实例创建完成后立即调用**。在这个阶段，实例已经完成了数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。但是，挂载阶段还没开始，$el 属性目前不可见
* `beforeMount`：**在挂载开始之前被调用**：相关的 render 函数首次被调用。此时，虚拟 DOM 尚未渲染到真实 DOM 上
* `mounted`：**在 el 被新创建的 vm.$el 替换，并挂载到实例上后调用**。这时，组件已经被渲染到 DOM 中，可以访问 DOM 元素了。
* `beforeUpdate`：*在数据更新时，在虚拟 DOM 打补丁之前调用*\*。此时，可以获取更新前的状态，适合用来进行一些清理工作。
* `updated`：**在由于数据更改导致的虚拟 DOM 重新渲染和打补丁之后调用**。此时，组件 DOM 已经更新，可以执行依赖于 DOM 的操作。然而，避免在此期间改变状态，因为这可能会导致无限的更新循环
* `beforeUnmount（在 Vue 2 中为 beforeDestroy）`：**发生在实例销毁之前，在当前阶段实例完全可以被使用**。调用此钩子时，组件实例的所有指令都被解绑，所有事件监听器被移除，所有子组件实例也都被销毁。
* `unmounted（在 Vue 2 中为 destroyed）`:**卸载组件实例后调用**。调用此钩子时，组件实例的所有指令都被解绑，所有事件监听器被移除，所有子组件实例也都被销毁。

**activated 和 deactivated 是 Vue 中专门用于 < keep-alive> 缓存组件时的生命周期钩子**

* `activated`：**当组件被 < keep-alive> 缓存后，每次该组件被激活（显示）时调用**。可以在这里执行组件重新展示时需要的逻辑，比如重新获取数据、恢复动画、计时器等
* `deactivated`：**当组件被缓存后，离开当前视图（被切换出去）时调用**。可以在这里进行一些资源释放操作，比如清除定时器、取消事件监听、停止动画等，防止内存泄漏。
  :::

### ✅Vue 自定义指令

::: details 详解

* `v-focus`：自动聚焦输入框；
* `v-permission`：权限控制；
* `v-lazy`：图片懒加载；
* `v-throttle`：防抖节流；
* `v-draggable`：拖拽行为。

```js
// 注册自定义指令 v-focus
app.directive("focus", {
  mounted(el) {
    el.focus();
  },
});
```

:::

### ✅Vue 如何优化 SEO

::: details 详解
在Vue.js项目中优化SEO（搜索引擎优化）主要涉及以下几个方面：

1. **服务端渲染 (SSR)**：默认情况下，Vue应用是客户端渲染的，这意味着在JavaScript执行之前，页面对于搜索引擎来说是空白的。通过使用服务端渲染，可以在服务器上预渲染Vue组件，并将HTML发送到客户端，这有助于搜索引擎更好地理解和索引你的网页内容。

   Vue官方提供了一个名为Vue Server Renderer的库来实现这一点。此外，Nuxt.js是一个基于Vue.js的更高层次的框架，它简化了服务端渲染的配置和使用，同时也提供了静态站点生成等功能。

2. **预渲染 (Prerendering)**：如果您的网站主要是静态内容，或者只有少量动态内容，那么可以考虑使用预渲染。预渲染与服务端渲染类似，但它只在构建时生成特定路由的静态HTML文件，而不是每次请求都进行服务端渲染。这种方法简单易行，适合那些不需要频繁更新的页面。

3. **Meta标签管理**：确保每个页面都有正确的meta标签，这对于SEO至关重要。你可以使用vue-meta等插件来动态管理标题、描述和其他meta信息，使其能够根据不同的路由或状态自动更新。

4. **合理利用Link组件**：在Vue Router中使用`<router-link>`组件代替普通的`<a>`标签可以帮助你更有效地管理内部链接，从而有利于SEO。

5. **提升页面加载速度**：快速加载的页面不仅改善用户体验，也对SEO有正面影响。可以通过代码分割、懒加载非关键资源等方式减少初始加载时间。

6. **创建Sitemap**：为你的Vue应用创建一个XML Sitemap，并提交给搜索引擎，以帮助它们更好地发现和索引你的网站内容。

7. **结构化数据标记**：使用JSON-LD格式添加结构化数据标记，可以帮助搜索引擎理解页面上的内容类型（如产品、文章等），从而可能在搜索结果中显示更丰富的摘要。

8. **避免重复内容**：确保你的URL设计不会导致相同内容出现在多个不同的URL上。如果存在这种情况，应该设置适当的301重定向或使用canonical标签指定首选版本。

结合以上策略，您可以有效地提高基于Vue的应用程序的SEO表现。不过，请记住SEO是一个持续的过程，需要不断地监控和调整策略以适应搜索引擎算法的变化。

:::

### ✅Vue2 vs Vue3

::: details 详解

#### ✅ 1. **组合式 API vs 选项式 API**

* **Vue2** 使用 Options API（如 `data`、`methods`、`computed` 等）组织代码，逻辑分散，不易复用。
* **Vue3** 引入了 Composition API（如 `setup()`、`ref`、`reactive`、`watch` 等），更灵活，更适合逻辑复用和大型项目的维护。

***

#### ✅ 2. **性能优化**

* **更快的虚拟 DOM**：Vue3 重写了虚拟 DOM，实现更快的 diff 算法。
* **编译优化**：静态提升、事件缓存等机制使渲染更高效。
* **Tree-shaking 支持**：Vue3 使用 ES Module 编写，可以按需引入，减小打包体积。

***

#### ✅ 3. **响应式系统升级**

* **Vue2** 使用 `Object.defineProperty`，不支持对数组、新增属性的完全监测。
* **Vue3** 改用 `Proxy` 实现响应式，更彻底、性能更好，支持更复杂的数据结构。

***

#### ✅ 4. **Fragment / Teleport / Suspense 支持**

* **Fragment**：Vue3 组件可以返回多个根节点，Vue2 不支持。
* **Teleport**：可以将组件渲染到 DOM 的任意位置，适合弹窗等场景。
* **Suspense**：用于异步组件的加载状态处理，配合 `<script setup>` 更加简洁。

***

#### ✅ 5. **TypeScript 支持更好**

* Vue3 是用 TypeScript 重写的，原生支持类型推导和开发体验，Vue2 对 TypeScript 支持较弱。

***

#### ✅ 6. **生命周期钩子不同**

* Composition API 下生命周期名称为 `onMounted`、`onUnmounted` 等，更接近函数语义。
* 而 Vue2 是 `mounted`、`destroyed` 等选项式 API。
* vue3中 beforeDestroy->onBeforeUnmounted, destroyed->onUnmounted
* beforeCreate、created 被语法糖 setup 替代
  :::

### ✅Vue3 组件通信与原理

::: details 详解

* 父子组件通信
  * props/emit
  * ref获取子组件实例的属性和方法
  * ref 和 expose
    * 使用 ref 可以让你直接访问组件实例或 DOM 元素。结合 defineExpose 函数，可以在组合式 API 中暴露特定的方法或属性给父组件使用
* 跨组件通信
  * mitt（第三方插件）
  * Provide/Inject
* 全局状态管理
  * Pinia (推荐)
    :::

### ✅Vue 路由实现原理

::: details 详解

* Hash 路由：通过 URL 的 # 后面的字符变化实现路由，不触发页面刷新。
* History 路由：使用 HTML5 的 pushState 和 replaceState 方法，URL 更美观，但需要服务器配置支持。
  :::
* Vue keep-alive 原理
  ::: details 详解

#### 简述

`Vue` 中的 `keep-alive` 是一个**抽象组件**，用于**缓存组件状态**，避免组件重复创建和销毁。它在开发中常用于优化性能，特别是在组件切换频繁的场景下，比如标签页切换、路由组件缓存等。

#### 一、Vue keep-alive 的作用

`<keep-alive>` 的作用是：

* **缓存动态组件**（使用 `<component :is="xxx">`）
* **缓存路由组件**（结合 Vue Router 的 `router-view` 使用）

当组件被包裹在 `<keep-alive>` 中时：

* 首次渲染时正常创建组件；
* 组件切换时不会被销毁，而是被缓存；
* 再次显示时直接复用缓存的状态，不会重新执行 `created`、`mounted` 等生命周期钩子。

***

#### 二、Vue keep-alive 的实现原理（以 Vue 2 和 Vue 3 为例）

##### 1. 核心机制

`<keep-alive>` 是一个**抽象组件**，它不会渲染成一个真实的 DOM 节点，而是作为一个组件缓存的控制器。

它内部维护一个缓存对象（`cache`），用于保存已经被创建过的组件实例。当组件需要显示时，优先从缓存中取出，而不是重新创建。

***

##### 2. 生命周期钩子（Vue 2 & Vue 3）

使用 `<keep-alive>` 缓存的组件，会多出两个生命周期钩子：

* `activated`：组件被激活时调用（从缓存中恢复）
* `deactivated`：组件被停用时调用（放入缓存）

这两个钩子可以用于执行一些组件激活/停用时的逻辑（如数据刷新、计时器清除等）。

***

##### 3. 缓存控制（include / exclude / max）

`<keep-alive>` 支持以下属性来控制缓存行为：

| 属性名 | 说明 |
|--------|------|
| `include` | 字符串或正则，只有匹配的组件会被缓存 |
| `exclude` | 字符串或正则，匹配的组件不会被缓存 |
| `max`     | 最大缓存组件数量，超出后采用 LRU 算法清除 |

示例：

```vue
<keep-alive>
  <component :is="currentComponent" v-if="currentComponent" />
</keep-alive>
```

或者结合路由：

```vue
<keep-alive>
  <router-view v-if="$route.meta.keepAlive" />
</keep-alive>
<router-view v-if="!$route.meta.keepAlive" />
```

***

#### 4. Vue 2 与 Vue 3 的差异

##### Vue 2 实现简述：

* `keep-alive` 是一个内置组件，通过 `vnode.componentInstance` 来获取和复用组件实例。
* 缓存结构为对象：`{ key: vnode }`
* 切换时根据组件名判断是否命中缓存。
* 使用 `v-if` 控制组件显示，避免多个组件同时渲染。

##### Vue 3 实现简述（Vue 3 Composition API）：

* 依然使用 `keep-alive` 组件，但内部实现更加优化。
* 支持更复杂的组件树缓存。
* 使用 `LRU` 缓存策略（最近最少使用）来控制缓存大小。
* 支持异步组件缓存。
* 使用 `ShapeFlags` 和 `PatchFlags` 提升性能。

***

#### 三、源码层面的简要实现逻辑（Vue 3 伪代码）

```ts
const KeepAlive = {
  __isKeepAlive: true,
  props: ['include', 'exclude', 'max'],
  setup(props, { slots }) {
    const cache = new Map(); // 缓存组件实例
    const keys = []; // 缓存键列表，用于 LRU 管理

    const pruneCache = () => {
      // LRU 清理策略
      if (props.max && cache.size > props.max) {
        const oldestKey = keys.shift();
        cache.delete(oldestKey);
      }
    };

    return () => {
      const vnode = slots.default();
      const comp = vnode.type;

      if (props.include && !matches(props.include, comp.name)) {
        return vnode; // 不满足 include，不缓存
      }

      if (props.exclude && matches(props.exclude, comp.name)) {
        return vnode; // 满足 exclude，不缓存
      }

      const key = vnode.key == null ? comp : vnode.key;

      if (cache.has(key)) {
        // 缓存命中，复用组件实例
        vnode.componentInstance = cache.get(key).componentInstance;
        invokeHook(vnode, 'activated');
      } else {
        // 首次创建，加入缓存
        cache.set(key, vnode);
        keys.push(key);
      }

      pruneCache(); // 控制缓存大小

      return vnode;
    };
  }
};
```

> 注意：上面是简化版的伪代码，实际 Vue 源码中会涉及更多细节，比如组件卸载、组件状态管理、异步组件处理等。

***

#### 四、使用场景

1. **Tab 切换组件**：保持每个 Tab 的状态
2. **路由组件缓存**：比如后台管理系统中，用户希望切换回上一个页面时保留其状态
3. **高频切换组件**：减少重复渲染开销

#### 五、注意事项

* `keep-alive` 只对组件起作用，不能直接包裹 HTML 元素。
* `keep-alive` 不能和 `v-for` 一起使用（因为 `v-for` 优先级高于 `keep-alive`）。
* `activated` 和 `deactivated` 是 `keep-alive` 独有的生命周期钩子。
* 使用 `max` 属性时要注意 LRU 缓存策略的影响。

#### 六、总结

| 特性 | 描述 |
|------|------|
| 类型 | 抽象组件 |
| 目的 | 缓存组件状态，提高性能 |
| 生命周期 | `activated`、`deactivated` |
| 控制方式 | `include`、`exclude`、`max` |
| 适用场景 | 组件切换频繁、需要保留状态的场景 |

:::

### ✅Vue computed 原理

::: details 详解
Vue 的 `computed` 属性实现的核心在于`依赖追踪`和`响应式系统`。简要来说，其实现原理包括以下几个关键点：

* 1. **依赖收集**：当一个计算属性（computed property）被访问时，Vue 会自动追踪在这个过程中哪些响应式数据（reactive data）被访问了。这是通过 Vue 的响应式系统来完成的，该系统会在读取响应式数据时进行依赖收集。

* 2. **缓存机制**：计算属性的结果会被缓存起来，并且只有在其依赖的数据发生变化时才会重新计算。这意味着如果相关依赖未发生改变，多次访问同一个计算属性将会立即返回缓存的结果，而不会重复执行计算逻辑。

* 3. **响应更新**：一旦某个计算属性所依赖的数据发生了变化，Vue 就会知道需要重新计算这个计算属性的值，并更新相应的视图。这种更新是自动的，开发者不需要手动干预。

* 4. **惰性求值**：计算属性采用惰性求值策略，即仅在访问计算属性时才执行计算逻辑，而不是在定义时就立即执行。这样可以避免不必要的计算，提高性能。

综上所述，Vue 的 `computed` 利用了依赖追踪、缓存机制以及响应式更新等特性，使得它能够高效地管理复杂状态逻辑，同时简化了代码的编写和维护工作。
:::

### ✅vue3 watch vs watchEffect

::: details 详解

#### `watch`

`watch` 更加直接，它允许你监听一个特定的数据源，并在数据源发生变化时执行回调函数。你可以监听响应式对象、引用（ref）、计算属性（computed）等。

* **特点**：
  * 需要明确指定要监听的数据源。
  * 可以访问监听数据变化前后的值。
  * 默认情况下是惰性的，即只有当被监听的数据变化时才会触发回调。
  * 支持深度监听对象的变化。

* **适用场景**：
  * 当你需要对特定的数据进行监听并做出反应时非常有用。
  * 如果需要比较新旧值来决定是否执行某些逻辑。

#### `watchEffect`

`watchEffect` 则自动收集依赖，它会立即执行传入的函数，并追踪函数内部所有响应式数据的访问。当这些响应式数据中的任何一个发生变化时，`watchEffect` 就会重新运行。

* **特点**：
  * 自动收集依赖项，无需显式指定监听哪些数据。
  * 不提供访问变化前的数据值的方式。
  * 立即执行一次以收集依赖，然后在依赖变更时重新运行。
  * 适合用于副作用管理，比如数据获取、更新DOM等。

* **适用场景**：
  * 当你想要根据多个响应式数据的变化自动重新执行某些逻辑时很有用。
  * 对于不需要比较前后状态，只需要在相关响应式数据变化时执行某些操作的情况。

#### 总结

* 使用 `watch` 当你需要对特定数据的变化作出响应，并且可能需要访问该数据变化前后的值。
* 使用 `watchEffect` 当你需要基于多个响应式数据的状态自动执行某些操作，并且不关心之前的状态。

:::

### ✅Vue SSR 和 SSG 的实现原理

::: details 详解
Vue 的 SSR（Server-Side Rendering，服务端渲染）和 SSG（Static Site Generation，静态站点生成）是两种不同的预渲染技术，旨在提高首屏加载速度、SEO效果以及用户体验。下面分别介绍这两种技术的实现原理。

#### Vue SSR 实现原理

SSR 指的是在服务器端完成页面的 HTML 结构生成，然后将这个结构发送到客户端，客户端直接展示已经渲染好的页面，之后再下载 JavaScript 文件来接管页面交互。其主要流程如下：

1. **入口文件分离**：需要为服务端和客户端分别创建入口文件。服务端入口文件负责服务端渲染逻辑，而客户端入口文件负责挂载应用并处理交互。
2. **服务端渲染**：在接收到请求时，服务器根据请求的数据动态地渲染出对应的HTML字符串，并将其返回给客户端。
3. **同构/通用代码**：为了能够同时运行在服务器和服务端，代码需要保持一定的同构性，比如使用Vue.js的组件可以在两端复用。
4. **数据预取**：由于是在服务端进行渲染，因此需要一种机制来确保在渲染之前获取必要的数据。这通常通过`asyncData`或类似的钩子函数来实现，在渲染前异步获取数据。
5. **客户端激活**：当带有已渲染内容的HTML到达客户端后，Vue会对其进行“激活”，即绑定事件处理器等，让页面变为一个完整的单页应用。

#### Vue SSG 实现原理

SSG 是预先构建所有页面为静态HTML文件的过程，这些页面可以部署在任何静态文件服务器上。它适合于内容变化不频繁的网站。其核心思想是：

1. **构建时渲染**：在构建阶段，根据路由配置及可能的数据源，提前渲染所有的页面为静态HTML文件。
2. **静态资源输出**：除了HTML文件外，还会生成相关的JavaScript、CSS等资源文件。
3. **部署灵活性**：生成的静态文件可以直接部署到任何静态托管服务上，如Netlify、Vercel等，无需专门的服务器端环境支持。
4. **数据更新策略**：对于部分内容需要动态更新的情况，可以通过API调用或增量生成等方式来解决。一些框架也提供了重新生成部分页面的能力。

#### 区别与联系

* SSR 更加动态，适用于需要实时数据更新的场景；而 SSG 更适合内容相对固定的网站，如博客、文档等。
* SSG 通过预先生成静态页面提高了访问速度，降低了服务器负载；SSR 则提供了一种方式来在服务端动态生成每个请求的HTML，有利于SEO和首次加载性能。

无论是 SSR 还是 SSG，它们的目的都是为了优化用户的初次加载体验，并改善搜索引擎的抓取效率。选择哪种方案取决于具体的应用场景和需求。

#### SSR SEO

在使用 SSR（Server-Side Rendering，服务端渲染）时，SEO（搜索引擎优化）的处理主要依赖于服务器能够在页面请求时直接生成完整的HTML内容，这使得搜索引擎爬虫能够像普通用户一样获取到完全加载的网页内容。以下是一些关键点和最佳实践，用于确保你的 SSR 应用程序具有良好的 SEO 表现：

##### 关键点

1. **正确的Meta标签**：确保每个页面都有合适的`<title>`和`<meta>`描述标签，这些对于SEO至关重要。利用Vue的SSR功能动态地为每个页面设置这些标签。

2. **预渲染重要数据**：在服务端渲染过程中，尽可能预先加载和渲染页面所需的数据。这不仅提升了用户体验，也确保了搜索引擎抓取工具可以访问完整的内容。

3. **URL结构优化**：保持简洁、有意义的URL结构。避免使用复杂的查询参数，尽量采用语义化的路径来提高搜索引擎的友好度。

4. **Sitemap和Robots.txt文件**：创建一个XML格式的站点地图，并通过robots.txt文件告诉搜索引擎哪些页面应该被索引，哪些不应该。这对于指导搜索引擎爬虫工作非常重要。

5. **Open Graph和Twitter Cards**：为了提升社交媒体分享的效果，添加Open Graph协议元标签和Twitter Cards标记，这样当你的页面被分享到社交网络时，会显示吸引人的卡片视图。

6. **响应式设计**：确保网站在各种设备上都能良好显示。随着移动优先索引策略的普及，拥有响应式设计的网站将更受搜索引擎青睐。

7. **性能优化**：尽管SSR有助于首次加载时间，但仍然需要关注其他性能因素，如图片优化、代码分割等，以进一步改善页面加载速度和用户体验。

8. **结构化数据（Schema Markup）**：使用结构化数据可以帮助搜索引擎更好地理解你的网页内容，从而可能获得丰富的搜索结果展示（如评分、价格等信息）。

##### 实践建议

* 在Vue应用中使用`vue-meta`库管理页面的头部信息，它允许你在组件内部方便地设置meta标签。
* 定期检查Google Search Console或其他类似工具提供的反馈，了解你的网站在搜索引擎中的表现，并根据反馈进行调整。
* 考虑使用渐进式Web应用（PWA）技术来增强用户体验，同时也有助于SEO。

通过上述措施，你可以最大化地发挥SSR在SEO方面的潜力，确保你的网站不仅对用户友好，也能很好地适应搜索引擎的需求。
:::

### ✅vue2和 vuex3渲染器的 diff算法

::: details 详解
Vue 2 和 Vue 3 在渲染机制和 diff 算法方面有着显著的不同，这些改进旨在提高性能和开发体验。

#### Vue 2 的 Diff 算法

Vue 2 使用的是基于 Snabbdom 的虚拟 DOM 实现。其核心 diff 算法主要包括以下几点：

1. **同层级比较**：Vue 2 在进行 diff 操作时，仅在同一层级上进行节点的比较，这意味着它不会跨层级去寻找节点的变化。
2. **Patch VNode**：当新旧 VNode（虚拟节点）树对比时，Vue 2 会尝试以最小的代价更新实际 DOM。如果节点类型相同，则复用并更新；如果不同，则创建新的 DOM 节点替换旧的。
3. **Key 属性**：通过为列表中的每个元素指定一个 `key` 属性，Vue 可以更准确地识别哪些元素被添加、移除或重新排序，从而优化重绘和重排。

#### Vue 3 的 Diff 算法改进

Vue 3 对渲染器和 diff 算法进行了多项优化，包括但不限于：

1. **静态树提升**：Vue 3 引入了静态树提升的概念，能够检测到不依赖于状态的静态部分，并在初次渲染后将这部分标记为静态。这意味着在后续的状态更新中，Vue 不需要对静态部分进行 diff 操作，从而提高了性能。

2. **静态属性提升**：与静态树类似，Vue 3 还可以对组件内的静态属性进行提升，减少不必要的属性比对。

3. **优化的 Patch Flag**：Vue 3 使用了更为精细的 patch flag 来标记动态绑定的部分，这样在更新过程中只需关注这些动态部分，而不是整个模板，这极大地减少了需要 diff 的内容量。

4. **Fragment 和多根节点支持**：Vue 3 支持 Fragment（片段），允许组件拥有多个根节点。这不仅简化了某些 UI 结构的设计，而且在 diff 算法上也做了相应的优化以支持这种结构。

5. **更高效的编译器**：Vue 3 的编译器更加智能，能生成更高效的代码，尤其是在处理条件渲染和列表渲染时，能够更好地利用上述优化技术。

总的来说，Vue 3 相对于 Vue 2，在 diff 算法和渲染逻辑上有了显著的改进，使得应用在保持简洁的同时还能获得更好的性能表现。这些改进帮助开发者构建更高效的应用程序，同时也提升了用户体验。
:::

### ✅Vue nextTick

::: details 详解

#### nextTick 的作用是什么？他的实现原理是什么

`nextTick` 是一个在多个前端框架（如 Vue.js）中使用的方法，主要用于在下次 DOM 更新循环结束之后执行延迟回调。它的主要作用是在数据变化后等待 DOM 更新完成，然后执行指定的回调函数。

#### 作用

当你修改了某些数据时，Vue 不能立即更新 DOM 以反映这些更改。它会在当前事件循环“tick”结束之后、新的渲染发生之前，将所有待处理的 DOM 更新刷新。使用 `nextTick` 可让你在 DOM 更新完成后执行代码。

例如，如果你需要在状态更新后立即操作新渲染的 DOM 元素，可以使用 `nextTick` 来确保 DOM 已经更新：

```javascript
// 修改数据
this.message = 'changed';

// 在 DOM 更新后执行
this.$nextTick(function() {
  // 操作更新后的 DOM
});
```

#### 实现原理

`nextTick` 的实现依赖于环境。在浏览器环境中，它会尝试使用以下几种方式来安排回调函数的执行，按优先级顺序如下：

1. **Promise**：如果环境支持 Promise，则使用 Promise.resolve().then(callback) 安排回调。
2. **MutationObserver**：对于不支持 Promise 但支持 MutationObserver 的旧版浏览器，Vue 使用 MutationObserver 来调度微任务。
3. **setImmediate**：这是一个仅在 IE 中可用的方法，用于安排宏任务。
4. **setTimeout**：作为最后的选择，使用 setTimeout(callback, 0) 来安排回调。

通过这种方式，`nextTick` 能够尽可能地利用现代浏览器提供的高效异步执行机制，保证回调函数在当前调用栈清空且 DOM 渲染完毕之后尽快执行。这种机制使得 `nextTick` 成为一种非常有效的方式，可以在数据变更导致的 DOM 更新完成后进行后续操作。
:::

* Vue complier 的实现原理
  ::: details 详解
  Vue 编译器（Vue Compiler）负责将 Vue 单文件组件（SFC, Single File Component）或模板字符串转换为渲染函数（render function），以便在浏览器中执行。这个过程大致可以分为两个阶段：**编译时（compile time）** 和 **运行时（runtime）**。下面简要介绍 Vue 编译器的工作原理，主要关注 Vue 2 和 Vue 3 的一些关键差异和改进。

#### Vue 2 编译器工作原理

1. **解析（Parse）**：首先，Vue 2 编译器会将模板字符串解析成抽象语法树（AST）。这个过程包括识别模板中的文本、元素、属性、指令等，并将其结构化表示出来。

2. **优化（Optimize）**：在这个阶段，Vue 会对生成的 AST 进行静态分析，标记出静态节点和动态节点。静态节点是指那些内容不会随应用状态变化而改变的节点。通过这种方式，Vue 可以跳过对静态节点的重新渲染，从而提高性能。

3. **代码生成（Generate）**：最后一步是根据优化后的 AST 生成渲染函数。这些函数会在运行时被调用，用来创建虚拟 DOM 树，并最终更新实际的 DOM。

#### Vue 3 编译器的新特性与改进

Vue 3 对编译器进行了多项改进，主要包括：

* **更高效的静态提升**：Vue 3 改进了静态树提升技术，能够更好地识别和处理静态部分，减少不必要的 diff 操作，进一步提升了渲染性能。

* **更好的分支预测**：Vue 3 引入了更智能的分支预测机制，能够在编译时对条件渲染进行优化，使得运行时的决策更加高效。

* **编译时静态分析增强**：Vue 3 编译器增强了对模板的静态分析能力，能够识别更多类型的静态内容，减少了需要在运行时处理的内容量。

* **支持自定义指令的优化**：Vue 3 允许开发者编写可被编译器优化的自定义指令，提高了灵活性。

* **更快的渲染函数生成**：Vue 3 在代码生成阶段引入了新的算法和技术，使得生成的渲染函数更加简洁高效。

总的来说，Vue 编译器的工作就是将开发人员书写的模板或 JSX 转换成高效的 JavaScript 渲染逻辑。Vue 3 相对于 Vue 2，在编译效率、输出质量和性能优化方面都有显著的进步，这使得使用 Vue 构建的应用程序能够获得更好的用户体验。同时，Vue 3 的编译器设计也更加模块化，便于未来功能的扩展和性能的持续优化。
:::

### ✅Vue 中的 Key

::: details 详解
在 Vue 中，`key` 是一个特殊的属性，用于给每个节点提供一个唯一的标识。Vue 使用 `key` 来追踪节点的身份，以便更高效地更新虚拟 DOM。以下是关于 `key` 属性的详细解释：

#### 为什么需要 key？

1. **高效的DOM操作**：当数据项的顺序发生变化时，Vue 默认会尝试复用现有的 DOM 元素来提高效率。然而，在某些情况下（例如列表渲染），这种默认行为可能会导致问题。通过为每个元素提供一个唯一的 `key` 值，Vue 可以准确地识别哪些元素被添加、删除或重新排序，从而更智能地决定如何更新 DOM。

2. **避免不必要的重渲染**：使用 `key` 后，Vue 可以更好地判断哪些组件或元素实际上需要重新渲染，而不是盲目地认为所有东西都需要更新。这有助于提升性能，特别是在处理大型列表或表格时尤为重要。

#### 如何使用 key？

* 在 Vue 的模板中，`key` 特性通常应用于 `v-for` 指令生成的元素上。例如：
  ```vue
  <ul>
    <li v-for="item in items" :key="item.id">{{ item.name }}</li>
  </ul>
  ```
  这里，我们假设 `items` 数组中的每个对象都有一个唯一的 `id` 属性，这样可以确保每个 `<li>` 元素都有一个独一无二的 `key`。

#### 注意事项

* **唯一性**：虽然 `key` 不一定在整个应用中都是唯一的，但在它所在的上下文中应该是唯一的。比如在一个 `v-for` 循环内部，所有的 `key` 应该是不同的。

* **稳定性**：理想情况下，`key` 应该是稳定、可预测且唯一的。如果 `key` 不稳定（例如基于随机值或者数组索引），Vue 将无法有效地追踪元素身份，可能导致不必要的组件销毁和重建，影响性能。

* **不要使用数组索引作为 key**：除非你有特别的理由这样做，否则尽量避免使用数组索引作为 `key`，因为在项目被重新排序或新增/删除时，这会导致意外的行为。相反，应该尽可能使用数据中稳定的、唯一的标识符。

总之，正确使用 `key` 对于优化 Vue 应用的性能至关重要。它不仅帮助 Vue 更加智能地进行 DOM 操作，还能避免一些潜在的错误和性能瓶颈。
:::

### ✅ref 和 reactive 的区别

::: details 详解
在 Vue 3 中，`ref` 和 `reactive` 是 Composition API 提供的两个核心响应式函数，它们用于创建不同类型的响应式数据。

#### `ref`

* **定义**：`ref` 用于创建一个包含值的响应式引用对象。这个引用对象是一个容器，它有一个 `.value` 属性来存取实际的值。

* **适用场景**：适用于基本类型数据（如字符串、数字等）或需要跨组件层级传递的数据。由于 `ref` 返回的是一个对象，因此它可以很好地处理 JavaScript 的值传递机制，尤其是在函数参数和返回值中使用时。

* **用法示例**：
  ```javascript
  import { ref } from 'vue';

  const count = ref(0);
  console.log(count.value); // 输出: 0
  count.value++;
  ```

#### `reactive`

* **定义**：`reactive` 接受一个普通对象然后返回该普通对象的响应式代理。本质上是对对象进行深度监听，使对象中的所有属性都成为响应式的。

* **适用场景**：最适合于复杂的数据结构，比如对象或者数组。当你需要对整个对象进行响应式追踪而不是单一值时，`reactive` 是更合适的选择。

* **用法示例**：
  ```javascript
  import { reactive } from 'vue';

  const state = reactive({
    count: 0
  });
  console.log(state.count); // 输出: 0
  state.count++;
  ```

#### 主要区别

1. **数据类型**：`ref` 可以用来包装任何类型的值，包括原始类型和对象；而 `reactive` 主要用于对象（包括数组和集合），不能直接应用于原始类型。

2. **访问方式**：`ref` 创建的数据需要通过 `.value` 来访问或修改其值；而 `reactive` 直接操作对象属性即可，不需要额外的语法。

3. **解构与传播**：解构 `reactive` 对象不会保持响应性，而 `ref` 在某些情况下可以通过解构保持响应性（例如在 `<script setup>` 中自动解开）。此外，`ref` 可以作为 prop 传递并在子组件中使用 `.value` 访问，这使得它非常适合用于组件间通信。

4. **性能考虑**：由于 `reactive` 对对象的所有嵌套层次进行深度监听，可能会带来一定的性能开销；相比之下，`ref` 只监听顶层的值变化，可能在特定场景下提供更好的性能表现。

理解何时使用 `ref` 和 `reactive` 是掌握 Vue 3 Composition API 的关键之一。根据你的具体需求选择合适的工具可以让你的应用更加高效且易于维护。

#### 实现原理

在 Vue 3 中，`ref` 和 `reactive` 是 Composition API 的两个重要函数，用于创建响应式数据。它们的底层实现基于 ES6 的 `Proxy` 对象，但各自有不同的机制来实现响应式行为。

#### `reactive` 的底层实现原理

* **Proxy 对象**：`reactive` 函数通过将传入的对象转换为一个 `Proxy` 对象来实现响应式。`Proxy` 可以拦截对对象的基本操作（如获取属性、设置属性等），这使得 Vue 能够追踪依赖并在状态改变时通知相关的视图进行更新。

* **深度响应**：使用 `reactive` 创建的对象是深度响应式的，这意味着它会递归地将所有嵌套的对象都转换为 `Proxy` 对象，确保任何层级的变化都能被检测到并触发更新。

* **陷阱（Traps）**：`Proxy` 使用了多种陷阱（如 `get`, `set`, `deleteProperty` 等）来定义当执行这些操作时的行为。例如，在 `get` 操作中收集依赖，在 `set` 操作中触发更新。

##### `ref` 的底层实现原理

* **封装基本值**：与 `reactive` 不同，`ref` 主要用于包装基本数据类型（虽然也可以包装对象）。它返回的是一个包含 `.value` 属性的对象，这个对象本身不是响应式的，但其 `.value` 属性是响应式的。

* **触发更新**：当你修改 `ref` 包装的值（即修改 `.value` 属性）时，Vue 会检测到这一变化，并触发相应的更新。对于基本数据类型的 `ref`，Vue 通过访问器属性（getter 和 setter）来追踪变化。

* **自动解包**：在模板和某些特定的反应式上下文中（比如计算属性或侦听器），Vue 会自动解包 `ref`，使其可以直接使用而不需要显式地通过 `.value` 访问。但是，在 JavaScript 代码内部使用时，仍然需要手动访问 `.value`。

##### 总结

* **`reactive`** 利用 `Proxy` 提供深层次的响应式对象，适用于复杂的数据结构。
* **`ref`** 更加灵活，可以包装任意类型的值，特别是基本数据类型，并且通过访问器属性实现响应性。

两者都是 Vue 响应式系统的重要组成部分，但根据不同的需求选择合适的工具可以使你的应用更加高效和易于维护。
:::

* toRefs 和 toRaw 的区别
  ::: details 详解
  在 Vue 3 的 Composition API 中，`toRefs` 和 `toRaw` 是两个用于处理响应式数据的函数，但它们的作用和使用场景完全不同。了解这两者的区别对于有效地管理应用的状态非常重要。

#### `toRefs`

* **作用**：`toRefs` 函数将一个响应式对象转换为普通对象，其中该对象的每个属性都是指向原始响应式对象相应属性的 `ref`。这使得你可以轻松地从一个响应式对象中解构出响应式的属性，而不会失去其响应性。

* **适用场景**：当你需要将一个响应式对象的属性解构出来并在组件中使用时非常有用。这样可以确保即使在解构后，这些属性仍然保持响应式。

* **用法示例**：
  ```javascript
  import { reactive, toRefs } from 'vue';

  const state = reactive({
    name: 'Vue',
    version: 3
  });

  const { name, version } = toRefs(state);

  console.log(name.value); // 输出: Vue
  name.value += ' 3';
  ```

#### `toRaw`

* **作用**：`toRaw` 函数接受一个响应式对象（包括 `reactive` 或 `readonly` 创建的对象），并返回最初的普通对象。这是对原始数据的一个直接引用，而不是代理版本。

* **适用场景**：有时你可能需要访问原始对象来避免某些副作用或性能问题，比如当你想要绕过 Vue 的响应式系统进行一些非响应式的操作时。

* **用法示例**：
  ```javascript
  import { reactive, toRaw } from 'vue';

  const state = reactive({
    name: 'Vue',
    version: 3
  });

  const originalState = toRaw(state);
  originalState.name = 'Vue Original'; // 修改原始对象不会触发响应式更新
  ```

#### 区别总结

* **目的不同**：`toRefs` 主要用于将响应式对象的属性转化为独立的 `ref`，以便于解构使用同时保留响应性；而 `toRaw` 则是为了获取响应式对象背后的原始对象，适用于那些不需要响应性的场景或者希望直接操作原始数据的情况。

* **结果不同**：使用 `toRefs` 后的结果是包含 `ref` 属性的对象，这意味着你需要通过 `.value` 来访问和修改这些属性的值，并且任何改变都会被 Vue 的响应式系统追踪。相反，`toRaw` 返回的是原始对象本身，对其所做的更改不会触发 Vue 的响应式更新机制。

理解这两个函数的区别有助于更高效、正确地管理和操作 Vue 应用中的状态。根据具体的需求选择合适的工具，可以帮助你编写更加清晰、高效的代码。
:::

## React 框架

### ✅React 框架原理

::: details 详解
在准备前端面试时，了解 React 框架的原理是非常重要的。以下是一些关键概念和原理，可以帮助你更好地理解 React，并在面试中展示你的知识。

#### 1. 虚拟DOM（Virtual DOM）

React 使用虚拟DOM来提高应用的性能。虚拟DOM是一个内存中的轻量级副本，反映了真实DOM的状态。当状态发生变化时，React首先更新虚拟DOM，然后通过差异算法（Diffing Algorithm）比较新旧两棵虚拟DOM树的不同，只将必要的变更应用到实际的DOM上，从而减少直接操作DOM的次数。

#### 2. 单向数据流

React 实现了单向数据流的概念，这意味着数据只能在一个方向上传播：从父组件流向子组件。这种模式简化了数据流的跟踪，使得调试更加容易，同时也让应用更容易理解和维护。

#### 3. 组件化

React 强调组件化的开发思想，鼓励开发者将UI拆分成独立、可复用的组件。每个组件都有自己的状态和属性（props），并能够根据这些数据渲染出相应的视图。

#### 4. JSX

JSX是一种JavaScript的语法扩展，它看起来很像HTML，但允许你在JavaScript代码中书写类似于HTML的结构。JSX最终会被编译成纯JavaScript，这有助于更直观地创建React元素。

#### 5. Hooks

Hooks是React 16.8引入的新特性，它允许函数组件拥有类组件的大部分特性，比如状态管理（useState）、生命周期（useEffect）等，同时保持函数式的简洁性。使用Hooks可以让你避免复杂的嵌套层级，并且更方便地共享逻辑。

#### 6. Reconciliation（协调过程）

这是React用来决定何时以及如何更新DOM的过程。它基于一种称为“协调”的算法，该算法包括diff算法，用于比较前后两次渲染的结果，以确定需要对DOM进行哪些最小化的更改。
:::

## 样式与布局

### ✅Flex

::: details 详解
在前端开发中，`flex`（弹性盒子布局，Flexbox）是一种现代的、高效的 CSS 布局模型，特别适合用于一维布局（即行或列）。它简化了在不同屏幕尺寸和设备上对齐、分布和排列元素的方式，是响应式设计的重要工具。

#### 一、Flex 布局的基本概念

Flex 布局由 **容器（flex container）** 和 **项目（flex items）** 组成：

* **Flex 容器（Flex Container）**：通过设置 `display: flex` 或 `display: inline-flex` 的元素。
* **Flex 项目（Flex Items）**：容器的直接子元素。

```css
.container {
  display: flex;
}
```

***

#### 二、Flex 容器的主要属性

##### 1. `flex-direction`

定义主轴方向（即项目的排列方向）

```css
flex-direction: row | row-reverse | column | column-reverse;
```

* `row`（默认）：从左到右水平排列
* `row-reverse`：从右到左
* `column`：从上到下垂直排列
* `column-reverse`：从下到上

***

##### 2. `flex-wrap`

定义项目是否换行

```css
flex-wrap: nowrap | wrap | wrap-reverse;
```

* `nowrap`（默认）：不换行
* `wrap`：换行
* `wrap-reverse`：换行但方向相反

***

##### 3. `justify-content`

定义主轴上的对齐方式

```css
justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
```

* `flex-start`（默认）：左对齐
* `center`：居中
* `space-between`：两端对齐，项目之间间距相等
* `space-around`：项目周围间距相等

***

##### 4. `align-items`

定义交叉轴上的对齐方式（适用于所有项目）

```css
align-items: stretch | flex-start | flex-end | center | baseline;
```

* `stretch`（默认）：拉伸填满容器
* `center`：居中
* `flex-start`：顶部对齐
* `flex-end`：底部对齐

***

##### 5. `align-content`

多行项目在交叉轴上的对齐方式（仅在换行时生效）

```css
align-content: stretch | flex-start | flex-end | center | space-between | space-around;
```

***

#### 三、Flex 项目的主要属性

##### 1. `order`

定义项目的排列顺序，默认是 0，数值越小越靠前

```css
order: <integer>;
```

***

##### 2. `flex-grow`

定义项目的放大比例，默认为 0（不放大）

```css
flex-grow: 1; /* 项目将填满剩余空间 */
```

***

##### 3. `flex-shrink`

定义项目的缩小比例，默认为 1（空间不足时会缩小）

```css
flex-shrink: 0; /* 不缩小 */
```

***

##### 4. `flex-basis`

定义在分配多余空间之前，项目占据的主轴空间

```css
flex-basis: auto | <length>;
```

* `auto`：根据 width/height 属性决定大小
* 可以设置固定值如 `200px`

***

##### 5. `flex`（推荐使用简写）

```css
flex: <flex-grow> <flex-shrink> <flex-basis>;
```

常用简写：

* `flex: 1` → `flex: 1 1 0%`
* `flex: auto` → `flex: 1 1 auto`
* `flex: none` → `flex: 0 0 auto`

***

#### 四、常见应用场景（面试常问）

| 场景 | 解法 |
|------|------|
| 水平垂直居中 | `display: flex; justify-content: center; align-items: center` |
| 等宽等高布局 | 使用 `flex: 1` 或 `flex-grow: 1` |
| 响应式导航栏 | 使用 `flex-wrap: wrap` 配合媒体查询 |
| 自适应间距 | 使用 `gap` 属性（CSS Grid 也支持） |
| 左右结构（如页眉页脚） | 使用 `justify-content: space-between` |
:::

### ✅BFC

::: details 详解

#### **BFC 是什么？**

**BFC（Block Formatting Context）** 是 CSS 中的一个渲染概念，表示一个独立的布局环境。在这个环境中，内部的元素按照特定规则进行布局，与外部元素互不影响。

***

#### **BFC 的作用：**

1. **清除浮动影响**：父元素创建 BFC 后，可以包含内部浮动元素，避免高度塌陷。
2. **阻止外边距合并（Margin Collapse）**：两个相邻块级元素的上下 margin 不会合并。
3. **防止文字环绕浮动元素**：文本内容会自动避开浮动元素，保持清晰布局。

***

#### **如何创建 BFC？**

满足以下任意条件即可创建 BFC：

* 根元素（`<html>`）
* `float` 不为 `none`
* `position` 为 `absolute` 或 `fixed`
* `display` 为 `inline-block`、`table-cell`、`flex`、`grid`、`flow-root` 等
* `overflow` 不为 `visible`（如 `hidden`、`auto`）

***

#### **总结一句话：**

**BFC 是一个独立的布局区域，用于控制元素内部和外部的布局行为，常用于清除浮动、防止 margin 合并等问题。**

:::

* 两边固定宽度中间自适应方案
  ::: details 详解
* 方法一：使用 Flexbox

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
.container {
  display: flex;
  flex-wrap: wrap; /* 当空间不足时换行 */
}

.column {
  flex: 1; /* 允许子元素增长以填充可用空间 */
  min-width: 200px; /* 设置最小宽度 */
  margin: 10px;
  background-color: lightblue;
}
</style>
</head>
<body>

<div class="container">
  <div class="column">Column 1</div>
  <div class="column">Column 2</div>
  <div class="column">Column 3</div>
</div>

</body>
</html>
```

优点：简洁、现代、响应式友好。

缺点：不支持 IE8 及以下浏览器。

* 方法二：使用 CSS Grid 布局

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px; /* 列之间的间距 */
}

.column {
  background-color: lightgreen;
}
</style>
</head>
<body>

<div class="container">
  <div class="column">Column 1</div>
  <div class="column">Column 2</div>
  <div class="column">Column 3</div>
</div>

</body>
</html>
```

优点：更直观地定义列宽。

缺点：兼容性略差于 Flexbox（但现代浏览器都支持）。

* 方法三：浮动 + margin（传统方法）

```html
<style>
  .container {
    overflow: hidden; /* 清除浮动 */
  }
  .left {
    float: left;
    width: 200px;
    background-color: lightblue;
  }
  .right {
    float: right;
    width: 200px;
    background-color: lightblue;
  }
  .center {
    margin-left: 200px;
    margin-right: 200px;
    background-color: lightcoral;
  }
</style>

<div class="container">
  <div class="left">Left</div>
  <div class="right">Right</div>
  <div class="center">Center</div>
</div>
```

优点：兼容性较好，适用于旧浏览器。
缺点：结构顺序影响渲染顺序，中间内容在 HTML 中需放在最后。

* 方法四：绝对定位（慎用）

```html
<style>
  .container {
    position: relative;
    width: 100%;
  }
  .left {
    position: absolute;
    left: 0;
    width: 200px;
    background-color: lightblue;
  }
  .right {
    position: absolute;
    right: 0;
    width: 200px;
    background-color: lightblue;
  }
  .center {
    margin-left: 200px;
    margin-right: 200px;
    background-color: lightcoral;
  }
</style>

<div class="container">
  <div class="left">Left</div>
  <div class="center">Center</div>
  <div class="right">Right</div>
</div>
```

优点：可以灵活控制位置。

缺点：脱离文档流，可能导致高度塌陷，维护困难。
:::

## 构建工具及工程化

### ✅Webpack 的构建流程

::: details 详解

#### Webpack 是什么

Webpack 是一个模块打包工具，它的核心功能是将项目中的各种资源（如 JavaScript、CSS、图片等）视为模块，并通过一系列流程将它们打包成优化后的静态资源。Webpack 的构建流程可以分为以下几个主要阶段：

##### 一、初始化（Initialization）

1. **解析配置文件**：
   * Webpack 启动时会读取 `webpack.config.js` 或其他指定的配置文件。
   * 配置包括入口（entry）、输出（output）、加载器（loader）、插件（plugin）等。

2. **创建 Compiler 对象**：
   * Webpack 根据配置创建一个 `Compiler` 实例。
   * 这个对象控制整个构建流程，管理所有插件和选项。

***

##### 二、编译（Compilation）

3. **执行 `run` 方法**：
   * 开始构建过程，触发 `beforeRun` 和 `run` 生命周期钩子。

4. **确定 Entry 入口文件**：
   * Webpack 从 entry 指定的文件开始分析依赖关系。

5. **创建 Compilation 对象**：
   * `Compilation` 负责实际的模块构建和打包工作。
   * 它记录了本次构建的所有模块、资源、变化和错误信息。

6. **调用 Loader 解析模块**：
   * Webpack 会根据配置中 `rules` 匹配的规则，使用对应的 loader 对模块进行转换。
   * 例如：使用 `babel-loader` 将 ES6+ 转换为 ES5；使用 `css-loader` 处理 CSS 文件。

7. **递归构建依赖图谱（Dependency Graph）**：
   * Webpack 从入口文件出发，递归地分析每一个模块的依赖关系。
   * 构建出一个完整的依赖图谱（Dependency Graph），包含所有需要打包的模块。

8. **处理异步模块（Code Splitting）**：
   * 如果使用了动态导入（`import()`）或路由懒加载，Webpack 会创建额外的 chunk。

***

##### 三、优化（Optimization）

9. **执行优化策略**：
   * 合并重复模块（ModuleConcatenationPlugin）。
   * 去除无用代码（Tree Shaking）。
   * 分割代码（SplitChunksPlugin）。
   * 哈希命名（HashedModuleIdsPlugin）。
   * 插件可以在这一阶段介入，对 chunk 进行修改。

***

##### 四、生成资源（Emit Assets）

10. **生成最终的 bundle 文件**：
    * Webpack 将模块内容按照 chunk 组织成最终的文件结构。
    * 使用模板（mainTemplate、chunkTemplate 等）生成可执行的 JS 文件。

11. **调用插件写入资源**：
    * 所有资源（JS、CSS、图片等）准备好后，通过 `emit` 钩子通知插件进行最后的处理。
    * 例如：`HtmlWebpackPlugin` 会生成 HTML 文件并自动引入打包好的 JS/CSS。

***

##### 五、输出（Output）

12. **写入磁盘或内存（开发服务器）**：
    * 如果是生产环境，Webpack 会将资源写入到磁盘上的 `output.path` 目录。
    * 如果是开发环境（使用 `webpack-dev-server`），则资源保存在内存中，不写入磁盘。

13. **完成构建**：
    * 触发 `done` 钩子，表示一次完整的构建流程结束。

***

#### 总结图示

```
初始化
  ↓
创建 Compiler
  ↓
读取配置 & 创建 Compilation
  ↓
从 Entry 开始解析模块、调用 Loader
  ↓
递归构建依赖图谱
  ↓
优化模块（Tree Shaking、SplitChunks）
  ↓
生成 Chunk & 最终 Bundle
  ↓
插件处理输出资源（HtmlWebpackPlugin 等）
  ↓
输出到磁盘 / 内存
  ↓
完成构建（done）
```

***

#### 常见插件与生命周期钩子说明

| 阶段 | 插件作用 | 示例 |
|------|----------|------|
| 初始化 | 注册事件监听器 | `BannerPlugin` |
| 编译 | 分析模块、调用 loader | `BabelLoader` |
| 优化 | 拆分代码、去重、压缩 | `SplitChunksPlugin`, `TerserPlugin` |
| 输出 | 生成 HTML、清理目录 | `HtmlWebpackPlugin`, `CleanWebpackPlugin` |
:::

### ✅vite 的构建流程

::: details 详解
Vite 底层原理的理解

#### 🧠 总览：

> Vite 构建流程分为 **开发模式构建流程** 和 **生产模式构建流程**，两者分别侧重于 **快速启动+按需加载** 和 **打包优化+产物生成**。

#### 💻 一、开发模式构建流程（`vite dev`）

开发模式下 Vite 采用的是 **原生 ES 模块导入 + 按需加载 + 极速冷启动**，主要流程如下：

##### 1. 启动 Dev Server

* 启动 `createServer()`，使用 `koa` 或类似中间件架构。
* 加载配置（如 `vite.config.ts`），应用插件钩子（如 `config`, `configureServer` 等）。

##### 2. 模块解析与按需编译

* 拦截浏览器请求（如 `/src/main.ts`）
* 对 `.ts`、`.vue`、`.jsx` 等非 JS 资源做 **按需转译**，如调用 `esbuild` 转译 TS、JSX，或 `@vite/plugin-vue` 处理 Vue。
* 转换为浏览器能直接使用的 **ES Module**，返回给浏览器。

##### 3. HMR 热更新

* 基于 `WebSocket` 通信实现模块热更新。
* 修改某文件时，只重新编译该模块及其依赖，避免整体重载。
* 插件可以处理 `handleHotUpdate`，定制热更新行为。

##### ✅ 总结优点：

* 利用浏览器原生 ES 模块
* 冷启动快，按需编译
* 极致热更新体验（仅编译改动模块）

***

#### 📦 二、生产模式构建流程（`vite build`）

构建流程使用的是 **Rollup 作为打包器**，追求优化产物体积与执行性能：

##### 1. 加载配置与插件初始化

* 执行 `vite.config.ts` 并调用 `resolveConfig`
* 执行插件生命周期钩子（如 `config`, `buildStart`, `resolveId`, `transform`, `generateBundle`）

##### 2. 构建优化前处理

* 预构建（`optimizeDeps`）：对第三方依赖使用 `esbuild` 快速打包缓存
* 扫描入口文件，解析模块依赖图

##### 3. 调用 Rollup 打包

* 使用 `Rollup` 对模块进行解析、tree shaking、生成 chunk。
* 插件链与 Rollup 插件系统融合，如 `vite:vue`、`vite:css` 等。

##### 4. 生成产物（Assets）

* 支持代码分割、动态导入
* 支持 CSS 提取、资源 hash 命名、压缩
* 可配置 `base`、`publicDir`、`manifest`、`ssr` 等参数

#### 🧩 三、插件机制贯穿全流程

Vite 的插件系统兼容 Rollup 插件，同时扩展了自己的钩子：

| 阶段   | 常见插件钩子                                            |
| ---- | ------------------------------------------------- |
| 配置加载 | `config`, `configResolved`                        |
| 开发服务 | `configureServer`, `transform`, `handleHotUpdate` |
| 打包阶段 | `buildStart`, `transform`, `generateBundle`       |

***

##### 🗣 范例：

> Vite 的构建流程可以分为两种情况。开发模式下是基于原生 ES Module 的快速启动，通过 `esbuild` 实现按需编译和极快的热更新；生产构建时则基于 Rollup，利用插件机制完成模块打包、tree-shaking 和资源优化，产物更轻更快加载。整个过程中，Vite 通过统一的插件架构，兼容了 Rollup 插件，同时也提供了自己的扩展钩子，非常灵活。

***

#### ✅ 扩展

下面是你列出的五个 Vite 核心知识点的详细对比分析和答题模板，适合口述面试或系统学习参考：

***

#### ✅ 1. Vite 和 Webpack 的构建流程对比

##### 📌 核心区别：

| 项目      | Vite                        | Webpack               |
| ------- | --------------------------- | --------------------- |
| 构建模式    | 基于原生 ES Module，开发时按需加载      | 打包所有模块为一个/多个 Bundle   |
| 启动速度    | 快速冷启动（无需预构建全部模块）            | 冷启动慢（需构建依赖 + 应用代码）    |
| 模块处理    | 使用 esbuild 做转译（TS/JSX 等）    | 使用 Babel/Loader 转译    |
| HMR 热更新 | 精细模块热更新（仅更新改动模块）            | 依赖模块图重构，热更新成本更高       |
| 构建工具    | 开发：Vite + esbuild，生产：Rollup | 开发/生产：Webpack + Babel |
| 插件体系    | Rollup 插件体系为基础 + 自定义扩展      | Webpack 独立插件体系        |
| 编译效率    | esbuild（Go 编写，10-100x 快）    | Babel（JS 编写，慢）        |

##### 🗣 回答模板：

> Vite 与 Webpack 的最大区别在于“开发时不打包”。Vite 利用浏览器的原生 ES 模块能力，按需加载模块并用 esbuild 进行极速转译。而 Webpack 则是构建时整体打包，冷启动较慢。生产模式下 Vite 使用 Rollup 构建，侧重代码优化和体积压缩。

***

#### ✅ 2. Vite 如何加速开发和构建（如 esbuild vs babel）

##### 📌 加速方式：

1. **开发构建优化**：

   * 使用 `esbuild` 替代 Babel，进行 TS/JSX 快速转译（Go 编写，极快）
   * 只处理被请求的模块（按需编译）

2. **依赖预构建**：

   * 第三方库（如 `vue`, `lodash`）在开发启动时会用 esbuild 预构建到缓存中（`optimizeDeps`），避免频繁重新处理

3. **热更新（HMR）性能高**：

   * 模块级热更新，仅重编译/重载变更模块，无需整体刷新

4. **生产构建优化**：

   * 使用 Rollup 做 Tree-shaking 和代码分割
   * 支持 `esbuild` 做 minify（构建更快）

##### 🗣 模板：

> Vite 借助 esbuild 实现了飞快的开发构建，尤其在 TS、JSX 等场景下，构建速度远超 Babel。同时，通过依赖预构建、模块级热更新和 Rollup 的产物优化，实现了开发快、构建精的双重目标。

***

#### ✅ 3. vite-plugin 的编写流程与关键钩子

##### 📌 插件结构（和 Rollup 插件类似）：

```ts
export default function myPlugin(): Plugin {
  return {
    name: 'vite:my-plugin',
    enforce: 'pre', // 控制插件执行顺序 pre/post/默认
    config(config, env) {},           // 修改配置
    configResolved(resolvedConfig) {}, // 配置已解析
    transform(code, id) {},           // 转换模块
    resolveId(id, importer) {},       // 自定义模块路径解析
    load(id) {},                      // 自定义加载模块内容
    handleHotUpdate(ctx) {},          // 热更新处理
  }
}
```

##### 📌 关键钩子：

| 钩子名               | 说明         |
| ----------------- | ---------- |
| `config`          | 修改配置前处理    |
| `configResolved`  | 配置已加载后调用   |
| `transform`       | 转换模块内容（核心） |
| `resolveId`       | 自定义路径解析逻辑  |
| `load`            | 自定义模块加载    |
| `handleHotUpdate` | 自定义 HMR 行为 |

##### 🗣 模板：

> vite-plugin 与 Rollup 插件结构基本一致，同时支持开发中用于 HMR、自定义模块加载等高级钩子。常用钩子包括 `transform`（源码转换）、`handleHotUpdate`（自定义热更新逻辑）和 `resolveId`（路径解析），可以实现各种定制行为，如自动导入、组件注册等。

***

\######✅ 4. SSR 构建流程与 `vite-ssr` 插件

#### 📌 SSR 简介：

Vite SSR（Server-Side Rendering）是一种将页面在服务器上预先渲染为 HTML，再发送给客户端的模式，提升 SEO 和首屏加载。

#### 📌 SSR 构建流程：

1. **开发阶段（`vite.ssrLoadModule`）**

   * 使用原生模块导入加载 `App.vue`、路由等
   * 动态构建、无需打包
   * 每次请求可实时加载服务端入口

2. **生产构建阶段**

   * 使用 `vite build --ssr` 生成服务端产物
   * 客户端使用正常 `vite build`
   * `manifest.json` 用于 SSR 产物资源映射

3. **常用 SSR 工具**

   * `vite-ssr`：开箱即用的 Vite SSR 解决方案
   * `vite-plugin-ssr`：灵活可扩展、支持页面文件路由
   * `Nuxt 3`：Vue 生态完整 SSR 框架

#### 🗣 模板：

> Vite SSR 支持按需加载服务端模块，开发阶段使用 `vite.ssrLoadModule` 动态加载 Vue 组件。构建阶段则通过 `vite build --ssr` 输出 Node 可用模块，结合 `manifest.json` 实现客户端资源映射。使用 `vite-ssr` 插件可以更方便地管理路由和模板渲染。

***

#### ✅ 5. vite 中 CSS 和静态资源如何处理

##### 📌 CSS 处理：

1. **开发阶段**

   * 自动注入到页面 `<style>` 标签中
   * 支持 PostCSS、预处理器（如 Sass、Less）

2. **生产阶段**

   * 使用 Rollup 插件提取为独立 CSS 文件
   * 支持 `cssCodeSplit` 分离 chunk CSS
   * 支持 `vite-plugin-css-modules`, `postcss` 插件链

3. **CSS Modules**

   ```ts
   // xxx.module.css
   .title { color: red }

   // ts
   import style from './xxx.module.css'
   style.title
   ```

##### 📌 静态资源处理：

1. **引用规则**（默认 4kb 为临界值）：

   * 小文件转 base64 内联
   * 大文件拷贝至 `dist/assets` 并替换路径

2. **使用方式**：

   * JS/TS 引入：`import logo from './logo.png'`
   * CSS 中引用：`background: url('./bg.jpg')`

3. **public 目录**

   * 放置不经过打包处理的静态资源
   * 访问路径 `/public/favicon.ico`

##### 🗣 模板：

> 在开发时，Vite 会自动将 CSS 注入到页面中，支持各种预处理器。在生产构建时，CSS 被提取成独立文件并自动分块。静态资源如图片、字体等也根据大小自动处理，内联或拷贝到 `dist/assets`。此外还有 `public` 目录专门用于不打包的静态资源。

:::

### ✅Webpack vs vite

::: details 详解

#### 🧩 一、基本介绍

##### **Webpack**

* 类型：模块打包器（module bundler）
* 发布时间：2012 年
* 特点：
  * 支持代码分割、懒加载、热更新等高级功能。
  * 插件系统非常丰富，生态庞大。
  * 主要用于**传统构建流程**（如 React、Vue、Angular 等项目）。

##### **Vite**

* 类型：新型前端构建工具
* 发布时间：2020 年（由 Vue.js 作者尤雨溪创建）
* 特点：
  * 基于原生 ES 模块（ESM），开发服务器启动快。
  * 支持 TypeScript、JSX、CSS 预处理器等无需配置即可开箱即用。
  * 构建速度极快，尤其适用于**现代浏览器和现代 JavaScript 开发**。

#### ⚙️ 二、核心区别

| 特性 | Webpack | Vite |
|------|---------|------|
| 启动速度 | 较慢（需要打包所有文件） | 极快（利用浏览器原生 ESM，按需加载） |
| 生产构建 | 使用 webpack 打包输出优化后的 bundle | 使用 Rollup 进行生产环境打包 |
| 开发模式 | 编译后提供本地服务 | 利用浏览器原生支持 ES Modules |
| 配置复杂度 | 复杂，依赖大量插件 | 简洁，大部分默认配置已满足需求 |
| 热更新（HMR） | 支持，但较慢 | 支持，响应速度快 |
| 插件系统 | 基于 webpack 插件生态（庞大） | 基于 Rollup 插件系统（逐渐成熟） |
| 支持框架 | React、Vue、Angular 等主流框架 | Vue 3、React、Svelte 等现代框架 |
| CSS 预处理 | 需手动配置 loader（如 sass-loader） | 内置支持 `.scss`, `.less`, `.styl` 等 |
| TypeScript | 需要 `ts-loader` 或 `babel-loader` | 默认支持 `.ts` 文件 |
| JSX / Vue SFC | 需配置 Babel / vue-loader | 默认支持 |

#### 📈 三、使用场景对比

##### ✅ Webpack 更适合：

* 老旧项目或需要兼容 IE11 的项目。
* 需要高度定制化打包策略的大型应用。
* 需要兼容不支持 ES Module 的浏览器环境。
* 使用 Angular 的项目（目前 Angular CLI 仍基于 Webpack）。

##### ✅ Vite 更适合：

* 现代浏览器环境下的新项目（ES6+）。
* 快速原型开发、小型到中型项目。
* 使用 Vue 3、React、Svelte 等现代框架。
* 需要极速的开发体验（尤其是 HMR）。

***

#### 🔧 四、典型命令对比

##### Webpack

```bash
# 安装
npm install --save-dev webpack webpack-cli

# 启动开发服务器
npx webpack serve

# 构建生产版本
npx webpack --mode production
```

##### Vite

```bash
# 创建项目
npm create vite@latest my-app

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

***

#### 🌱 五、生态系统与社区支持

| 方面 | Webpack | Vite |
|------|---------|------|
| 社区活跃度 | 非常高（长期维护） | 快速增长（Vue、React 社区支持强） |
| 插件数量 | 极其丰富 | 正在快速增长 |
| 文档质量 | 成熟且完整 | 清晰简洁，文档友好 |
| 兼容性 | 支持老旧浏览器 | 推荐用于现代浏览器 |

***

#### 📊 六、性能对比示例

| 操作 | Webpack | Vite |
|------|---------|------|
| 初始启动时间 | 5~20 秒 | < 1 秒 |
| 修改文件后热更新 | 1~3 秒 | ~0.1 秒 |
| 生产构建时间 | 10~30 秒 | 5~10 秒（Rollup） |

***

#### ✅ 七、总结建议

| 场景 | 推荐工具 |
|------|----------|
| 新项目、现代框架、追求开发效率 | ✅ Vite |
| 老项目、需要兼容 IE、高度定制化 | ✅ Webpack |
| 快速原型开发 | ✅ Vite |
| Angular 项目 | ✅ Webpack（目前主流） |
| 大型企业级应用 | 可以结合使用（Vite + 微前端架构） |
:::

### ✅[TypeScript](/learning/category/modules/page3)

::: details 详解

:::

* Uniapp
  ::: details 详解

:::

* 前端架构
  ::: details 详解

:::

## 其他

* 大文件上传方案
  ::: details 详解

:::

* 移动端适配
  ::: details 详解

:::

* 数据大屏适配
  ::: details 详解

:::

* 谷歌浏览器插件
  ::: details 详解

:::

* 脚手架cli
  ::: details 详解

:::

* vite插件编写
  ::: details 详解

:::

* vscode插件编写
  ::: details 详解

:::

* AI 前端功能实现
  ::: details 详解

:::

* SEO 如何做
  ::: details 详解

### 如何优化 SEO

> SEO（搜索引擎优化）的主要目的是通过提高网站在搜索引擎结果页面（SERPs）中的可见性和排名，从而吸引更多的有机（非付费）流量到网站

从提高`网站的可见性`和`访问量`的角度来归类，可以将上述SEO策略分为以下几个类别：

**一、提升搜索引擎可见性**

1. 关键词研究：投其所好，目标受众使用的关键词，确保自然地出现在网站内容中
2. 技术优化：使用语义化标签，加快网站加载速度、保证移动端友好、使用SSL保证网站安全、创建网站地图sitemap、使用结构化数据标记，让搜索引擎更容易和理解你的页面

**二、增加用户访问量**

1. 高质量内容创建： 提供有价值、原创与目标关键词相关的内容，吸引访问者同时鼓励其他网站链接您的页面
2. 用户体验（UX）： 设计良好、易于导航，减少跳出率，增加用户停留时间
3. 外部链接建设：获取来自权威网站的反向链接
4. 社交媒体整合：增加曝光度，间接增加访问量
5. 图片和视频优化： 图片添加alt属性。制作视频吸引流量

**三、长期增长访问量**

1. 定期更新内容：保持内容新鲜度，有利于保持搜索引擎的关注
2. 避免黑帽SEO技巧：避免使用如隐藏文本、关键词堆砌等不当做法，以免遭受搜索引擎的惩罚，影响网站的长期发展和可见性。

:::

* uniapp 插件开发
  ::: details 详解

:::

## NodeJS

* 流
  ::: details 详解

:::
