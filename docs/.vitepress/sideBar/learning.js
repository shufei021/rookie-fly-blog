
// 自动化 注册实现
const linkTemplate = (name, index='')=>`/learning/${name}/modules/page${index}`;
const linkTemplate1 = (name)=>`/learning/${name}/page`;
const templateMap = {
    browserNetwork: {
        text:'浏览器与网络',
        sub:['浏览器输入URL到渲染过程','事件轮询 (Event Loop)','跨域及 JSONP','HTTP1.1 与 HTTP2 区别','OPTIONS 预请求', '状态码详解',' WebSocket']
    },
    optimization: {
        text: '前端性能优化',
        sub:['前端性能优化','前端首屏优化','前端缓存','前端内存泄漏']
    },
    core: {
        text:'JavaScript 核心',
        sub:['ES6 新特性','箭头函数 vs 普通函数','原型和原型链','函数柯里化','事件轮询','CommonJS 与 模块化']
    },
    vue: {
        text:'Vue 框架',
        sub:['Vue 双向绑定原理','Vue 生命周期详解','Vue 自定义指令','Vue 如何优化 SEO','Vue2 vs Vue3','Vue3 组件通信与原理','Vue 路由实现原理','Vue keep-alive 原理','Vue computed 原理','vue3 watch vs watchEffect','Vue SSR 的实现原理','vue2和 vuex3渲染器的 diff算法','Vue nextTick','Vue complier 的实现原理','Vue 中的 Key']
    },
    layoutStyle: {
        text: '样式与布局',
        sub:['Flex','BFC']
    },
    engineering: {
        text:'构建工具及工程化',
        sub:['Webpack 的构建流程','vite 的构建流程','Webpack vs vite','TypeScript','Uniapp','前端架构']
    },
    other: {
        text:'其它',
        sub:['大文件上传']
    },
}
// sidebar 配置
export const learningSidebar = {
    text: "故知新",
    items: Object.keys(templateMap).reduce((acc, key) => {
        acc.push({
            text: templateMap[key].text,
            link: linkTemplate1(key),
        })
        return acc
    },[])
}
const gen = (name)=>{
    const { text, sub } = templateMap[name]
    return {
        text,
        items: sub.map((item,index)=>{
            return {
                text: item,
                link: linkTemplate(name,index + 1 ),
            }
        })
    }
}
const generater = ()=>{
    return Object.keys(templateMap).reduce((p,c)=>{
        const slider = gen(c)
        p[linkTemplate1(c)] = slider
        templateMap[c].sub.forEach((it,index) => {
            p[linkTemplate(c,index + 1)] = slider
        })
        return p
    },{})
}

const sideBarData = generater()

export default sideBarData