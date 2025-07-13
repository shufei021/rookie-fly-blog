# 前端开发面试题完整答案（含代码示例）


## JavaScript 基础

### 原型和原型链
JavaScript 是基于原型的语言。每个对象（除了null）都有一个内部属性 `[[Prototype]]`（可通过 `__proto__` 访问），指向其构造函数的 `prototype` 对象。多个对象通过原型层层连接形成“原型链”，用于实现继承与共享方法。

```js
function Person() {}
Person.prototype.say = function () {
  console.log("Hello");
};

const p = new Person();
p.say(); // 从原型链上找到 say 方法
```

---

### 事件循环
JavaScript 是单线程语言，事件循环机制确保异步任务有序执行。

流程如下：
1. 执行全局同步代码；
2. 清空微任务队列（Promise.then、MutationObserver）；
3. 执行宏任务（setTimeout、setInterval、I/O）；
4. 循环往复。

```js
console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Microtask");
});

console.log("End");

// 输出顺序: Start -> End -> Microtask -> Timeout
```

---

### 箭头函数和普通函数的区别

| 特性           | 箭头函数                          | 普通函数                  |
|----------------|-----------------------------------|---------------------------|
| `this` 指向    | 外层作用域                        | 调用者                    |
| `arguments`    | 不支持                            | 支持                      |
| `new` 调用     | 不可作为构造函数                  | 可以                      |
| `prototype` 属性 | 无                                | 有                        |
| `super`        | 不支持                            | 支持                      |

---

### 闭包
闭包是指有权访问另一个函数作用域中变量的函数。常用于封装私有变量、计数器等。

```js
function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  };
}

const counter = outer();
counter(); // 1
counter(); // 2
```

---

### 深拷贝和浅拷贝

- **浅拷贝**：只复制对象的第一层属性。
- **深拷贝**：递归复制对象的所有层级属性。

```js
// 浅拷贝示例
const obj = { a: 1, b: { c: 2 } };
const shallowCopy = Object.assign({}, obj);
shallowCopy.b.c = 3;
console.log(obj.b.c); // 3（原对象被修改）

// 深拷贝示例
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj)); // 简单实现
}
```

---

### 防抖和节流

- **防抖**：在事件被触发后等待一段时间，若没有再次触发才执行。
- **节流**：保证函数在一定时间间隔内只执行一次。

```js
// 防抖
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 节流
function throttle(fn, delay) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last > delay) {
      fn.apply(this, args);
      last = now;
    }
  };
}
```

---

### 怎么实现一个深拷贝，思路

```js
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== "object") return obj;
  if (hash.has(obj)) return hash.get(obj); // 处理循环引用
  const clone = Array.isArray(obj) ? [] : {};
  hash.set(obj, clone);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], hash);
    }
  }
  return clone;
}
```

---

### 内存泄漏是什么，怎么导致的

**内存泄漏**：程序申请内存后未能释放，造成内存浪费。常见原因：
- 全局变量未清理；
- 闭包引用外部变量；
- 未清除的定时器；
- 事件监听未解绑；
- DOM 引用未释放。

---

### Promise介绍和实现原理

```js
class MyPromise {
  constructor(executor) {
    // 初始化状态为 pending
    this.state = "pending";
    // 保存成功值
    this.value = undefined;
    // 保存失败原因
    this.reason = undefined;
    // 存储成功回调队列
    this.onFulfilledCallbacks = [];
    // 存储失败回调队列
    this.onRejectedCallbacks = [];

    // 定义 resolve 函数
    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled"; // 更新状态为 fulfilled
        this.value = value; // 保存成功值
        // 异步执行所有成功回调
        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };

    // 定义 reject 函数
    const reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected"; // 更新状态为 rejected
        this.reason = reason; // 保存失败原因
        // 异步执行所有失败回调
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      // 立即执行 executor，并传入 resolve 和 reject
      executor(resolve, reject);
    } catch (e) {
      // 如果 executor 同步抛出异常，直接 reject
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    // 默认值处理：onFulfilled 不存在时返回 identity 函数
    onFulfilled =
      typeof onFulfilled === "function"
        ? onFulfilled
        : (v) => v;
    // 默认值处理：onRejected 不存在时抛出异常
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (e) => {
            throw e;
          };

    // 创建新 Promise 支持链式调用
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.state === "fulfilled") {
        // 如果当前 Promise 已 fulfilled，异步执行 onFulfilled
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolve(x); // 将结果传递给新 Promise
          } catch (e) {
            reject(e); // 如果 onFulfilled 抛出异常，新 Promise 被 reject
          }
        }, 0);
      }

      if (this.state === "rejected") {
        // 如果当前 Promise 已 rejected，异步执行 onRejected
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolve(x); // 将结果传递给新 Promise
          } catch (e) {
            reject(e); // 如果 onRejected 抛出异常，新 Promise 被 reject
          }
        }, 0);
      }

      if (this.state === "pending") {
        // 如果当前 Promise 仍 pending，先将回调加入队列
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolve(x);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolve(x);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }
}
```

