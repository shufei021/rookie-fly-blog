---
url: /Interview/css/pages/page1.md
---
# flex

> `Flex` 是 `Flexible Box` 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。任何一个容器都可以指定为 `Flex` 布局。行内元素也可以使用 `Flex` 布局。`display: inline-flex;`

## 容器属性

### flex-direction 主轴方向

* `flex-direction：`属性决定主轴的方向（即项目的排列方向）
  ::: tip flex-direction属性的4个值
* row（默认值）：主轴为水平方向，起点在左端。
* row-reverse：主轴为水平方向，起点在右端。
* column：主轴为垂直方向，起点在上沿。
* column-reverse：主轴为垂直方向，起点在下沿。
  :::

### flex-wrap 如何换行

* `flex-wrap：`默认情况下，项目都排在一条线（又称"轴线"）上。`flex-wrap`属性定义，如果一条轴线排不下，如何换行

::: tip flex-wrap属性的3个值

* nowrap （默认值）：不换行。
* wrap：换行，第一行在上方。
* wrap-reverse：换行，第一行在下方。
  :::

### flex-flow 前两个简写

* `flex-flow：` `flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`
* `justify-content：`项目在主轴上的对齐方式
* `align-items：`项目在交叉轴上如何对齐
* `align-content：`多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用

## 项目属性

* `order：`项目的排列顺序。数值越小，排列越靠前，默认为0
* `flex-grow：`项目的放大比例，默认为0，即如果存在剩余空间，也不放大
* `flex-shrink：`项目的缩小比例，默认为1，即如果空间不足，该项目将缩小
* `flex-basis：`在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小
* `flex：` `flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为0 1 auto。后两个属性可选
* `align-self：`允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`
