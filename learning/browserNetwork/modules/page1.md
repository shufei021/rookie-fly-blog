---
url: /learning/browserNetwork/modules/page1.md
---
# 浏览器输入 URL 到渲染过程

## 一、输入 URL

* 输入 URL，按下 Enter 键。
* 浏览器检查是否为搜索关键词。
* 如果 URL 不完整，则跳转到默认的搜索引擎。

## 二、解析 URL

* 提取出协议（如 `http`、`https`）、域名、端口和路径等信息。

## 三、DNS 解析（域名解析）

1. 按照以下顺序依次查询缓存：
   * 浏览器缓存
   * 操作系统缓存
   * 路由器缓存
   * ISP DNS 服务器缓存
2. 如果都未命中，则通过递归和迭代方式向根域名、顶级域名、权威域名服务器请求 IP 地址。
3. 最终找到 IP 并更新各级缓存。

#### 优化点：

* 使用 `<link rel="dns-prefetch">` 和 `<link rel="preconnect">` 预先提取解析 DNS 并建立连接。

## 四、TCP 连接

* **三次握手**：
  1. 客户端 → 服务端：发送 `SYN` 请求建立连接。
  2. 服务端 → 客户端：发送 `SYN-ACK` 表示收到并同意建立连接。
  3. 客户端 → 服务端：发送 `ACK` 确认连接建立。

* **TLS 握手（HTTPS）**：
  1. 客户端 → 服务端：发送随机数、加密套件列表、TLS 版本。
  2. 服务端 → 客户端：发送随机数、选择的加密套件、含公钥的证书。
  3. 客户端生成主密钥，使用公钥加密后发送给服务端。
  4. 双方生成会话密钥，后续通信使用对称加密。

## 五、发起请求

* 发送请求报文，包括：
  * 请求行（如 GET /index.html HTTP/1.1）
  * 请求头（如 Host、User-Agent）
  * 请求体（可选）

## 六、接收请求并响应

* **CDN 分发**：请求可能被分发到就近 CDN 节点服务器。

* **缓存检查**：
  * 强缓存：`Cache-Control: max-age=xxx`，直接返回 `200`
  * 协商缓存：
    * `Last-Modified` / `If-Modified-Since`
    * `ETag` / `If-None-Match`
    * 若未修改则返回 `304 Not Modified`

* **重定向**：
  * `301` 永久重定向：下次不再走重定向
  * `302` 临时重定向：每次请求都会走重定向

* **业务逻辑处理**：
  * 查询数据库
  * 模板渲染（SSR）
  * 返回响应报文（状态码、响应头、响应体）

#### 优化点：

* 尽量避免重定向，减少网络往返时间。
* 合理设置缓存以加快页面加载速度。
* 使用 CDN 加速资源加载。

## 七、接收响应并解析

* **HTML 解析**：构建 DOM 树。
* **CSS 解析**：构建 CSSOM 树。
  * JS 加载可能会阻塞 CSSOM 构建，进而阻塞页面渲染。
  * 可使用 `async` 或 `defer` 属性解决。
* **合并 DOM 和 CSSOM**：生成 Render Tree。
* **布局（Layout）**：计算元素大小和位置。
* **绘制（Paint）**：将像素绘制到屏幕上。
* **合成（Composite）**：多个图层合并，提升渲染性能。

## 八、加载子资源

* HTML 解析过程中可能触发 JS、CSS、图片等资源请求。
* 可能引起页面“重绘（Repaint）”和“回流（Reflow）”。

#### 优化点：

* 将 JS 放在 `<body>` 底部，避免阻塞渲染。
* 给 JS 添加 `async` 或 `defer` 属性，defer 按顺序执行，async 是异步无序执行，适用于不依赖页面 DOM 的脚本。
* 减少 DOM 嵌套层级，提高查找效率。
* 对关键资源使用 `<link rel="preload">` 预加载。
* 使用 `<link rel="prefetch">` 和 `<link rel="preconnect">` 提前请求和建立连接。
* 图片压缩与懒加载。
* 使用 SSR（服务端渲染）或 SSG（静态生成）。
* 使用 HTTP/2 或 HTTP/3 提升性能（多路复用、头部压缩等），多路复用解决了 HOL blocking，头部压缩减少传输体积。
* 使用内联CSS，减少 HTTP 请求。

## 九、页面加载完成

* 触发 `window.onload` 事件。

## 十、断开连接

* **四次挥手**：
  1. 客户端 → 服务端：发送 `FIN` 请求断开连接。
  2. 服务端 → 客户端：发送 `ACK` 确认。
  3. 服务端 → 客户端：发送 `FIN` 请求断开连接。
  4. 客户端 → 服务端：发送 `ACK` 确认。
* 等待 2MSL（最大报文段生存时间），确保最后一个 ACK 被接收，连接正式断开。

## 🚀 更全面的优化建议（按流程补充）

### 1. **DNS 解析阶段优化**

#### ✅ `dns-prefetch` 和 `preconnect`

* `<link rel="dns-prefetch" href="//example.com">`：提前解析目标域名的 DNS。
* `<link rel="preconnect" href="//example.com">`：不仅解析 DNS，还建立 TCP 连接（甚至 TLS 握手）。

> **适用场景**：跨域资源较多时（如 CDN、第三方库、统计脚本），提前预连接能显著减少后续请求延迟。

#### ✅ 使用 HTTP/2 或更高版本