---

### 如何实现一个 new

```js
function myNew(constructor, ...args) {
  const obj = Object.create(constructor.prototype);
  const result = constructor.apply(obj, args);
  return typeof result === "object" && result !== null ? result : obj;
}
```

---

### this指向问题

**this 的指向取决于调用方式，而不是定义方式。**

| 调用方式                | `this` 指向                              |
|-------------------------|------------------------------------------|
| 普通函数调用            | 全局对象（非严格模式）或 `undefined`（严格模式） |
| 对象方法调用            | 调用该方法的对象                         |
| 箭头函数                | 定义时外层作用域的 `this`                |
| 构造函数（`new`）       | 新创建的实例对象                         |
| `call`/`apply`/`bind`   | 显式传入的对象                           |
| 事件监听器（普通函数）  | 触发事件的 DOM 元素                      |
| 事件监听器（箭头函数）  | 外层作用域的 `this`                      |


```js
const obj = {
  name: "Alice",
  say: function () {
    console.log(this.name);
  },
};

obj.say(); // Alice (this 指向 obj)

const say = obj.say;
say(); // undefined (this 指向 window/global)

const boundSay = obj.say.bind({ name: "Bob" });
boundSay(); // Bob
```

---

### js有哪些数据类型

**原始类型**：`number`、`string`、`boolean`、`null`、`undefined`、`symbol`、`bigint`  
**引用类型**：`object`（包括 `Array`、`Function`、`Date`、`RegExp` 等）

---

### 大文件上传怎么做

#### 一、实现思路

大文件上传的核心思想是**分片上传**（Chunked Upload）：
1. **文件切片**：将大文件按固定大小（如5MB）拆分成多个小块
2. **并行上传**：逐个或并发上传这些分片
3. **服务端合并**：所有分片上传完成后，由服务端合并成完整文件
4. **断点续传**：通过记录已上传分片，支持中断后继续上传

---

#### 二、代码实现与注释

