<!--
 * @Description: 自定义首页模块
-->
<template>
  <div class="ui-home">
    <template v-for="v in siteData" :key="v.name">
      <div class="ui-title">{{v.title}}</div>
      <ul class="ui-project">
        <li class="item" v-for="(v,idx) in v.list" :key="v.name">
          <a class="link" :href="v.link" target="_blank">
            <h3 :class="['title', 'color-' + classNames[idx]]">{{ v.name }}</h3>
            <p class="desc" v-highlight="'yellow'">{{ v.desc }}</p>
            <div class="tags">
              <el-tag
                v-for="(tag,idx) in v.tags"
                :key="idx"
                :type="types[idx]"
                size="small"
                effect="dark"
              >
                {{ tag }}
              </el-tag>
            </div>
          </a>
        </li>
      </ul>
    </template>
  </div>
  <BackTop></BackTop>
</template>
<script setup>
import { siteData } from '../model/siteData.js'
import { ref } from 'vue'
const classNames = ref(["red","orange","yellow", "green","cyan","blue","purple","pink","blue-light","blue-deep","black","pink-light","yellow-light","yellow-light1","pink-deep","soil"])
const types = ref(['primary','success','info','warning','danger'])
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
<style lang="scss" scoped>
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

.color-green-gradient1{
	background: -webkit-linear-gradient(120deg, #86b91a 30%, #edd532);
	background: linear-gradient(120deg, #86b91a 30%, #edd532);
}
.color-green-gradient2{
	background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
	background: linear-gradient(315deg, #42d392 25%, #647eff);
}
.color-green-gradient3{
	background: -webkit-linear-gradient(315deg, #51a256 25%, #f7d336);
	background: linear-gradient(315deg, #51a256 25%, #f7d336);
}
.color-pink-gradient {
	background: -webkit-linear-gradient(120deg, #bd44fe 35%, #42d1ff);
	background: linear-gradient(120deg, #bd44fe 35%, #42d1ff);
}


/**首页网址推荐**/
.ui-home {
  width: 320px;
  margin: 0 auto 20px;
  .ui-title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    font-size: 26px;
  }
}
.ui-project {
	display: grid;
	gap: 20px;
	grid-template-columns: repeat(auto-fit, minmax(224px, 1fr));
	justify-content: space-between;
	margin-top: 20px;
  .item,
  .link {
    height: 230px;
  }
  .item {
  	 margin-top: 0;
     list-style: none;
     .link {
      display: flex;
      flex-direction: column;
      // display: block;
      color: #333;
      background: #fff;
      border: 1px solid #f1f1f1;
      border-radius: 6px;
      transition: all .4s;
    }
    .link:hover {
      -webkit-filter: brightness(1.2);
      box-shadow: 0 15px 30px rgba(0, 0, 0, .1);
      transform: rotateY(-0.1deg) scale(1.03) translateZ(0);
    }
    .title {
      height: 80px;
      padding-top: 25px;
      font-size: 24px;
      color: #fff;
      text-align: center;
      border-radius: 6px 6px 0 0;
	  margin: 0;
    }
    .desc {
      height: 84px;
      line-height: 2;
      padding: 0 12px;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      margin-bottom: 0;
      margin-top: 16px;
    }
    .tags{
      flex: 1;
      display: flex;
      align-items: center;
      padding: 5px;
      gap: 5px;
      flex-wrap: wrap;
      align-content: flex-end;
    }
  }
}

/* 中等宽度设备 - 平板等 (768px 到 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .ui-home {
    width: 600px;
  }
}

/* 大宽度设备 - 桌面电脑等 (1024px 到 1279px) */
@media (min-width: 1024px) and (max-width: 1279px) {
  .ui-home {
    width: 888px;
  }
}
/* 超大宽度设备 - 大屏幕桌面 (1280px 及以上) */
@media (min-width: 1280px) {
  .ui-home {
    width: 1152px;
  }
}
</style>