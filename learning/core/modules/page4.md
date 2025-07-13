---
url: /learning/core/modules/page4.md
---
# 函数柯里化

> 函数柯里化（Currying）是一种函数式编程中的技术，它将一个接受多个参数的函数转换成一系列接受单个参数的函数。换句话说，**柯里化是一个将多参数函数转化为一系列单参数函数的过程**。

### 一、什么是函数柯里化？

举个例子：

```javascript
function add(a, b, c) {
  return a + b + c;
}
```

这个函数接受三个参数。使用柯里化后，可以变成这样：

```javascript
const curriedAdd = curry(add);

curriedAdd(1)(2)(3); // 6
```

或者：

```javascript
curriedAdd(1)(2)(3); // 等价于 add(1, 2, 3)
```

***

### 二、柯里化的实现原理

我们可以手动写一个通用的 `curry` 函数来实现柯里化：

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}
```

#### 示例：

```javascript
function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);

console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
console.log(curriedSum(1)(2, 3)); // 6
```

***

### 三、柯里化的作用和优势

1. **参数复用**：

   * 柯里化允许你提前传入部分参数，生成一个新函数。
   * 这样可以避免重复传参。

   ```javascript
   const add = (a, b) => a + b;
   const add10 = curry(add)(10);
   console.log(add10(5)); // 15
   ```

2. **提高函数可组合性**：
   * 在函数式编程中，柯里化使得函数更容易组合。

3. **延迟执行**：
   * 参数可以分多次传入，最终执行时才计算结果。

4. **增强代码可读性和表达力**：
   * 可以写出更具语义的链式调用。

***

### 四、可能的问题点

#### 1. 手写一个柯里化函数

* 要求你能写出上面提到的 `curry` 函数。
* 注意处理 `this` 的绑定。
* 考察对闭包、递归的理解。

#### 2. 柯里化与偏函数的区别？

| 特征 | 柯里化 | 偏函数 |
|------|--------|---------|
| 目标 | 多参数函数 → 单参数函数链 | 固定部分参数，返回新函数 |
| 参数顺序 | 从左到右依次传入 | 可固定任意位置参数 |
| 实现方式 | 通常通过递归或闭包 | 使用 bind 或封装 |

#### 3. 柯里化在实际开发中的应用

* React 中的事件处理函数优化
* 工具函数库如 Lodash 中的 `_.curry`
* 高阶组件（HOC）设计思想类似柯里化

***

### 五、扩展：自动柯里化工具函数（Lodash）

```javascript
const _ = require('lodash');

const add = _.curry(function(a, b, c) {
  return a + b + c;
});

add(1)(2)(3); // 6
```

***

### 六、总结一句话

> **函数柯里化是把一个多参数函数拆分成一系列单参数函数的技术，目的是让函数更灵活、更易于复用和组合。**

::: details {open}
当然可以！以下是一段“面试官问你函数柯里化”的完整模拟问答，适用于前端/JavaScript 高级开发岗位的面试场景：

***

🎤【面试官提问】：

> **面试官**：我看你在简历中提到了函数式编程相关经验，那我来问一下，你能说说什么是函数柯里化吗？

***

💬【你的回答】：

> **候选人**：好的。函数柯里化（Currying）是一种函数式编程中的技术，它将一个接受多个参数的函数转换成一系列依次接受单个参数的函数。

举个例子，比如我们有一个函数 `add(a, b, c)`，正常调用是 `add(1, 2, 3)`，而通过柯里化之后，我们可以这样调用：`curriedAdd(1)(2)(3)`。

它的核心思想是：**每次调用只传入一个参数，返回一个新的函数，直到所有参数都被传入为止，最后执行原始函数并返回结果**。

***

🎤【面试官追问】：

> **面试官**：那你能不能手写一个通用的柯里化函数呢？

***

💬【你的回答】：

> **候选人**：当然可以。下面是一个简单的通用柯里化函数实现：

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      // 参数已满足，执行原函数
      return fn.apply(this, args);
    } else {
      // 参数不足，返回新函数继续接收参数
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}
```

使用示例：

```javascript
function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);

console.log(curriedSum(1)(2)(3));       // 6
console.log(curriedSum(1, 2)(3));       // 6
console.log(curriedSum(1)(2, 3));       // 6
```

这个实现的关键在于利用了闭包和递归来逐步收集参数，直到满足原始函数所需的参数数量后才真正执行。

***

🎤【面试官再问】：

> **面试官**：柯里化有什么实际应用？在项目中你会在哪种场景下使用它？

***

💬【你的回答】：

> **候选人**：柯里化有几个非常实用的场景：

1. **参数复用**：
   * 比如我可以把某个常用参数提前固定下来，生成一个更专用的函数。
   * 示例：`const formatMoney = formatCurrency('USD')`，后面只需要传金额即可。

2. **高阶组件设计思想类似柯里化**（React 场景）：
   * React 中的 HOC（高阶组件）本质上就是一种偏函数或柯里化的体现，比如：
     ```jsx
     const withLoading = (Component) => (props) => (
       <Suspense fallback="Loading..."><Component {...props} /></Suspense>
     );
     ```

3. **链式调用、逻辑清晰**：
   * 柯里化可以让代码更具可读性，例如在处理数据流时，逐步传参让意图更明确。

4. **函数组合（Function Composition）**：
   * 在函数式编程中，很多库（如 Ramda、Lodash）都提供了柯里化版本的工具函数，方便进行函数组合。

***

🎤【面试官总结性提问】：

> **面试官**：那你说说，柯里化和偏函数的区别是什么？

***

💬【你的回答】：

> **候选人**：这是一个很好的问题。

| 特征 | 柯里化 | 偏函数 |
|------|--------|---------|
| 定义 | 将多参数函数转换为一系列单参数函数 | 固定部分参数，返回剩余参数的新函数 |
| 调用方式 | `f(a)(b)(c)` | `f(a, b, c)` 或 `f.bind(null, a)` |
| 参数顺序 | 通常从左到右依次传入 | 可以固定任意位置的参数 |
| 实现方式 | 多数基于递归和闭包 | 一般通过 `bind` 或封装函数 |

简单来说，**柯里化是按顺序一步步传参，偏函数是预先填一部分参数，剩下的继续一次性传完**。

***

🎤【面试官点头】

> **面试官**：嗯，理解得挺深入的，不错 👍

***

✅ 总结建议：

这段问答展示了你对函数柯里化的理解深度，包括：

* 基本定义
* 手动实现
* 实际应用场景
* 与偏函数的对比

:::
