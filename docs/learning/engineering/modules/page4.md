# TypeScript
在前端面试中，关于 **TypeScript** 的问题通常会涉及基础概念、类型系统、与 JavaScript 的区别、实际应用等方面。

## 🧠 一、基础概念

### 1. 什么是 TypeScript？它和 JavaScript 有什么区别？

**答：**
- **TypeScript** 是由微软开发的开源编程语言，是 JavaScript 的超集，添加了可选的静态类型和面向对象等特性。
- **区别：**
  - TypeScript 支持类型检查（编译时），JavaScript 是动态类型。
  - TypeScript 支持接口（interface）、泛型、装饰器等高级语法。
  - TypeScript 需要通过编译转译成 JavaScript 才能在浏览器或 Node.js 中运行。

---

### 2. TypeScript 的核心优势是什么？

**答：**
- **类型安全**：可以在编译阶段发现潜在错误。
- **代码可维护性增强**：类型注解让代码更清晰。
- **支持最新的 ECMAScript 特性**，并通过 `target` 编译为旧版 JS。
- **更好的 IDE 支持**：如自动补全、重构、跳转定义等。
- **适用于大型项目**：类型系统帮助团队协作。

---

## 🔤 二、类型系统

### 3. 常见的 TypeScript 类型有哪些？

**答：**
- 原始类型：`number`, `string`, `boolean`, `null`, `undefined`, `symbol`
- 数组类型：`number[]` 或 `Array<number>`
- 元组类型：`[string, number]`
- 枚举类型：`enum`
- 任意类型：`any`（不推荐）
- 未知类型：`unknown`
- void：函数没有返回值
- never：永远不会返回的函数
- object：非原始类型的对象
- 联合类型：`string | number`
- 交叉类型：`T & U`

---

### 4. `any` 和 `unknown` 的区别？

**答：**
- `any`：完全跳过类型检查，可以赋值给任何变量，也可以调用其方法，但失去了类型保护。
- `unknown`：必须进行类型检查后才能操作，更安全。

```ts
let value: any = "hello";
value(); // 合法，但可能出错

let val: unknown = "hello";
val(); // ❌ 报错，不能直接调用
```

---

### 5. 什么是联合类型和类型守卫？

**答：**
- 联合类型使用 `|` 表示一个值可能是多个类型之一。
- 类型守卫用于在运行时判断具体类型。

```ts
function printId(id: number | string) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase()); // 只有 string 类型才允许调用
  } else {
    console.log(id);
  }
}
```

---

## 📦 三、接口与类

### 6. `interface` 和 `type` 的区别？

**答：**
| 特性             | interface                     | type                          |
|------------------|-------------------------------|-------------------------------|
| 是否可合并       | ✅ 可以声明合并               | ❌ 不可以                      |
| 支持联合/交叉类型 | ❌                            | ✅                           |
| 支持映射类型     | ❌                            | ✅                           |
| 支持基本类型别名 | ❌                            | ✅ 如 `type ID = string;`     |

> 推荐优先使用 `interface`，除非需要用到 `type` 的高级功能。

---

### 7. TypeScript 中的访问修饰符有哪些？

**答：**
- `public`：默认，公共属性，可在外部访问。
- `private`：私有属性，只能在类内部访问。
- `protected`：受保护属性，可在类和子类中访问。
- `readonly`：只读属性，只能在声明或构造函数中赋值。

---

## 🔄 四、泛型与高级类型

### 8. 泛型是什么？举例说明它的用途。

**答：**
- 泛型允许我们编写可重用且类型安全的组件，延迟指定类型直到使用时。

```ts
function identity<T>(arg: T): T {
  return arg;
}

const result1 = identity<string>("hello");
const result2 = identity<number>(123);
```

---

### 9. 什么是条件类型（Conditional Types）？

**答：**
- 条件类型允许根据某个类型是否满足某种条件来决定另一个类型。

```ts
type IsString<T> = T extends string ? true : false;

type A = IsString<"hello">; // true
type B = IsString<123>;     // false
```

---

### 10. Partial、Required、Readonly 等内置类型的作用？

**答：**
- `Partial<T>`：将所有属性变为可选。
- `Required<T>`：将所有属性变为必填。
- `Readonly<T>`：将所有属性设为只读。
- `Pick<T, K>`：从 T 中选取一组属性 K。
- `Omit<T, K>`：从 T 中排除一组属性 K。
- `Record<K, T>`：创建一个键类型为 K，值类型为 T 的对象。

