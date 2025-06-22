---
url: /Interview/js/pages/page10.md
---
# 延迟加载js的方法

## async 和 defer 属性（推荐）

**async：异步加载，不阻塞渲染，加载完成后立即执行（无序）**

```html
<script src="script.js" async></script>
```

**defer：异步加载，延迟到HTML解析完成后执行（按顺序）**

```html
<script src="script.js" defer></script>
```

## 动态脚本注入

**通过JavaScript动态创建标签script**

```js
function loadScript(src) {
  const script = document.createElement('script');
  script.src = src;
  document.body.appendChild(script); // 添加到DOM后开始加载
}
// 按需调用
loadScript('path/to/script.js');
```

## 事件触发加载

**在特定用户行为（如点击、滚动）后加载：**

|方法	|是否阻塞渲染	|执行顺序	|适用场景|
|:-----------------|:-----------------|:-----------------|:-----------------|
|async	|❌ 非阻塞|	❌ 无序|	独立脚本（如分析代码）|
|defer|	❌ 非阻塞|	✅ 顺序|	依赖 DOM/其他脚本的代码|
|动态注入|	❌ 非阻塞|	可控|	精准控制加载时机|
|IntersectionObserver|	❌ 非阻塞|	可控	图片/组件懒加载|
|import()|	❌ 非阻塞|	✅ 顺序|	现代框架路由懒加载（React/Vue）|
