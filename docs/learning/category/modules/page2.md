# Webpack 相关

## 🧠 一、基础原理类

### 1. 什么是 Webpack？解决了什么问题？

**答：**
Webpack 是一个现代 JavaScript 应用的静态模块打包工具。它会从入口文件出发，递归解析项目所依赖的模块，然后打包成一个或多个 bundle 文件。
解决了前端模块化、依赖管理、资源整合和代码优化的问题。

---

### 2. Webpack 的核心概念有哪些？

**答：**

* **Entry（入口）**：打包的起点
* **Output（输出）**：打包结果输出位置
* **Loader**：用于处理非 JS 文件（如 CSS、图片、TS 等）
* **Plugins**：用于扩展 Webpack 的功能（如压缩、热更新）
* **Mode**：开发环境（development）和生产环境（production）
* **Module**：指项目中一切资源，JS、CSS、图片都是模块

---

### 3. Webpack 的构建流程？

**答：**

1. 初始化参数（合并配置）
2. 解析入口文件（entry）
3. 构建模块依赖图（递归）
4. 调用 Loader 转换模块
5. 调用 Plugin 执行扩展逻辑
6. 输出文件（bundle）

---

## 🔧 二、配置相关

### 4. 如何配置多个入口文件？

**答：**

```js
entry: {
  index: './src/index.js',
  admin: './src/admin.js',
}
```

---

### 5. Loader 和 Plugin 的区别？

**答：**

* **Loader**：用于模块转换（作用于某一类文件，如 Babel 处理 JS）
* **Plugin**：用于扩展 Webpack 的能力（如 HtmlWebpackPlugin、DefinePlugin）

---

### 6. 如何处理图片资源？

**答：**
使用 `asset/resource`、`asset/inline` 或使用 `file-loader`（Webpack 4）：

```js
{
  test: /\.(png|jpe?g|gif)$/,
  type: 'asset/resource'
}
```

---

### 7. 如何优化打包体积？

**答：**

* 使用 `mode: 'production'` 启用默认优化
* 压缩 JS（`TerserPlugin`）、CSS（`css-minimizer-webpack-plugin`）
* Tree Shaking（去除未使用代码）
* SplitChunks 拆分公共模块
* 动态导入（懒加载）
* 使用 CDN 加载第三方库

---

### 8. 如何实现代码分割（Code Splitting）？

**答：**

* 手动分割：使用 `import()` 动态引入模块
* 自动分割：配置 `optimization.splitChunks`
* 使用 `entry` 多入口实现分割

---

## ⚙️ 三、优化 & 高级用法

### 9. 什么是 Tree Shaking？

**答：**
Tree Shaking 是去除 JavaScript 中未使用代码的技术，依赖 ES Module 静态语法分析。Webpack 在 production 模式下默认启用。

---

### 10. 如何开启缓存机制提高打包速度？

**答：**

* 使用 `cache: { type: 'filesystem' }`
* 使用 `babel-loader` 时开启 `cacheDirectory: true`
* 使用 `HardSourceWebpackPlugin`（Webpack 4）

---

### 11. 如何实现热更新（HMR）？

**答：**

* 配置 `devServer: { hot: true }`
* 启用 `HotModuleReplacementPlugin`
* 使用 `module.hot.accept()` 在模块中手动处理更新逻辑（仅限模块级）

---

### 12. 如何配置生产环境与开发环境的不同构建？

**答：**
通过 `webpack-merge` 拆分配置文件：

```bash
webpack.common.js
webpack.dev.js
webpack.prod.js
```

然后使用 `webpack --config webpack.dev.js` 启动。

---

## 🌐 四、常见插件

| 插件名                  | 作用                              |
| -------------------- | ------------------------------- |
| HtmlWebpackPlugin    | 自动生成 HTML 文件并引入打包资源             |
| DefinePlugin         | 定义全局变量（如：process.env.NODE\_ENV） |
| MiniCssExtractPlugin | 抽离 CSS 成单独文件                    |
| CleanWebpackPlugin   | 打包前清空 `dist`                    |
| CopyWebpackPlugin    | 拷贝静态文件                          |

---

## ❓五、常见问题

### 13. Webpack 和 Vite 的区别？

**答：**

* Webpack 是基于 **打包构建**，Vite 是基于 **原生 ES Module 的按需加载**
* Webpack 构建慢，启动慢；Vite 利用 `esbuild` 启动快
* Vite 更适合现代前端项目，Webpack 更适合高度定制化项目

---

### 14. Webpack 的性能优化手段有哪些？

**答：**

* 缓存（模块缓存、Loader 缓存）
* 多线程构建（如 `thread-loader`, `parallel-webpack`）
* DLLPlugin 提前打包第三方库
* 减少模块体积（Tree Shaking、按需引入）
* 避免过度嵌套依赖

好的，以下是为 **Webpack 面试题口述练习** 专门设计的一套【题目卡片】，每张卡片包含：
👉 **题目**
👉 **答题提示（关键词）**
👉 **示例回答（适合口头表达）**


## 🧩 Webpack 

---

### 🧠 卡片 1

