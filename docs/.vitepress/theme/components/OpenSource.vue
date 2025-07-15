<template>
    <div class="open-source">
        <el-card class="card-wrap" v-for="(item,idx) in openSourceData" :key="idx" @click="itemClick(item)">
            <template #header>
            <div class="card-header">
                <span>{{ item.title }}</span>
                <SvgIcon :name="item.icon.name" :width="item.icon.width" :height="item.icon.height"/>
            </div>
            </template>
            <div class="desc" v-highlight>
                {{ item.desc }}
            </div>
            <template #footer>
                <div class="footer">
                    <el-tag
                        v-for="(tag,idx) in item.tags"
                        :key="idx"
                        :type="types[idx]"
                        size="small"
                        effect="dark"
                    >
                        {{ tag }}
                    </el-tag>
                </div>
            </template>
        </el-card>
    </div>
  </template>
  <script setup>
  import { openSourceData } from '../model/openSourceData.js'
  import { ref } from 'vue'
  const props = defineProps({
    data: {
      type: Array,
      default: [],
    },
  });
  const types = ref(['primary','success','info','warning','danger'])

  function itemClick(item){
    window.open(item.docLink, '_blank')
  }
  const isEllipsis = function (el) {
    el = typeof el === 'string' ? document.querySelector(el):el
    return el && (el.scrollHeight !== el.offsetHeight || el.scrollWidth !== el.offsetWidth);
  };
  // 定义局部指令
  const vHighlight = {
    mounted(el) {
      if(isEllipsis(el)){
        el.title = el.innerText;
      }
    },
    updated(el) {
      if(isEllipsis(el)){
        el.title = el.innerText;
      }
    },
  };
  </script>
<style lang="scss">
$colors: (
  "red": #da201a,
  "orange": #e9792f,
  "yellow": #f39c12, 
  "green": #2AC864,
  "cyan": #2ecc71,
  "blue": #3498db,
  "purple": #90f,
  "pink": #FF6699,
  "blue-light":#2db7f5,
  "blue-deep":#3360a3,
  "black":#111827,
  "pink-light":#f8a5c2,
  "yellow-light":#e77f67,
  "yellow-light1":#f5cd79,
  "pink-deep":#c96d9b,
  "soil":#1c3356,

);
@each $name, $color in $colors {
  .color-#{$name} {
    background: $color;
  }
}

.open-source{
    width: 1037px;
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    position: relative;
    .card-header{
        display: flex;
        justify-content: space-between;
    }
    .el-card__footer{
        background-color: #f0f0f0;
        color: #000;
    }
    .card-wrap{
        max-width: 339px;
        .desc{
            height: 96px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
        }
    }
    .footer{
        display: flex;
        align-items: center;
        gap: 5px;
        flex-wrap: wrap;
        align-content: flex-end;
    }

}
/* 中等宽度设备 - 平板等 (768px 到 1023px) */
@media (min-width: 350px) and (max-width: 689px) {
    .open-source {
    width: 350px;
  }
}

/* 大宽度设备 - 桌面电脑等 (1024px 到 1279px) */
@media (min-width: 690px) and (max-width: 1279px) {
    .open-source {
    width: 690px;
  }
}
/* 超大宽度设备 - 大屏幕桌面 (1280px 及以上) */
@media (min-width: 1280px) {
    .open-source {
    width: 1037px;
  }
}
</style>