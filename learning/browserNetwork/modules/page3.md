---
url: /learning/browserNetwork/modules/page3.md
---
# 🎯跨域及 JSONP

### 一、什么是跨域？

> **一句话总结：**
> 跨域（Cross-Origin）是浏览器的一种同源策略（Same-origin Policy）限制，当请求的协议、域名或端口与当前页面不一致时，就会触发跨域限制。

#### ✅ 同源三要素：

只有当以下三个部分完全相同，才被认为是“同源”：

| 属性 | 示例 |
|------|------|
| 协议（Protocol） | `http` vs `https` |
| 域名（Host） | `www.example.com` vs `api.example.com` |
| 端口（Port） | `8080` vs `3000` |

> 比如从 `http://a.com` 请求 `http://b.com/data` 就会跨域。

***

### 二、为什么会有跨域限制？

> **一句话总结：**
> 跨域是为了防止恶意网站通过脚本访问其他网站的资源，保护用户数据安全，是浏览器的安全机制。

比如：如果浏览器不限制跨域，攻击者可以通过 `<script>` 或 AJAX 请求任意网站接口，获取用户的敏感信息（如 Cookie），造成 CSRF 攻击等安全问题。

***

### 三、常见的跨域场景和解决方案

| 方案 | 说明 | 适用场景 |
|------|------|----------|
| JSONP | 利用 `<script>` 标签不受跨域限制的特点 | GET 请求、兼容老浏览器 |
| CORS | 浏览器原生支持的跨域方案，需要后端配合设置响应头 | 现代浏览器推荐方案 |
| 代理服务器 | 前端请求同源后端，由后端转发请求目标服务 | 所有跨域场景通用 |
| WebSocket | 不受同源策略限制 | 实时通信场景 |
| postMessage | 跨文档通信 API，用于 iframe 或 window 间通信 | 多窗口/iframe 通信 |

***

### 四、JSONP 的原理和使用方式

> **一句话总结：**
> JSONP 是一种利用 `<script>` 标签没有跨域限制的特性，实现跨域请求的“伪异步”技术。

#### ✅ 原理：

1. 客户端定义一个回调函数，例如 `function handleResponse(data) { ... }`
2. 动态创建 `<script src="http://api.example.com/data?callback=handleResponse">`
3. 服务端接收到请求后，将数据包装成 `handleResponse({...})` 返回
4. 浏览器执行返回的 JS 脚本，调用回调函数处理数据

#### ✅ 示例代码：

```html
<script>
  function handleResponse(data) {
    console.log('接收到跨域数据:', data);
  }
</script>

<script src="http://api.example.com/data?callback=handleResponse"></script>
```

#### ✅ 优点：

* 兼容性好，适用于 IE6+ 等老旧浏览器
* 不依赖现代浏览器特性

#### ❌ 缺点：

* 只能发送 `GET` 请求
* 安全性差，容易引发 XSS 攻击
* 错误处理困难（无法监听错误状态）

***

### 五、JSONP 与 CORS 的区别

| 对比项 | JSONP | CORS |
|--------|-------|------|
| 请求类型 | 仅支持 GET | 支持所有 HTTP 方法 |
| 安全性 | 较低 | 更高（可控制来源、方法、头部） |
| 是否需要后端配合 | 是 | 是 |
| 是否支持自定义 headers | 否 | 是 |
| 是否支持 cookie | 否 | 是（需设置 `withCredentials`） |
| 兼容性 | 好（IE6+） | 现代浏览器支持良好 |

***

### 六、实际开发中的选择建议

| 场景 | 推荐方案 |
|------|-----------|
| 新项目、现代浏览器环境 | 使用 CORS |
| 老旧系统、需要兼容 IE | 使用 JSONP |
| 无法修改后端配置 | 使用代理服务器 |
| 实时通信需求 | 使用 WebSocket |
| 多窗口通信 | 使用 `postMessage` |

***

### 七、总结归纳（适合结尾）

> 我可以用一句话总结跨域和 JSONP：
> “**跨域是浏览器为了安全而施加的限制，JSONP 是早期解决跨域问题的一种变通手段，但已被更安全灵活的 CORS 所取代。**”

掌握这些知识不仅有助于理解前后端交互机制，还能在调试接口、部署项目时快速定位和解决问题。