**Q：什么是 Webpack？它解决了什么问题？**
🔑提示词：模块打包、入口、依赖、构建
🎙️**示例回答：**
Webpack 是一个现代前端项目的静态模块打包工具。它从入口文件出发，分析模块之间的依赖关系，然后打包成一个或多个 bundle 文件。它帮助我们管理各种资源（比如 JS、CSS、图片等），统一构建流程，解决了模块化、依赖管理和性能优化的问题。

---

### 🧠 卡片 2

**Q：Webpack 的核心概念有哪些？**
🔑提示词：entry、output、loader、plugin、module、mode
🎙️**示例回答：**
Webpack 有几个核心概念，包括：

* **Entry**：入口文件，Webpack 从这开始打包；
* **Output**：输出配置，决定打包生成的文件；
* **Loader**：用于处理非 JS 的资源，比如用 babel-loader 处理 ES6；
* **Plugin**：扩展 Webpack 能力，比如生成 HTML 文件；
* **Module**：一切资源都是模块；
* **Mode**：开发环境和生产环境的不同优化策略。

---

### 🧠 卡片 3

**Q：Loader 和 Plugin 有什么区别？**
🔑提示词：文件转换、功能扩展、处理阶段
🎙️**示例回答：**
Loader 是用来处理模块的，比如把 Sass 转换成 CSS、把 JSX 转成 JS。而 Plugin 是在 Webpack 的生命周期中扩展功能的，比如生成 HTML 文件、清理目录或者定义环境变量。Loader 关注的是某一类文件的转换，Plugin 更像是执行一些打包的“钩子”逻辑。

---

### 🧠 卡片 4

**Q：Webpack 的打包流程是怎样的？**
🔑提示词：入口、依赖图、Loader、Plugin、输出
🎙️**示例回答：**
Webpack 的打包流程大致是：

1. 从 entry 开始解析模块；
2. 构建依赖图（Module Graph）；
3. 对模块使用对应的 Loader 处理；
4. 在合适的阶段触发 Plugin 的钩子逻辑；
5. 最终输出打包好的 bundle 文件。

---

### 🧠 卡片 5

**Q：如何实现代码分割（Code Splitting）？**
🔑提示词：动态 import、SplitChunksPlugin、按需加载
🎙️**示例回答：**
可以通过三种方式实现代码分割：

1. 使用 `import()` 实现懒加载；
2. 使用 Webpack 的 `SplitChunksPlugin` 自动拆分公共模块；
3. 设置多个 `entry`，手动拆分。
   这样可以提升首屏速度、减少不必要的资源加载。

---

### 🧠 卡片 6

**Q：什么是 Tree Shaking？它的前提条件是什么？**
🔑提示词：去除未使用、ESM、静态分析
🎙️**示例回答：**
Tree Shaking 是指移除代码中没有用到的部分，减少 bundle 体积。它依赖于 ES Module 的静态结构，Webpack 会在构建时分析哪些导入没有被使用，然后剔除它们。前提是使用 ESM 语法，不能使用 CommonJS。

---

### 🧠 卡片 7

**Q：如何优化 Webpack 构建速度？**
🔑提示词：缓存、thread-loader、多入口、exclude
🎙️**示例回答：**
可以从多个维度优化构建速度：

* 启用 Loader 缓存，比如 babel-loader 开启 `cacheDirectory`；
* 使用多线程 loader，如 `thread-loader`；
* 合理配置 `include/exclude`，避免无用文件参与编译；
* 使用文件系统缓存 `cache: { type: 'filesystem' }`；
* 依赖预编译，比如使用 DLLPlugin（Webpack 4）。

---

### 🧠 卡片 8

**Q：Webpack 的开发模式和生产模式有何区别？**
🔑提示词：devtool、压缩、Tree Shaking、优化
🎙️**示例回答：**
开发模式（development）下会保留完整的 SourceMap、未压缩的代码，利于调试；
而生产模式（production）下会默认开启压缩、Tree Shaking、Scope Hoisting 等优化，用于减少体积和提升性能。

---

### 🧠 卡片 9

**Q：如何处理静态资源（如图片、字体）？**
🔑提示词：asset modules、file-loader、url-loader
🎙️**示例回答：**
Webpack 5 引入了 `asset/resource`、`asset/inline`、`asset` 等类型来统一处理静态资源。
例如使用：

```js
{
  test: /\.(png|jpg|gif|svg)$/,
  type: 'asset/resource'
}
```

Webpack 4 可以使用 `file-loader` 和 `url-loader` 来处理这些资源。

---

### 🧠 卡片 10

**Q：你如何在项目中区分开发和生产环境配置？**
🔑提示词：webpack-merge、process.env、mode
🎙️**示例回答：**
通常会将配置拆分为三份：

* `webpack.common.js`：公共配置；
* `webpack.dev.js`：开发环境；
* `webpack.prod.js`：生产环境。
  然后通过 `webpack-merge` 合并，并在 package.json 中配置不同的构建命令。还可以通过 `DefinePlugin` 注入 `process.env.NODE_ENV` 实现环境判断。


