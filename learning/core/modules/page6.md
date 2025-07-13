---
url: /learning/core/modules/page6.md
---
# CommonJS 与模块化

## 🧠 一、什么是模块化？

模块化是一种将代码划分为独立、可复用部分的编程范式。它的目的是：

* **解耦**：减少模块之间的依赖
* **可维护性**：便于调试和更新
* **复用性**：可以在多个项目中重复使用

JavaScript 原生并不支持模块化，直到 ES6 才正式引入模块标准（ES Module）。

***

## 📦 二、CommonJS 是什么？

**CommonJS** 是一种模块化规范，最初是为了解决 Node.js 中的模块问题而提出的。

### 特点：

* 使用 `require()` 同步加载模块
* 使用 `module.exports` 和 `exports` 导出模块
* 主要用于服务端（Node.js）

### 示例：

```javascript
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

### 优点：

* 简单易懂，语法清晰
* Node.js 的默认模块系统

### 缺点：

* **同步加载**，不适合浏览器环境
* 不利于异步加载或按需加载

***

## 🌐 三、ES Module（ESM）

ES6 引入了官方模块系统 —— **ECMAScript Module（ESM）**

### 特点：

* 使用 `import` / `export` 语法
* 支持异步加载
* 静态分析能力强，适合 Tree Shaking

### 示例：

```javascript
// math.js
export function add(a, b) {
  return a + b;
}

// app.js
import { add } from './math.js';
console.log(add(1, 2));
```

### 优点：

* 官方标准，未来主流
* 支持异步加载
* 可以做静态优化（如 Tree Shaking）

### 缺点：

* 浏览器兼容性早期较差（现已广泛支持）
* 不能直接在旧版 Node.js 中使用（需要配置 type="module"）

***

## 🔁 四、CommonJS 与 ESM 的区别

| 特性 | CommonJS | ESM |
|------|----------|-----|
| 加载方式 | 同步 | 异步 |
| 语法 | `require()` / `module.exports` | `import` / `export` |
| 运行环境 | Node.js | 浏览器 & Node.js |
| 是否可动态导入 | ✅ | ❌（但可通过 `import()` 动态加载） |
| 是否支持 Tree Shaking | ❌ | ✅ |

***

## 🚀 五、模块化的发展历史简述

1. **无模块时代**：全局变量污染严重
2. **IIFE（立即执行函数）**：解决命名冲突
3. **AMD（Asynchronous Module Definition）**：适用于浏览器，如 RequireJS
4. **CMD（Common Module Definition）**：SeaJS 提出，类似 AMD
5. **CommonJS**：Node.js 默认模块系统
6. **ES Module（ES6）**：现代 JS 标准模块系统

***

## 💡 六、实际应用中的选择建议

| 场景 | 推荐模块系统 |
|------|----------------|
| Node.js 项目（旧版本） | CommonJS |
| Node.js 项目（v14+） | ESM（推荐） |
| Web 项目（现代框架如 Vue/React） | ESM |
| 需要做 Tree Shaking | ESM |
| 需要动态导入模块 | `import()`（ESM 的动态导入）|

***

## 🧪 七、常见面试题总结

### 1. 说说你对模块化的理解？

> 模块化是将一个复杂的系统拆分成多个独立的小单元，每个模块只关注自己的功能，提高可维护性和复用性。

### 2. CommonJS 和 ESM 有什么区别？

> 见上表对比。

### 3. 为什么 Node.js 最初使用 CommonJS 而不是 ESM？

> 因为 ES6 出现较晚，在那之前 Node.js 已经采用 CommonJS。而且服务器端更适合同步加载模块。

### 4. 如何在 Node.js 中使用 ESM？

> 在 `package.json` 中设置 `"type": "module"`，并使用 `.mjs` 扩展名或配合构建工具。

### 5. import 和 require 的本质区别是什么？

> `require` 是运行时加载，`import` 是编译时加载，可以进行静态分析。

***

## 📌 总结一句话：

> **CommonJS 是 Node.js 的模块规范，强调同步加载；ES Module 是 JS 官方标准模块系统，强调异步加载和静态分析。随着技术发展，ES Module 正在逐步取代 CommonJS 成为主流。**

## Webpack 如何处理 CommonJS 和 ESM 模块

Webpack 是一个非常强大的模块打包工具，能够处理多种模块系统，包括 CommonJS 和 ECMAScript Modules (ESM)。下面我将解释 Webpack 如何处理这两种模块系统。

### CommonJS 处理

在使用 CommonJS 模块时，你可以通过 `require` 来导入模块，并使用 `module.exports` 或 `exports` 导出模块。Webpack 原生支持 CommonJS 规范，可以无缝地解析和打包这类模块。

* **导入模块**：使用 `require()` 函数来引入其他模块。
* **导出模块**：使用 `module.exports` 或者 `exports` 对象来定义模块的输出。

例如：

```javascript
// math.js
module.exports = {
  add: function(a, b) { return a + b; }
};

// app.js
const math = require('./math');
console.log(math.add(1, 2)); // 输出 3
```

当 Webpack 遇到上述代码时，它会自动解析 `require` 调用，并将其转换为适当的依赖关系，最终生成一个或多个打包文件。

### ESM 处理

对于 ESM，即 ECMAScript 官方的模块系统，Webpack 同样提供了良好的支持。ESM 使用 `import` 和 `export` 关键字来分别导入和导出模块。

* **导入模块**：使用 `import` 语句。
* **导出模块**：使用 `export` 关键字。

例如：

```javascript
// math.js
export function add(a, b) {
  return a + b;
}

// app.js
import { add } from './math';
console.log(add(1, 2)); // 输出 3
```

Webpack 可以很好地理解这些 ESM 的语法，并将它们正确地解析为依赖关系。

### 兼容性处理

值得注意的是，Webpack 不仅支持单一类型的模块系统，而且可以在同一个项目中混合使用 CommonJS 和 ESM。这意味着你可以在一个文件中使用 `require`，同时在另一个文件中使用 `import`，Webpack 都能正确处理。

此外，Webpack 还支持动态导入（dynamic import），这是一种异步加载模块的方式，可以通过 `import()` 函数实现。这种方式不仅适用于 ESM，也可以与 CommonJS 模块一起使用，从而提供更灵活的代码分割和懒加载能力。

### 总结

无论是 CommonJS 还是 ESM，Webpack 都能有效地进行处理。它通过其内部的解析逻辑，将不同类型的模块请求转化为实际的文件依赖，并最终将整个应用打包成一个或多个文件。这使得开发者可以根据需要选择最合适的模块系统，或者在同一项目中结合使用两者，而无需担心兼容性问题。