* 支持多路复用，避免多个请求阻塞在同一个 TCP 连接上。

***

### 2. **TCP & TLS 握手阶段优化**

#### ✅ 启用 OCSP Stapling（证书吊销状态查询）

* 服务器将证书吊销信息附加到 TLS 握手中，客户端无需单独去验证证书有效性，节省时间。

#### ✅ 使用会话恢复（Session Resumption）

* 包括 Session ID 和 Session Ticket 机制，避免每次握手都进行完整的密钥交换。

***

### 3. **HTTP 请求与响应阶段优化**

#### ✅ 启用缓存策略

| 缓存方式 | 响应头 | 特点 |
|----------|--------|------|
| 强缓存 | `Cache-Control: max-age=xxx` | 不发起请求，直接使用本地缓存 |
| 协商缓存 | `ETag/If-None-Match` 或 `Last-Modified/If-Modified-Since` | 若未修改则返回 304 |

> 推荐优先使用 ETag，因为 Last-Modified 精度低且可能误判。

#### ✅ 使用 CDN 加速静态资源

* 将图片、CSS、JS 等静态资源托管至 CDN，根据用户地理位置就近分发。

#### ✅ 减少重定向次数

* 避免不必要的 301/302 跳转，尤其是首页加载时。
* 可通过工具检测是否存在链式重定向（如 `/a → /b → /c`）。

***

### 4. **页面渲染阶段优化**

#### ✅ 避免 JS 阻塞 HTML 解析

* 不要在 `<head>` 中加载同步 JS，可改用：
  * `async`：异步加载并立即执行，顺序不确定。
  * `defer`：异步加载，等到 HTML 解析完成后按顺序执行。

```html
<script src="main.js" async></script>
<script src="init.js" defer></script>
```

#### ✅ 提前加载关键资源

* 使用 `<link rel="preload">` 预加载关键字体、CSS、JS、图片等：

```html
<link rel="preload" href="critical.css" as="style">
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
```

#### ✅ 使用 `<link rel="prefetch">` 预取未来页面资源

* 适用于下一页或用户可能访问的内容，例如点击后跳转的页面所需资源。

```html
<link rel="prefetch" href="/next-page.html">
```

***

### 5. **子资源加载阶段优化**

#### ✅ 图片优化

| 技术 | 说明 |
|------|------|
| 懒加载 | 使用 `loading="lazy"` 属性懒加载图片和 iframe |
| 格式压缩 | 使用 WebP 替代 JPEG/PNG，体积更小 |
| 响应式图片 | 使用 `<img srcset="...">` 提供不同分辨率图片 |
| Base64 内联 | 小图标可使用 base64 编码内嵌，减少请求数 |

#### ✅ CSS 优化

* **Critical CSS**：将首屏所需的 CSS 内联到 HTML 中，加快首次渲染速度。
* **CSS Tree Shaking**：使用工具（如 PurgeCSS）移除无用样式。
* **媒体查询分离**：使用 `media` 属性加载特定设备样式，避免一次性加载全部 CSS。

#### ✅ JS 优化

* **代码分割（Code Splitting）**：按需加载模块（如 React 的 `React.lazy()` + `Suspense`）。
* **防抖节流（Debounce/Throttle）**：减少频繁触发的事件对性能的影响。
* **避免全局污染**：使用模块化开发（ES Modules）提升可维护性和加载效率。

***

### 6. **整体性能监控与调试**

#### ✅ 使用 Lighthouse 性能评分工具

* Chrome DevTools 内置 Lighthouse 工具，可评估性能、可访问性、SEO 等维度，并提供优化建议。

#### ✅ 监控 FCP、LCP、CLS、FID 等核心指标

* **FCP**（First Contentful Paint）：内容首次绘制时间
* **LCP**（Largest Contentful Paint）：最大内容绘制时间
* **CLS**（Cumulative Layout Shift）：布局偏移得分
* **FID**（First Input Delay）：用户首次交互延迟

***

### 7. **构建与部署优化**

#### ✅ 使用 Webpack/Vite 构建工具优化

* 启用 Gzip/Brotli 压缩
* 开启 Tree Shaking 删除未使用代码
* 合理配置 Code Splitting 策略

#### ✅ 设置合适的 HTTP 响应头

```http
Cache-Control: max-age=31536000, public, immutable
Content-Type: text/html; charset=UTF-8
Vary: Accept-Encoding
```

#### ✅ 启用 Server Push（HTTP/2）

* 服务端可主动推送资源给浏览器，减少请求往返。

***

## 📌 补充总结表格：常见优化策略一览

| 优化方向 | 技术手段 | 效果 |
|----------|-----------|------|
| DNS 解析 | `dns-prefetch`, `preconnect` | 减少 DNS 解析时间 |
| TCP/TLS 握手 | OCSP Stapling、Session Resumption | 缩短握手时间 |
| 请求响应 | 缓存控制、CDN、减少重定向 | 减少请求次数和延迟 |
| 页面渲染 | `defer`, `async`, `preload`, Critical CSS | 加快首次渲染速度 |
| 子资源加载 | 图片懒加载、WebP、Base64、代码分割 | 减少资源大小和请求数 |
| 构建部署 | Gzip/Brotli、Tree Shaking、Server Push | 提升加载速度和运行效率 |
| 性能监控 | Lighthouse、Core Web Vitals | 持续优化用户体验 |