```javascript
/**
 * 大文件上传主函数
 * @param {File} file - 浏览器File对象
 */
async function uploadLargeFile(file) {
  // 1. 设置分片大小（5MB）
  const chunkSize = 5 * 1024 * 1024; // 5MB
  // 2. 计算总分片数（向上取整）
  const totalChunks = Math.ceil(file.size / chunkSize);
  // 3. 创建分片数组
  const chunks = [];

  // 4. 文件切片处理
  for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSize; // 当前分片起始位置
    const end = Math.min(start + chunkSize, file.size); // 当前分片结束位置
    // 使用File.slice()方法切割分片（兼容性：File API标准）
    chunks.push(file.slice(start, end));
  }

  // 5. 顺序上传分片（可改为并发上传优化速度）
  for (let i = 0; i < chunks.length; i++) {
    await uploadChunk(chunks[i], i, totalChunks); // 等待每个分片上传完成
  }
}

/**
 * 单个分片上传函数
 * @param {Blob} chunk - 分片内容
 * @param {number} index - 分片序号（从0开始）
 * @param {number} total - 总分片数
 */
async function uploadChunk(chunk, index, total) {
  // 6. 创建FormData对象用于上传
  const formData = new FormData();
  // 7. 添加分片文件（名称需与服务端接收参数一致）
  formData.append("file", chunk);
  // 8. 添加分片元数据
  formData.append("index", index);  // 当前分片序号
  formData.append("total", total);  // 总分片数

  // 9. 发送POST请求上传分片
  await fetch("/upload", {
    method: "POST",
    body: formData,
    // 可选：添加进度监听
    // onUploadProgress: (progressEvent) => {
    //   console.log(`上传进度: ${Math.round(
    //     (progressEvent.loaded * 100) / progressEvent.total
    //   )}%`);
    // }
  });
}
```

---

#### 三、关键实现点说明

##### 1. **分片大小选择**
- 5MB 是常见选择（HTTP请求最大推荐大小）
- 根据网络带宽和服务器配置可调整（建议2-10MB）

##### 2. **文件切片技术**
- 使用 `File.slice()` 方法（浏览器原生API）
- 兼容性：现代浏览器均支持（IE10+）

##### 3. **上传策略**
- **顺序上传**：当前实现保证分片顺序，但较慢
- **并发上传**：可用 `Promise.all()` 并发处理
- **断点续传**：需服务端记录已上传分片

##### 4. **服务端要求**
- 需支持接收分片并记录分片信息
- 最终需提供合并接口（如 `/merge`）
- 示例响应格式：
  ```json
  {
    "status": "success",
    "chunkIndex": 3,
    "totalChunks": 20
  }
  ```

---

#### 四、优化建议

##### 1. **并发上传优化**
```javascript
// 替换顺序上传为并发上传
await Promise.all(chunks.map((chunk, i) => 
  uploadChunk(chunk, i, totalChunks)
));
```

##### 2. **断点续传实现**
1. 首次上传前请求 `/check-chunks`
2. 服务端返回已存在的分片索引
3. 客户端跳过已存在的分片

##### 3. **上传进度追踪**
```javascript
// 在fetch中添加进度监听
const controller = new AbortController();
const upload = fetch("/upload", {
  signal: controller.signal,
  //...
});

// 监听进度
upload.then(() => {
  console.log(`分片 ${index} 上传完成`);
});
```

#### 4. **错误重试机制**
```javascript
// 添加重试逻辑
async function uploadChunkWithRetry(...args) {
  const MAX_RETRIES = 3;
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      return await uploadChunk(...args);
    } catch (error) {
      if (i === MAX_RETRIES - 1) throw error;
      console.log(`重试第 ${i + 1} 次...`);
    }
  }
}
```

---

#### 五、完整工作流程

```
[客户端]          [服务端]
1. 文件切片        ← 接收分片请求
2. 顺序/并发上传    → 接收分片并存储
3. 收到全部分片    ← 请求合并分片
4. 调用 /merge 接口 → 合并文件
5. 返回最终文件URL
```

---

#### 六、注意事项

1. **CORS配置**：确保服务端允许跨域上传
2. **文件类型校验**：上传前应验证MIME类型
3. **文件大小限制**：服务端需设置合理的上传大小限制
4. **安全性**：建议添加上传凭证（token）和签名验证
5. **清理机制**：未完成的分片需要定时清理

```js
async function uploadLargeFile(file) {
  const chunkSize = 5 * 1024 * 1024; // 5MB
  const totalChunks = Math.ceil(file.size / chunkSize);
  const chunks = [];

  for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    chunks.push(file.slice(start, end));
  }

  for (let i = 0; i < chunks.length; i++) {
    await uploadChunk(chunks[i], i, totalChunks);
  }
}

async function uploadChunk(chunk, index, total) {
  const formData = new FormData();
  formData.append("file", chunk);
  formData.append("index", index);
  formData.append("total", total);

  await fetch("/upload", {
    method: "POST",
    body: formData,
  });
}
```

---

### 首屏优化怎么做

1. **减少请求数量**：合并 CSS/JS、使用雪碧图；
2. **图片懒加载**：使用 `loading="lazy"`；
3. **静态资源 CDN**；
4. **启用 Gzip 压缩**；
5. **SSR 或预渲染**；
6. **骨架屏**；
7. **Tree Shaking 削减冗余代码**；
8. **Webpack Code Splitting 按需加载**。

---

### 浏览器输入 URL 到渲染过程

[PDF查看详细流程](../.vitepress/theme/pdf/1.pdf)

1. 输入 URL，解析协议、域名、路径；
2. DNS 解析，获取 IP 地址；
3. 建立 TCP 连接（三次握手）；
4. 发起 HTTP 请求；
5. 服务器接收请求并返回响应；
6. 浏览器解析 HTML，构建 DOM 树；
7. 解析 CSS，构建 CSSOM；
8. 构建 Render Tree；
9. Layout（布局计算）；
10. Paint（绘制）；
11. Composite（合成）；
12. 页面呈现。

---

## Vue.js 相关

### Vue 的双向数据绑定原理

Vue 的双向绑定核心是通过 `Object.defineProperty`（Vue2）或 `Proxy`（Vue3）劫持数据的读写操作，并结合发布订阅模式实现。

```js
// Vue2 实现
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      return val;
    },
    set(newVal) {
      if (val !== newVal) {
        val = newVal;
        console.log("数据更新了");
      }
    },
  });
}

