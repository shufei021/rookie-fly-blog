---
url: /learning/vue/modules/page5.md
---
# Vue2 和 Vue3 的区别

Vue3 相对于 Vue2 做了较大的改进，主要体现在以下几个方面：

***

#### ✅ 1. **组合式 API vs 选项式 API**

* **Vue2** 使用 Options API（如 `data`、`methods`、`computed` 等）组织代码，逻辑分散，不易复用。
* **Vue3** 引入了 Composition API（如 `setup()`、`ref`、`reactive`、`watch` 等），更灵活，更适合逻辑复用和大型项目的维护。

***

#### ✅ 2. **性能优化**

* **更快的虚拟 DOM**：Vue3 重写了虚拟 DOM，实现更快的 diff 算法。
* **编译优化**：静态提升、事件缓存等机制使渲染更高效。
* **Tree-shaking 支持**：Vue3 使用 ES Module 编写，可以按需引入，减小打包体积。

***

#### ✅ 3. **响应式系统升级**

* **Vue2** 使用 `Object.defineProperty`，不支持对数组、新增属性的完全监测。
* **Vue3** 改用 `Proxy` 实现响应式，更彻底、性能更好，支持更复杂的数据结构。

***

#### ✅ 4. **Fragment / Teleport / Suspense 支持**

* **Fragment**：Vue3 组件可以返回多个根节点，Vue2 不支持。
* **Teleport**：可以将组件渲染到 DOM 的任意位置，适合弹窗等场景。
* **Suspense**：用于异步组件的加载状态处理，配合 `<script setup>` 更加简洁。

***

#### ✅ 5. **TypeScript 支持更好**

* Vue3 是用 TypeScript 重写的，原生支持类型推导和开发体验，Vue2 对 TypeScript 支持较弱。

***

#### ✅ 6. **生命周期钩子不同**

* Composition API 下生命周期名称为 `onMounted`、`onUnmounted` 等，更接近函数语义。
* 而 Vue2 是 `mounted`、`destroyed` 等选项式 API。
* vue3中 beforeDestroy->onBeforeUnmounted, destroyed->onUnmounted
* beforeCreate、created 被语法糖 setup 替代
