---
url: /learning/core/modules/page2.md
---
# 箭头函数 vs 普通函数

> 在现代 JavaScript 中，箭头函数（Arrow Functions）和普通函数（Function Declarations/Expressions）是两种定义函数的方式，它们在语法、用途以及行为上有一些关键的不同点。以下是它们的主要区别：

### 一、语法差异

* **普通函数**：
  普通函数的定义方式较为传统，既可以作为函数声明也可以作为函数表达式使用。

  ```javascript
  function add(a, b) {
    return a + b;
  }
  ```

* **箭头函数**：
  箭头函数提供了一种更加简洁的语法来定义函数，尤其适用于简短的函数体。

  ```javascript
  const add = (a, b) => a + b;
  ```

### 二、`this` 绑定

* **普通函数**：`this` 的值取决于函数如何被调用。它可能指向全局对象（在非严格模式下），当前实例（对于方法），或 `undefined`（在严格模式下）。

* **箭头函数**：箭头函数不绑定自己的 `this` 值；相反，它会捕获并使用其定义时所在上下文的 `this` 值。这意味着箭头函数内部的 `this` 值与外部作用域中的 `this` 相同。

  ```javascript
  const obj = {
    regularFunc: function() {
      console.log(this); // this points to obj
    },
    arrowFunc: () => {
      console.log(this); // this points to the outer scope's this value
    }
  };
  ```

### 三、构造函数

* **普通函数**：可以作为构造函数使用，通过 `new` 关键字创建对象实例。

* **箭头函数**：不能用作构造函数，尝试使用 `new` 关键字调用箭头函数将抛出错误。

### 四、参数处理

* **普通函数**：支持 `arguments` 对象，它是一个类数组对象，包含传递给函数的所有参数。

* **箭头函数**：不拥有 `arguments` 对象，但可以通过剩余参数（rest parameters）实现类似功能。

  ```javascript
  function regularFunc() {
    console.log(arguments);
  }
  const arrowFunc = (...args) => console.log(args);
  ```

### 五、原型属性

* **普通函数**：具有一个 `prototype` 属性，这对于基于原型的继承很重要。

* **箭头函数**：没有 `prototype` 属性。

### 六、super

* **普通函数**：能通过super继承父类的属性和方法

* **箭头函数**：不能通过super继承父类的属性和方法

### 适用场景

* **普通函数**：适用于需要动态 `this` 值的场景，如对象的方法、构造函数等。

* **箭头函数**：更适合用于匿名函数表达式，特别是当需要访问父级作用域的 `this` 值时，比如在回调函数中。

### 总结对比表：

| 特性 | 普通函数 | 箭头函数 |
| --- | --- | --- |
| 语法 | 更加冗长 | 更为简洁 |
| `this` 绑定 | 动态绑定，依赖于调用方式 | 静态绑定，继承自外层作用域 |
| 构造函数 | 可以使用 `new` 创建实例 | 不允许使用 `new` |
| `arguments` 对象 | 支持 | 不直接支持，但可通过 rest 参数替代 |
| `prototype` 属性 | 存在 | 不存在 |
| super | 能 | 不能 |
