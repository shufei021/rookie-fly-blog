# 浏览器输入URL到页面加载的过程


## 一、用户输入 URL

例如：https://www.example.com/index.html

## 二、浏览器解析 URL
 提取出 `协议`（如 HTTPS）、`域名`（如 www.example.com）、`端口号`（默认为 443 或 80）和`路径（如 /index.html）等信息`。

## 三、DNS 解析（域名解析）

> `目标`：将 www.example.com 转换为一个 IP 地址，比如 93.184.216.34。

+ （查缓存）`浏览器缓存`：浏览器是否有该域名的缓存记录。
+ （查缓存）`操作系统缓存`：操作系统中是否缓存了这个域名对应的 IP 地址。
+ （查缓存）`路由器缓存`：如果前面没找到，可能会查询路由器的 DNS 缓存。
+ （查询）`运营商 DNS 服务器`：最终向 ISP 提供的 DNS 服务器发起查询。
+ （查询）`递归/迭代查询`：DNS 服务器可能需要通过`根域名服务器`、`顶级域名服务器`、`权威域名`服务器来获取最终 IP。

**3查缓存2查询**



## 四、建立 TCP 连接（三次握手）

> `目标`：与目标服务器建立连接

浏览器与目标服务器建立 TCP 连接：

+ `客户端发送 SYN包`：请求建立连接
+ `服务端响应 SYN-ACK` 包： 确认收到请求，并同意建立连接
+ `客户端再发 ACK包`：确认收到服务器的回复，连接建立。

## TLS握手（HTTPS）

如果使用HTTPS协议，在TCP连接建立后，还需要进行TLS握手
+ `ClientHello`： 客户端发送支持的TLS版本、加密套件列表、随机数等信息
+ `ServerHello`: 服务器选择加密套件、发送随机数、证书（包含公钥）
+ `密钥交换`：客户端生成主密钥，用服务器公钥加密发送
+ `完成握手`：双方生成会话密钥，后续通信使用对称加密



## 五、发送 HTTP(S) 请求

浏览器发送一个 HTTP 请求，例如：

```bash
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: ...
Accept: text/html,...
```

## 六、服务器接收请求并返回响应

+ `负载均衡`：请求可能被分发到多台服务器中的一台
+ `业务逻辑处理`：执行相应的应用逻辑，如数据库查询、模板渲染等
+ `返回响应`：服务器生成 HTTP 响应，包含状态码、响应头、响应体

<!-- + 服务器收到请求后，根据路径 /index.html 查找资源；
+ 如果是静态资源，直接返回；
+ 如果是动态内容（如 PHP、Node.js），服务器执行脚本生成 HTML 响应内容；
+ 服务器构建 HTTP 响应，包括状态码（如 200 OK）、响应头和响应体。 -->

## 七、浏览器接收响应并解析

+ `解析 HTML`：构建 DOM 树
+ `解析 CSS`：构建 CSSOM 树
+ `合并生成 Render Tree`：将 DOM 树 和  CSSOM 树 合并生成渲染树，只包含需要渲染的节点及其样式信息
+ `布局（Layout）`：计算每个元素在页面上的位置和大小
+ `绘制（Paint）`：将像素绘制到屏幕上
+ `合成（Composite）`：将多个图层合并，优化渲染性能，最终显示在屏幕上

**6步**
## 八、加载子资源（JS、CSS、图片等）

+ 页面中的 < script>、< link>、< img> 等标签会触发额外的 HTTP 请求；
+ JavaScript 可能会修改 DOM/CSSOM，导致重新渲染；
+ 异步请求（AJAX）也可能在此阶段发起，用于局部更新或数据加载。

## 九、页面加载完成
+ 所有资源加载完毕；
+ window.onload 事件被触发；
+ 用户可以开始与页面交互。

## 十、断开连接（四次挥手）

TCP 连接在一定时间内没有数据传输后，双方协商关闭连接。
数据传输完成后，协商关闭连接过程：
+ `客户端发送FIN包`：请求关闭连接
+ `服务器回复ACK包`：确认收到关闭请求
+ `服务器发送FIN包`：服务器也请求关闭连接
+ `客户端回复ACK包`：确认服务器的关闭请求，连接断开


## 拓展知识点（加分项）
+ CDN 加速：资源可能从 CDN 获取，提高访问速度；
+ HTTP/2 & HTTP/3：使用更高效的协议减少延迟；
+ 预加载策略：如 DNS Prefetch、Preconnect、Prefetch、Prerender；
+ Service Worker & PWA：离线缓存和增强用户体验；
+ 安全相关：如 CSP、SameSite Cookie 属性、HTTPS 的作用等。

## 总结
> 当我在浏览器中输入一个 URL 后，整个过程涉及到了 DNS 解析、TCP 建立连接、发送 HTTP 请求、服务器处理请求并返回响应、浏览器解析 HTML 和渲染页面等多个步骤。同时，现代浏览器还优化了加载性能，比如异步加载资源、使用缓存、利用 CDN 等技术手段。整个过程背后体现了客户端与服务器端的协作，也涉及到网络、操作系统、前端渲染等多个层面的知识。

