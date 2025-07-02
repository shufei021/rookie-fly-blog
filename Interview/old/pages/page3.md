---
url: /Interview/old/pages/page3.md
---
# 前端首屏优化

PDF查看流程

## 资源加载优化

* **压缩资源**：使用Gzip或Brotli对JS、CSS和HTML进行压缩。
* **图片懒加载**：延迟加载非首屏图片，可以使用`loading="lazy"`属性或者Intersection Observer API。
* **CDN加速**：将静态资源部署到内容分发网络(CDN)，缩短请求路径。
* **字体优化**：仅加载必要的字体子集，避免阻塞页面渲染。
* **关键资源优先级**：通过`rel="preload"`预加载关键CSS、JS和字体。
* **按需加载(Code Splitting)**：采用动态`import()`拆分非首屏模块。

## 构建优化

* **Tree Shaking**：移除未使用的代码以减小包体积。
* **SplitChunks**：分离第三方库和业务代码，以便更好地利用缓存。
* **服务端渲染(SSR)或预渲染(Prerendering)**：提前生成HTML内容，加快首屏显示速度。
* **HTTP/2/HTTP/3协议**：利用多路复用技术减少请求耗时。

## 服务端配合

* **服务端缓存策略**：合理设置缓存头（如Cache-Control、ETag），减少重复请求。
* **最小化资源数量和大小**：减少不必要的资源请求，并通过合并和压缩CSS、JavaScript文件以及图像压缩来减小传输时间。

## 关键渲染路径(CRP)优化

* **内联关键CSS(Critical CSS)**：提前注入首屏需要的样式，防止无样式内容闪烁(FOUC)。
* **避免阻塞渲染的脚本**：不将JS放在`<head>`中同步加载，而是使用`async`或`defer`。

## 浏览器渲染优化

* 使用工具评估性能指标，比如Lighthouse、PageSpeed Insights和Web Vitals等，关注核心指标包括FCP（首次内容绘制）、LCP（最大内容绘制）、FID（首次输入延迟）和CLS（累计布局偏移）。

这个分类涵盖了从资源加载、构建过程、服务端支持到浏览器渲染等多个方面的优化措施
