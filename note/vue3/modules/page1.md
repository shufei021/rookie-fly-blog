---
url: /note/vue3/modules/page1.md
---
# vue3 中的 hooks

Vue 3 引入了组合式 API（Composition API），它允许开发者在一个函数内组织和复用逻辑，这些函数通常被称为 hooks。Hooks 在 Vue 3 中并不是一个官方术语，但这个概念是从 React 社区借鉴过来的，用来描述利用 Composition API 实现的状态逻辑复用模式。

### 组合式 API 的基础

在 Vue 2.x 版本中，我们使用 Options API 来定义组件，比如 `data`、`methods`、`computed` 等选项。而在 Vue 3 中，通过引入 `setup` 函数，可以更加灵活地组织代码逻辑，尤其是当组件变得复杂时，这种方式显得尤为有用。

### 创建一个简单的 Hook

下面是一个简单的例子，演示如何创建和使用自定义 hook：

假设我们需要在多个组件中获取窗口大小，并监听其变化。我们可以创建一个名为 `useWindowSize` 的 hook：

```javascript
import { ref, onMounted, onUnmounted } from 'vue';

function useWindowSize() {
  const windowSize = ref({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const handleResize = () => {
    windowSize.value = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  };

  onMounted(() => window.addEventListener('resize', handleResize));
  onUnmounted(() => window.removeEventListener('resize', handleResize));

  return windowSize;
}
```

然后，在你的组件中使用这个 hook：

```javascript
<template>
  <div>
    <p>Width: {{ windowSize.width }}</p>
    <p>Height: {{ windowSize.height }}</p>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import useWindowSize from './hooks/useWindowSize'; // 假设 hook 文件位于 ./hooks/useWindowSize.js

export default defineComponent({
  setup() {
    const windowSize = useWindowSize();

    return { windowSize };
  }
});
</script>
```

### 总结

* **Composition API** 提供了一种新的方式来组织代码，特别是在处理复杂的场景时。
* **Hook** 是一种设计模式，用于抽取可复用的逻辑，使代码更加清晰和易于维护。
* 通过结合 `ref`、`reactive`、生命周期钩子（如 `onMounted`, `onUnmounted`）等 Composition API 的功能，你可以轻松创建自己的 hooks 来封装特定的行为或逻辑。

## Vue 3 中还有哪些内置的 hooks

在 Vue 3 中，Composition API 提供了一系列的内置 hooks（也称为生命周期钩子），这些钩子允许你在组件的不同阶段执行代码。以下是部分常用的内置 hooks：

* `onBeforeMount`: 在挂载开始之前调用（即，在渲染内容到 DOM 之前）。
* `onMounted`: 实例挂载完成后调用（通常用于执行需要访问 DOM 的操作）。
* `onBeforeUpdate`: 组件更新之前调用。此时可以获取更新前的状态。
* `onUpdated`: 组件因为响应式状态变更导致 DOM 更新后调用。
* `onBeforeUnmount`: 在实例销毁之前调用。此时实例仍然是完全正常的。
* `onUnmounted`: 在实例销毁后调用。调用此钩子时，组件的所有指令都被解绑，所有事件监听器被移除，所有子实例也都被销毁。
* `onErrorCaptured`: 当捕获一个来自后代组件的错误时被调用。
* `onRenderTracked` 和 `onRenderTriggered`: 分别用来调试追踪虚拟 DOM 重新渲染时和触发重新渲染的源头。

### 创建带参数的 Hook 和 如何创建一个带参数的 hook

创建一个接受参数的 hook 很简单，它实际上就是一个返回某些响应式引用或函数的普通函数，你可以根据需求向这个函数传递参数。下面是一个简单的例子，演示如何创建一个带有参数的自定义 hook。

假设我们需要一个 hook 来监听某个特定事件，并且能够指定事件类型和回调函数：

```javascript
import { ref, onMounted, onUnmounted } from 'vue';

function useEventListener(eventType, callback) {
  const listener = (event) => callback(event);

  onMounted(() => window.addEventListener(eventType, listener));
  onUnmounted(() => window.removeEventListener(eventType, listener));
}

export default useEventListener;
```

然后你可以在组件中这样使用它：

```javascript
import { defineComponent } from 'vue';
import useEventListener from './useEventListener'; // 假设 hook 文件位于 ./useEventListener.js

export default defineComponent({
  setup() {
    useEventListener('click', event => console.log(`Clicked at: ${event.clientX}, ${event.clientY}`));

    return {};
  }
});
```

在这个例子中，我们创建了一个名为 `useEventListener` 的 hook，它可以接收两个参数：`eventType` 表示要监听的事件类型，`callback` 是当该事件发生时要执行的回调函数。通过这种方式，我们可以轻松地在不同的组件中复用这段逻辑，并根据需要传入不同的参数。
