# ES6 新特性

**ES6（ECMAScript 2015）引入了许多新特性，使得JavaScript编程更加便捷和强大。大约15个特性**

## let/const

**`let` / `const`**：`let`允许你声明一个块级作用域的变量，解决了使用`var`时存在的变量提升问题。`const`用于声明常量，一旦赋值就不能再改变。

## 箭头函数

**箭头函数**：提供了一种更简洁的函数书写方式，如`const func = (arg) => arg * 2;`。它还改变了`this`的绑定规则，通常在回调函数中特别有用。

## 模板字符串

**模板字符串**：使用反引号(``)定义的字符串，可以嵌入变量或表达式`${expression}`，方便动态生成字符串内容。

## 解构赋值

**解构赋值**：可以从数组或对象中提取数据并赋值给变量，例如`let {a, b} = {a: 1, b: 2};`。

## 默认参数

**默认参数**：允许为函数的参数设置默认值，如果调用时未传递对应的参数，则使用默认值，如`function(a=1){}`。

## rest 参数

**rest 参数**：使用`...`前缀的参数可以将不确定数量的参数表示为数组，如`function(...args){}`。

## 扩展运算符

**扩展运算符**：与rest参数类似，但用于解构数组或对象，或者是在函数调用时展开数组或对象，如`Math.max(...[1, 2, 3])`。

## class 类

**类**：提供了基于原型的面向对象编程的语法糖，使创建类和继承变得更加直观和简单。

## 模块化

**模块化**：支持原生的模块导入导出功能，通过`import`和`export`关键字实现代码的分割和复用。

## Promise

**`Promise`**：用于处理异步操作的对象，代表了一个异步操作的最终完成（或失败）及其结果值。

## Symbol

**`Symbol`**：一种基本数据类型，通常用来创建对象的唯一属性键。

## Set/Map

**`Set` / `Map`**：`Set`是值的集合，且每个值都是唯一的；`Map`是一个键值对的集合，键可以是任意类型。

## 迭代器与生成器

**迭代器与生成器**：迭代器是一种特殊对象，遵循特定协议以供循环遍历；生成器则允许定义一个返回迭代器对象的函数。

## Proxy/Reflect

**`Proxy` / `Reflect`**：`Proxy`用于创建一个对象的代理，从而拦截并重新定义基本操作（如属性查找、赋值等）。`Reflect`提供了一些静态方法来执行原本由操作符完成的操作（如`.deleteProperty`）。

## async/await

**`async`/`await`**：提供了一种更清晰的方式来处理异步代码，使得异步代码看起来像是同步代码一样易于理解。`async`函数返回一个`Promise`，而`await`等待这个`Promise`解决。