```ts
type User = { name: string; age: number };

type OptionalUser = Partial<User>;
// => { name?: string; age?: number }
```

---

## ⚙️ 五、其他常见问题

### 11. 如何配置 TypeScript 项目？常用配置项有哪些？

**答：**
- 创建 `tsconfig.json` 文件。
- 常用配置：
  - `"target"`：编译目标版本（如 `"ES2020"`）
  - `"module"`：模块系统（如 `"ESNext"`）
  - `"strict"`：开启严格模式
  - `"outDir"`：输出目录
  - `"rootDir"`：源文件目录
  - `"esModuleInterop"`：启用 ES 模块互操作
  - `"skipLibCheck"`：跳过库类型检查

---

### 12. 在 React 项目中如何使用 TypeScript？

**答：**
- 使用 `.tsx` 文件扩展名。
- 定义组件 props 的类型。
- 使用泛型定义 state 类型。
- 利用类型推断和类型注解提高安全性。

```tsx
interface Props {
  title: string;
  count?: number;
}

const MyComponent: React.FC<Props> = ({ title, count = 0 }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>Count: {count}</p>
    </div>
  );
};
```

---

## ✅ 总结建议

| 类型 | 建议 |
|------|------|
| 类型注解 | 明确写出类型，避免 `any` |
| 严格模式 | 开启 `strict`，防止潜在 bug |
| 工具使用 | 配合 VS Code + ESLint + Prettier 提升体验 |
| 实战练习 | 多写类型体操题（Type Challenges） |

好的！我们继续模拟一场 **TypeScript 面试**，这次是完整的问答形式。我扮演面试官，你扮演应聘者。

---

## 🧑‍💼 面试官：你好，欢迎来参加我们的前端开发岗位面试。我是今天的面试官张工。

### 问题 1：请简单介绍一下你对 TypeScript 的理解，它解决了 JavaScript 的哪些痛点？

---

### 👨‍💻 应聘者（你）回答：

TypeScript 是 JavaScript 的超集，它在 JavaScript 的基础上增加了静态类型系统和面向对象等高级特性。TypeScript 最终会被编译成普通的 JavaScript 代码，可以在任何支持 JavaScript 的环境中运行。

它主要解决了以下几个 JavaScript 的痛点：

1. **类型不安全**：JavaScript 是动态类型语言，变量类型在运行时才确定，容易引发意料之外的错误。而 TypeScript 在编译阶段就能检测出类型错误。
2. **可维护性差**：大型项目中，没有类型注解会让代码难以理解和维护。TypeScript 的类型系统提升了代码的可读性和可维护性。
3. **缺乏良好的 IDE 支持**：TypeScript 提供了更好的自动补全、重构、跳转定义等功能，提升开发效率。
4. **团队协作困难**：明确的类型定义有助于多人协作，减少沟通成本。

---

### 🧑‍💼 面试官反馈：

嗯，你的回答很全面，对 TypeScript 的核心优势把握得不错。那我再问一个进阶点的问题：

---

### 问题 2：`any` 和 `unknown` 类型有什么区别？什么时候应该使用它们？

---

### 👨‍💻 应聘者（你）回答：

`any` 和 `unknown` 都表示未知类型，但它们的安全级别不同：

- `any` 表示完全跳过类型检查，可以赋值给任意类型，也可以调用它的方法或属性，这会失去类型保护，不推荐使用。
- `unknown` 表示该类型未知，但在使用前必须进行类型检查或类型收窄，否则不能直接操作，这样更安全。

例如：

```ts
let value: any = "hello";
value(); // 合法，但可能出错

let val: unknown = "hello";
val(); // ❌ 报错，不能直接调用
```

使用场景：
- `any` 一般用于迁移旧项目或临时绕过类型检查（不推荐）。
- `unknown` 更适合处理不确定类型的值，比如用户输入、API 返回等，在使用前做类型守卫判断。

---

### 🧑‍💼 面试官反馈：

很好！你不仅说出了两者的区别，还给出了使用建议，说明你在实际项目中有一定的经验。

接下来考考你关于接口和类的理解：

---

### 问题 3：`interface` 和 `type` 有什么区别？你会在什么场景下选择其中一个？

---

### 👨‍💻 应聘者（你）回答：

`interface` 和 `type` 都可以用来定义对象的结构，但它们有一些关键差异：

