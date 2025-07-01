# 前端开发面试题完整答案（含代码示例）


## JavaScript 基础

### 原型和原型链
JavaScript 是基于原型的语言。每个对象都有一个内部属性 `[[Prototype]]`（可通过 `__proto__` 访问），指向其构造函数的 `prototype` 对象。多个对象通过原型层层连接形成“原型链”，用于实现继承与共享方法。

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
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };

    const reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (e) => {
            throw e;
          };

    const promise2 = new MyPromise((resolve, reject) => {
      if (this.state === "fulfilled") {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolve(x);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.state === "rejected") {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolve(x);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.state === "pending") {
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

---

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


