---
url: /Interview/js/pages/page2.md
---
# 浏览器输入URL到页面加载的过程

## 一、用户输入 URL

例如：https://www.example.com/index.html

## 二、浏览器解析 URL

浏览器首先会解析 URL，提取出协议（如 HTTPS）、域名（如 www.example.com）、端口号（默认为 443 或 80）和路径（如 /index.html）等信息。

## 三、DNS 解析（域名解析）

* 检查本地缓存：浏览器是否有该域名的缓存记录。
* 系统缓存：操作系统中是否缓存了这个域名对应的 IP 地址。
* 路由器缓存：如果前面没找到，可能会查询路由器的 DNS 缓存。
* 运营商 DNS 服务器：最终向 ISP 提供的 DNS 服务器发起查询。
* 递归/迭代查询：DNS 服务器可能需要通过根域名服务器、顶级域名服务器、权威域名服务器来获取最终 IP。

**目标：将 www.example.com 转换为一个 IP 地址，比如 93.184.216.34。**

## 四、建立 TCP 连接（三次握手）

浏览器与目标服务器建立 TCP 连接：

* 客户端发送 SYN（同步）报文；
* 服务端响应 SYN-ACK（同步-确认）；
* 客户端再发 ACK（确认）报文。

**如果是 HTTPS，还会进行 TLS 握手加密通信。**

## 五、发送 HTTP(S) 请求

浏览器发送一个 HTTP 请求，例如：

```bash
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: ...
Accept: text/html,...
```

## 六、服务器接收请求并处理

* 服务器收到请求后，根据路径 /index.html 查找资源；
* 如果是静态资源，直接返回；
* 如果是动态内容（如 PHP、Node.js），服务器执行脚本生成 HTML 响应内容；
* 服务器构建 HTTP 响应，包括状态码（如 200 OK）、响应头和响应体。

## 七、浏览器接收响应并解析渲染页面

* 解析 HTML：构建 DOM 树；
* 解析 CSS：构建 CSSOM 树；
* 合并生成 Render Tree：决定哪些节点可见及其样式；
* 布局（Layout）：计算每个元素在页面上的位置；
* 绘制（Paint）：将像素绘制到屏幕上；

## 八、加载子资源（JS、CSS、图片等）

* 页面中的 < script>、< link>、< img> 等标签会触发额外的 HTTP 请求；
* JavaScript 可能会修改 DOM/CSSOM，导致重新渲染；
* 异步请求（AJAX）也可能在此阶段发起，用于局部更新或数据加载。

## 九、页面加载完成

* 所有资源加载完毕；
* window.onload 事件被触发；
* 用户可以开始与页面交互。

## 十、断开连接（四次挥手）

TCP 连接在一定时间内没有数据传输后，双方协商关闭连接。

## 拓展知识点（加分项）

* CDN 加速：资源可能从 CDN 获取，提高访问速度；
* HTTP/2 & HTTP/3：使用更高效的协议减少延迟；
* 预加载策略：如 DNS Prefetch、Preconnect、Prefetch、Prerender；
* Service Worker & PWA：离线缓存和增强用户体验；
* 安全相关：如 CSP、SameSite Cookie 属性、HTTPS 的作用等。

## 总结

> 当我在浏览器中输入一个 URL 后，整个过程涉及到了 DNS 解析、TCP 建立连接、发送 HTTP 请求、服务器处理请求并返回响应、浏览器解析 HTML 和渲染页面等多个步骤。同时，现代浏览器还优化了加载性能，比如异步加载资源、使用缓存、利用 CDN 等技术手段。整个过程背后体现了客户端与服务器端的协作，也涉及到网络、操作系统、前端渲染等多个层面的知识。