| 特性             | interface                     | type                          |
|------------------|-------------------------------|-------------------------------|
| 是否可合并       | ✅ 可以声明合并               | ❌ 不可以                      |
| 支持联合/交叉类型 | ❌                            | ✅                           |
| 支持映射类型     | ❌                            | ✅                           |
| 支持基本类型别名 | ❌                            | ✅ 如 `type ID = string;`     |

使用建议：
- 如果只是定义对象结构，优先使用 `interface`，因为它支持声明合并，更适合扩展。
- 如果需要定义联合类型、交叉类型、映射类型或基本类型别名，就使用 `type`。

---

### 🧑‍💼 面试官反馈：

非常棒！你能结合使用场景给出建议，说明你对 TypeScript 的掌握已经超越了表面知识。

最后一个问题，考察一下泛型的理解：

---

### 问题 4：什么是泛型？能举个例子说明它的用途吗？

---

### 👨‍💻 应聘者（你）回答：

泛型是一种允许我们在定义函数、类或接口时，延迟指定具体类型的方式。它让我们写出既能保持类型安全又能复用的代码。

比如下面这个通用的 `identity` 函数：

```ts
function identity<T>(arg: T): T {
  return arg;
}

const str = identity<string>("hello"); // 返回 string
const num = identity<number>(123);     // 返回 number
```

在这个例子中，`T` 就是一个泛型参数，它会在调用时被替换成具体的类型，从而保证类型安全。

另一个常见的泛型使用场景是在组件或工具库中，例如 React 中定义组件 props 类型时，常常会配合泛型来提高灵活性。

---

### 🧑‍💼 面试官反馈：

非常好！你不仅解释清楚了泛型的概念，还举了一个清晰的例子，并提到了实际应用场景，加分项！

---

## ✅ 面试总结：

| 考察点           | 评分（满分5分） | 评价 |
|------------------|----------------|------|
| 基础概念理解     | 5              | 对 TypeScript 核心机制有清晰认识 |
| 类型系统掌握     | 5              | 区分 `any` 和 `unknown` 很到位 |
| 接口与类型定义   | 5              | 能区分 `interface` 和 `type` 并合理使用 |
| 泛型应用         | 5              | 能举例说明泛型并联系实际开发场景 |

🎉 **综合评价：表现优秀，具备扎实的 TypeScript 基础和实际应用能力。**
当然可以！自定义类型守卫（Custom Type Guard）是 TypeScript 中非常有用的一个特性，它允许我们在运行时检查某个值的类型，并帮助 TypeScript 更精确地推断该值的实际类型。通过自定义类型守卫，我们可以避免手动进行类型断言，使代码更加安全和清晰。

下面我将通过一个例子来说明如何使用自定义类型守卫。

### 示例场景

假设我们有一个函数 `printInfo`，它接收一个参数 `info`，这个参数可能是字符串、数字或包含 `name` 属性的对象之一。我们的目标是根据不同的类型打印不同的信息。

### 实现步骤

1. **定义类型**：首先定义可能的类型。
2. **创建类型守卫函数**：然后为每种类型创建类型守卫函数。
3. **在主函数中使用类型守卫**：最后，在主函数中使用这些类型守卫来区分不同类型并执行相应的逻辑。

```typescript
// 定义可能的类型
type Info = string | number | { name: string };

// 类型守卫函数 - 检查是否为字符串
function isString(value: any): value is string {
  return typeof value === 'string';
}

// 类型守卫函数 - 检查是否为数字
function isNumber(value: any): value is number {
  return typeof value === 'number';
}

// 类型守卫函数 - 检查是否为对象且包含name属性
function isNameObject(value: any): value is { name: string } {
  return typeof value === 'object' && value !== null && 'name' in value;
}

// 主函数
function printInfo(info: Info) {
  if (isString(info)) {
    console.log(`The info is a string: ${info}`);
  } else if (isNumber(info)) {
    console.log(`The info is a number: ${info}`);
  } else if (isNameObject(info)) {
    console.log(`The info object has a name property: ${info.name}`);
  }
}

// 测试
printInfo("Hello, TypeScript!");
printInfo(123);
printInfo({ name: "TypeScript" });
```

### 解释