const data = { name: "Vue" };
defineReactive(data, "name", data.name);
data.name = "Vue3"; // 控制台输出 "数据更新了"
```

---

### Vue 的生命周期有哪些及每个生命周期做了什么

| 生命周期钩子 | 描述 |
|--------------|------|
| `beforeCreate` | 实例初始化之后，数据观测和事件配置之前 |
| `created` | 实例创建完成，数据观测、属性和方法的运算、watch/event 事件回调建立 |
| `beforeMount` | 模板编译挂载之前 |
| `mounted` | 模板编译挂载完成 |
| `beforeUpdate` | 数据更新时，虚拟 DOM 重新渲染之前 |
| `updated` | 虚拟 DOM 重新渲染之后 |
| `beforeUnmount` | 实例销毁之前 |
| `unmounted` | 实例销毁之后 |

---

### Vue 的自定义指令用过吗，有哪些

- `v-focus`：自动聚焦输入框；
- `v-permission`：权限控制；
- `v-lazy`：图片懒加载；
- `v-throttle`：防抖节流；
- `v-draggable`：拖拽行为。

```js
// 注册自定义指令 v-focus
app.directive("focus", {
  mounted(el) {
    el.focus();
  },
});
```

---

### Vue 如何优化 SEO

- **SSR（服务端渲染）**：使用 Nuxt.js 实现首屏直出；
- **预渲染（Prerendering）**：静态站点可用 `prerender-spa-plugin`；
- **Meta 标签动态注入**：使用 `vue-meta` 管理 meta 信息；
- **结构语义化标签**：合理使用 `h1~h6`、`nav`、`main` 等；
- **服务端渲染 + 客户端激活（Hydration）**：兼顾性能与 SEO。

---

### Vue2 和 Vue3 的区别

| 特性 | Vue2 | Vue3 |
|------|------|------|
| 响应式系统 | `Object.defineProperty` | `Proxy` |
| Composition API | 无 | 有 |
| Tree Shaking | 有限 | 支持 |
| 性能 | 较低 | 更高 |
| 模块化 | 无 | 支持 |
| 类型支持 | 无 | 支持 TypeScript |

---

### Vue 的组件通信方式有哪些及原理

1. **props / $emit**：父传子、子传父；
2. **$root / $parent / $children**：跨级通信；
3. **EventBus**：非父子组件通信；
4. **Vuex / Pinia**：全局状态管理；
5. **provide / inject**：跨层级通信；
6. **$attrs / $listeners**：传递非 props 属性和事件。

---

### Vue 的路由实现，hash 路由和 history 路由实现原理

- **Hash 路由**：通过 URL 的 `#` 后面的字符变化实现路由，不触发页面刷新。
- **History 路由**：使用 HTML5 的 `pushState` 和 `replaceState` 方法，URL 更美观，但需要服务器配置支持。

---

## React.js 相关

### Vue 和 React 的区别

| 维度 | Vue | React |
|------|-----|--------|
| 框架类型 | 渐进式框架 | 类库 |
| 数据绑定 | 双向绑定 | 单向数据流 |
| 模板语法 | HTML 模板 | JSX |
| 响应式系统 | 响应式系统（Proxy/Object.defineProperty） | `setState` + 不可变数据 |
| 状态管理 | Vuex/Pinia | Redux/MobX |
| 学习曲线 | 简单 | 相对复杂 |

---

### React 用过哪些 hooks

