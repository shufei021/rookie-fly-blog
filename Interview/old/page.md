---
url: /Interview/old/page.md
---
# 温故而知新

## JavsScript 相关

### 箭头函数和普通函数的区别

| 特性           | 箭头函数                          | 普通函数                  |
|----------------|-----------------------------------|---------------------------|
| `this` 指向    | 外层作用域                        | 调用者                    |
| `arguments`    | 不支持                            | 支持                      |
| `new` 调用     | 不可作为构造函数                  | 可以                      |
| `prototype` 属性 | 无                                | 有                        |
| `super`        | 不支持                            | 支持                      |

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

***

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

***

### Vue 的自定义指令用过吗，有哪些

* `v-focus`：自动聚焦输入框；
* `v-permission`：权限控制；
* `v-lazy`：图片懒加载；
* `v-throttle`：防抖节流；
* `v-draggable`：拖拽行为。

```js
// 注册自定义指令 v-focus
app.directive("focus", {
  mounted(el) {
    el.focus();
  },
});
```

***

### Vue 如何优化 SEO

* **SSR（服务端渲染）**：使用 Nuxt.js 实现首屏直出；
* **预渲染（Prerendering）**：静态站点可用 `prerender-spa-plugin`；
* **Meta 标签动态注入**：使用 `vue-meta` 管理 meta 信息；
* **结构语义化标签**：合理使用 `h1~h6`、`nav`、`main` 等；
* **服务端渲染 + 客户端激活（Hydration）**：兼顾性能与 SEO。

***

### Vue2 和 Vue3 的区别

| 特性 | Vue2 | Vue3 |
|------|------|------|
| 响应式系统 | `Object.defineProperty` | `Proxy` |
| Composition API | 无 | 有 |
| Tree Shaking | 有限 | 支持 |
| 性能 | 较低 | 更高 |
| 模块化 | 无 | 支持 |
| 类型支持 | 无 | 支持 TypeScript |

***

### Vue 的组件通信方式有哪些及原理

1. **props / $emit**：父传子、子传父；
2. **$root / $parent / $children**：跨级通信；
3. **EventBus**：非父子组件通信；
4. **Vuex / Pinia**：全局状态管理；
5. **provide / inject**：跨层级通信；
6. **$attrs / $listeners**：传递非 props 属性和事件。

***

### Vue 的路由实现，hash 路由和 history 路由实现原理

* **Hash 路由**：通过 URL 的 `#` 后面的字符变化实现路由，不触发页面刷新。
* **History 路由**：使用 HTML5 的 `pushState` 和 `replaceState` 方法，URL 更美观，但需要服务器配置支持。

### keep-alive的实现原理和常用属性

`<keep-alive>` 是 Vue.js 中的一个抽象组件，它用于缓存动态组件实例，从而避免重复渲染和销毁过程，提高用户体验和性能。下面是 `<keep-alive>` 的一些常用属性及其简要说明：

#### 常用属性

1. **include**：字符串或正则表达式。只有名称匹配的组件会被缓存。
2. **exclude**：字符串或正则表达式。任何名称匹配的组件都不会被缓存。
3. **max**：数字。定义缓存组中可以保存的最大组件实例数量。

示例：

```vue
<keep-alive :include="['a', 'b']" :exclude="['c']" :max="10">
  <component :is="currentView"></component>
</keep-alive>
```

在这个例子中，仅当 `currentView` 是组件 `a` 或 `b` 时，它们才会被缓存，并且缓存的组件总数不会超过 10 个。

#### 实现原理

`<keep-alive>` 组件的工作原理主要依赖于 Vue 的生命周期钩子以及内部的状态管理机制。以下是其大致工作流程：

1. 当一个组件被包裹在 `<keep-alive>` 标签内并且开始渲染时，Vue 会检查该组件是否符合 `include` 和 `exclude` 规则（如果设置了的话）。符合条件的组件将进入缓存逻辑处理。

2. 如果组件已经被缓存过，则 `<keep-alive>` 不会重新创建一个新的实例，而是直接从缓存中取出并激活这个组件实例。这通过调用组件的 `deactivated` 生命周期钩子来暂停组件，而再次进入可视状态时调用 `activated` 钩子来恢复组件。

3. 对于新的组件或者不在缓存中的组件，Vue 将正常地挂载这些组件。一旦这些组件离开可视区域，它们的状态（包括 DOM 结构、组件实例等）会被存储在一个 LRU (Least Recently Used) 缓存中。

4. 如果设置了 `max` 属性，当达到最大缓存限制时，最近最少使用的组件实例将会被移除以腾出空间给新的组件实例。

通过这种方式，`<keep-alive>` 能够有效地管理组件的状态和生命周期，提升应用性能，特别是在需要频繁切换显示不同视图的情况下非常有用。

### Vue 的 computed 的实现原理

Vue 的 `computed` 属性实现的核心在于依赖追踪和响应式系统。简要来说，其实现原理包括以下几个关键点：