- 在上述代码中，我们定义了三种类型守卫函数：`isString`, `isNumber`, 和 `isNameObject`。
- 这些函数都遵循一种模式，它们接受一个任意类型的参数，并返回一个布尔值，表示传入的参数是否符合预期的类型。
- 特别注意的是，每个类型守卫函数都使用了特殊的返回类型注解（如 `value is string`），这告诉 TypeScript 当函数返回 `true` 时，参数 `value` 的类型应该是括号中的那个类型。
- 在 `printInfo` 函数中，我们利用这些类型守卫来判断 `info` 参数的具体类型，并据此执行不同的操作。

这种方法不仅提高了代码的可读性和维护性，还能确保类型安全，减少潜在的错误。希望这个例子对你理解自定义类型守卫有所帮助！如果有任何问题或需要进一步解释，请告诉我。

当然可以！让我们通过另一个示例来进一步探讨类型守卫的使用。这次，我们将构建一个稍微复杂一点的例子，涉及到处理不同类型的用户输入，并根据输入类型执行不同的操作。

### 示例场景

假设我们正在开发一个应用，该应用需要处理用户的输入，这些输入可能是字符串、数字或包含特定属性的对象（例如用户信息）。我们的目标是根据不同类型的输入执行不同的逻辑。

### 实现步骤

1. **定义类型**：首先定义可能的输入类型。
2. **创建类型守卫函数**：然后为每种类型创建类型守卫函数。
3. **在主函数中使用类型守卫**：最后，在主函数中使用这些类型守卫来区分不同类型并执行相应的逻辑。

```typescript
// 定义可能的输入类型
type UserInput = string | number | { id: number; username: string };

// 类型守卫 - 检查是否为字符串
function isString(value: any): value is string {
  return typeof value === 'string';
}

// 类型守卫 - 检查是否为数字
function isNumber(value: any): value is number {
  return typeof value === 'number';
}

// 类型守卫 - 检查是否为对象且包含id和username属性
function isUserObject(value: any): value is { id: number; username: string } {
  return typeof value === 'object' && value !== null && 'id' in value && 'username' in value;
}

// 主函数
function processUserInput(input: UserInput) {
  if (isString(input)) {
    console.log(`Received a string input: ${input}`);
  } else if (isNumber(input)) {
    console.log(`Received a numeric input: ${input}`);
  } else if (isUserObject(input)) {
    console.log(`Received an object input with ID ${input.id} and username ${input.username}`);
  } else {
    console.error('Unknown input type');
  }
}

// 测试
processUserInput("Hello, World!"); // 字符串输入
processUserInput(12345);            // 数字输入
processUserInput({ id: 67890, username: "john_doe" }); // 对象输入
```

### 解释

- 在这个例子中，我们定义了三种可能的输入类型：`string`, `number`, 和 `{ id: number; username: string }`。
- 我们为每种类型实现了类型守卫函数，分别是 `isString`, `isNumber`, 和 `isUserObject`。每个函数都接受任意类型的参数，并返回一个布尔值，表示传入的参数是否符合预期的类型。
- 特别注意的是，类型守卫函数使用了特殊的返回类型注解（如 `value is string`），这告诉 TypeScript 当函数返回 `true` 时，参数 `value` 的类型应该是括号中的那个类型。
- 在 `processUserInput` 函数中，我们利用这些类型守卫来检查 `input` 参数的具体类型，并据此执行不同的操作。

通过这种方式，我们可以确保程序能够正确地处理各种类型的输入，同时保持代码的清晰和易于维护性。此外，这也提高了代码的安全性，减少了运行时错误的可能性。希望这个例子能帮助你更好地理解如何在实际项目中使用类型守卫！如果有任何问题或需要进一步的解释，请随时告诉我。

### 类型守卫 vs. 类型断言

在 TypeScript 中，类型守卫（Type Guard）和类型断言（Type Assertion）都是用于处理类型不确定的情况，但它们的工作机制和使用场景有所不同。

#### **类型守卫（Type Guard）**

- **定义**：类型守卫是一种特殊的函数或结构，它能够在运行时检查某个值的类型，并告知 TypeScript 编译器该值的具体类型。
- **工作原理**：通过返回布尔值来判断一个值是否属于特定类型。当条件为真时，TypeScript 会将该值视为指定类型。
- **常见实现方式**：
  - 使用 `typeof`、`instanceof` 关键字。
  - 自定义类型守卫函数，返回类型谓词如 `value is Type`。
