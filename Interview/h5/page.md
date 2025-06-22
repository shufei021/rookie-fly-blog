---
url: /Interview/h5/page.md
---
# H5

## 移动端适配

* `rem` + 动态html的font-size

* 问题一：针对不同的屏幕，设置html不同的font-size

* 问题二：将原来要设置的尺寸，转化成rem单位

```bash
npm i lib-flexible
```

```js
// main.js
import 'lib-flexible'
```

```bash
postcss-px-to-rem -D
```

````

安装 `postcss-pxtorem` 插件

```bash
npm i postcss-pxtorem
````

项目文件配置

```js
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
      // selectorBlackList: ['van-'] // rem 只转换业务的 不转换vant ui的样式
    }
  }
}
```

::: details {open}

```js
{
    rootValue: 37.5, // (数字 | 函数) 表示根元素字体大小或根据input参数返回根元素字体大小
    unitPrecision: 5, // （数字）允许 REM 单位增长的十进制数。
    propList: ['font', 'font-size', 'line-height', 'letter-spacing'], // （数组）可以从 px 变为 rem 的属性。
    selectorBlackList: [], // （数组）要忽略并保留为 px 的选择器。
    replace: true, // （布尔值）替换包含 rems 的规则而不是添加后备。
    mediaQuery: false, // （布尔值）允许在媒体查询中转换 px。
    minPixelValue: 0, // （数字）设置要替换的最小像素值。
    exclude: /node_modules/i // （字符串、正则表达式、函数）忽略并保留为 px 的文件路径。
}
```

```js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375,  // 视口的宽度，对应的是我们设计稿的宽度
      viewportHeight: 667, // 视口的高度，对应的是我们设计稿的高度 (可选)
      unitPrecision: 5,    // 指定`px`转换为视窗单位值的小数位数
                           //（很多时候无法整除）
      viewportUnit: 'vw',  // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，
                           // 可以自定义，可以无限添加，建议定义一至两个通用的类名
      minPixelValue: 1,    // 小于或等于`1px`不转换为视窗单位
      mediaQuery: false    // 允许在媒体查询中转换`px`
    }
  }
}
```

:::

根节点 的字体大小来适配

```js
// screenRatioByDesign 设计图 rem16 / 9
(function init(screenRatioByDesign = 16 / 9) {
    // 文档的根元素
  let docEle = document.documentElement
  function setHtmlFontSize() {
    // 1. 计算当前屏幕宽高比
    var screenRatio = docEle.clientWidth / docEle.clientHeight;
    // 2. 动态计算字体大小
    var fontSize = (
        screenRatio > screenRatioByDesign
        ? (screenRatioByDesign / screenRatio) // 宽屏场景：按比例缩小
        : 1 // 窄屏场景：不缩放
    ) * docEle.clientWidth / 10; // 基准值 = 屏幕宽度的1/10
    // 3. 设置根元素字体大小
    docEle.style.fontSize = fontSize.toFixed(3) + "px";
  }
  setHtmlFontSize()
  window.addEventListener('resize', setHtmlFontSize)
})()
```
