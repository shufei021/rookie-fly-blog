/*
 * @Description: VitePress配置文件
 */

// 头部导航
import topNav from "./topNav";
import { novel } from "./sideBar/vitePressBar";
import llmstxt from "vitepress-plugin-llms";
import svgLoader from 'vite-svg-loader'
import Icons from 'unplugin-icons/vite'
import learningSidebar from "./sideBar/learning.js";
import sideBarData from "./sideBar/note.js";
export default {
  title: "Luck Blog",
  description: "关注web前端开发为主的博客网站和前端网址大全",
  // 打包目录
  outDir: "../dist",
  /** 打包项目的根目录 */
  base: "/rookie-fly-blog/",
  head: [
    // 添加图标
    ["link", { rel: "icon", href: "/rookie-fly-blog/favicon.ico" }],
  ],
  // 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
  lastUpdated: true, // string | boolean
  vite: {
    plugins: [
      llmstxt(),
      svgLoader(),
      Icons({ 
        compiler: 'vue3',
        autoInstall: true 
      }),
    ],
  },
  // 主题配置
  themeConfig: {
    // 导航上的logo
    logo: "/logo.png",
    // 当为布尔值false时，隐藏logo右边的标题，字符串时就显示标题（siteTitle: '我的标题'）
    siteTitle: false,
    // 导航栏配置
    nav: topNav,
    // 左侧导航栏
    sidebar: {
      "/novel/overachiever/page": novel.overachiever,
      ...learningSidebar,
      ...sideBarData
    },
    // 右侧边栏配置，默认值是"In hac pagina"
    outlineTitle: "本页目录",
    outline: {
      level: [2, 3], // 仅显示 H2 标题
      label: "目录" // 可选：自定义标题名称
    },
    // 编辑链接
    // editLink: {
    //   pattern: "https://github.com/shufei021/rookie-fly-blog",
    //   text: "在 github 上编辑此页",
    // },
    // 站点页脚配置
    footer: {
      // message: "Released under the MIT License",
      copyright: "Copyright © 2025-rookie",
    },
    // 社交和项目链接地址配置
    socialLinks: [
      { icon: "github", link: "https://github.com/shufei021/rookie-fly-blog" },
      // 也可以自定义svg的icon:
      // {
      //   icon: {
      //     svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Dribbble</title><path d="M12...6.38z"/></svg>',
      //   },
      //   link: "...",
      // },
    ],
    // 搜索
    // algolia: {
    //   apiKey: "your_api_key",
    //   indexName: "index_name",
    // },
    
    //本地搜索
    search: {
      provider: "local",
    },
    // returnToTopLabel: "返回顶部", 未生效，所以自己手动写了一些返回顶部的组件
    lastUpdatedText: "最后更新",
    // 默认是 next page
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    mermaid: {
      enable: true, // 启用 Mermaid
      // 可选：配置主题或语法
      options: { 
        theme: 'default' 
      }
    }
  },
};