- **优点**：增强代码安全性，避免手动强制转换可能带来的错误。
- **示例**：
  ```typescript
  function isString(value: any): value is string {
    return typeof value === 'string';
  }

  function processData(input: unknown) {
    if (isString(input)) {
      console.log(`Processing a string: ${input}`);
    }
  }
  ```

#### **类型断言（Type Assertion）**

- **定义**：类型断言允许开发者手动告诉编译器某个值的实际类型，跳过编译器的类型检查。
- **工作原理**：通过 `<Type>value` 或 `value as Type` 的语法形式直接指定值的类型。
- **应用场景**：当你比编译器更了解某个值的确切类型时使用。
- **缺点**：如果断言不准确，可能会导致运行时错误，因此需要谨慎使用。
- **示例**：
  ```typescript
  const someValue: unknown = "This is a string";
  const strLength: number = (someValue as string).length;
  ```

### 实际应用场景：表单验证中的类型守卫

假设我们正在开发一个用户注册页面，其中包含一个表单，用户可以输入用户名、邮箱地址和年龄。我们需要对这些输入进行验证，并根据不同的输入类型执行相应的操作。

```typescript
type UserInput = { username?: string; email?: string; age?: number };

// 类型守卫 - 检查是否存在且为非空字符串
function isNonEmptyString(value: any): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

// 类型守卫 - 检查是否存在且为有效的数字
function isValidNumber(value: any): value is number {
  return typeof value === 'number' && !isNaN(value);
}

// 表单验证函数
function validateUserInput(input: UserInput) {
  let errors: string[] = [];

  if (!isNonEmptyString(input.username)) {
    errors.push("Username must be a non-empty string.");
  }

  if (!isNonEmptyString(input.email)) {
    errors.push("Email must be a non-empty string.");
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.push("Invalid email format.");
  }

  if (!isValidNumber(input.age)) {
    errors.push("Age must be a valid number.");
  } else if (input.age < 18) {
    errors.push("You must be at least 18 years old.");
  }

  if (errors.length === 0) {
    console.log("Registration successful!");
  } else {
    console.error("Errors occurred:", errors);
  }
}

// 测试
validateUserInput({
  username: "john_doe",
  email: "john@example.com",
  age: 25
});
```

在这个例子中，我们使用了自定义类型守卫来确保每个字段都符合预期的格式和类型。这不仅提高了代码的安全性，还使得逻辑更加清晰易读。相比直接使用类型断言，类型守卫更能保证数据的有效性和准确性，减少潜在的运行时错误。

**能否举例说明类型守卫在函数重载中的应用？**

当然可以！类型守卫不仅可以在简单的条件判断中使用，还可以在函数重载（Function Overloading）中发挥重要作用。通过结合类型守卫和函数重载，我们可以根据传入参数的不同类型执行不同的逻辑，同时保持良好的类型安全性和代码可读性。

### 示例场景

假设我们需要编写一个函数 `processData`，它能够处理两种类型的输入：一种是普通的字符串，另一种是一个包含数据和处理方式的对象。对于字符串输入，我们直接返回其大写形式；对于对象输入，则根据指定的处理方式（如转为大写或小写）来处理数据。

### 实现步骤

1. **定义类型**：首先定义可能的输入类型。
2. **创建函数重载声明**：然后为每种类型的输入创建函数重载声明。
3. **实现主函数**：在主函数中使用类型守卫来区分不同类型并执行相应的操作。

```typescript
// 定义可能的输入类型
type ProcessInput = string | { data: string; action: 'uppercase' | 'lowercase' };

// 函数重载声明
function processData(input: string): string;
function processData(input: { data: string; action: 'uppercase' }): string;
function processData(input: { data: string; action: 'lowercase' }): string;

// 主函数实现
function processData(input: ProcessInput): string {
  if (typeof input === 'string') {
    // 类型守卫 - 确保input是字符串
    return input.toUpperCase();
  } else if ('action' in input && input.action === 'uppercase') {
    // 类型守卫 - 确保input是一个特定的对象且action为'uppercase'
    return input.data.toUpperCase();
  } else if ('action' in input && input.action === 'lowercase') {
    // 类型守卫 - 确保input是一个特定的对象且action为'lowercase'
    return input.data.toLowerCase();
  } else {
    throw new Error('Invalid input type');
  }
}

// 测试
console.log(processData("hello")); // 输出: HELLO
console.log(processData({ data: "world", action: 'uppercase' })); // 输出: WORLD
console.log(processData({ data: "TypeScript", action: 'lowercase' })); // 输出: typescript
```

