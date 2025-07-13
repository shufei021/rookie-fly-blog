---
url: /learning/core/modules/page1.md
---
# ES6 特性

> ES6（ECMAScript 2015）是 JavaScript 的一次重大更新，引入了许多新特性，提升了代码的可读性、可维护性和开发效率。以下是 ES6 中一些重要的新特性总结：

### 一、变量声明 let/const

#### 1. `let` 和 `const`

* **块级作用域**：与 `var` 不同，`let` 和 `const` 声明的变量只在当前代码块内有效。
* **不存在变量提升**：必须先声明再使用。
* **`const` 声明常量**：值不能被重新赋值（如果是对象/数组，内容可以变）。

```javascript
{
  let a = 10;
  const b = 20;
}
console.log(a); // ReferenceError
```

***

### 二、箭头函数

#### 2. `=>` 箭头函数

* 更简洁的函数写法。
* **不绑定自己的 `this`**，继承外层作用域的 `this`。

```javascript
const add = (a, b) => a + b;
const greet = name => `Hello, ${name}`;
```

***

### 三、模板字符串

#### 3. 反引号 `` ` ``

* 支持多行字符串和变量插值。

```javascript
const name = "Alice";
console.log(`Hello, ${name}`); // Hello, Alice
```

***

### 四、解构赋值

#### 4. 数组和对象解构

* 快速从数组或对象中提取数据。

```javascript
const [a, b] = [1, 2];
const { name, age } = { name: 'Tom', age: 25 };
```

***

### 五、默认参数

#### 5. 函数参数默认值

* 如果没有传参或为 `undefined`，则使用默认值。

```javascript
function greet(name = 'Guest') {
  console.log(`Hello, ${name}`);
}
greet(); // Hello, Guest
```

***

### 六、展开运算符/剩余参数

#### 6. `...` 展开运算符（Spread）和剩余参数（Rest）

* 展开数组或对象：`[...arr]`
* 收集多个参数到一个数组中：`function foo(...args)`

```javascript
const arr = [1, 2, 3];
const newArr = [...arr, 4]; // [1, 2, 3, 4]

function sum(...nums) {
  return nums.reduce((acc, num) => acc + num);
}
sum(1, 2, 3); // 6
```

***

### 七、类（Class）

#### 7. 类语法糖

* 提供更清晰的面向对象编程方式。

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log(`Hello, I'm ${this.name}`);
  }
}

const p = new Person('Bob');
p.sayHello();
```

***

### 八、模块化 import/export

#### 8. `import` / `export`

* 实现模块的导入导出。

```javascript
// math.js
export const PI = 3.14;

// main.js
import { PI } from './math.js';
console.log(PI);
```

***

### 九、Promise 对象

#### 9. 异步处理机制

* 替代传统的回调函数，解决“回调地狱”。

```javascript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

***

### 十、新数据结构 Map/Set

#### 10. `Map` 和 `Set`

* `Map`：键值对集合，支持任意类型作为键。
* `Set`：类似数组，但成员唯一。

```javascript
const map = new Map();
map.set('key', 'value');

const set = new Set([1, 2, 2, 3]); // Set {1, 2, 3}
```

***

### 十一、其他常用特性

#### 11. `Symbol` 类型

* 表示独一无二的值，常用于对象属性名防止冲突。

```javascript
const id = Symbol('id');
const obj = {
  [id]: 123
};
```

#### 12. `Proxy` 和 `Reflect`

* 用于拦截并定义对象的基本操作（如属性查找、赋值等）。

```javascript
const handler = {
  get(target, prop) {
    return prop in target ? target[prop] : 'Not found';
  }
};

const proxy = new Proxy({ a: 1 }, handler);
console.log(proxy.b); // Not found
```

### 十二、Proxy 与 Reflect

#### 一、Proxy（代理）

##### ✅ 作用：

`Proxy` 对象用于创建一个对象的代理，从而实现对该对象的某些操作进行拦截和自定义处理。

##### ✅ 基本语法：

```javascript
const proxy = new Proxy(target, handler);
```

* `target`：要包装的目标对象。
* `handler`：一个对象，其属性是一个个“陷阱函数”，用于拦截并自定义目标对象的操作。

##### ✅ 示例：

```javascript
const person = {
  name: 'Alice',
  age: 25
};

const handler = {
  get(target, prop) {
    if (prop in target) {
      return Reflect.get(...arguments);
    } else {
      return `Property "${prop}" does not exist.`;
    }
  },
  set(target, prop, value) {
    if (prop === 'age' && typeof value !== 'number') {
      throw new TypeError('Age must be a number');
    }
    return Reflect.set(...arguments);
  }
};

const proxyPerson = new Proxy(person, handler);

console.log(proxyPerson.name); // Alice
console.log(proxyPerson.gender); // Property "gender" does not exist.

proxyPerson.age = 'thirty'; // 报错：Age must be a number
```

