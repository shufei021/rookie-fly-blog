---
url: /learning/core/modules/page3.md
---
# 🎯 JavaScript 中 原型 和 原型链 的理解

✅ 回答思路：

> 从“`什么是原型`”、“`对象如何查找属性`”、“`构造函数与原型的关系`”、“`原型链的作用`”以及“`继承实现的基础`”这几个方面来回答这个问题。

### 一、什么是原型（Prototype）？

JavaScript 是一门基于**原型的语言（prototype-based language）**，而不是像 Java 或 C++ 那样基于类（class-based）的语言。

* 每个函数都有一个 `prototype` 属性，它是一个对象。
* 这个对象是通过该函数创建的实例的原型（即所有实例共享这个原型上的属性和方法）。

```javascript
function Person(name) {
  this.name = name;
}

// 给原型添加方法
Person.prototype.sayHello = function() {
  console.log('Hello, I am ' + this.name);
};

const p1 = new Person('Alice');
p1.sayHello(); // Hello, I am Alice
```

***

### 二、什么是原型链（Prototype Chain）？

当访问一个对象的属性或方法时，如果该对象本身没有这个属性，JavaScript 引擎会去它的**原型对象**中查找；如果原型也没有，则继续向上查找，直到找到 `Object.prototype`，最终为 `null` —— 这就是**原型链**。

#### 🔁 查找顺序如下：

```
实例对象 → 构造函数的 prototype 对象 → Object.prototype → null
```

#### 示例说明：

```javascript
function Animal() {}
Animal.prototype.eat = function() {
  console.log('Eating...');
};

function Dog() {}
Dog.prototype = Object.create(Animal.prototype); // 设置原型链
Dog.prototype.bark = function() {
  console.log('Woof!');
};

const dog = new Dog();
dog.eat();  // Eating...
dog.bark(); // Woof!
```

在这个例子中，`Dog` 的原型继承自 `Animal` 的原型，从而实现了继承机制。

***

### 三、构造函数、实例、原型之间的关系

可以用一句话概括这三者的关系：

> **每一个构造函数都有一个 prototype 属性指向它的原型对象；每个实例都有一个内部属性 \[\[Prototype]]（可通过 **proto** 访问），指向构造函数的原型对象。**

```text
构造函数
   |
   | prototype
   ↓
原型对象 <--- 实例.__proto__
   ↑
[[Prototype]]
   |
实例对象
```

***

### 四、原型链的作用

1. **实现继承**：子类可以继承父类的方法和属性。
2. **共享数据**：多个实例共享原型上的方法，节省内存。
3. **属性查找机制**：JavaScript 就是通过原型链来查找对象属性的。

***

### 五、原型链的终点：Object.prototype

所有对象的原型链最终都会到达 `Object.prototype`，它是原型链的顶端。

```javascript
console.log(Object.prototype); // {constructor: ƒ, __defineGetter__: ƒ, ...}
console.log(Object.prototype.__proto__); // null
```

***

### 六、常见的误区 & 注意事项

| 问题 | 解释 |
|------|------|
| `__proto__` 与 `prototype` 的区别？ | `prototype` 是函数才有的属性；`__proto__` 是对象实例的属性，指向其构造函数的 `prototype` |
| 所有函数都有 prototype 吗？ | 是的，包括箭头函数（但不能作为构造函数使用） |
| 原型链能无限延伸吗？ | 不是，最终会到 `null` 结束 |

***

### ✅ 总结

> 在 JavaScript 中，每个对象都有一个原型（`__proto__`），对象在访问属性或方法时，会沿着原型链逐级查找，直到找到或者查找到 `null` 为止。原型链是 JavaScript 实现继承的核心机制。构造函数通过 `prototype` 属性将方法共享给其实例，而实例通过原型链访问这些方法和属性。

### 💡 扩展

| 内容 | 说明 |
|------|------|
| `__proto__` vs `prototype` | `prototype` 是函数才有的属性；`__proto__` 是对象实例的属性，指向其构造函数的 `prototype` |
| 原型继承 vs 类继承 | JS 是原型继承语言，没有真正的类；ES6 的 `class` 是语法糖 |
| 使用 `Object.create()` | 更灵活地创建对象并指定原型，避免构造函数副作用 |
| 原型污染 | 不要轻易修改 `Object.prototype`，可能带来安全风险和性能问题 |
