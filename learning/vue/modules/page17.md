---
url: /learning/vue/modules/page17.md
---
# Vue3 中插槽传参详解

在 Vue3 中，插槽的使用方式相比 Vue2 有了一些变化，特别是在作用域插槽（传参插槽）方面。以下是 Vue3 中插槽传参的全面指南：

## 一、基本插槽传参

### 1. 默认插槽传参

**子组件**:

```vue
<template>
  <div>
    <slot :user="user" :age="age"></slot>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const user = ref('张三')
const age = ref(25)
</script>
```

**父组件使用**:

```vue
<template>
  <ChildComponent>
    <template v-slot="slotProps">
      用户名：{{ slotProps.user }}，年龄：{{ slotProps.age }}
    </template>
  </ChildComponent>
</template>
```

### 2. 具名插槽传参

**子组件**:

```vue
<template>
  <div>
    <slot name="header" :title="title"></slot>
    <slot :content="content"></slot>
    <slot name="footer" :year="year"></slot>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('页面标题')
const content = ref('主要内容')
const year = ref(2023)
</script>
```

**父组件使用**:

```vue
<template>
  <ChildComponent>
    <template #header="{ title }">
      <h1>{{ title }}</h1>
    </template>
    
    <template v-slot="{ content }">
      <p>{{ content }}</p>
    </template>
    
    <template #footer="{ year }">
      <footer>© {{ year }}</footer>
    </template>
  </ChildComponent>
</template>
```

## 二、语法糖写法

Vue3 推荐使用 `#` 简写代替 `v-slot:`

```vue
<template>
  <ChildComponent>
    <!-- 默认插槽 -->
    <template #default="{ content }">
      {{ content }}
    </template>
    
    <!-- 具名插槽 -->
    <template #header="{ title }">
      {{ title }}
    </template>
  </ChildComponent>
</template>
```

## 三、作用域插槽与 Composition API

在 `<script setup>` 中使用插槽传参：

**子组件**:

```vue
<template>
  <div>
    <slot :data="listData" :loading="isLoading"></slot>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const listData = ref([...])
const isLoading = ref(false)
</script>
```

**父组件使用**:

```vue
<template>
  <DataComponent>
    <template #default="{ data, loading }">
      <div v-if="loading">加载中...</div>
      <ul v-else>
        <li v-for="item in data" :key="item.id">{{ item.name }}</li>
      </ul>
    </template>
  </DataComponent>
</template>
```

## 四、动态插槽名传参

```vue
<template>
  <ChildComponent>
    <template #[dynamicSlotName]="{ message }">
      {{ message }}
    </template>
  </ChildComponent>
</template>

<script setup>
import { ref } from 'vue'

const dynamicSlotName = ref('header')
</script>
```

## 五、无渲染组件模式

利用插槽传参实现无渲染组件：

**子组件 (RenderlessComponent.vue)**:

```vue
<template>
  <slot :data="internalData" :update="updateData"></slot>
</template>

<script setup>
import { ref } from 'vue'

const internalData = ref(null)

const updateData = (newData) => {
  internalData.value = newData
}
</script>
```

**父组件使用**:

```vue
<template>
  <RenderlessComponent>
    <template #default="{ data, update }">
      <div>
        <pre>{{ data }}</pre>
        <button @click="update({ timestamp: Date.now() })">
          更新数据
        </button>
      </div>
    </template>
  </RenderlessComponent>
</template>
```

## 六、TypeScript 支持

为插槽 props 添加类型：

**子组件**:

```vue
<template>
  <slot :user="user" :actions="actions"></slot>
</template>

<script setup lang="ts">
interface User {
  name: string
  age: number
}

interface Action {
  type: string
  handler: () => void
}

const user: User = {
  name: '张三',
  age: 25
}

const actions: Action[] = [
  { type: 'edit', handler: () => console.log('编辑') }
]
</script>
```

**父组件使用**:

```vue
<template>
  <ChildComponent>
    <template #default="{ user, actions }">
      <!-- 这里 user 和 actions 会有类型推断 -->
    </template>
  </ChildComponent>
</template>
```

## 七、注意事项

1. **v-slot 只能在 `<template>` 或组件上使用**，不能用在普通 HTML 元素上
2. **默认插槽**需要使用 `#default` 或 `v-slot:default` 来接收作用域参数
3. **解构插槽 props** 时可以使用默认值：
   ```vue
   <template #header="{ title = '默认标题' }">
     {{ title }}
   </template>
   ```
4. Vue3 中移除了 `$scopedSlots`，统一使用 `$slots`

通过以上方式，你可以在 Vue3 中灵活地使用插槽传参功能，实现组件间的灵活通信和内容分发。
