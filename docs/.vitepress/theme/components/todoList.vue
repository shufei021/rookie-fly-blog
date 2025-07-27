<template>
    <el-container class="todo-list-container">
        <!-- 左侧日期列表 -->
        <div class="left-date-list">
            <div class="title">📅 学习打卡记录</div>
            <el-scrollbar>
                <el-button type="success" style="width: 100%;" v-for="(item) in lefts" :key="item.id">{{ item.text
                    }}</el-button>
            </el-scrollbar>

        </div>
        <div class="right-todo-list">
            <div class="main-left">
                <el-row class="tac">
                    <el-col :span="8">
                        <el-menu default-active="2" class="el-menu-vertical-demo" v-for="(item, index) in Object.keys(group)" :key="index">
                            <el-sub-menu index="1">
                                <template #title>
                                    <span>{{ item }}</span>
                                </template>
                                    <el-menu-item v-for="it in group[item]" title="浏览器输入URL到渲染" :index="it.text">{{ it.text }}</el-menu-item>
                            </el-sub-menu>
                        </el-menu>
                    </el-col>
                </el-row>
            </div>
            <!-- <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="添加任务" name="first">添加任务</el-tab-pane>
                <el-tab-pane label="任务分组" name="second">任务分组</el-tab-pane>
                <el-tab-pane label="添加子任务" name="third">添加子任务</el-tab-pane>
                <el-tab-pane label="编辑任务" name="fourth">编辑任务</el-tab-pane>
            </el-tabs> -->
        </div>

    </el-container>
</template>

<script setup>
import { ref,reactive, onMounted } from 'vue'
import dayjs from 'dayjs'
import '../../utils/index.js'
const TEST_DB_CONFIG = {
    dbName: "LEARNDB",
    dbVersion: 1,
    storeName: "date",
    keyPath: "id",
    indexes: [], // 无索引
};

let db = null;
const activeName = ref('first')
const lefts = ref([])
const handleClick = (tab, event) => {
    console.log(tab, event)
}

const group = reactive({
    浏览器和网络: [
        { text: "浏览器输入URL到渲染", link: "/learning/html/html-intro" },
        { text: "事件轮询", link: "/learning/css/css-intro" },
        { text: "跨域", link: "/learning/javascript/javascript-intro" },
        { text: "HTTP1.1和HTTP2的区别", link: "/learning/vue/vue-intro" },
        { text: "options 预检机制", link: "/learning/react/react-intro" },
        { text: "状态码详解", link: "/learning/react/react-intro" },
        { text: "websoket", link: "/learning/react/react-intro" },
    ],
    性能优化: [
        { text: "前端性能优化", link: "/learning/html/html-intro" },
        { text: "前端首屏优化", link: "/learning/css/css-intro" },
        { text: "前端缓存", link: "/learning/javascript/javascript-intro" },
        { text: "前端内存泄漏", link: "/learning/vue/vue-intro" },
        { text: "如何优化SEO", link: "/learning/react/react-intro" },
    ],
    JavaScript核心: [
        { text: "ES6 特性", link: "/learning/html/html-intro" },
        { text: "箭头函数 和 普通函数的区别", link: "/learning/css/css-intro" },
        { text: "原型和原型链", link: "/learning/javascript/javascript-intro" },
        { text: "函数柯里化", link: "/learning/vue/vue-intro" },
        { text: "CommonJS 和 模块化", link: "/learning/react/react-intro" },
    ]
})
console.log('%c [ Object.keys(group) ]-83', 'font-size:13px; background:pink; color:#bf2c9f;', Object.keys(group))

// 初始化数据库
async function initDB() {
    try {
        db = rutils.indexdb(TEST_DB_CONFIG);
        await db.open();
        console.log("数据库初始化成功");
        await refreshData();
    } catch (e) {
        console.log(`初始化失败: ${e.message}`, false);
    }
}
// 刷新数据展示
async function refreshData() {
    try {
        const allData = [];
        await db.each((cursor) => {
            allData.push(cursor.value);
        });
        const now = dayjs()
        const curFormat = now.format('YYYY年MM月DD日');
        const curKey = now.valueOf()
        const data = { id: curKey, text: curFormat }
        if (!allData.length) {
            lefts.value.push(data)
            testAdd(data)
        } else {
            const isEXeist = allData.find(item => item.text === curFormat)
           
            if (!isEXeist) {
                lefts.value.push(data, ...allData)
                testAdd(data)
            }else {
                lefts.value.push(...allData)
            }
        } 
    } catch (e) {
        console.log(`数据刷新失败: ${e.message}`, false);
    }
}
// 测试用例
async function testAdd(data) {
    try {
        await db.add(data);
        console.log(`✅ 添加成功 ID: ${data.id}`);
        // await refreshData();
    } catch (e) {
        console.log(`❌ 添加失败: ${e.message}`, false);
    }
}
onMounted(() => {
    // 页面初始化
    console.log('%c [ 页面初始化 ]-71', 'font-size:13px; background:pink; color:#bf2c9f;')
    window.addEventListener("load", initDB);
})
</script>

<style scoped lang="scss">
.todo-list-container {
    position: fixed;
    left: 0;
    top: 60px;
    width: 100vw;
    height: 100vh;
    // background: #f5f5f5;

    .left-date-list {
        width: 300px;
        height: 100%;
        background-color: #eee;

        .title {
            text-align: center;
            padding: 20px;
            background-color: #fff;
        }
    }

    .right-todo-list {
        width: calc(100% - 300px);
        height: 100%;
        // background-color: #ddd;
    }
    .el-button+.el-button{
        margin-left: 0;
        margin-top: 1px;
    }
}
</style>