* 1. **依赖收集**：当一个计算属性（computed property）被访问时，Vue 会自动追踪在这个过程中哪些响应式数据（reactive data）被访问了。这是通过 Vue 的响应式系统来完成的，该系统会在读取响应式数据时进行依赖收集。

* 2. **缓存机制**：计算属性的结果会被缓存起来，并且只有在其依赖的数据发生变化时才会重新计算。这意味着如果相关依赖未发生改变，多次访问同一个计算属性将会立即返回缓存的结果，而不会重复执行计算逻辑。

* 3. **响应更新**：一旦某个计算属性所依赖的数据发生了变化，Vue 就会知道需要重新计算这个计算属性的值，并更新相应的视图。这种更新是自动的，开发者不需要手动干预。

* 4. **惰性求值**：计算属性采用惰性求值策略，即仅在访问计算属性时才执行计算逻辑，而不是在定义时就立即执行。这样可以避免不必要的计算，提高性能。

综上所述，Vue 的 `computed` 利用了依赖追踪、缓存机制以及响应式更新等特性，使得它能够高效地管理复杂状态逻辑，同时简化了代码的编写和维护工作。

## 前端工程化

### Webpack 的构建流程

* 1. 初始化参数：读取配置文件，合并默认参数；
* 2. 入口分析：根据 `entry` 找到入口模块；
* 3. 编译模块：使用 loader 转换不同类型的资源；
* 4. 依赖收集：递归解析模块依赖，构建依赖图；
* 5. 优化打包：Tree Shaking、代码分割（Code Splitting）、合并 chunk；
* 6. 输出资源：将最终资源写入 `dist` 目录。

#### 常用的Loader/plugin

Webpack 是一个强大的模块打包工具，它通过各种插件和 loader 来增强其功能。下面列出一些常用的 Webpack 插件和 loader：

##### 常用 Loader

* 1. **Babel-loader**: 将 ES6+ 代码转换为向后兼容的 JavaScript 版本。
* 2. **Css-loader & Style-loader**: `css-loader` 解析 CSS 文件中的 `@import` 和 `url()`，而 `style-loader` 将 CSS 注入到 DOM 中。
* 3. **File-loader**: 用于处理文件导入（如图片、字体等），将它们复制到输出目录，并返回正确的 URL。
* 4. **Url-loader**: 功能类似于 file-loader，但可以将文件转换成 base64 URI。
* 5. **Sass/Less-loader**: 如果项目使用 Sass 或 Less 等预处理器，则需要对应的 loader 来解析这些文件。
* 6. **Postcss-loader**: 结合 PostCSS 插件自动添加浏览器前缀或进行其他 CSS 处理。
* 7. **Ts-loader**: 如果你的项目是 TypeScript 项目，那么你可能需要 ts-loader 来编译 TypeScript。

##### 常用插件

* 1. **Html-webpack-plugin**: 自动生成 HTML 文件，并在其中自动引入所有生成的 bundle。
* 2. **Clean-webpack-plugin**: 在每次构建之前清理输出目录。
* 3. **Mini-css-extract-plugin**: 提取 CSS 到单独的文件中，而不是像 style-loader 那样直接注入到 HTML 中。
* 4. **Copy-webpack-plugin**: 可以方便地将单个文件或整个目录复制到构建目录。
* 5. **Define-plugin**: 允许创建可在编译时配置的全局常量。
* 6. **Hot-module-replacement (HMR)**: 不刷新页面的情况下更新模块，提高开发效率。
* 7. **Terser-webpack-plugin**: 压缩你的 JavaScript。
* 8. **Optimize-css-assets-webpack-plugin**: 压缩和优化 CSS 文件。
* 9. **Bundle-analyzer-plugin**: 可视化展示你的包内容，帮助分析和优化包大小。

每个项目的需求不同，因此选择哪些 loader 和插件取决于项目的具体需求。随着 Webpack 的版本迭代，一些插件和 loader 可能会有更好的替代品或者新的功能加入，请根据实际情况进行选择和配置。

### vite 的构建流程

Vite 是一个基于原生 ES 模块（ESM）的前端构建工具，旨在提供更快、更高效的开发体验。它与传统的打包工具（如 Webpack、Rollup）不同，主要利用浏览器对原生 ES Modules 的支持，在开发模式下实现**无需打包编译的即时加载**。

#### 常用的plugin

Vite 是一个现代的前端构建工具，它提供了快速的开发服务器和优化的构建流程。与 Webpack 不同，Vite 利用了浏览器对 ES 模块的支持来提供更快的开发体验，并且它的插件系统基于 Rollup 的插件系统。下面是一些常用的 Vite 插件以及它们的作用：

**常用插件**

* `@vitejs/plugin-react`: 支持 React 项目，包括 JSX 和 React Fast Refresh（在开发过程中无需刷新页面即可更新组件）。
* `@vitejs/plugin-vue`: 支持 Vue 3 项目，包含对单文件组件(SFC)、JSX 和其他 Vue 特性的支持。
* `@vitejs/plugin-legacy`: 生成针对旧版浏览器的包，确保兼容性。
* `vite-plugin-eslint`: 在开发过程中实时检查代码风格错误。
* `vite-plugin-style-import`: 对于使用 Ant Design 等组件库时，可以按需导入样式，减少打包体积。
  +` vite-plugin-mock`: 提供模拟 API 的功能，方便前端独立开发和调试。