##### ✅ 常见拦截操作（traps）：

| 拦截方法 | 用途 |
|----------|------|
| `get(target, propKey, receiver)` | 拦截读取属性 |
| `set(target, propKey, value, receiver)` | 拦截设置属性值 |
| `has(target, propKey)` | 拦截 `in` 运算符 |
| `deleteProperty(target, propKey)` | 拦截 `delete` 操作 |
| `apply(target, thisArg, args)` | 拦截函数调用 |
| `construct(target, args)` | 拦截 `new` 操作符 |

##### ✅ 应用场景：

1. **数据校验**
2. **日志记录 / 调试**
3. **虚拟属性**
4. **响应式系统（Vue.js 使用了类似机制）**
5. **权限控制**

***

#### 二、Reflect（反射）

##### ✅ 作用：

`Reflect` 是一个内置对象，提供了一组与对象操作相对应的方法，很多是与 `Proxy traps` 一一对应的。它通常用于在 `Proxy` 内部调用默认行为。

##### ✅ 特点：

* 方法名与 `Proxy` trap 一致，便于配合使用。
* 返回值更统一，避免了传统操作中的一些不一致性。
* 更符合面向对象的设计思想。

##### ✅ 常用方法：

| 方法 | 作用 |
|------|------|
| `Reflect.get(target, propKey[, receiver])` | 获取属性值 |
| `Reflect.set(target, propKey, value[, receiver])` | 设置属性值 |
| `Reflect.has(target, propKey)` | 判断属性是否存在（相当于 `propKey in target`） |
| `Reflect.deleteProperty(target, propKey)` | 删除属性（相当于 `delete target[propKey]`） |
| `Reflect.construct(target, argumentsList)` | 创建实例（相当于 `new target(...args)`） |
| `Reflect.apply(target, thisArgument, argumentsList)` | 调用函数（相当于 `target.apply(thisArg, args)`） |

##### ✅ 示例：

```javascript
const obj = { foo: 1 };

console.log(Reflect.get(obj, 'foo')); // 1
Reflect.set(obj, 'bar', 2);
console.log(obj.bar); // 2

console.log('foo' in obj);          // true
console.log(Reflect.has(obj, 'foo')) // true

Reflect.deleteProperty(obj, 'bar');
console.log(obj.bar); // undefined
```

***

#### 三、Proxy + Reflect 配合使用的优势

两者结合使用，可以让代理逻辑更清晰、代码更简洁。

##### ✅ 示例：自动记录访问属性的日志

```javascript
const product = {
  price: 100,
  stock: 50
};

const loggedProduct = new Proxy(product, {
  get(target, prop) {
    console.log(`Accessing property: ${prop}`);
    return Reflect.get(...arguments);
  },
  set(target, prop, value) {
    console.log(`Setting property: ${prop} to ${value}`);
    return Reflect.set(...arguments);
  }
});

console.log(loggedProduct.price); // Accessing property: price → 100
loggedProduct.stock = 40;         // Setting property: stock to 40
```

***

#### 四、扩展

> **ES6 中的 Proxy 和 Reflect 是什么？有什么用？**

> “ES6 引入了 `Proxy` 和 `Reflect` 两个新特性，用于更细粒度地控制对象的行为。\
> `Proxy` 可以理解为对象的‘代理’，允许我们拦截并自定义对象的各种操作，比如属性读写、函数调用等。\
> `Reflect` 是一组静态方法，用来以函数方式执行一些原本是语言内部操作的行为，比如获取或设置属性。\
> 它们经常一起使用，`Reflect` 提供默认行为，而 `Proxy` 可以在此基础上添加额外逻辑。\
> 这些特性非常适合做数据验证、日志记录、虚拟属性、甚至构建响应式框架（如 Vue.js 就借鉴了类似的机制）。”

***

#### 总结对比表：

| 特性       | 说明 |
|------------|------|
| `Proxy`    | 拦截对象操作，实现自定义行为 |
| `Reflect`  | 提供标准化的对象操作方法，常配合 Proxy 使用 |
| 典型应用   | 数据校验、日志记录、响应式编程、元编程等 |
| 注意事项   | 不适合代理数组的索引变化，性能略低，需谨慎使用 |

#### 总结

| 特性 | 用途 |
|------|------|
| `let` / `const` | 更安全的变量声明 |
| 箭头函数 | 更简洁的函数表达式 |
| 模板字符串 | 字符串拼接更方便 |
| 解构赋值 | 提取数据更高效 |
| 默认参数 | 函数参数更灵活 |
| 展开/剩余运算符 | 处理数组和参数更优雅 |
| 类 | 面向对象更清晰 |
| 模块化 | 代码组织更规范 |
| Promise | 异步流程更可控 |
| Map/Set/Symbol | 数据结构更强大 |
