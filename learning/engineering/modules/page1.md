---
url: /learning/engineering/modules/page1.md
---
# Webpack 的构建流程

Webpack 是一个模块打包工具，它的核心功能是将项目中的各种资源（如 JavaScript、CSS、图片等）视为模块，并通过一系列流程将它们打包成优化后的静态资源。Webpack 的构建流程可以分为以下几个主要阶段：

### 一、初始化（Initialization）

1. **解析配置文件**：
   * Webpack 启动时会读取 `webpack.config.js` 或其他指定的配置文件。
   * 配置包括入口（entry）、输出（output）、加载器（loader）、插件（plugin）等。

2. **创建 Compiler 对象**：
   * Webpack 根据配置创建一个 `Compiler` 实例。
   * 这个对象控制整个构建流程，管理所有插件和选项。

***

### 二、编译（Compilation）

3. **执行 `run` 方法**：
   * 开始构建过程，触发 `beforeRun` 和 `run` 生命周期钩子。

4. **确定 Entry 入口文件**：
   * Webpack 从 entry 指定的文件开始分析依赖关系。

5. **创建 Compilation 对象**：
   * `Compilation` 负责实际的模块构建和打包工作。
   * 它记录了本次构建的所有模块、资源、变化和错误信息。

6. **调用 Loader 解析模块**：
   * Webpack 会根据配置中 `rules` 匹配的规则，使用对应的 loader 对模块进行转换。
   * 例如：使用 `babel-loader` 将 ES6+ 转换为 ES5；使用 `css-loader` 处理 CSS 文件。

7. **递归构建依赖图谱（Dependency Graph）**：
   * Webpack 从入口文件出发，递归地分析每一个模块的依赖关系。
   * 构建出一个完整的依赖图谱（Dependency Graph），包含所有需要打包的模块。

8. **处理异步模块（Code Splitting）**：
   * 如果使用了动态导入（`import()`）或路由懒加载，Webpack 会创建额外的 chunk。

***

### 三、优化（Optimization）

9. **执行优化策略**：
   * 合并重复模块（ModuleConcatenationPlugin）。
   * 去除无用代码（Tree Shaking）。
   * 分割代码（SplitChunksPlugin）。
   * 哈希命名（HashedModuleIdsPlugin）。
   * 插件可以在这一阶段介入，对 chunk 进行修改。

***

### 四、生成资源（Emit Assets）

10. **生成最终的 bundle 文件**：
    * Webpack 将模块内容按照 chunk 组织成最终的文件结构。
    * 使用模板（mainTemplate、chunkTemplate 等）生成可执行的 JS 文件。

11. **调用插件写入资源**：
    * 所有资源（JS、CSS、图片等）准备好后，通过 `emit` 钩子通知插件进行最后的处理。
    * 例如：`HtmlWebpackPlugin` 会生成 HTML 文件并自动引入打包好的 JS/CSS。

***

### 五、输出（Output）

12. **写入磁盘或内存（开发服务器）**：
    * 如果是生产环境，Webpack 会将资源写入到磁盘上的 `output.path` 目录。
    * 如果是开发环境（使用 `webpack-dev-server`），则资源保存在内存中，不写入磁盘。

13. **完成构建**：
    * 触发 `done` 钩子，表示一次完整的构建流程结束。

***

## 总结图示

```
初始化
  ↓
创建 Compiler
  ↓
读取配置 & 创建 Compilation
  ↓
从 Entry 开始解析模块、调用 Loader
  ↓
递归构建依赖图谱
  ↓
优化模块（Tree Shaking、SplitChunks）
  ↓
生成 Chunk & 最终 Bundle
  ↓
插件处理输出资源（HtmlWebpackPlugin 等）
  ↓
输出到磁盘 / 内存
  ↓
完成构建（done）
```

***

## 常见插件与生命周期钩子说明

| 阶段 | 插件作用 | 示例 |
|------|----------|------|
| 初始化 | 注册事件监听器 | `BannerPlugin` |
| 编译 | 分析模块、调用 loader | `BabelLoader` |
| 优化 | 拆分代码、去重、压缩 | `SplitChunksPlugin`, `TerserPlugin` |
| 输出 | 生成 HTML、清理目录 | `HtmlWebpackPlugin`, `CleanWebpackPlugin` |
