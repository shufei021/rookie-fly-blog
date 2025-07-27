
// 自动化 注册实现
const linkTemplate = (name, index='')=>`/note/${name}/modules/page${index}`;
const linkTemplate1 = (name)=>`/note/${name}/page`;
const templateMap = {
    rollup: {
        text:'Rollup',
        sub:['vite+vue3支持jsx语法']
    },
    typeScript: {
        text:'TypeScript',
        sub:['在项目中用 TS 封装 axios']
    },
    vite: {
        text:'Vite',
        sub:['vite+vue3支持jsx语法','Vite 中使用 CSS 的各种功能']
    },
    vue3: {
        text:'Vue3',
        sub:['vue3 中的 hooks']
    },
    webpack: {
        text:'Webpack',
        sub:['Webpack插件开发指南']
    },
    uniapp: {
        text:'Uniapp',
        sub:['浏览器']
    }
}
// sidebar 配置
export const noteSidebar = {
    text: "笔记",
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