- `useState`：状态管理；
- `useEffect`：副作用处理；
- `useContext`：获取上下文；
- `useReducer`：复杂状态逻辑；
- `useCallback`：缓存函数；
- `useMemo`：缓存计算结果；
- `useRef`：获取 DOM 或保存状态；
- `useLayoutEffect`：同步执行副作用；
- 自定义 Hook：封装复用逻辑。

---

## 前端工程化

### Webpack 的构建流程

1. 初始化参数：读取配置文件，合并默认参数；
2. 入口分析：根据 `entry` 找到入口模块；
3. 编译模块：使用 loader 转换不同类型的资源；
4. 依赖收集：递归解析模块依赖，构建依赖图；
5. 优化打包：Tree Shaking、代码分割（Code Splitting）、合并 chunk；
6. 输出资源：将最终资源写入 `dist` 目录。

# 前端模块化详解

## 一、什么是前端模块化？
前端模块化是将复杂的前端代码拆分成独立、可复用的模块的开发方式，就像乐高积木一样，每个模块有明确的功能和接口，可以单独开发、测试和维护，最后组合成完整应用。

## 二、为什么需要模块化？
1. **解决命名冲突**：避免全局变量污染
2. **提高复用性**：模块可以在不同项目中重复使用
3. **便于维护**：代码结构清晰，依赖关系明确
4. **利于团队协作**：不同开发者可以并行开发不同模块

## 三、主流模块化方案

### 1. CommonJS (Node.js 默认)
```javascript
// 导出
module.exports = {
  add: function(a, b) { return a + b }
}

// 导入
const math = require('./math');
math.add(1, 2);
```
特点：
- 同步加载
- 主要用于服务端
- 模块输出的是值的拷贝

### 2. AMD (RequireJS)
```javascript
// 定义模块
define(['dep1', 'dep2'], function(dep1, dep2) {
  return {
    method: function() {
      dep1.doSomething();
    }
  }
});

// 加载模块
require(['module'], function(module) {
  module.method();
});
```
特点：
- 异步加载
- 适合浏览器环境
- 推崇依赖前置

### 3. ES Modules (ES6 标准)
```javascript
// 导出
export const name = 'module';
export function hello() { /*...*/ }

// 默认导出
export default function() { /*...*/ }

// 导入
import { name, hello } from './module';
import myModule from './module';
```
特点：
- 浏览器和Node.js都支持
- 编译时静态分析
- 模块输出的是值的引用
- 支持动态导入 `import()`

## 四、模块化工具链
1. **打包工具**：Webpack、Rollup、Parcel
   - 将模块打包成浏览器可运行的代码
   - 处理依赖关系和资源加载

2. **模块加载器**：SystemJS
   - 在浏览器中直接加载各种模块格式

3. **包管理器**：npm、yarn、pnpm
   - 管理模块依赖和版本

## 五、现代前端模块化实践
1. **组件化开发**：Vue/React组件就是模块化的延伸
2. **微前端**：将整个应用拆分为独立模块
3. **Monorepo**：多个模块放在一个仓库管理
4. **Tree Shaking**：ES Modules支持删除未使用代码

## 六、选择建议
1. 新项目首选 **ES Modules**
2. Node.js 项目使用 **CommonJS**
3. 旧浏览器兼容考虑 **AMD + RequireJS**
4. 大型应用使用 **Webpack/Rollup** 打包

模块化是现代前端工程的基石，理解不同方案的特点能帮助你在不同场景做出合理选择。

### Axios 实现原理？Axios 封装

```js
// 封装 Axios
const service = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

// 请求拦截
service.interceptors.request.use(
  (config) => {
    config.headers.token = localStorage.getItem("token");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 200) {
      ElMessage.error(res.message || "Error");
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    ElMessage.error(error.message);
    return Promise.reject(error);
  }
);

export default service;
```

---

### 微前端 和 低代码

- **微前端**：将多个独立前端应用组合成一个整体，常用方案：`qiankun`、`iframe`、`Web Component`。
- **低代码平台**：提供可视化拖拽界面，快速搭建页面和业务逻辑，典型产品：阿里云 `Lowcode`、百度 `H5lowcode`。

---

## 安全与性能

### 前端性能优化

1. **加载优化**：懒加载、预加载、CDN、压缩、资源合并；
2. **渲染优化**：虚拟滚动、骨架屏、减少重绘回流、防抖节流；
3. **网络优化**：启用 HTTP/2、开启 Gzip、合理使用缓存；
4. **代码优化**：Tree Shaking、代码拆分、避免内存泄漏；
5. **第三方库优化**：按需引入、封装通用组件。

