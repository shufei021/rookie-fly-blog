<template>
    <div class="english-corner">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px">
        <div>
          <el-button type="primary" @click="play">播放</el-button>
          <el-button @click="pause">暂停</el-button>
          <el-button @click="resume">继续</el-button>
          <el-button @click="stop">停止</el-button>
        </div>
  
        <div style="display: flex; align-items: center; gap: 10px">
          <span>语速:</span>
          <el-slider v-model="rate" :min="0.5" :max="2" :step="0.1" style="width: 120px" />
        </div>
  
        <div>
          <el-select v-model="lang" placeholder="选择语言">
            <template #label="{ label }">
                <span>{{ label }}: </span>
            </template>
            <el-option label="英文" value="en-US" />
            <el-option label="中文" value="zh-CN" />
          </el-select>
        </div>
  
    </div>
    <div>
      <input type="file" accept=".txt" @change="handleFileUpload" />
    </div>
  
      <el-divider />
  
      <el-input
        v-model="textarea"
        style="width: 100%"
        :rows="8"
        type="textarea"
        placeholder="请输入或上传英文/中文文本"
      />
      <BackTop />
    </div>
  </template>
  
  <script setup>
  import { ref, watchEffect } from 'vue'
  
  const textarea = ref('')
  const lang = ref('en-US')
  const rate = ref(1)
  let utterance = null
  let isPaused = ref(false)
  
  // 初始化语音对象
  const initUtterance = () => {
    utterance = new SpeechSynthesisUtterance()
    utterance.lang = lang.value
    utterance.rate = rate.value
    utterance.text = textarea.value.trim()
  }
  
  const play = () => {
    const text = textarea.value.trim()
    if (!text) {
      alert('请输入或上传文本内容')
      return
    }
  
    if (utterance && !isPaused.value) {
      initUtterance()
    }
  
    window.speechSynthesis.speak(utterance)
    isPaused.value = false
  }
  
  const pause = () => {
    if (utterance) {
      window.speechSynthesis.pause()
      isPaused.value = true
    }
  }
  
  const resume = () => {
    if (utterance && isPaused.value) {
      window.speechSynthesis.resume()
      isPaused.value = false
    }
  }
  
  const stop = () => {
    window.speechSynthesis.cancel()
    isPaused.value = false
    initUtterance()
  }
  
  // 监听语言和语速变化
  watchEffect(() => {
    if (utterance) {
      utterance.lang = lang.value
      utterance.rate = rate.value
    }
  })
  
  // 处理文件上传
  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (!file || !file.name.endsWith('.txt')) {
      alert('请上传 .txt 格式的文本文件')
      return
    }
  
    const reader = new FileReader()
    reader.onload = (e) => {
      textarea.value = e.target.result
      initUtterance()
    }
    reader.readAsText(file)
  }
  </script>
  
  <style lang="scss" scoped>
  .text-container {
    width: 100%;
    height: 300px;
    background-color: #ccc;
  }
  </style>