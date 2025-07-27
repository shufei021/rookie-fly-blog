// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import { useData } from "vitepress";
import siteList from "./components/siteList.vue";
// import siteFooter from "./components/siteFooter.vue";
import home from "./components/home.vue";
import backTop from "./components/backTop.vue";
import NotFound from "./components/404.vue";
import OpenSource from "./components/OpenSource.vue";
import EnglishCorner from "./components/EnglishCorner.vue";
import TodoList from "./components/todoList.vue";

import DefaultTheme from "vitepress/theme";
import "./styles/custom.scss";
import "./styles/site.scss";
import "./styles/rainbow.css";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import SvgIcon from './components/SvgIcon.vue'
import VStyle from './components/VStyle.vue'
import { registerIcons } from './icons'

export default {
  ...DefaultTheme,
  // NotFound: () => h(NotFound), // <- this is a Vue 3 functional component
  enhanceApp({ app, router, siteData }) {
    // app is the Vue 3 app instance from createApp()
    // router is VitePress' custom router (see `lib/app/router.js`)
    // siteData is a ref of current site-level metadata.
    app.use(ElementPlus);
    app.component('SvgIcon', SvgIcon)
    app.component('VStyle', VStyle)
    // 注册全局组件
    app.component("SiteList", siteList);
    app.component("Home", home);
    app.component("BackTop", backTop);
    app.component("OpenSource", OpenSource);
    app.component("EnglishCorner", EnglishCorner);
    app.component("TodoList", TodoList);
    
    // router.addRoute({ path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound });
    // 注册所有图标
    if (typeof window !== 'undefined') {
      registerIcons()
    }
  },
  // 自定义布局配置
  Layout: () => {
    const props = {};
    // 获取 frontmatter
    const { frontmatter } = useData();

    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass;
    }
    return h(DefaultTheme.Layout, props, {
      // 自定义文档底部
      // "doc-after": () => h(siteFooter),
      "not-found": () => h(NotFound),
    });
  },
};