#### **一、加载优化**
1. **懒加载（Lazy Load）**  
   - **原理**：延迟加载非关键资源（如图片、视频、长列表），直到用户需要时才加载。  
   - **实现方式**：  
     - 使用 `Intersection Observer API` 监听元素是否进入视口（如图片加载）。  
     - 原生 HTML 属性：`<img loading="lazy">` 自动实现图片懒加载。  
   - **适用场景**：电商页面的商品图片、长列表数据、非首屏内容。  
   - **效果**：减少首屏资源体积，提升 FCP（首次内容绘制）和 LCP（最大内容绘制）指标。

2. **预加载（Preload）**  
   - **原理**：在浏览器空闲时提前加载关键资源（如字体、CSS、JS），减少后续请求延迟。  
   - **实现方式**：  
     - HTML 标签：`<link rel="preload" href="..." as="style/script/image">`。  
     - JavaScript 动态加载：`new Image().src = "..."` 预加载图片。  
   - **适用场景**：首屏依赖的 CSS/JS 文件、即将跳转的页面资源。  
   - **效果**：缩短 TTI（可交互时间），提升用户感知速度。

3. **CDN 加速**  
   - **原理**：通过全球分布的 CDN 节点缓存静态资源，就近响应用户请求。  
   - **实现方式**：  
     - 将静态资源（图片、CSS、JS）部署到 CDN 服务（如讯维中国 CDN）。  
     - 配置 CDN 的缓存策略（TTL、ETag）。  
   - **效果**：减少跨区域网络延迟，提升全球用户的访问速度，降低源站负载。

4. **资源压缩**  
   - **代码压缩**：  
     - 使用工具（如 UglifyJS、Terser）压缩 JS/HTML/CSS，移除空格、注释，缩短变量名。  
   - **图片优化**：  
     - 使用 WebP/AVIF 格式替代 JPEG/PNG，减小体积（如 TinyPNG 工具）。  
     - 设置图片响应式（`srcset`）适配不同设备分辨率。  
   - **效果**：减少传输体积，提升 TTFB（首字节时间）和 LCP 指标。

5. **资源合并**  
   - **原理**：将多个小文件合并为一个文件，减少 HTTP 请求次数。  
   - **实现方式**：  
     - 合并 CSS/JS 文件（如 Webpack 的 `ConcatenateModules`）。  
     - 使用雪碧图（Sprite）合并小图标。  
   - **注意事项**：避免过度合并导致单个文件过大，需平衡请求次数和资源体积。  
   - **效果**：减少 DNS 解析和 TCP 握手时间，提升首屏加载速度。

---

#### **二、渲染优化**
1. **虚拟滚动（Virtual Scroll）**  
   - **原理**：仅渲染当前视口内的数据项，动态更新可视区域内容。  
   - **实现方式**：  
     - Vue/React 示例：通过 `transform: translateY(...)` 定位可见项，监听滚动事件更新数据。  
     - 第三方库：`vue-virtual-scroll-list` 或 `react-window`。  
   - **效果**：减少 DOM 节点数量，避免内存溢出，提升长列表渲染性能。

2. **骨架屏（Skeleton Screen）**  
   - **原理**：用灰色占位符模拟页面结构，等待实际内容加载后替换。  
   - **实现方式**：  
     - CSS 动画：`@keyframes` 实现渐变效果。  
     - 框架组件：Vue/React 条件渲染（如 `v-if` 判断数据是否加载）。  
   - **效果**：减少用户感知空白时间，提升 CLS（累积布局偏移）指标。

3. **减少重绘与回流（Reflow/Repaint）**  
   - **原理**：避免频繁修改 DOM 属性，减少浏览器重新计算布局和绘制。  
   - **优化策略**：  
     - 使用 `transform` 和 `opacity` 替代 `top/left` 实现动画。  
     - 批量修改 DOM（如 `DocumentFragment` 或 `requestAnimationFrame`）。  
     - 避免频繁读取 `offsetHeight` 等触发回流的属性。  
   - **效果**：降低主线程阻塞时间（TBT），提升 FID（首次输入延迟）。

