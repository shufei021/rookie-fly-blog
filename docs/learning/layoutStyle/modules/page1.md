
# flex

在前端开发中，`flex`（弹性盒子布局，Flexbox）是一种现代的、高效的 CSS 布局模型，特别适合用于一维布局（即行或列）。它简化了在不同屏幕尺寸和设备上对齐、分布和排列元素的方式，是响应式设计的重要工具。

---

### 一、Flex 布局的基本概念

Flex 布局由 **容器（flex container）** 和 **项目（flex items）** 组成：

- **Flex 容器（Flex Container）**：通过设置 `display: flex` 或 `display: inline-flex` 的元素。
- **Flex 项目（Flex Items）**：容器的直接子元素。

```css
.container {
  display: flex;
}
```

---

### 二、Flex 容器的主要属性

#### 1. `flex-direction`  
定义主轴方向（即项目的排列方向）

```css
flex-direction: row | row-reverse | column | column-reverse;
```

- `row`（默认）：从左到右水平排列
- `row-reverse`：从右到左
- `column`：从上到下垂直排列
- `column-reverse`：从下到上

---

#### 2. `flex-wrap`  
定义项目是否换行

```css
flex-wrap: nowrap | wrap | wrap-reverse;
```

- `nowrap`（默认）：不换行
- `wrap`：换行
- `wrap-reverse`：换行但方向相反

---

#### 3. `justify-content`  
定义主轴上的对齐方式

```css
justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
```

- `flex-start`（默认）：左对齐
- `center`：居中
- `space-between`：两端对齐，项目之间间距相等
- `space-around`：项目周围间距相等

---

#### 4. `align-items`  
定义交叉轴上的对齐方式（适用于所有项目）

```css
align-items: stretch | flex-start | flex-end | center | baseline;
```

- `stretch`（默认）：拉伸填满容器
- `center`：居中
- `flex-start`：顶部对齐
- `flex-end`：底部对齐

---

#### 5. `align-content`  
多行项目在交叉轴上的对齐方式（仅在换行时生效）

```css
align-content: stretch | flex-start | flex-end | center | space-between | space-around;
```

---

### 三、Flex 项目的主要属性

#### 1. `order`  
定义项目的排列顺序，默认是 0，数值越小越靠前

```css
order: <integer>;
```

---

#### 2. `flex-grow`  
定义项目的放大比例，默认为 0（不放大）

```css
flex-grow: 1; /* 项目将填满剩余空间 */
```

---

#### 3. `flex-shrink`  
定义项目的缩小比例，默认为 1（空间不足时会缩小）

```css
flex-shrink: 0; /* 不缩小 */
```

---

#### 4. `flex-basis`  
定义在分配多余空间之前，项目占据的主轴空间

```css
flex-basis: auto | <length>;
```

- `auto`：根据 width/height 属性决定大小
- 可以设置固定值如 `200px`

---

#### 5. `flex`（推荐使用简写）

```css
flex: <flex-grow> <flex-shrink> <flex-basis>;
```

常用简写：
- `flex: 1` → `flex: 1 1 0%`
- `flex: auto` → `flex: 1 1 auto`
- `flex: none` → `flex: 0 0 auto`

---

### 四、常见应用场景（面试常问）

| 场景 | 解法 |
|------|------|
| 水平垂直居中 | `display: flex; justify-content: center; align-items: center` |
| 等宽等高布局 | 使用 `flex: 1` 或 `flex-grow: 1` |
| 响应式导航栏 | 使用 `flex-wrap: wrap` 配合媒体查询 |
| 自适应间距 | 使用 `gap` 属性（CSS Grid 也支持） |
| 左右结构（如页眉页脚） | 使用 `justify-content: space-between` |

---

### 五、Flex 与 Grid 的区别（扩展）

| 特性 | Flexbox | CSS Grid |
|------|---------|----------|
| 布局维度 | 一维（行或列） | 二维（行和列） |
| 适合场景 | 项目排列、对齐 | 复杂页面布局 |
| 控制粒度 | 项目级控制 | 区域级控制 |
| 兼容性 | 较好 | 现代浏览器支持良好 |

---

### 六、面试题示例

#### 问题 1：如何实现一个水平垂直居中的 div？

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

---

#### 问题 2：flex: 1 是什么意思？

等价于 `flex: 1 1 0%`，表示项目将等比例放大以填满容器，不缩小。

---

#### 问题 3：flex-wrap 是干什么的？

控制项目是否换行。默认不换行（`nowrap`），设置为 `wrap` 时会根据容器大小自动换行。

---

### 七、注意事项

- Flex 布局只对直接子元素生效（不嵌套）
- 不适用于复杂的二维布局，建议用 CSS Grid
- `flex` 属性不能用于 `display: inline` 元素
- 使用 `gap` 属性时注意兼容性（IE 不支持）

