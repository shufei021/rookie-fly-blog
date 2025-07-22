---
url: /note/vite/modules/page2.md
---
# Vite 中使用 CSS 的各种功能

以下是 Vite 中 CSS 功能的全面总结与配置指南，结合最佳实践和示例代码，帮助开发者高效管理样式：

## 🎨 一、基础 CSS 支持

Vite 原生支持 CSS 文件，无需额外配置：

* 直接导入 `CSS`：在 `JS/TS` 文件中通过 `import './style.css'` 引入，`Vite` 会自动将样式注入 `< style>` 标签并插入 `HTML` 头部。

* CSS 变量（自定义属性）：

  支持通过 `:root` 定义全局变量，增强代码复用性：

  ```css
  :root { --primary-color: #1890ff; }
  ```

## 🔒 二、CSS 模块化（避免样式冲突）

通过 .module.css 后缀启用模块化，生成哈希类名：

* 基本使用：

```js
  import styles from './module.module.css';
  <div className={styles.container}>内容</div>
```

* 配置选项（vite.config.js）：

  可自定义类名生成规则和作用域：

  ```js
  export default defineConfig({
    css: {
      modules: {
        scopeBehaviour: 'local', // 局部作用域
        generateScopedName: '[name]__[local]___[hash:base64:5]' // 自定义命名格式
      }
    }
  });
  ```

  通过 globalModulePaths 排除全局样式文件（如 /global.css/）。

## ⚙️ 三、CSS 预处理器支持

Vite 内置 Sass、Less、Stylus 支持，需安装对应依赖（如 npm install sass -D）：

* 全局变量注入（避免重复导入）：

```js
  // vite.config.js
  export default defineConfig({
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";` // 自动注入全局变量
        },
        less: {
          modifyVars: { 'primary-color': '#1DA57A' }, // 修改 Less 变量
          javascriptEnabled: true
        },
        styl: {
          import: ['~@/styles/variables.styl'] // Stylus 全局导入
        }
      }
    }
  });
```

## 🛠️ 四、PostCSS 集成

通过 PostCSS 插件增强 CSS 功能：

* 自动添加浏览器前缀（使用 autoprefixer）：

```js
  // vite.config.js
  import autoprefixer from 'autoprefixer';
  export default defineConfig({
    css: {
      postcss: {
        plugins: [autoprefixer({ overrideBrowserslist: ['Chrome > 40'] })]
      }
    }
  });
```

* 常用插件推荐：

  * postcss-nested：支持嵌套语法（如 Sass 风格）。

  * postcss-pxtorem：将 px 转换为 rem。

  * cssnano：生产环境压缩 CSS。

## ✨ 五、CSS 原子化框架

推荐使用 Windi CSS 或 Tailwind CSS 提升开发效率：

* UnoCSS 接入步骤（Vite 官方推荐）：

  1. 安装依赖：npm install -D unocss @unocss/vite
  2. 配置插件：

  ```js
      // vite.config.js
      import Unocss from 'unocss/vite';
      export default defineConfig({
      plugins: [Unocss({ presets: [presetUno(), presetAttributify()] })]
      });
  ```

  3. 在组件中动态生成原子类：

  ```vue
   <template>
     <div :class="`text-${color}-500 hover:bg-${hoverColor}/50`"></div>
   </template>
  ```
* 优势：

  * 体积减少 60%~80%，提升渲染性能。

  * 支持属性化语法（如 < button bg="blue-400">）。

🚀 六、生产环境优化

* CSS 代码分割：

  * Vite 默认将动态导入组件的 CSS 拆分为独立文件，减少首屏负载：
  * import('./HeavyComponent.vue'); // 自动提取组件 CSS 为独立文件
  * 禁用方式：build: { cssCodeSplit: false }。
* 压缩 CSS：

  使用 build: { minify: 'esbuild' }（默认）或 terser 进一步压缩。

## ⚠️ 常见问题解决

1. 路径别名配置：\
   // vite.config.js
   export default defineConfig({
   resolve: { alias: { '@styles': '/src/styles' } }
   });

   使用：import '@styles/global.css'。
2. 第三方样式不生效：\
   在 css.modules.globalModulePaths 中配置排除路径（如 \[/global.css/]）。
3. Sass 全局变量未注入：\
   检查 preprocessorOptions.scss.additionalData 路径是否正确。

## 💎 总结：功能选择指南

|场景 |推荐方案 |优势|
|------------------|---------------|------------------|
|小型项目| 原生 CSS + 变量 |零配置、轻量快速|
|协作项目| CSS Modules + 预处理器 避|免命名冲突、支持编程语法|
|大型应用| 原子化框架（UnoCSS） + 动态导入 |极致性能、高复用性|
|生产部署| PostCSS 插件 + 代码分割/压缩 |优化加载速度、减少体积|

更多实践细节参考：https://vitejs.dev/guide/features.html#css 或 \[CSS 模块化配置详解]。
