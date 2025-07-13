# 大文件上传怎么做

#### 一、实现思路

大文件上传的核心思想是**分片上传**（Chunked Upload）：
1. **文件切片**：将大文件按固定大小（如5MB）拆分成多个小块
2. **并行上传**：逐个或并发上传这些分片
3. **服务端合并**：所有分片上传完成后，由服务端合并成完整文件
4. **断点续传**：通过记录已上传分片，支持中断后继续上传

---

#### 二、代码实现与注释

```javascript
/**
 * 大文件上传主函数
 * @param {File} file - 浏览器File对象
 */
async function uploadLargeFile(file) {
  // 1. 设置分片大小（5MB）
  const chunkSize = 5 * 1024 * 1024; // 5MB
  // 2. 计算总分片数（向上取整）
  const totalChunks = Math.ceil(file.size / chunkSize);
  // 3. 创建分片数组
  const chunks = [];

  // 4. 文件切片处理
  for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSize; // 当前分片起始位置
    const end = Math.min(start + chunkSize, file.size); // 当前分片结束位置
    // 使用File.slice()方法切割分片（兼容性：File API标准）
    chunks.push(file.slice(start, end));
  }

  // 5. 顺序上传分片（可改为并发上传优化速度）
  for (let i = 0; i < chunks.length; i++) {
    await uploadChunk(chunks[i], i, totalChunks); // 等待每个分片上传完成
  }
}

/**
 * 单个分片上传函数
 * @param {Blob} chunk - 分片内容
 * @param {number} index - 分片序号（从0开始）
 * @param {number} total - 总分片数
 */
async function uploadChunk(chunk, index, total) {
  // 6. 创建FormData对象用于上传
  const formData = new FormData();
  // 7. 添加分片文件（名称需与服务端接收参数一致）
  formData.append("file", chunk);
  // 8. 添加分片元数据
  formData.append("index", index);  // 当前分片序号
  formData.append("total", total);  // 总分片数

  // 9. 发送POST请求上传分片
  await fetch("/upload", {
    method: "POST",
    body: formData,
    // 可选：添加进度监听
    // onUploadProgress: (progressEvent) => {
    //   console.log(`上传进度: ${Math.round(
    //     (progressEvent.loaded * 100) / progressEvent.total
    //   )}%`);
    // }
  });
}
```

---

#### 三、关键实现点说明

##### 1. **分片大小选择**
- 5MB 是常见选择（HTTP请求最大推荐大小）
- 根据网络带宽和服务器配置可调整（建议2-10MB）

##### 2. **文件切片技术**
- 使用 `File.slice()` 方法（浏览器原生API）
- 兼容性：现代浏览器均支持（IE10+）

##### 3. **上传策略**
- **顺序上传**：当前实现保证分片顺序，但较慢
- **并发上传**：可用 `Promise.all()` 并发处理
- **断点续传**：需服务端记录已上传分片

##### 4. **服务端要求**
- 需支持接收分片并记录分片信息
- 最终需提供合并接口（如 `/merge`）
- 示例响应格式：
  ```json
  {
    "status": "success",
    "chunkIndex": 3,
    "totalChunks": 20
  }
  ```

---

#### 四、优化建议

##### 1. **并发上传优化**
```javascript
// 替换顺序上传为并发上传
await Promise.all(chunks.map((chunk, i) => 
  uploadChunk(chunk, i, totalChunks)
));
```

##### 2. **断点续传实现**
1. 首次上传前请求 `/check-chunks`
2. 服务端返回已存在的分片索引
3. 客户端跳过已存在的分片

##### 3. **上传进度追踪**
```javascript
// 在fetch中添加进度监听
const controller = new AbortController();
const upload = fetch("/upload", {
  signal: controller.signal,
  //...
});

// 监听进度
upload.then(() => {
  console.log(`分片 ${index} 上传完成`);
});
```

#### 4. **错误重试机制**
```javascript
// 添加重试逻辑
async function uploadChunkWithRetry(...args) {
  const MAX_RETRIES = 3;
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      return await uploadChunk(...args);
    } catch (error) {
      if (i === MAX_RETRIES - 1) throw error;
      console.log(`重试第 ${i + 1} 次...`);
    }
  }
}
```

---

#### 五、完整工作流程

```
[客户端]          [服务端]
1. 文件切片        ← 接收分片请求
2. 顺序/并发上传    → 接收分片并存储
3. 收到全部分片    ← 请求合并分片
4. 调用 /merge 接口 → 合并文件
5. 返回最终文件URL
```

---

#### 六、注意事项

1. **CORS配置**：确保服务端允许跨域上传
2. **文件类型校验**：上传前应验证MIME类型
3. **文件大小限制**：服务端需设置合理的上传大小限制
4. **安全性**：建议添加上传凭证（token）和签名验证
5. **清理机制**：未完成的分片需要定时清理

```js
async function uploadLargeFile(file) {
  const chunkSize = 5 * 1024 * 1024; // 5MB
  const totalChunks = Math.ceil(file.size / chunkSize);
  const chunks = [];

  for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    chunks.push(file.slice(start, end));
  }

  for (let i = 0; i < chunks.length; i++) {
    await uploadChunk(chunks[i], i, totalChunks);
  }
}

async function uploadChunk(chunk, index, total) {
  const formData = new FormData();
  formData.append("file", chunk);
  formData.append("index", index);
  formData.append("total", total);

  await fetch("/upload", {
    method: "POST",
    body: formData,
  });
}
```