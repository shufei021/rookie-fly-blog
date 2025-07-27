# 移动端适配问题如何解决

## 背景
项目想支持 PC、移动端

## 方案

+ 根据端来开发不同的页面（成本较大）
+ 根据不同的端加载不同的 css （可取）
+ 根据响应式，来运行不同的样式规则（**常用**）
+ style 预处理器来做

移动端适配主流方案主要包括以下几种，每种方案适用于不同场景和需求：

## 一、‌视口（Viewport）配置‌

原理‌：通过HTML的`<meta>`标签设置视口属性，控制页面缩放和布局‌。

示例代码‌：
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
```
作用‌：确保页面宽度等于设备宽度，禁止用户手动缩放‌。

## 二、 ‌媒体查询（Media Queries）‌

原理‌：根据设备特性（如屏幕宽度、像素比）应用不同的CSS样式‌。

示例代码‌：
```css
/*  屏幕小于等于 375px 宽度的屏幕，设置容器内边距为10px */
@media screen and (max-width: 375px) { .container { padding: 10px; } }
```
适用场景‌：简单页面或局部布局调整（如导航栏折叠）‌。

## 三、 ‌REM布局‌

原理‌：结合rem单位和动态根字体大小实现整体缩放‌。

示例代码‌：
```javascript
document.documentElement.style.fontSize = (window.innerWidth / 750) * 100 + 'px';
```
```css
.box { width: 3.75rem; /* 设计稿375px */ }
```
优点‌：自动适配不同屏幕，与设计稿尺寸直接对应‌。

## 四、 ‌VW/VH布局‌

原理‌：使用视口百分比单位（vw、vh）直接依赖设备尺寸‌。
示例代码‌：
```css
.hero-banner { height: 50vh; width: 100vw; }
```
注意‌：需处理滚动条问题‌。

## 五、. ‌弹性布局（Flexbox）与网格布局（CSS Grid）‌
Flexbox‌：适用于一维布局，简化复杂布局的实现‌。
```css
.card-container { display: flex; flex-wrap: wrap; gap: 20px; }
```
CSS Grid‌：适用于二维布局，实现复杂的响应式网格‌。
```css
.layout { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
```

## 六、 ‌像素密度适配（高清图适配）‌
原理‌：通过srcset或媒体查询加载不同分辨率的图片‌。
示例代码‌：

```html
<img src="logo.png" srcset="logo@2x.png 2x, logo@3x.png 3x" alt="Logo">
```

适用场景‌：避免高DPR设备上的图片模糊问题‌。

使用 srcset 和 sizes（`推荐现代方案`）

HTML5 引入了 srcset 和 sizes 属性，可以基于设备像素密度和视口大小选择最合适的图片。

✅ HTML 示例：

```html
<img
  src="image-320w.jpg"
  srcset="image-320w.jpg 320w,
          image-480w.jpg 480w,
          image-800w.jpg 800w"
  sizes="(max-width: 600px) 100vw,
         (max-width: 900px) 50vw,
         33vw"
  alt="响应式图片">
```

🔍 说明：
+ srcset：指定不同分辨率的图片及其宽度（w）。
+ sizes：告诉浏览器在不同视口宽度下图片的显示宽度。
+ 浏览器会根据设备像素密度自动选择最佳图片。

使用 `<picture>` 元素（高级控制）

当需要根据媒体查询加载完全不同的图片格式或内容时，可以使用 `<picture>`。


✅ HTML 示例：
```HTML
<picture>
  <source media="(min-width: 800px)" srcset="large.jpg">
  <source media="(min-width: 480px)" srcset="medium.jpg">
  <img src="small.jpg" alt="响应式图片">
</picture>
```
🔍 说明：
+ `<source>`：定义不同媒体条件下的图片源。
+ 最后一个 `<img>` 是默认图片。
+ 可用于加载 WebP 等新格式，兼容旧浏览器。

## 七、流式布局（百分比布局）‌

原理‌：元素宽度按父元素百分比动态调整‌。

示例代码‌：
```css
.container { width: 90%; margin: 0 auto; }
```
优点‌：适应性强，无需针对不同设备编写特定样式‌。

## 八、postcss-pxtorem：自动将 px 转 rem

使用 postcss-pxtoret 插件可以自动将你写在 CSS 中的 px 单位转换为 rem，这样你就可以继续使用熟悉的 px 编写样式，而最终输出的是适配的 rem。


## 推荐方案组合

+ 主流做法‌：REM + JS动态计算字号‌，结合Flexbox或CSS Grid实现复杂布局，加上`postcss-pxtorem`。
+ 简化方案‌：VW/VH布局适合全屏组件，媒体查询用于断点控制‌。


强烈建议使用现代适配方案，如 rem + postcss-pxtorem 或 vw 适配

为了在 Vue 项目中使用 `rem` 单位结合 `postcss-pxtorem` 实现移动端适配，你需要进行以下几个步骤的配置。这个过程包括了安装必要的依赖、配置 PostCSS 和添加动态设置根字体大小的脚本。

### 步骤一：安装必要的依赖

首先，确保你已经初始化了一个 Vue 项目（如果还没有，请先通过 Vue CLI 初始化一个新项目）。然后，你需要安装 `postcss-pxtorem` 插件：

```bash
npm install postcss-pxtorem --save-dev
```

### 步骤二：配置 PostCSS

在你的项目根目录下找到或创建 `postcss.config.js` 文件，并添加以下内容来配置 `postcss-pxtorem`：

```js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue({ file }) {
        // 可以根据文件路径调整rootValue，这里假设设计稿宽度为750px
        return file.indexOf('vant') !== -1 ? 37.5 : 75;
      },
      propList: ['*'],
      exclude: /node_modules/i,
      selectorBlackList: ['.ignore', '.hairlines'], // 忽略某些类名
      minPixelValue: 2, // 小于2px的不转换
    },
  },
};
```

这里的 `rootValue` 设置可以根据你的设计稿尺寸进行调整。通常情况下，如果你的设计稿宽度是 750px，则可以将 `rootValue` 设为 75 或者 100（这意味着 1rem 等于 100px 或 75px）。

### 步骤三：动态设置根字体大小

在 `public/index.html` 或者 `src/main.js` 中加入一段 JavaScript 来动态设置根元素的字体大小：

```html
<script>
  (function(doc, win) {
    var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function() {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = 20 * (clientWidth / 375) + 'px'; // 假设设计稿宽度为375pt
      };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
  })(document, window);
</script>
```

这段代码会在页面加载和窗口大小改变时动态计算并设置根元素的字体大小，以便与你的设计稿匹配。

### 步骤四：编写样式

现在你可以开始在你的 Vue 组件中使用 `px` 单位编写样式了，构建工具会自动将其转换为 `rem`。例如：

```css
.box {
  width: 375px; /* 这将会被转换为 3.75rem */
  height: 50px; /* 转换为 0.5rem */
}
```

### 总结

以上就是在 Vue 项目中使用 `rem` 结合 `postcss-pxtorem` 的完整配置流程。通过这种方式，你可以轻松地实现基于设计稿的响应式布局，同时保持代码的简洁性和可维护性。记得根据自己的实际需求调整配置中的参数，比如设计稿的宽度等。
<!-- ## 背景
项目想支持 PC、移动端

## 方案

+ 根据端来开发不同的页面（成本较大）
+ 根据不同的端加载不同的 css （可取）
+ 根据响应式，来运行不同的样式规则（**常用**）
+ style 预处理器来做

## 考虑问题

设置视窗，通过元信息来配置meta

## 方案1

+ 媒体查询 + 弹性布局 -->
