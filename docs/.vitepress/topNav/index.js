import { learningSidebar } from "../sideBar/learning.js";

// 顶部右侧导航配置项
export default [
  {
    text: "首页",
    link: "/",
  },
  {
    text: "前端导航",
    link: "/guide/start",
  },
  {
    text: "我的开源",
    link: "/openSource/open-source",
  },
  // {
  //   text: "我的笔记",
  //   items: [
  //     // { text: "VitePress", link: "/note/vitePress/page1" },
  //     // { text: "CSS", link: "/note/css/css" },
  //     { text: "Electron", link: "/note/electron/page1" },
  //     // { text: "React", link: "/note/react" },
  //   ],
  // },
  // {
  //   text: "和孩子一起学习",
  //   link: "/learn/math/skill",
  // },
  learningSidebar,
  // {
  //   text: "温故而知新",
  //   items: [
  //     { text: "合集", link: "/Interview/index" },
  //     { text: "温故", link: "/Interview/old/page" },
  //     { text: "JavaScript", link: "/Interview/js/page" },
  //     { text: "Vue", link: "/Interview/vue/page" },
  //     { text: "Uniapp", link: "/uniapp/page" },
  //     { text: "Vite", link: "/vite/page" },
  //   ],
  // },
  {
    text: "小说",
    items: [
      { text: "卷王仙尊", link: "/novel/overachiever/page" },
      // { text: "代码修仙成尊", link: "/novel/overachiever/page" },
    ],
  },
  // {
  //   text: "Q&A",
  //   items: [
  //     { text: "前端工程化", link: "/novel/overachiever/page" },
  //     { text: "常见Q&A", link: "/novel/overachiever/page" },
  //   ],
  // },
  // {
  //   text: "前端技术",
  //   items: [
  //     { text: "HTML/CSS", link: "/site/page" },
  //     { text: "JavaScript", link: "/site/html-css" },
  //     { text: "Vue2", link: "/site/framework" },
  //     { text: "Vue3", link: "/site/framework" },
  //     { text: "React", link: "/site/framework" },
  //     { text: "TypeScript", link: "/site/framework" },
  //     { text: "NodeJs", link: "/site/framework1" },
  //   ],
  // },
  // {
  //   text: "前端聚合",
  //   items: [
  //     { text: "前端综合", link: "/site/page" },
  //     { text: "HTML/CSS", link: "/site/html-css" },
  //     { text: "框架组件", link: "/site/framework" },
  //   ],
  // },
  // {
  //   text: "技术笔记",
  //   items: [
  //     { text: "VitePress", link: "/note/vitePress/page1" },
  //     { text: "Vue", link: "/note/vue" },
  //     { text: "React", link: "/note/react" },
  //   ],
  // },
  // {
  //   text: "组件使用",
  //   link: "/examples/button",
  // },
  // {
  //   text: "关于我",
  //   link: "/about/page",
  // },
  // { text: "更新日志", link: "https://github.com/msyuan/vitePress-project" },
];
