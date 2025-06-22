<template>
    <div :style="style">
        <slot>111</slot>
    </div>
</template>
<script setup>
const props = defineProps({
    style: {
        type: Object,
        default:()=>({})
    },
})
</script>