---
url: /note/css/css.md
---
# 列表布局

> 在微信小程序 或是 移动端上，有时候会出现神秘的1px差异，如果你是商品列表 三个 一行，那么第一行的第三个将会挤到第二行去，从而导致样式错乱，以下布局可以解决以上问题

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px; /* 商品之间的间距 */
}

.product-item {
  flex: 0 0 calc((100% - 2 * 8px) / 3); /* 计算出正确的宽度，减去左右边距影响 */
  box-sizing: border-box;
  background-color: #f8f8f8;
  padding: 16px;
  text-align: center;
}
@media (max-width: 768px) {
  .product-item {
    flex: 0 0 calc((100% - 1 * 8px) / 2);
  }
}

@media (max-width: 480px) {
  .product-item {
    flex: 0 0 100%;
  }
}  
</style>

<body>
  <div class="product-list">
    <div class="product-item">商品 1</div>
    <div class="product-item">商品 2</div>
    <div class="product-item">商品 3</div>
    <div class="product-item">商品 4</div>
    <div class="product-item">商品 5</div>
    <div class="product-item">商品 6</div>
    <div class="product-item">商品 7</div>
    <div class="product-item">商品 8</div>
    <div class="product-item">商品 9</div>
    <div class="product-item">商品 10</div>
    <div class="product-item">商品 11</div>
    <div class="product-item">商品 12</div>
    <div class="product-item">商品 13</div>
    <div class="product-item">商品 14</div>
    <div class="product-item">商品 15</div>
    <div class="product-item">商品 16</div>
  </div>
</body>
</html>
```
