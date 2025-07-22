import { learningSidebar } from "../sideBar/learning.js";
import { noteSidebar } from "../sideBar/note.js";

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
  learningSidebar,
  noteSidebar,
  {
    text: "问答角",
    link: "/answer/page.md",
  },
  {
    text: "小说",
    items: [
      { text: "卷王仙尊", link: "/novel/overachiever/page" },
    ],
  },
  {
    text: "英语角",
    link: "/englishCorner/page",
  },
  {
    text: "数学角",
    link: "/mathCorner/page",
  }
];
