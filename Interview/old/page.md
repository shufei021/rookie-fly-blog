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

1. **`this` 绑定**
   * 普通函数：有自己的 `this`，其值由调用方式决定（如直接调用时指向 `window`，对象方法调用时指向对象）。
   * 箭头函数：**没有自己的 `this`**，继承外层作用域的 `this`（词法作用域），且无法通过 `call`/`apply`/`bind` 修改。

2. **`arguments` 对象**
   * 普通函数：可通过 `arguments` 访问所有传入参数。
   * 箭头函数：**没有 `arguments`**，需使用剩余参数（`...args`）替代。

3. **构造函数与 `prototype`**
   * 普通函数：可作为构造函数（`new` 调用），拥有 `prototype` 属性。
   * 箭头函数：**不能作为构造函数**（`new` 调用会报错），且**无 `prototype` 属性**。

4. **`super` 关键字**
   * 普通函数：可在类方法中通过 `super` 访问父类属性/方法。
   * 箭头函数：**不能使用 `super`**（因不属于类方法）。

5. **其他差异**
   * **语法简洁性**：箭头函数可省略 `return` 和 `{}`（单表达式时）。
   * **不适用场景**：
     * 需要动态 `this` 的方法（如事件处理器、对象方法）。
     * 需要 `arguments` 或函数提升（箭头函数必须先定义后使用）。

***

#### 关键点说明

* **为什么箭头函数无 `this`？**\
  设计初衷是为了解决回调中 `this` 丢失的问题（如 `setTimeout` 内普通函数的 `this` 指向 `window`）。
* **为何不能 `new`？**\
  箭头函数没有 `[[Construct]]` 内部方法，且无 `prototype` 供实例继承。

#### 示例对比

```javascript
// 普通函数
function Person(name) {
  this.name = name; // this 由 new 决定
}
Person.prototype.sayHi = function() { 
  console.log(this.name); 
};

// 箭头函数
const Foo = () => {};
new Foo(); // 报错：Foo is not a constructor
```

### 原型和原型链

每个对象（除了null）都有一个原型链（Prototype Chain），它是一条用来查找对象属性的链条。

* 原型：每个函数都有一个 prototype 属性，指向一个对象。
* 原型链：当访问一个对象的属性时，如果该对象本身没有这个属性，就会去它的原型对象中找，以此类推，直到找到或到终点 null。

所有构造函数都是Function的实例，所有原型对象都是Object的实例除了Object.prototype

总结：原型是实现继承的基础，原型链是属性查找的机制。

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

## Vue.js 相关

### vue的生命周期

* `beforeCreate`:**这个钩子在实例初始化之后、数据观测 (data observer) 和 event/watcher 事件配置之前被调用**,不过，在 Composition API 中，通常使用 setup() 函数来处理这一阶段的逻辑，因此这个钩子不常用。
* `created`：**在实例创建完成后立即调用**。在这个阶段，实例已经完成了数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。但是，挂载阶段还没开始，$el 属性目前不可见
* `beforeMount`：**在挂载开始之前被调用**：相关的 render 函数首次被调用。此时，虚拟 DOM 尚未渲染到真实 DOM 上
* `mounted`：**在 el 被新创建的 vm.$el 替换，并挂载到实例上后调用**。这时，组件已经被渲染到 DOM 中，可以访问 DOM 元素了。
* `beforeUpdate`：*在数据更新时，在虚拟 DOM 打补丁之前调用*\*。此时，可以获取更新前的状态，适合用来进行一些清理工作。
* `updated`：**在由于数据更改导致的虚拟 DOM 重新渲染和打补丁之后调用**。此时，组件 DOM 已经更新，可以执行依赖于 DOM 的操作。然而，避免在此期间改变状态，因为这可能会导致无限的更新循环
* `beforeUnmount（在 Vue 2 中为 beforeDestroy）`：**发生在实例销毁之前，在当前阶段实例完全可以被使用**。调用此钩子时，组件实例的所有指令都被解绑，所有事件监听器被移除，所有子组件实例也都被销毁。
* `unmounted（在 Vue 2 中为 destroyed）`:**卸载组件实例后调用**。调用此钩子时，组件实例的所有指令都被解绑，所有事件监听器被移除，所有子组件实例也都被销毁。

**activated 和 deactivated 是 Vue 中专门用于 < keep-alive> 缓存组件时的生命周期钩子**

* `activated`：**当组件被 < keep-alive> 缓存后，每次该组件被激活（显示）时调用**。可以在这里执行组件重新展示时需要的逻辑，比如重新获取数据、恢复动画、计时器等
* `deactivated`：**当组件被缓存后，离开当前视图（被切换出去）时调用**。可以在这里进行一些资源释放操作，比如清除定时器、取消事件监听、停止动画等，防止内存泄漏。

### Vue 的双向数据绑定原理