4. **防抖与节流（Debounce/Throttle）**  
   - **防抖（Debounce）**：在事件被触发后等待一段时间再执行（如搜索输入框）。  
   - **节流（Throttle）**：限制事件触发频率（如滚动事件）。  
   - **实现方式**：  
     ```javascript
     // 防抖示例
     function debounce(fn, delay) {
       let timer;
       return (...args) => {
         clearTimeout(timer);
         timer = setTimeout(() => fn(...args), delay);
       };
     }

     // 节流示例
     function throttle(fn, delay) {
       let lastCall = 0;
       return (...args) => {
         const now = Date.now();
         if (now - lastCall >= delay) {
           lastCall = now;
           fn(...args);
         }
       };
     }
     ```
   - **效果**：减少不必要的事件触发，优化性能。

---

#### **三、网络优化**
1. **启用 HTTP/2**  
   - **原理**：支持多路复用、头部压缩和服务器推送，减少连接开销。  
   - **实现方式**：  
     - 服务器配置（如 Nginx 的 `listen 443 ssl http2;`）。  
     - 合理分离资源（不再强制合并 CSS/JS）。  
   - **效果**：提升资源加载并行度，减少 TTFB。

2. **开启 Gzip/Brotli 压缩**  
   - **原理**：压缩文本资源（HTML、CSS、JS）减少传输体积。  
   - **实现方式**：  
     - 服务器配置 Gzip（如 Nginx 的 `gzip on;`）。  
     - 使用 Brotli 压缩替代 Gzip（更高压缩率）。  
   - **效果**：显著减少传输数据量，提升加载速度。

3. **合理使用缓存**  
   - **缓存策略**：  
     - 强缓存：`Cache-Control: max-age=31536000`（长期缓存静态资源）。  
     - 协商缓存：`ETag` 和 `Last-Modified` 验证资源是否更新。  
   - **Service Workers**：  
     - 拦截请求并返回缓存资源（离线访问）。  
     - 预缓存关键资源（如 PWA 应用）。  
   - **效果**：减少重复请求，提升二次访问速度。

---

#### **四、代码优化**
1. **Tree Shaking**  
   - **原理**：移除未使用的代码（ES6 模块支持）。  
   - **实现方式**：  
     - Webpack 配置：`optimization.usedExports: true`。  
     - 构建工具自动分析依赖树并删除冗余代码。  
   - **效果**：减小打包体积，提升加载性能。

2. **代码拆分（Code Splitting）**  
   - **原理**：按需加载代码（如路由懒加载、动态导入）。  
   - **实现方式**：  
     - React：`React.lazy + Suspense`。  
     - Webpack：`splitChunks` 分离公共代码。  
   - **效果**：减少首屏加载资源，提升 TTI。

3. **避免内存泄漏**  
   - **常见原因**：  
     - 未清理的事件监听器（如 `resize`、`scroll`）。  
     - 闭包中引用 DOM 元素导致无法回收。  
   - **优化策略**：  
     - 在组件卸载时移除监听器（如 `componentWillUnmount`）。  
     - 使用弱引用（WeakMap）或 WeakSet 存储非关键数据。  
   - **效果**：降低内存占用，避免页面崩溃。

---

#### **五、第三方库优化**
1. **按需引入**  
   - **原理**：只加载需要的功能模块，避免引入完整库。  
   - **实现方式**：  
     - Lodash：`import { debounce } from 'lodash'` 而非 `import _ from 'lodash'`。  
     - UI 框架：按需加载组件（如 Element Plus 的 `use` 方法）。  
   - **效果**：减少打包体积，提升加载速度。

2. **封装通用组件**  
   - **原理**：将重复功能抽象为可复用组件，减少冗余代码。  
   - **实现方式**：  
     - 封装按钮、模态框、表单验证等通用组件。  
     - 使用设计系统（Design System）统一风格和交互逻辑。  
   - **效果**：提高开发效率，降低维护成本。

---

### 单点登录

SSO 是一种身份认证机制，允许用户一次登录即可访问多个系统。常见方案包括：

- **OAuth2.0**：授权码模式、隐式模式；
- **JWT + 中央认证服务**；
- **CAS、SAML** 等企业级方案。

---

### TypeScript 的了解

