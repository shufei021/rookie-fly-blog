<template>
  <svg
    class="svg-icon"
    :class="{'preserve-ratio': preserveAspectRatio}"
    aria-hidden="true"
    :width="computedWidth"
    :height="computedHeight"
    :viewBox="viewBox"
    :style="svgStyle"
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  width: {
    type: [String, Number],
    default: 24
  },
  height: {
    type: [String, Number],
    default: null // 默认为null，将使用width的值
  },
  viewBox: {
    type: String,
    default: null
  },
  // 是否保持原始比例
  preserveAspectRatio: {
    type: Boolean,
    default: false
  }
})

const symbolId = computed(() => `#icon-${props.name}`)

// 处理尺寸单位
const formatSize = (size) => 
  typeof size === 'number' ? `${size}px` : size

// const width = computed(() => formatSize(props.width))
// const height = computed(() => 
//   props.height ? formatSize(props.height) : width.value
// )

// 计算SVG样式
const svgStyle = computed(() => ({
  aspectRatio: props.preserveAspectRatio ? 'auto' : undefined
}))
const computedWidth = computed(() => {
  if (props.fullWidth) return '100%'
  return formatSize(props.width)
})

const computedHeight = computed(() => {
  if (props.fullHeight) return '100%'
  return props.height ? formatSize(props.height) : computedWidth.value
})
</script>

<style scoped>
.svg-icon {
  display: inline-block;
  vertical-align: middle;
  overflow: visible;
  flex-shrink: 0;
  max-width: 100%;
  max-height: 100%;
}
</style>