`Vue` 使用 `Object.defineProperty` 或 `Proxy` 劫持数据，结合 `Watcher` 实现依赖收集。当数据变化时，通知视图更新；当视图中表单等发生变化时，也会同步更新数据，从而实现双向绑定。”

::: details {open}
Vue 的双向绑定本质是`数据劫持 + 发布订阅模式`。在 Vue 2 中通过 Object.defineProperty 递归转换 data 的每个属性为 getter/setter，在 getter 中收集依赖（Watcher），在 setter 中通知更新。视图层通过 v-model 指令实现双向绑定，它本质是 value 属性绑定和 input 事件监听的语法糖。

Vue 3 改用 Proxy 实现，优势在于能直接监听整个对象且自动处理新增属性。整个系统还包含异步批量更新和虚拟 DOM diff 等优化机制，既保持了开发便捷性又保证了性能。
:::

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

### Vue2 和 Vue3 的区别

Vue3 相对于 Vue2 做了较大的改进，主要体现在以下几个方面：

***

#### ✅ 1. **组合式 API vs 选项式 API**

* **Vue2** 使用 Options API（如 `data`、`methods`、`computed` 等）组织代码，逻辑分散，不易复用。
* **Vue3** 引入了 Composition API（如 `setup()`、`ref`、`reactive`、`watch` 等），更灵活，更适合逻辑复用和大型项目的维护。

***

#### ✅ 2. **性能优化**

* **更快的虚拟 DOM**：Vue3 重写了虚拟 DOM，实现更快的 diff 算法。
* **编译优化**：静态提升、事件缓存等机制使渲染更高效。
* **Tree-shaking 支持**：Vue3 使用 ES Module 编写，可以按需引入，减小打包体积。

***

#### ✅ 3. **响应式系统升级**

* **Vue2** 使用 `Object.defineProperty`，不支持对数组、新增属性的完全监测。
* **Vue3** 改用 `Proxy` 实现响应式，更彻底、性能更好，支持更复杂的数据结构。

***

#### ✅ 4. **Fragment / Teleport / Suspense 支持**

* **Fragment**：Vue3 组件可以返回多个根节点，Vue2 不支持。
* **Teleport**：可以将组件渲染到 DOM 的任意位置，适合弹窗等场景。
* **Suspense**：用于异步组件的加载状态处理，配合 `<script setup>` 更加简洁。

***

#### ✅ 5. **TypeScript 支持更好**

* Vue3 是用 TypeScript 重写的，原生支持类型推导和开发体验，Vue2 对 TypeScript 支持较弱。

***

#### ✅ 6. **生命周期钩子不同**

* Composition API 下生命周期名称为 `onMounted`、`onUnmounted` 等，更接近函数语义。
* 而 Vue2 是 `mounted`、`destroyed` 等选项式 API。
* vue3中 beforeDestroy->onBeforeUnmounted, destroyed->onUnmounted
* beforeCreate、created 被语法糖 setup 替代

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

::: details {open}
Vue 的生命周期分为创建、挂载、更新和卸载四个阶段。

创建阶段：beforeCreate 时数据还未初始化，created 时可以访问数据但 DOM 未挂载。

挂载阶段：beforeMount 生成虚拟 DOM，mounted 时真实 DOM 已渲染完成。

更新阶段：数据变化时触发 beforeUpdate 和 updated，分别对应 DOM 更新前和更新后。

卸载阶段：beforeUnmount 可清理资源，unmounted 时实例已销毁。
此外，< keep-alive> 缓存的组件会触发 activated 和 deactivated。
实际开发中，我常在 created 请求数据，在 mounted 操作 DOM，在 beforeUnmount 移除事件监听。
:::

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

#### ✅ 7. **其他变化**

* 更简洁的模板编译器。
* 新的 `<script setup>` 语法糖让代码更清晰。
* 更强大的插件系统和更现代的架构设计。

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

### vue3性能提升的地方

Vue 3 在多个方面实现了显著的性能提升，这些改进不仅提高了框架本身的效率，也为开发者提供了更多的优化手段。以下是

**Vue 3 性能提升的主要点：**

* 1. **响应式系统升级**：
     Vue 3 使用了 ES6 的 `Proxy` 对象来实现响应式数据绑定，取代了 Vue 2 中使用的 `Object.defineProperty` 方法。`Proxy` 能够拦截对对象的所有基本操作（如属性访问、赋值等），并且能够监听到新增和删除的属性以及数组的变化 。这使得 Vue 3 的响应式系统更加灵活和高效。

* 2. **编译时优化**：
     Vue 3 的编译器能够在编译阶段将模板中的静态节点与动态节点分离，并通过 Patch Flag 标识哪些部分是动态的，从而在渲染时只更新有变动的部分 。这种优化减少了不必要的 DOM 操作，提升了渲染速度。

* 3. **Tree Shaking 支持**：
     Vue 3 采用了模块化架构，各个功能都是按需引入的，支持现代构建工具（如 Vite、Rollup、Webpack）进行 Tree Shaking，即未使用的代码不会被打包进最终产物中，从而减小了打包体积并加快了加载速度 。

