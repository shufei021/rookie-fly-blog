# requestAnimationFrame

`requestAnimationFrame` 是一个浏览器提供的 API，用于在下一次重绘之前执行动画操作。它非常适合用来创建高性能的动画，因为它会根据浏览器的刷新率自动调整调用频率（通常为每秒 60 次），并且在页面处于非激活状态（如标签页被隐藏）时停止调用，从而节省资源。


### 基本用法

```javascript
function animate() {
  // 在这里执行动画操作，例如更新元素的位置、样式等

  // 继续请求下一帧
  requestAnimationFrame(animate);
}

// 启动动画
requestAnimationFrame(animate);
```


### 特点

1. **性能优化**：
   - 浏览器会自动优化多个动画的调用，确保它们同步执行，减少重排重绘的次数。
   - 在页面不可见时（如标签页被切换走），会暂停执行，节省 CPU/GPU 资源。

2. **高精度时间戳**：
   - 传入回调函数的时间参数是一个 `DOMHighResTimeStamp`，表示当前的时间戳（单位为毫秒），精度高于 `Date.now()`。

   ```javascript
   function animate(timestamp) {
     console.log(`当前时间戳：${timestamp} 毫秒`);
     requestAnimationFrame(animate);
   }

   requestAnimationFrame(animate);
   ```

3. **自动适应刷新率**：
   - 通常每秒调用 60 次（即大约每 16.7 毫秒一次），但会根据设备的屏幕刷新率进行调整（如 120Hz 屏幕可能会调用 120 次/秒）。

---

### 示例：移动一个元素

```html
<div id="box" style="width: 50px; height: 50px; background: red; position: absolute; left: 0;"></div>
```

```javascript
const box = document.getElementById('box');
let start = null;

function moveBox(timestamp) {
  if (!start) start = timestamp;
  const elapsed = timestamp - start;
  const progress = elapsed / 1000; // 动画持续时间（秒）
  const x = Math.min(progress * 100, 300); // 每秒移动 100px，最大到 300px

  box.style.left = x + 'px';

  if (x < 300) {
    requestAnimationFrame(moveBox);
  }
}

requestAnimationFrame(moveBox);
```


### 停止动画

要停止动画，可以不继续调用 `requestAnimationFrame`。也可以使用 `cancelAnimationFrame` 来取消一个尚未执行的请求。

```javascript
let requestId = requestAnimationFrame(myFunction);

cancelAnimationFrame(requestId);
```


### 与 `setInterval` / `setTimeout` 的区别

| 特性 | `requestAnimationFrame` | `setInterval` / `setTimeout` |
|------|--------------------------|-------------------------------|
| 性能优化 | ✅ 自动优化，适应刷新率 | ❌ 需手动控制时间间隔 |
| 页面隐藏时 | 暂停执行 | 仍继续执行 |
| 时间精度 | 高（使用 `DOMHighResTimeStamp`） | 低（依赖 JS 引擎） |
| 适合场景 | 动画、游戏循环 | 简单定时任务 |




