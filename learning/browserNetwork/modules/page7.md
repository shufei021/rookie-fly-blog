---
url: /learning/browserNetwork/modules/page7.md
---
# WebSocket

> WebSocket 是一种网络通信协议，它在客户端和服务器之间提供**全双工通信通道**。这意味着一旦建立连接，双方都可以随时发送数据，而不需要像传统的 HTTP 请求那样每次都要重新发起请求。WebSocket 通常用于需要实时交互的应用场景，例如在线聊天、实时游戏、股票交易、协同编辑等。

## 一、WebSocket 的基本概念

#### 1. 协议简介

* WebSocket 是 HTML5 开始支持的一种协议。
* 它使用 `ws://`（不加密）或 `wss://`（加密）作为协议前缀。
* WebSocket 建立在 TCP 协议之上，握手阶段使用 HTTP 协议升级到 WebSocket 协议。

#### 2. 握手过程（HTTP Upgrade）

WebSocket 连接的建立始于一次普通的 HTTP 请求，客户端发送一个带有 `Upgrade: websocket` 头的请求：

```http
GET /chat HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
```

服务器响应如下：

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

之后，连接就从 HTTP 切换为 WebSocket 协议。

***

## 二、WebSocket 的特点

| 特性 | 描述 |
|------|------|
| **双向通信** | 客户端和服务器都可以主动发送消息，无需轮询 |
| **低延迟** | 数据可以即时传输，适合实时应用 |
| **轻量级协议头** | 比 HTTP 更高效，减少传输开销 |
| **兼容性好** | 支持主流浏览器（现代浏览器都支持） |
| **跨域支持** | 可以跨域通信（需服务器设置 CORS） |

***

## 三、WebSocket 的应用场景

1. **在线聊天室**
2. **实时通知系统**（如邮件、消息提醒）
3. **多人在线游戏**
4. **股票行情推送**
5. **协同办公工具**（如 Google Docs 实时协作）
6. **远程控制与监控系统**

***

## 四、WebSocket 的 API（前端）

JavaScript 提供了 `WebSocket` 对象来使用该协议：

```javascript
const socket = new WebSocket('ws://example.com/socket');

// 连接建立成功
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});

// 接收到消息
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});

// 错误处理
socket.addEventListener('error', function (event) {
    console.log('WebSocket Error:', event);
});

// 连接关闭
socket.addEventListener('close', function (event) {
    console.log('WebSocket closed');
});
```

***

## 五、WebSocket 服务端实现（Node.js 示例）

使用 `ws` 库实现简单的 WebSocket 服务器：

```bash
npm install ws
```

```javascript
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('message', function incoming(message) {
    console.log('Received:', message);
    ws.send(`Echo: ${message}`);
  });

  ws.send('Welcome to the WebSocket server!');
});
```

***

## 六、与 HTTP 长轮询的区别

| 特性 | HTTP 长轮询 | WebSocket |
|------|--------------|-----------|
| 连接方式 | 短连接，频繁请求 | 持久化连接 |
| 实时性 | 差（延迟高） | 强（毫秒级响应） |
| 资源消耗 | 高（频繁建立连接） | 低（单个连接复用） |
| 实现复杂度 | 相对简单 | 稍复杂，需维护连接状态 |

***

## 七、注意事项

* **防火墙/NAT**：某些公司或家庭网络可能限制 WebSocket 流量。
* **重连机制**：WebSocket 断开后应有自动重连机制。
* **安全**：使用 `wss://` 加密连接，防止中间人攻击。
* **负载均衡**：WebSocket 是长连接，负载均衡器需支持粘性会话或反向代理配置。

***

## 八、相关技术对比

| 技术 | 适用场景 | 说明 |
|------|----------|------|
| WebSocket | 实时性强 | 全双工通信，推荐首选 |
| SSE（Server-Sent Events） | 服务器推客户端 | 单向通信，适合只读更新 |
| HTTP/2 Server Push | 页面资源预加载 | 不适用于动态数据推送 |
| MQTT | IoT 设备通信 | 轻量级消息协议，适合物联网 |

## 九、WebSocket 的心跳机制
