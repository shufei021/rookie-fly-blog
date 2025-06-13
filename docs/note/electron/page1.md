
# Electron+Vue3 硬件交互篇 

> 当我们使用 `Electron+Vue3` 来开发我们的桌面应用程序，有时候我们需要硬件来与我们的`Vue3`进行交互，交互主要通过 `Electron` 的主进程和渲染进程通信机制来实现。以下是大致的实现方案：


## 技术方案

 **Electron的角色**

   - 1.1 主进程：Node.js环境，直接调用serialport库操作硬件串口37。

   - 1.2 渲染进程：Vue3页面，通过预加载脚本(preload)安全访问Node.js能力29。

   - 1.3 关键约束：浏览器无法直接访问串口，必须依赖Electron的Node.js环境710。

> 主要依赖`Electron`的`Node.js`环境访问系统底层`API`的能力，结合串口通信(`SerialPort`)和进程间通信(`IPC`)技术。

## 流程示意图

![流程](../../assets/mermaid.png)


 ### 跨平台串口通信库

 ```bash
npm install electron serialport --save-dev
 ```
> SerialPort 是一个用于 Node.js 的跨平台串口通信库，允许 JavaScript 应用通过 RS-232、RS-485 和 USB 串行端口与硬件设备通信。它是 Electron 应用中实现硬件交互的核心工具。

 ### Electron主进程配置 (electron/main.js)

 ```js
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),  // 关键：预加载脚本
      contextIsolation: true,  // 启用安全隔离
    }
  });
  win.loadURL(process.env.VITE_DEV_SERVER_URL || 'http://localhost:3000');
}
app.whenReady().then(createWindow);
 ```

 ### 预加载脚本 (electron/preload.js)

 ```js
const { contextBridge, ipcRenderer } = require('electron');
const { SerialPort } = require('serialport');

contextBridge.exposeInMainWorld('electronAPI', {
  // 获取串口列表
  getPorts: () => SerialPort.list(),
  // 监听串口数据
  onSerialData: (callback) => {
    ipcRenderer.on('serial-data', (_event, value) => callback(value));
  },
  // 发送数据到设备
  sendToDevice: (data) => ipcRenderer.send('send-to-device', data)
});
 ```

 ## 硬件接入

### 串口连接与数据监听 (主进程中)

 ```js
const { ipcMain } = require('electron');
const { SerialPort } = require('serialport');

let activePort = null;

// 初始化串口
ipcMain.handle('connect-serial', async (_, { path, baudRate = 9600 }) => {
  activePort = new SerialPort({ path, baudRate });
  
  activePort.on('data', data => {
    const weight = parseScaleData(data);  // 解析称重数据
    mainWindow.webContents.send('serial-data', weight); // 发送到Vue页面
  });
  
  activePort.on('error', err => console.error('串口错误:', err));
});

// 解析电子秤数据示例（根据设备协议调整）
function parseScaleData(buffer) {
  const dataStr = buffer.toString('utf-8').trim();
  // 示例：电子秤数据格式 "205   000   000"（重量在首位）
  return parseFloat(dataStr.split('    ')[0]); 
}
 ```

 ### Vue组件中调用硬件 (src/components/Scale.vue)

```vue
<template>
  <div>
    <select @change="connectScale">
      <option v-for="port in ports" :value="port.path">{{ port.path }}</option>
    </select>
    <p>当前重量: {{ currentWeight }} kg</p>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const ports = ref([]);
const currentWeight = ref(0);

// 获取可用串口列表
const loadPorts = async () => {
  ports.value = await window.electronAPI.getPorts();
};

// 监听电子秤数据
onMounted(() => {
  window.electronAPI.onSerialData((weight) => {
    currentWeight.value = weight;
  });
});
</script>
```
