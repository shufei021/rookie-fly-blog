
# Vite + Vue3 项目插件


## 1. vite-plugin-compression

<VStyle :style="{color:'#036aca', fontWeight: '600',display:'flex'}">关键词：<VStyle :style="{color:'#8956ff', fontWeight: '500'}">压缩构建产物</VStyle></VStyle>

**作用**：用于对构建产物进行压缩，减少文件体积，提高加载速度。

**主要功能**：
- 支持 gzip 和 brotli 两种压缩算法
- 可以配置需要压缩的文件类型（如 .js, .css, .html 等）
- 可设置压缩阈值，只压缩大于特定大小的文件

**典型配置**：
```javascript
import viteCompression from 'vite-plugin-compression'

export default {
  plugins: [
    viteCompression({
      // 压缩算法类型：支持 gzip 和 brotli 两种压缩算法
      algorithm: 'gzip', // 或 'brotliCompress'  
      // 压缩文件后缀
      ext: '.gz', // 或 '.br'
      // 压缩大于多少kb的文件
      threshold: 10240, // 只压缩大于10KB的文件
      // 是否删除源文件
      deleteOriginFile: false // 是否删除源文件
    })
  ]
}
```

**使用场景**：
- 生产环境构建时使用
- 需要配合服务器配置（如 Nginx）自动提供压缩文件

## 2. rollup-plugin-external-globals

<VStyle :style="{color:'#036aca', fontWeight: '600',display:'flex'}">关键词：<VStyle :style="{color:'#8956ff', fontWeight: '500'}"> CDN 引入的库</VStyle></VStyle>


**作用**：将某些依赖声明为外部依赖，不打包进最终产物，而是通过全局变量引入。


**主要功能**：
- 减少打包体积
- 适用于通过 `CDN 引入的库`（如 `Vue`, `React`, `jQuery` 等）

**典型配置**：
```javascript
import externalGlobals from 'rollup-plugin-external-globals'

export default {
  plugins: [
    externalGlobals({
      vue: 'Vue', // 将 import 'vue' 转换为全局变量 Vue
      'vue-router': 'VueRouter'
    })
  ]
}
```

**使用场景**：
- 使用 CDN 引入公共库时
- 微前端场景下共享公共依赖

## 3. vite-plugin-html

**作用**：对 HTML 模板进行灵活处理和修改。

**主要功能**：
- 动态修改 index.html 内容
- 注入环境变量
- 压缩 HTML
- 多页面应用支持

**典型配置**：
```javascript
import { createHtmlPlugin } from 'vite-plugin-html'

export default {
  plugins: [
    createHtmlPlugin({
      minify: true, // 压缩HTML
      inject: {
        data: {
          title: 'My App', // 在HTML中使用 <%= title %>
          injectScript: `<script src="./inject.js"></script>`
        }
      }
    })
  ]
}
```

**使用场景**：
- 需要根据环境变量动态修改 HTML
- 需要向 HTML 中注入特定内容或脚本
- 需要多页面应用支持

## 4. unocss/vite

**作用**：提供按需原子化 CSS 解决方案（UnoCSS 的 Vite 插件）。

**主要功能**：
- 极速的原子化 CSS 引擎
- 完全可定制
- 按需生成样式
- 支持多种预设（如 Tailwind CSS 兼容预设）

**典型配置**：
```javascript
import Unocss from 'unocss/vite'
import { presetUno } from 'unocss'

export default {
  plugins: [
    Unocss({
      presets: [presetUno()], // 使用默认预设
      // 自定义规则
      rules: [
        ['m-1', { margin: '0.25rem' }]
      ]
    })
  ]
}
```

**使用场景**：
- 需要高效、灵活的原子化 CSS 解决方案
- 希望减少 CSS 体积
- 需要快速原型开发

## 综合建议

这些插件可以很好地配合使用：
1. `unocss/vite` 提供高效的样式方案
2. `rollup-plugin-external-globals` 处理外部依赖
3. `vite-plugin-html` 管理 HTML 模板
4. `vite-plugin-compression` 优化生产包体积

## Vite-Plugin-Imagemin

全面指南：图片压缩与优化

Vite-plugin-imagemin 是一个专为 Vite 构建工具设计的图片压缩插件，能够显著减小图片体积，提升网页加载速度。以下是该插件的完整使用指南和技术细节。

## 1. 插件介绍与安装

### 核心功能
vite-plugin-imagemin 利用 imagemin 库自动压缩项目中的图片资源，支持多种格式：
- PNG (通过 optipng/pngquant)
- JPEG (通过 mozjpeg)
- GIF (通过 gifsicle)
- SVG (通过 svgo)
- WebP (通过 webp)

### 安装步骤

```bash
# 使用 npm
npm install vite-plugin-imagemin --save-dev

# 使用 yarn
yarn add vite-plugin-imagemin -D

# 使用 pnpm
pnpm i vite-plugin-imagemin -D
```

对于中国用户，如果遇到安装问题，可以尝试以下解决方案：
1. 在 package.json 中添加 resolutions 配置：
```json
"resolutions": {
  "bin-wrapper": "npm:bin-wrapper-china"
}
```
2. 修改 hosts 文件添加：
```
199.232.4.133 raw.githubusercontent.com
```
3. 使用 cnpm 安装（不推荐）

