# 浏览器输入URL到渲染的过程

<a href="../../../.vitepress/theme/pdf/1.pdf" target="_blank">PDF查看流程</a>

## 输入 URL

## 解析 URL（域名解析）
> 从URL提取出协议、域名、端口和路径等信息
## DNS 解析
> 获取 IP 地址

+ 浏览器缓存查询
+ 操作系统缓存查询
+ 路由器缓存查询
+ ISP DNS 缓存服务器 查询
+ ISP 的 DNS 服务器通过根域名、顶级域名、权威域名服务器，递归或迭代查询找到目标域名的IP地址，查询结果会缓存到各级服务器和客户端
## 建立 TCP 连接（三次握手）
> 为发起请求做准备

+ 客户端发送 SYN包：请求建立连接
+ 服务端响应 SYN-ACK 包： 确认收到请求，并同意建立连接
+ 客户端再发 ACK包：确认收到服务器的回复，连接建立。
+ TLS握手（HTTPS）
    + ClientHello： 客户端发送支持的TLS版本、加密套件列表、随机数等信息
    + ServerHello: 服务器选择加密套件、发送随机数、证书（包含公钥）
    + 密钥交换：客户端生成主密钥，用服务器公钥加密发送
    + 完成握手：双方生成会话密钥，后续通信使用对称加密
## 发起 HTTP(S) 请求


## 服务器接收请求并返回响应

+ 304：可能协商缓存
+ 负载均衡：请求可能被分发到多台服务器中的一台
+ 业务逻辑处理：执行相应的应用逻辑，如数据库查询、模板渲染等
+ 返回响应：服务器生成 HTTP 响应，包含状态码、响应头、响应体


## 浏览器接收响应解析

+ 解析 HTML：构建 DOM 树
+ 解析 CSS：构建 CSSOM 树
+ 合并生成 Render Tree：将 DOM 树 和 CSSOM 树 合并生成渲染树，只包含需要渲染的节点及其样式信息
+ 布局（Layout）：计算每个元素在页面上的位置和大小
+ 绘制（Paint）：将像素绘制到屏幕上
+ 合成（Composite）：将多个图层合并，优化渲染性能，最终显示在屏幕上
## 加载子资源（JS CSS 图片等）

+ 页面中的 < script>、< link>、< img> 等标签会触发额外的 HTTP 请求
+ JavaScript 可能会修改 DOM/CSSOM，导致重新渲染；
+ 异步请求（AJAX）也可能在此阶段发起，用于局部更新或数据加载。
## 页面加载完成
+ 所有资源加载完毕；
+ window.onload 事件被触发；
+ 用户可以开始与页面交互。
## 断开连接（四次挥手）
+ 客户端发送FIN包：请求关闭连接
+ 服务器回复ACK包：确认收到关闭请求
+ 服务器发送FIN包：服务器也请求关闭连接
+ 客户端回复ACK包：确认服务器的关闭请求，连接断开