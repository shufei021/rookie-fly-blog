---
url: /learning/vue/modules/page6.md
---
# Vue 3 组件通信方式及其基本原理

#### 父子组件通信

* Props 和 Events
  * `Props`：父组件可以通过属性绑定的方式将数据传递给子组件。子组件使用 `defineProps` 来接收父组件传来的数据
  * `Events`：子组件可以通过触发自定义事件来通知父组件状态发生了变化，并且可以携带参数给父组件
* `v-model` 双向绑定
  * `v-model` 是一种简化的语法糖，用于实现父组件和子组件之间的双向数据绑定。它实际上是 `:modelValue` 和 `@update:modelValue` 的缩写形式

#### 跨层级组件通信

* Provide / Inject
  * Event Bus（mitt库）
    * 在 Vue 3 中，由于 $root 和 $event 已被移除，通常会使用第三方库如 `mitt` 创建一个轻量级的事件总线来实现兄弟组件间的通信
  * 共享父组件状态
    * 当两个或更多的兄弟组件需要共享状态时，可以通过共同的父组件作为中介进行状态管理

#### 高阶方案

* 插槽（Slots）
  * 插槽提供了一种内容分发的API，允许父组件向子组件传递模板片段
* attrs和attrs和listeners（在Vue 3中已合并为 $attrs）
  * `$attrs`包含了所有未被声明为 props 的属性，可以用来透传到子组件
* Ref + DefineExpose
  * 父组件可以通过 ref 直接访问子组件实例或DOM元素，并调用子组件的方法
* Vuex 或 Pinia
  * 对于更复杂的状态管理需求，推荐使用 Vuex 或者 Pinia 这样的状态管理库来集中管理和维护应用的状态

#### 总结

每种通信方式都有其适用场景，选择哪种方式取决于具体的业务需求和组件结构。例如，在父子组件之间，通常首选 Props 和 Events；对于跨层级通信，Provide / Inject 更加合适；而对于非父子关系的组件间通信，则可能需要用到 Event Bus 或者 Vuex / Pinia。

## Vue 组件通信方式

### 1. 父子组件通信

* **Props + Events**
  * 父 → 子：通过 `props` 传递数据
  * 子 → 父：通过 `$emit` 触发事件
  * 原则：遵循单向数据流

* **v-model**
  * 语法糖：`modelValue` prop + `update:modelValue` 事件
  * Vue 3 支持多个 v-model

* **Ref**
  * 父组件通过 `ref` 访问子组件实例方法/数据

### 2. 跨层级通信

* **Provide/Inject**
  * 祖先 → 后代：`provide` 提供数据，`inject` 注入
  * Vue 3 需手动保持响应式（提供 `ref`/`reactive`）

* **事件总线**
  * Vue 2: 新建 Vue 实例作为 EventBus
  * Vue 3: 推荐使用 [mitt](https://github.com/developit/mitt) 库

### 3. 全局状态管理

* **Pinia** (推荐)
  * Vue 3 官方推荐的状态管理库
  * 支持 TypeScript 和 Composition API

* **Vuex**
  * Vue 2 的标准方案
  * Vue 3 仍兼容但不再推荐

### 4. 特殊场景方案

* **共享父组件状态**
  * 通过 `$parent` 访问（不推荐，破坏封装性）
  * 更好的方案：提升状态到父组件 + props 传递

* **本地存储通信**
  * 通过 `localStorage` + `storage` 事件实现跨标签页通信
