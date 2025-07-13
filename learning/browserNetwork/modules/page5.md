---
url: /learning/browserNetwork/modules/page5.md
---
# ✅ 什么是 OPTIONS 预检请求？

### 一、一句话总结

> **OPTIONS 请求是浏览器在发送某些跨域请求之前，自动发起的一个“探路”请求，用于确认服务器是否允许该跨域请求，这就是 CORS 中的预检机制（Preflight）。**

### 二、什么时候会触发 OPTIONS 预检请求？

当请求满足以下任意条件时，就会触发预检请求：

| 条件 | 示例 |
|------|------|
| 使用了除 `GET`、`HEAD`、`POST` 以外的方法 | 如 `PUT`、`DELETE`、`PATCH` |
| 设置了自定义请求头 | 如 `Authorization`、`X-Requested-With` 等 |
| 设置了 `Content-Type` 不是以下三种之一 | `application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain` |

> 📌 **注意：** 即使是一个简单的 POST 请求，只要设置了 `application/json` 的 Content-Type，也会触发预检。

***

### 三、OPTIONS 请求做了什么？

1. 浏览器向目标服务器发送一个 `OPTIONS` 请求。
2. 请求头中包含：
   * `Origin`：当前页面的源
   * `Access-Control-Request-Method`：实际要使用的 HTTP 方法
   * `Access-Control-Request-Headers`：实际要设置的请求头字段
3. 服务器根据这些信息决定是否允许请求，并返回相应的响应头：
   * `Access-Control-Allow-Origin`
   * `Access-Control-Allow-Methods`
   * `Access-Control-Allow-Headers`
4. 如果服务器允许，则浏览器继续发送真正的请求；否则，阻止请求并报错。

***

### 四、为什么需要 OPTIONS 请求？

这是为了防止恶意网站通过 JavaScript 发送一些敏感或破坏性的请求（如 `DELETE` 删除资源），从而保护服务器安全。

> 🔒 它是 CORS 安全机制的一部分，确保服务器明确同意接受特定类型的跨域请求。

***

### 五、举个例子说明

假设你从 `https://a.com` 向 `https://api.b.com/user/1` 发送了一个带 Token 的 PUT 请求：

```js
fetch('https://api.b.com/user/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  },
  body: JSON.stringify({ name: 'Alice' })
});
```

浏览器发现这是一个跨域请求，且使用了 `PUT` 方法和自定义 Header（`Authorization`），于是会先发送一个 OPTIONS 请求来“探路”。

***

### 六、后端如何配置支持 OPTIONS 请求？

服务端必须正确响应 OPTIONS 请求，返回如下关键头部：

```http
Access-Control-Allow-Origin: https://a.com
Access-Control-Allow-Methods: PUT, GET, POST, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

否则，浏览器将拒绝后续的实际请求，并提示类似错误：

```
Blocked by CORS policy: No 'Access-Control-Allow-Origin' header present.
```

***

### 七、常见问题与调试建议

#### ❓ 怎么判断是否触发了 OPTIONS？

* 打开 Chrome DevTools 的 Network 面板，查看是否有 `OPTIONS` 类型的请求。
* 如果看到 `preflight` 标记，说明确实触发了预检。

#### ❓ OPTIONS 请求失败怎么办？

* 检查后端是否正确处理了 OPTIONS 请求；
* 确保返回了正确的 CORS 响应头；
* 检查服务器是否允许对应的 `method` 和 `header`。

***

### 八、总结

> 我可以用一句话总结：
> “**OPTIONS 请求是浏览器在发送复杂跨域请求前的‘通行证’，它确保服务器愿意接受这个请求，是 CORS 安全机制的重要组成部分。**”

掌握 OPTIONS 预检请求的原理，有助于我们更好地理解和解决开发中的跨域问题，尤其是在前后端分离架构中，能够更高效地定位和修复接口通信异常。

当然可以！以下是针对你之前提到的 **“延伸加分项”** 和 **“面试官可能会追问的问题”** 的简要参考答案，适合在面试中简洁清晰地表达。

***

## 🧠 知识延伸

### 1. **OPTIONS 请求是幂等的，可以被缓存**

* 是的，OPTIONS 是 HTTP 幂等方法之一。
* 浏览器可以通过 `Access-Control-Max-Age` 头部缓存预检结果，避免重复发送 OPTIONS 请求，提升性能。

```http
Access-Control-Max-Age: 86400  # 表示缓存一天
```

### 2. **Node.js Express 中如何配置 OPTIONS 支持**

使用中间件设置响应头即可：

```js
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204); // 快速返回
  }

  next();
});
```

### 3. **Nginx 中如何设置跨域响应头**

在 Nginx 配置文件中添加以下头部：

```nginx
add_header 'Access-Control-Allow-Origin' '*';
add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS';
add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization';
```

### 4. **微服务中跨域配置统一网关处理的优势**

* 避免每个服务单独配置 CORS，降低维护成本；
* 统一安全策略、日志记录、限流等逻辑；
* 提升系统可扩展性和一致性。

***

## ❓ 深层次

| 问题 | 简要回答 |
|------|-----------|
| **1. OPTIONS 请求会携带 Cookie 吗？** | 不会。OPTIONS 请求本身不携带 Cookie，但后续实际请求是否带 Cookie 取决于 `withCredentials` 设置。 |
| **2. 如何避免频繁触发 OPTIONS 请求？** | 使用 `Access-Control-Max-Age` 缓存预检结果，减少重复请求。 |
| **3. OPTIONS 请求失败了怎么排查？** | 查看响应头是否包含正确的 CORS 相关字段；检查服务器是否正确处理 OPTIONS 方法；查看后端日志是否有错误。 |
| **4. CORS 中简单请求和非简单请求的区别？** | 简单请求不会触发 OPTIONS，如 GET/POST + 标准 Content-Type；非简单请求（如 PUT、DELETE、自定义 Header）会触发预检。 |
| **5. 如何在 Node.js 或 Nginx 中配置跨域？** | Node.js：设置响应头并处理 OPTIONS；Nginx：通过 `add_header` 添加 CORS 相关字段。 |
