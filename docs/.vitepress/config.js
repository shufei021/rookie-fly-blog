/*
 * @Description: VitePress配置文件
 */

// 头部导航
import topNav from "./topNav";
// import { vitePressNote } from "./sideBar/vitePressBar";
import llmstxt from "vitepress-plugin-llms";
import svgLoader from 'vite-svg-loader'
export default {
  title: "极简博客",
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
    plugins: [llmstxt(),svgLoader()],
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
    // sidebar: {
    //   "/note/vitePress": vitePressNote,
    // },
    // 右侧边栏配置，默认值是"In hac pagina"
    outlineTitle: "本页目录",
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
  },
};
