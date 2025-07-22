# Vite + Vue3 项目中支持 JSX 语法


### 1. 安装必要依赖
首先需要安装支持 JSX 的插件：

```bash
npm install @vitejs/plugin-vue-jsx -D
# 或者
yarn add @vitejs/plugin-vue-jsx -D
```

### 2. 配置 Vite
修改 `vite.config.js` 文件：

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [
    vue(), 
    vueJsx() // 添加这行
  ]
})
```

### 3. 使用 JSX
现在你可以在 `.vue` 文件或 `.jsx`/`.tsx` 文件中使用 JSX 了：

#### 方式一：在 .vue 文件中使用
```vue
<script setup>
const title = 'Hello JSX'
const count = ref(0)

const renderTitle = () => <h1>{title}</h1>
</script>

<template>
  <div>
    {renderTitle()}
    <button onClick={() => count.value++}>
      点击次数: {count.value}
    </button>
  </div>
</template>
```

#### 方式二：创建单独的 JSX 组件
创建 `MyComponent.jsx` 文件：

```jsx
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return () => (
      <div>
        <h1>我是JSX组件</h1>
      </div>
    )
  }
})
```

### 4. 在组件中使用 JSX 组件
```vue
<script setup>
import MyComponent from './MyComponent.jsx'
</script>

<template>
  <MyComponent />
</template>
```

### 5. 常见问题解决

#### 问题1：JSX 中如何使用 v-model？
```jsx
<input v-model={value} />
// 等同于
<input value={value} onInput={e => value = e.target.value} />
```

#### 问题2：如何绑定事件？
```jsx
<button onClick={handleClick}>点击</button>
```

#### 问题3：如何绑定 class 和 style？
```jsx
<div class={['foo', { active: isActive }]} style={{ color: 'red' }}>
  样式和类名绑定
</div>
```

### 6. TypeScript 支持
如果是 TS 项目，确保 `tsconfig.json` 中有：

```json
{
  "compilerOptions": {
    "jsx": "preserve"
  }
}
```

### 7. 为什么推荐这种方式？
- 官方维护的插件，兼容性好
- 配置简单，只需安装一个插件
- 支持 Vue3 的所有特性
- 与 Vite 的热更新完美配合

### 8. 其他注意事项
1. JSX 中组件名必须大写开头（如 `<MyComponent />`）
2. 片段需要用 `<></>` 或 `<Fragment></Fragment>` 包裹
3. 属性使用驼峰命名（如 `onClick` 而不是 `@click`）