## 2. 详细配置指南

### 基础配置

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    viteImagemin({
      // 全局配置
      verbose: true,  // 控制台显示压缩信息
      disable: false, // 是否禁用插件
      
      // 格式特定配置
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,  // 0-100
      },
      pngquant: {
        quality: [0.8, 0.9], // 质量范围
        speed: 4,      // 速度(1-11)
      },
      svgo: {
        plugins: [
          { name: 'removeViewBox' },
          { name: 'removeEmptyAttrs', active: false }
        ],
      },
      webp: {
        quality: 75
      }
    }),
  ],
});
```

### 高级配置选项

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| verbose | boolean | true | 是否在控制台输出压缩结果 |
| filter | RegExp/Function | - | 指定哪些资源不被压缩 |
| disable | boolean | false | 是否禁用插件 |
| svgo | object/false | - | SVGO 配置 |
| gifsicle | object/false | - | Gifsicle 配置 |
| mozjpeg | object/false | - | MozJPEG 配置 |
| optipng | object/false | - | OptiPNG 配置 |
| pngquant | object/false | - | PNGQuant 配置 |
| webp | object/false | - | WebP 配置 

[配置](https://gitcode.com/gh_mirrors/vi/vite-plugin-imagemin)

## 3. 最佳实践与性能优化

### 图片优化策略

1. **按需压缩**：只为生产环境启用压缩
```javascript
plugins: [
  process.env.NODE_ENV === 'production' && viteImagemin({/* 配置 */})
]
```

2. **质量平衡**：
- JPEG: 质量60-80 (视觉无损)
- PNG: 使用pngquant质量[0.65,0.9]
- WebP: 质量75-85

3. **格式转换**：结合unplugin-imagemin可实现格式自动转换
```javascript
imagemin({
  conversion: [
    { from: "png", to: "webp" },
    { from: "jpeg", to: "webp" }
  ]
})
```
WebP格式通常比JPEG小25-35%，比PNG小26%

### 与其他优化技术结合

1. **懒加载**：
```javascript
import { createImage } from 'vue-lazyload'
app.use(createImage({
  loading: 'lazy',
  error: 'placeholder.jpg'
}))
```

2. **CDN加速**：
```javascript
// vite.config.js
build: {
  assetsDir: 'static',
  rollupOptions: {
    output: {
      assetFileNames: 'static/[name].[hash][extname]'
    }
  }
}
```

3. **响应式图片**：使用`<picture>`元素和srcset属性

## 4. 常见问题解决

### 图片不显示问题

当使用alias引入图片时，需要在路径前加`~`：
```javascript
import logo from '~/assets/logo.png'
```

并在vite配置中添加alias：
```javascript
resolve: {
  alias: {
    '~': path.resolve(__dirname, './src/assets')
  }
}

```

### 性能问题排查

1. **清除缓存**：
```bash
rm -rf node_modules/.vite
```

2. **禁用安全软件**：如Windows Defender可能干扰Vite进程

3. **更新依赖**：
```bash
npm update vite vite-plugin-imagemin
```

## 5. 替代方案比较

### unplugin-imagemin

基于sharp/squoosh的替代方案，特点：
- 支持两种压缩引擎：sharp(默认)和squoosh
- 支持格式转换
- 缓存机制

```javascript
import imagemin from 'unplugin-imagemin/vite'

export default defineConfig({
  plugins: [
    imagemin({
      mode: 'sharp', // 或'squoosh'
      compress: {
        jpeg: { quality: 25 },
        png: { quality: 25 },
        webp: { quality: 25 }
      },
      conversion: [
        { from: "png", to: "webp" }
      ]
    })
  ]
})

```

### 方案对比

| 特性 | vite-plugin-imagemin | unplugin-imagemin |
|------|----------------------|-------------------|
| 压缩质量 | 高 | 极高(sharp引擎) |
| 速度 | 快 | 极快(sharp) |
| 格式转换 | 不支持 | 支持 |
| 缓存 | 无 | 支持 |
| 维护性 | 良好 | 优秀 |

## 6. 项目集成示例

### 完整配置案例

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    viteImagemin({
      verbose: process.env.NODE_ENV !== 'production',
      gifsicle: { optimizationLevel: 3, interlaced: true },
      mozjpeg: { quality: 75, progressive: true },
      optipng: { optimizationLevel: 7 },
      pngquant: { quality: [0.65, 0.9], speed: 4 },
      svgo: {
        plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
      },
      webp: { quality: 75 }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '~assets': resolve(__dirname, './src/assets')
    }
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    }
  }
});
```

### 效果评估

优化前后典型对比：
| 指标 | 优化前 | 优化后 | 提升 |
|------|--------|--------|------|
| 首页图片总量 | 2.3MB | 1.1MB | 52% |
| LCP时间 | 2.4s | 1.1s | 54% |
| 带宽消耗 | 高 | 低 | 显著 |

## 总结

vite-plugin-imagemin 是Vite项目中优化图片资源的有效工具，通过合理配置可以：
1. 减少图片体积50%以上
2. 提升页面加载速度
3. 降低带宽消耗
4. 改善用户体验和SEO排名
