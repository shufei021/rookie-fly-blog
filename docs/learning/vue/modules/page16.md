# Vue 2 迁移到 Vue3 指南

## 一、重大变化概述

1. **Composition API**：Vue3 引入了全新的 Composition API，作为 Options API 的补充
2. **性能提升**：更小的包体积、更好的渲染性能、更高效的组件初始化
3. **TypeScript 支持**：Vue3 使用 TypeScript 重写，提供更好的类型支持
4. **架构变化**：模块化架构，更好的 tree-shaking 支持

## 二、API 变化

### 1. 全局 API 变化

- `Vue.nextTick` → `import { nextTick } from 'vue'`
- `Vue.set` 和 `Vue.delete` 不再需要（响应式系统自动处理）
- `Vue.filter` 已移除，建议使用 methods 或 computed 属性替代
- `Vue.component` → `app.component`
- `Vue.directive` → `app.directive`
- `Vue.mixin` → `app.mixin`
- `Vue.use` → `app.use`

### 2. 实例 API 变化

- `$on`, `$off`, `$once` 移除，推荐使用第三方事件库
- `$children` 移除，推荐使用 `ref` 访问子组件
- `$listeners` 移除，合并到 `$attrs` 中
- `$scopedSlots` 移除，统一使用 `$slots`

## 三、模板语法变化

### 1. v-model 变化

- Vue2 的 `.sync` 修饰符被移除，统一使用 `v-model`
- 可以多个 `v-model` 绑定：`v-model:propName`
- 自定义修饰符处理方式变化

### 2. 事件 API

- `v-on.native` 修饰符移除
- `emits` 选项成为标准配置

### 3. 其他指令变化

- `v-for` 中的 `ref` 不再自动创建数组
- `v-if` 和 `v-for` 优先级变化：`v-if` 现在有更高的优先级
- `key` 在 `<template v-for>` 中的位置变化

## 四、组件相关变化

### 1. 异步组件

- 新的 `defineAsyncComponent` 方法
- 简化了异步组件定义方式

```javascript
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/AsyncComponent.vue')
)
```

### 2. 函数式组件

- 函数式组件语法变化
- 需要通过函数而非对象定义
- 性能优势减少，建议谨慎使用

### 3. 组件生命周期

- `beforeDestroy` → `beforeUnmount`
- `destroyed` → `unmounted`
- 新增 `renderTracked` 和 `renderTriggered` 调试钩子

## 五、响应式系统变化

### 1. Reactivity API

- `Vue.observable` 移除 → 使用 `reactive`
- 新增 `ref`, `reactive`, `readonly` 等 API
- 需要显式导入响应式 API

```javascript
import { ref, reactive } from 'vue'
```

### 2. 响应式原理变化

- 使用 Proxy 替代 `Object.defineProperty`
- 可以检测数组索引变化和对象属性添加/删除
- 不再需要 `Vue.set`/`Vue.delete`

## 六、渲染函数变化

### 1. h 函数变化

- `h` 函数现在全局导入
- 参数格式变化：更一致的 props 结构

```javascript
import { h } from 'vue'

h('div', {
  id: 'app',
  onClick: () => {}
}, 'Hello')
```

### 2. 插槽处理

- 插槽统一为函数形式
- `this.$slots` 现在是函数，需要调用
- `this.$scopedSlots` 移除

## 七、TypeScript 支持

### 1. 更好的类型推断

- 组件选项和 Composition API 都有良好类型支持
- 自定义事件和 props 的类型检查

### 2. 定义组件

- 新的 `defineComponent` 方法提供类型推断

```typescript
import { defineComponent } from 'vue'

export default defineComponent({
  // 类型推断可用
})
```

## 八、迁移策略

1. **逐步迁移**：
   - 使用 `@vue/compat` 构建兼容版本
   - 逐步修复兼容性警告

2. **工具支持**：
   - 使用 Vue CLI 或 Vite 创建新项目
   - 使用迁移辅助工具识别问题

3. **代码重构**：
   - 逐步引入 Composition API
   - 重构过滤器为 computed/methods
   - 更新事件处理逻辑

4. **测试验证**：
   - 确保单元测试和 E2E 测试覆盖
   - 逐步验证组件功能

## 九、其他注意事项

1. **第三方库兼容性**：
   - 检查依赖库是否有 Vue3 版本
   - 常见库如 Vuex, Vue Router 需要升级到最新版

2. **构建工具**：
   - Vue CLI 需要升级到 v4.5.0+
   - 推荐使用 Vite 获得更好的开发体验

3. **浏览器支持**：
   - Vue3 不再支持 IE11 (除非使用特殊构建版本)
   - 确保目标浏览器兼容

4. **DevTools**：
   - 需要安装新的 Vue DevTools 扩展
   - 调试体验有所改进

## 十、资源推荐

1. 官方迁移指南：https://v3-migration.vuejs.org/
2. 迁移构建工具：https://github.com/vuejs/vue-next/tree/master/packages/vue-compat
3. 迁移检查清单：https://v3-migration.vuejs.org/migration-guide.html#overview

通过系统性地处理这些变化点，可以确保 Vue2 到 Vue3 的迁移过程顺利进行。