* `vite-plugin-pwa`: 添加 PWA 支持，使你的应用可以离线运行。
* `vite-plugin-compression`: 为生产环境生成压缩版本的资源文件（如 Gzip 或 Brotli）。
* `vite-plugin-imagemin`: 压缩图片资源，减小图片大小。

**注意事项**

虽然 Vite 主要依赖于插件而非 loader 来扩展其功能，但需要注意的是，由于 Vite 直接利用了原生 ES 模块进行开发，许多在 Webpack 中需要通过 loader 处理的任务（例如处理 CSS、图片等静态资源）在 Vite 中通常不需要额外配置或只需要简单的配置即可完成。

下面是 **Vite 的构建流程详解**，分为 **开发模式（Dev Server）** 和 **生产构建（Build）** 两个阶段：

#### 🚀 一、开发模式（Dev Server）

在开发模式下，Vite 并不会将整个项目打包成 bundle 文件，而是通过浏览器原生支持的 `import` / `export` 来按需加载模块。

##### 🔁 核心流程如下：

1. **启动开发服务器**
   * 启动一个本地 HTTP 服务器，默认监听 `localhost:5173`。
   * 支持热更新（HMR）、TypeScript、JSX、CSS 预处理器等。

2. **浏览器请求入口文件（如：index.html）**
   * 浏览器加载 HTML 文件后，会解析其中的 `<script type="module">` 标签。
   * 请求对应的 JavaScript 入口文件（如：`main.js`）。

3. **中间件处理请求**
   * Vite 使用插件系统来拦截和处理各种类型的文件请求：
     * `.js`, `.ts`, `.vue`, `.jsx`, `.css`, `.json` 等。
   * 插件可以进行：
     * 类型转换（如 TypeScript 编译为 JS）
     * CSS 预处理器编译（Sass、Less、PostCSS）
     * 路径别名解析
     * HMR 更新通知

4. **按需编译和返回模块**
   * 只有当浏览器实际请求某个模块时，Vite 才会对其进行编译。
   * 例如：`import { createApp } from 'vue'` 会被 Vite 解析并重写为 `/@modules/vue.js`，然后从缓存或 node\_modules 中读取并返回给浏览器。

5. **热更新（HMR）**
   * 当源文件发生更改时，Vite 会自动检测变化，并只更新变更的部分，而不需要刷新整个页面。

6. **缓存优化**
   * 第一次请求的模块会被缓存，后续请求直接从内存中获取，提升速度。

##### ✅ 开发模式优点：

* 极快的冷启动时间（几乎瞬间）
* 即时热更新（毫秒级响应）
* 无需等待整个项目打包

***

#### 🛠️ 二、生产构建（Production Build）

在生产环境中，为了兼容旧浏览器和提高性能，Vite 会使用 [Rollup](https://rollupjs.org/) 进行真正的打包操作。

##### 🔧 构建流程如下：

1. **执行 `vite build` 命令**
   * Vite 内部调用 Rollup 配置生成打包计划。

2. **依赖分析**
   * Rollup 分析所有依赖项，并确定需要打包的模块。

3. **代码压缩与优化**
   * 使用 `terser`（JS）和 `csso`（CSS）进行代码压缩。
   * Tree-shaking 移除未使用的代码。

4. **输出静态资源**
   * 将最终的 JS、CSS、图片等资源输出到 `dist/` 目录（默认）。
   * 输出结构包括：
     * JS chunk
     * CSS chunk
     * 静态资源（图片、字体等）
     * HTML 入口文件

5. **配置支持**
   * 支持自定义 Rollup 配置，用于控制输出格式、拆包策略等。

##### 📦 生产环境特点：

* 支持代码分割（Code Splitting）
* 支持异步加载（Dynamic Import）
* 支持多种输出格式（如 IIFE、ESM、UMD）
* 自动 Polyfill（如果目标浏览器不支持 ESM）

***

#### 🧩 插件机制（Plugin System）

Vite 的强大之处在于其插件系统，开发者可以通过插件扩展功能，比如：

* 支持 Vue、React、Preact
* TypeScript 支持（`@vitejs/plugin-vue`, `@vitejs/plugin-react`, `@vitejs/plugin-typescript`）
* CSS 预处理器（Sass、Less）
* PostCSS、Tailwind CSS 集成
* 自定义插件编写

***

#### 📌 总结对比表

| 阶段         | 特点                             | 技术基础       | 优点                           |
|--------------|----------------------------------|----------------|--------------------------------|
| 开发模式     | 按需加载、热更新                 | 原生 ESM       | 极快冷启动、快速 HMR           |
| 生产构建     | 打包、压缩、Tree-shaking         | Rollup         | 体积小、性能优、兼容性强       |

***

#### 🧪 示例命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```