## 🌟 知识延伸

### 1. **JSONP 的本质不是 JSON 格式**

* JSONP 全称是 “JSON with Padding”，它并不是真正的 JSON 数据格式。
* 它的本质是一个 JavaScript 函数调用，数据是作为参数传入函数执行的。
* 示例返回内容：
  ```js
  handleResponse({ "name": "Alice", "age": 25 });
  ```
* 这个结构不是一个纯粹的 JSON 字符串，而是一个 JS 表达式。

### 2. **CORS 是 W3C 标准，分为简单请求与非简单请求**

* **简单请求（Simple Request）**：满足以下条件：
  * 请求方法是 `GET`、`HEAD`、`POST`
  * 请求头只包含 `Accept`、`Content-Type`（只能是 `application/x-www-form-urlencoded`、`multipart/form-data` 或 `text/plain`）、`Origin`
* **非简单请求**：如使用了 `PUT`、`DELETE` 方法，或设置了自定义 Header，则会触发 **预检请求（preflight request）**，即浏览器先发送一个 `OPTIONS` 请求询问服务器是否允许跨域操作。

### 3. **使用 `fetch` 和 `XMLHttpRequest` 设置 CORS 相关参数**

#### 使用 `fetch` 发送带凭据的请求：

```js
fetch('https://api.example.com/data', {
  method: 'GET',
  mode: 'cors', // 默认值
  credentials: 'include' // 包含 Cookie
});
```

#### 使用 `XMLHttpRequest` 设置 CORS：

```js
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/data');
xhr.withCredentials = true; // 允许携带 Cookie
xhr.send();
```

### 4. **如何在 Nginx / Node.js 中配置代理解决跨域？**

#### Nginx 配置示例：

```nginx
location /api/ {
    proxy_pass https://backend.example.com/;
    add_header 'Access-Control-Allow-Origin' '*';
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
}
```

#### Node.js Express 配置示例：

```js
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});
```

***

## ❓ 延申问题

### 1. **JSONP 是怎么工作的？为什么它能绕过跨域？**

> 答案：
> JSONP 利用了 `<script>` 标签不受同源策略限制的特点。浏览器允许页面加载外部 JS 资源，即使它们来自不同域名。通过动态创建 `<script>` 标签，并将回调函数名作为 URL 参数传递给服务端，服务端返回的是一段函数调用代码，从而实现跨域通信。

### 2. **JSONP 有哪些安全隐患？**

> 答案：
>
> * **XSS 攻击风险**：如果攻击者控制了目标接口，可以在响应中注入恶意脚本。
> * **无法防御 CSRF**：因为 JSONP 是 GET 请求，容易被伪造请求。
> * **无法监听错误**：无法判断请求失败的原因，如超时、404、500 错误等。

### 3. **CORS 的预检请求是什么？什么时候会触发？**

> 答案：
>
> * 预检请求是浏览器自动发起的一个 `OPTIONS` 请求，用于确认服务器是否允许当前跨域请求。
> * 触发时机包括：

* 使用了除 `GET`、`HEAD`、`POST` 以外的方法（如 `PUT`、`DELETE`）
* 设置了自定义请求头（如 `Authorization`、`X-Requested-With`）
* 设置了 `Content-Type` 为非标准类型（如 `application/json`）

### 4. **如果服务端没开启 CORS，前端还能怎么解决跨域？**

> 答案：
>
> * 使用 JSONP（仅限 GET 请求）
> * 通过后端代理（最常用方案）
> * 使用 Chrome 插件或本地代理临时绕过（仅开发环境）
> * 使用 Webpack DevServer 配置 proxy 解决开发阶段跨域
> * 使用浏览器启动参数禁用安全策略（不推荐）

### 5. **JSONP 和 Ajax 请求的区别？**

| 对比点 | JSONP | Ajax |
|--------|-------|------|
| 是否受跨域限制 | 否（利用 `<script>`） | 是（默认受限制） |
| 支持的请求方式 | 仅 GET | 所有 HTTP 方法 |
| 可否设置 Headers | 否 | 是 |
| 可否处理错误 | 否（无法捕获错误状态） | 是（可监听 error、status） |
| 安全性 | 较低 | 更高（配合 CORS） |
