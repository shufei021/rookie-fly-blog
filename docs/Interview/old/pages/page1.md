# 浏览器输入URL到渲染的过程

## 一、输入URL

**输入URL，按下Enter，浏览器会检查输入的是否是关键词，如果URL不完整则跳转到默认搜索引擎**

## 二、解析 URL（域名解析）
**从URL提取出协议、域名、端口和路径等信息**

## 三、DNS 解析
**依次按 `浏览器缓存`、`操作系统缓存`、`路由器缓存`、`ISP DNS 服务器缓存`查询，如果都没有命中，则依次按`根域名`、`顶级域名`、`权威域名服务器`递归或迭代最终找到IP，获取IP后更新各级缓存。**

**`优化机制：` dns-prefetch 提前解析跨域域名**

## 四、建立 TCP 连接（三次握手）
+ **客户端 → 服务端：SYN（序列号=x）请求建立连接**
+ **服务端 → 客户端：SYN-ACK（序列号=y, 确认号=x+1）收到请求，并同意建立连接**
+ **客户端 → 服务端：ACK（确认号=y+1）收到确认，连接建立**
+ **TLS握手（HTTPS）**
  + 客户端发送 ClientHello（TLS版本、加密套件列表、随机数）
  + 服务端回复 ServerHello（选定加密套件、随机数）、Certificate（证书）、ServerKeyExchange（服务端在需要时发送 ServerKeyExchange（包含密钥交换参数））
  + 客户端验证证书，用公钥加密生成主密钥发送 → 双方生成会话密钥
  + 后续通信使用对称加密（如AES）
## 五、发起 HTTP(S) 请求

浏览器构造 HTTP请求报文，发送请求行、请求头、请求体

## 六、服务器接收请求并返回响应

+ `CDN分发`：请求可能被分发到就近的CDN节点服务器。
+ `缓存检查`：强缓存（Cache-Control: max-age=3600）→ 直接返回本地缓存（200 OK from cache）或 协商缓存（If-Modified-Since/ETag）→ 未修改时返回 304 Not Modified
+ `业务逻辑`：服务端处理请求（如数据库查询、SSR渲染）等
+ `重定向处理:`
  + 若响应状态码为 301（永久重定向） 或 302（临时重定向），浏览器会根据响应头的 Location 字段自动跳转到新URL，并重新发起请求。
  + 区别
    + 301：旧URL永久失效，后续请求直接访问新URL（浏览器可能缓存跳转）。
    + 302：旧URL仍有效，下次请求可能再次触发重定向。
+ `返回响应`： 构建响应报文（状态行、响应头、响应体）。

## 七、浏览器接收响应解析

+ 解析HTML -> 构建DOM树 (遇到资源加载)
+ 解析CSS -> 构建CSSOM树 (CSSOM 构建会阻塞 JavaScript 执行（除非JS未依赖CSSOM），并阻塞渲染树的构建)
+ 合并DOM树 + CSSOM树 -> 构建渲染树(Render Tree)
+ 布局(Layout) 计算渲染树节点几何信息(位置、大小)
+ 绘制(Painting): 将节点绘制成像素，填充到多个图层(Layers)上
+ 合成(Compositing): 合成线程将图层合并、光栅化(如果需要)，并最终绘制到屏幕上。
## 八、加载子资源
+ HTML解析中遇到 < script>, < link>, < img> 时 立即发起请求
+ JS/CSS加载 → 可能阻塞关键渲染路径
+ 图片加载 → 异步不阻塞，但可能触发回流（未设置尺寸时）

**`优化机制`：预加载 `Preload` 提前发现资源，HTTP/2多路复用降低请求开销，建议使用 `async`（异步加载，执行时不阻塞）或 `defer`（延迟加载，按顺序执行）**

## 九、页面加载完成

+ DOMContentLoaded：DOM树构建完成时触发（无需等待图片）
+ window.onload 事件触发

## 十、断开连接（四次挥手）
+ 浏览器 → 服务器：FIN（请求关闭，进入 FIN_WAIT_1）
+ 服务器 → 浏览器：ACK（确认请求，进入 CLOSE_WAIT；浏览器进入 FIN_WAIT_2）
+ 服务器 → 浏览器：FIN（数据发送完毕，请求关闭，进入 LAST_ACK）
+ 浏览器 → 服务器：ACK（确认关闭，进入 TIME_WAIT；服务器关闭连接）
+ 等待 2MSL（报文最大生存时间）（确保最后一个ACK到达）后关闭，网络延迟保险期

**等待 2MSL 的三大原因：**
+ 确保最后一个 ACK 可靠到达
+ 消除旧连接的“迷途报文”
+ 保证全双工通道完全关闭