* 4. **虚拟 DOM 重写**：
     Vue 3 对其虚拟 DOM 算法进行了重写，使其更加轻量和高效。新的算法包括 block tree 结构，它有助于减少需要创建的虚拟节点数量，降低虚拟 DOM diff 的压力 。

* 5. **更好的 TypeScript 支持**：
     Vue 3 是用 TypeScript 重写的，这不仅提升了开发体验，也间接地增强了项目的可维护性和运行时的安全性 。

* 6. **组件初始化性能**：
     Vue 3 在组件实例初始化时做了优化，使用扁平化的结构减少了依赖追踪对象的创建开销。此外，`setup()` 函数替代了传统的 `data`、`methods`、`computed` 等选项，在组件创建过程中可以更快地构建状态 。

* 7. **新特性带来的性能优势**：
     新增的 `Fragment`、`Teleport` 和 `Suspense` 特性为 Vue 应用提供了更高的灵活性和性能。例如，`Suspense` 可以让异步组件加载得更友好，避免阻塞主界面 。

* 8. **服务端渲染 (SSR) 改进**：
     SSR 在 Vue 3 中得到了重构，变得更轻量且具备更好的并发能力，同时首屏渲染速度更快 。

* 9. **懒加载和按需加载**：
     Vue 3 提供了组件懒加载的功能，可以通过 `defineAsyncComponent` 实现按需加载，减少初始加载资源消耗，提高首屏渲染速度 。

* 10. **缓存计算属性和方法**：
      对于开销较大的计算属性或方法，可以使用缓存来避免重复计算，进一步提升性能 。

### Vue 3 组件通信方式及其基本原理

#### 父子组件通信

* Props 和 Events
  * `Props`：父组件可以通过属性绑定的方式将数据传递给子组件。子组件使用 `defineProps` 来接收父组件传来的数据
  * `Events`：子组件可以通过触发自定义事件来通知父组件状态发生了变化，并且可以携带参数给父组件
* `v-model` 双向绑定
  * `v-model` 是一种简化的语法糖，用于实现父组件和子组件之间的双向数据绑定。它实际上是 `:modelValue` 和 `@update:modelValue` 的缩写形式

#### 跨层级组件通信

* Provide / Inject
  * Event Bus（mitt库）
    * 在 Vue 3 中，由于 $root 和 $event 已被移除，通常会使用第三方库如 `mitt` 创建一个轻量级的事件总线来实现兄弟组件间的通信
  * 共享父组件状态
    * 当两个或更多的兄弟组件需要共享状态时，可以通过共同的父组件作为中介进行状态管理

#### 高阶方案

* 插槽（Slots）
  * 插槽提供了一种内容分发的API，允许父组件向子组件传递模板片段
* attrs和listeners（在Vue 3中已合并为 $attrs）
  * `$attrs`包含了所有未被声明为 props 的属性，可以用来透传到子组件
* Ref + DefineExpose
  * 父组件可以通过 ref 直接访问子组件实例或DOM元素，并调用子组件的方法
* Vuex 或 Pinia
  * 对于更复杂的状态管理需求，推荐使用 Vuex 或者 Pinia 这样的状态管理库来集中管理和维护应用的状态

#### 总结

每种通信方式都有其适用场景，选择哪种方式取决于具体的业务需求和组件结构。例如，在父子组件之间，通常首选 Props 和 Events；对于跨层级通信，Provide / Inject 更加合适；而对于非父子关系的组件间通信，则可能需要用到 Event Bus 或者 Vuex / Pinia。

# Vue 组件通信方式

### 1. 父子组件通信

* **Props + Events**
  * 父 → 子：通过 `props` 传递数据
  * 子 → 父：通过 `$emit` 触发事件
  * 原则：遵循单向数据流

* **v-model**
  * 语法糖：`modelValue` prop + `update:modelValue` 事件
  * Vue 3 支持多个 v-model

* **Ref**
  * 父组件通过 `ref` 访问子组件实例方法/数据

### 2. 跨层级通信

* **Provide/Inject**
  * 祖先 → 后代：`provide` 提供数据，`inject` 注入
  * Vue 3 需手动保持响应式（提供 `ref`/`reactive`）

* **事件总线**
  * Vue 2: 新建 Vue 实例作为 EventBus
  * Vue 3: 推荐使用 [mitt](https://github.com/developit/mitt) 库

### 3. 全局状态管理

* **Pinia** (推荐)
  * Vue 3 官方推荐的状态管理库
  * 支持 TypeScript 和 Composition API

* **Vuex**
  * Vue 2 的标准方案
  * Vue 3 仍兼容但不再推荐

### 4. 特殊场景方案

* **共享父组件状态**
  * 通过 `$parent` 访问（不推荐，破坏封装性）
  * 更好的方案：提升状态到父组件 + props 传递

* **本地存储通信**
  * 通过 `localStorage` + `storage` 事件实现跨标签页通信
