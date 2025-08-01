
# 状态码详解

> 状态码通常是指在计算机网络中，特别是HTTP协议中，服务器对客户端请求的响应状态的一个三位数字代码。这些状态码帮助开发者理解请求处理的结果，从而进行相应的处理。以下是常见的几类HTTP状态码及其含义：

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

每种状态码都有其特定的应用场景，了解它们有助于更有效地调试和优化Web应用程序。