TypeScript 是 JavaScript 的超集，提供了类型系统、接口、泛型、装饰器等高级功能。熟悉常用类型定义、联合类型、交叉类型、类型推断、类型守卫、命名空间、模块化开发等。

---

### 封装的按钮权限组件怎么实现

```vue
<template>
  <button v-if="hasPermission">提交</button>
</template>

<script>
export default {
  props: ["requiredRole"],
  computed: {
    hasPermission() {
      return this.$store.getters.roles.includes(this.requiredRole);
    },
  },
};
</script>
```

---

## CSS/布局

### 垂直居中的方式

1. **Flexbox**：
   ```css
   .container {
     display: flex;
     align-items: center;
     justify-content: center;
   }
   ```

2. **Grid**：
   ```css
   .container {
     display: grid;
     place-items: center;
   }
   ```

3. **绝对定位 + transform**：
   ```css
   .box {
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
   }
   ```

---

### 回流和重绘

- **回流（Reflow）**：当 DOM 元素布局发生变化，浏览器重新计算布局。
- **重绘（Repaint）**：元素外观改变，不改变布局。

优化建议：
- 减少 DOM 操作次数；
- 使用 `requestAnimationFrame`；
- 避免频繁访问 `offsetWidth` 等布局属性；
- 动画使用 `transform`、`opacity`，避免触发回流。

---

## ES6+ 新特性

### ES6 新增特性

- `let` / `const`；
- 箭头函数；
- 模板字符串；
- 解构赋值；
- 默认参数；
- rest 参数；
- 扩展运算符；
- 类；
- 模块化；
- `Promise`；
- `Symbol`；
- `Set` / `Map`；
- 迭代器与生成器；
- `Proxy` / `Reflect`；
- `async`/`await`。

---

## 其他

### 跨域是什么？怎么解决？JSONP 如何做到的

- **跨域**：浏览器出于安全考虑，限制从一个源加载的脚本请求另一个源资源。
- **解决方式**：
  - 后端设置 CORS（推荐）；
  - 代理服务器（前后端同源）；
  - JSONP（仅限 GET 请求）；
  - WebSocket；
  - `postMessage`（跨窗口通信）。
- **JSONP 原理**：利用 `<script>` 标签不受同源策略限制，动态创建 `script` 标签，传入 `callback` 函数名，服务器返回 JS 执行函数并传入数据。


## CSS

###  BFC

BFC 是块级格式化上下文，它是页面上的一个独立渲染区域，决定了元素如何布局及与其他元素交互。BFC 有几个重要特性：1) 内部元素垂直排列；2) 外边距在同一个 BFC 内会折叠；3) 可以包含浮动元素；4) 不与浮动元素重叠。

常见的创建 BFC 的方法包括设置 overflow: hidden、float、position: absolute 等。实际开发中常用 BFC 来解决外边距重叠、清除浮动和实现自适应布局等问题。例如，使用 overflow: hidden 可以让父元素包含浮动子元素，避免高度塌陷

**完全正确！** 你的理解非常到位，BFC 本质上就是一个用「独立规则」解决布局问题的利器。就像你总结的：

### ✅ BFC 的三大实战作用：
1. **解决外边距重叠**  
   - *比喻*：给两个打架的人（相邻元素）中间砌一堵墙（BFC），他们就不会胳膊碰胳膊（margin 合并）了。

2. **解决高度塌陷**  
   - *比喻*：浮动元素像气球飘在空中，普通容器是漏底的篮子。BFC 则是个密封玻璃箱，气球飘再高也会被算进箱子的高度。

3. **阻止文字环绕**  
   - *比喻*：浮动元素像横着躺的霸道乘客，普通文字只能挤着坐。BFC 则是另开一排座位，保持安全距离。

### 🌟 你的理解进阶版：
BFC 就像 CSS 世界的「防暴警察」：
- **随身携带三件法宝**：  
  🛡️ 防 margin 合并的盾牌  
  📏 量高度时包含浮动的尺子  
  🚧 阻止文字环绕的隔离带  

- **出警条件**：当遇到你说的这三种布局乱象时，用 `overflow: hidden` 等任意方式召唤 BFC 即可！

这种理解方式既准确又实用，下次写 CSS 时直接想："这里需不需要派 BFC 警察来维持秩序？" 🚔