### 解释

- 在上述例子中，我们首先定义了可能的输入类型 `ProcessInput`，它可以是字符串或包含 `data` 和 `action` 属性的对象。
- 接着，我们使用了函数重载声明来明确 `processData` 函数可以根据不同类型的输入返回不同的结果。
- 在主函数 `processData` 的实现中，我们利用类型守卫来区分输入的具体类型：
  - 使用 `typeof input === 'string'` 来检查输入是否为字符串，并对字符串进行大写转换。
  - 使用 `'action' in input && input.action === 'uppercase'` 来检查输入是否为带有 `action` 为 `'uppercase'` 的对象，并对对象中的 `data` 字段进行大写转换。
  - 同样地，处理 `action` 为 `'lowercase'` 的情况。
  
这种方式不仅提高了代码的灵活性和可维护性，还能确保在编译阶段就能发现潜在的类型错误。此外，通过结合类型守卫和函数重载，使得函数的行为更加直观和易于理解，增强了代码的安全性和可读性。

类型守卫不仅在简单的条件判断中非常有用，在接口实现时也可以发挥重要作用。特别是在处理多态行为（即基于对象的不同类型执行不同的操作）时，类型守卫可以帮助我们确定对象的具体类型，并根据其类型执行相应的逻辑。

### 示例场景

假设我们正在开发一个应用，其中包含不同类型的用户（比如普通用户和管理员）。我们需要定义一个通用的 `User` 接口，然后根据不同类型的用户实现特定的行为。例如，普通用户只能查看信息，而管理员可以修改信息。

### 实现步骤

1. **定义接口**：首先定义一个通用的 `User` 接口以及两个具体的用户类型接口。
2. **创建类型守卫函数**：为每种具体类型的用户创建类型守卫函数。
3. **在方法中使用类型守卫**：在需要区分用户类型的方法中使用这些类型守卫来执行不同的操作。

```typescript
// 定义通用的 User 接口
interface User {
  name: string;
}

// 定义普通用户接口
interface RegularUser extends User {
  role: 'regular';
}

// 定义管理员接口
interface AdminUser extends User {
  role: 'admin';
  canModify: boolean;
}

// 类型守卫 - 检查是否为普通用户
function isRegularUser(user: User): user is RegularUser {
  return (user as RegularUser).role === 'regular';
}

// 类型守卫 - 检查是否为管理员
function isAdminUser(user: User): user is AdminUser {
  return (user as AdminUser).role === 'admin';
}

// 定义一个处理用户行为的类
class UserManager {
  performAction(user: User) {
    if (isRegularUser(user)) {
      console.log(`${user.name} is a regular user and can only view information.`);
    } else if (isAdminUser(user)) {
      if (user.canModify) {
        console.log(`${user.name} is an admin and can modify information.`);
      } else {
        console.log(`${user.name} is an admin but cannot modify information at this time.`);
      }
    } else {
      console.error('Unknown user type');
    }
  }
}

// 测试
const regularUser: RegularUser = { name: "Alice", role: "regular" };
const adminUser: AdminUser = { name: "Bob", role: "admin", canModify: true };

const userManager = new UserManager();
userManager.performAction(regularUser); // 输出: Alice is a regular user and can only view information.
userManager.performAction(adminUser);   // 输出: Bob is an admin and can modify information.
```

### 解释

- 在这个例子中，我们首先定义了一个通用的 `User` 接口，以及两个扩展自 `User` 的具体类型接口：`RegularUser` 和 `AdminUser`。
- 然后，我们为每个具体类型实现了类型守卫函数 `isRegularUser` 和 `isAdminUser`。这些函数接收一个 `User` 类型的对象，并通过检查 `role` 属性来确定对象的具体类型。
- 在 `UserManager` 类的 `performAction` 方法中，我们使用这些类型守卫来区分传入用户的类型，并根据用户的类型执行不同的操作：
  - 如果是普通用户，则输出该用户只能查看信息的消息。
  - 如果是管理员，则进一步检查 `canModify` 属性以决定管理员是否有权限修改信息。

这种方式使得代码可以根据对象的实际类型动态地执行不同的逻辑，同时保持了良好的类型安全性和代码可读性。类型守卫在这里起到了关键作用，它帮助我们在运行时准确地区分不同类型，并相应地调整程序的行为。

