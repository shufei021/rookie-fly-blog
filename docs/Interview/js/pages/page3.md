# 首屏优化如何去做

## 🎯 理解问题背景

首屏优化的核心目标是`提升用户感知加载速度`，`减少白屏时间`，`让用户尽快看到内容`，从而提升用户体验和转化率。

<!-- ## 1、资源加载优化
+ 减少HTPP请求
  + 合并文件：将多个css和js文件合并成1个，减少请求次数
  + CSS Sprites：将小图标合并成一张大图，通过background-position定位显示
  + 使用字体图标：利用IconFont 或 svg代替图片图标，减少HTTP请求
+ 利用CDN加速
  + 将静态资源（css、js、图片 ）部署到CDN，利用边缘节点就近访问，提高加载速度
+ 资源压缩
  + 代码压缩：使用 Terser、CSSNano 和 HTMLMinifier，它们分别是用于压缩 JavaScript、CSS 和 HTML 代码的流行工具，广泛应用于前端构建流程中（如 Webpack、Vite、Gulp 等）
  + 图片优化：选择合适的图片格式（如webP、AVIF），使用工具如Squoosh、Imagemin进行压缩
  + 启用 Gzip/Brotli压缩：在服务器端开启  Gzip/Brotli压缩，减少传输资源的大小

## 2、代码优化
+  -->

## 🧱 二、从整体流程出发，分阶段优化

<VStyle :style="{color:'#036aca', fontWeight: '600'}">
     1. 资源加载优化（Load）
</VStyle>


+ `压缩资源`：使用 Gzip / Brotli 压缩 JS/CSS/HTML。
+ `图片懒加载`：非首屏图片延迟加载，使用 loading="lazy" 或 Intersection Observer。
+ `CDN 加速`：静态资源部署到 CDN，缩短请求路径。
+ `字体优化`：只加载必要的字体子集，避免阻塞渲染。
+ `关键资源优先级`：通过 rel="preload" 预加载关键 CSS、JS、字体。


<VStyle :style="{color:'#036aca', fontWeight: '600'}">2. 代码分割与打包优化（Build）</VStyle>

+ `按需加载（Code Splitting）`：使用动态 import() 拆分非首屏模块。
+ `Tree Shaking`：移除未使用的代码，减小包体积。
+ `SplitChunks`：将第三方库和业务代码分离，利用缓存。

<VStyle :style="{color:'#036aca', fontWeight: '600'}">3. 服务端配合（Server）</VStyle>

+ `服务端渲染（SSR）或预渲染（Prerendering）`：提前返回 HTML 内容，加快首屏显示。
+ `HTTP/2 / HTTP/3 协议`：多路复用，减少请求耗时。
+ `服务端缓存策略`：合理设置缓存头（Cache-Control、ETag），减少重复请求。

<VStyle :style="{color:'#036aca', fontWeight: '600'}">4. 浏览器渲染优化（Render）</VStyle>

+ `Critical Rendering Path（CRP）优化`：
  + 减少关键请求链长度。
  + 减少关键资源大小。
+ `内联关键 CSS（Critical CSS）`：提前注入首屏需要的样式，避免 FOUC。
+ `避免阻塞渲染的脚本`：不将 JS 放在 < head> 中同步加载，使用 async 或 defer。

<VStyle :style="{color:'#036aca', fontWeight: '600'}">5. 监控与持续优化</VStyle>

+ 使用 `Lighthouse`、`PageSpeed Insights`、`Web Vitals` 等工具评估性能指标。
+ 关注核心指标如：
    + FCP（First Contentful Paint）
    + LCP（Largest Contentful Paint）
    + FID（First Input Delay）
    + CLS（Cumulative Layout Shift）

## 💡 三、结合项目经验举例说明 

>示例：在我上一个项目中，我们通过 `SSR` + `骨架屏` + `Critical CSS` 的方式，将 FCP 从 4s 缩短到 1.5s。同时，通过 `Webpack` 的 `Code Splitting` 和`懒加载`，将首页 JS `包体积`从 3MB 减少到 600KB，显著提升了加载速度。

## 📈 四、总结与价值输出

> “前端性能优化不仅关乎技术实现，更是产品体验的重要保障。作为开发者，我们需要从用户视角出发，持续关注性能指标，并通过工程化手段保持长期优化。”

## ✅ 加分项

+ 能区分客户端渲染（CSR）和服务器端渲染（SSR）下的不同优化策略。
+ 对现代构建工具（Webpack/Vite）有深入理解。
+ 能说出具体的性能指标及其优化方法。
+ 能结合具体项目谈经验，体现落地能力。


<!-- ## 使用路由懒加载

## 非首屏组件使用异步组件

##  首屏不重要的组件延迟加载

## 静态资源放在CDN

## 减少首屏上的js、css等资源的大小，压缩文件，开启GZIP

## 尽量减少DOM的数量和层级

## 使用服务端渲染

## 使用精灵图请求

## 做一些loading

## 开启GZIP压缩

## 图片懒加载 -->

