# 在项目中用 TS 封装 axios

## 基础封装

```ts
// index.ts
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

class Request {
  // axios 实例
  instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
  }
  request(config: AxiosRequestConfig) {
    return this.instance.request(config)
  }
}

export default Request
```

## 拦截器封装

+ 类拦截器
+ 实例拦截器
+ 接口拦截器

### 类拦截器

```ts
// index.ts
constructor(config: AxiosRequestConfig) {
  this.instance = axios.create(config)
  
  this.instance.interceptors.request.use(
    (res: AxiosRequestConfig) => {
      console.log('全局请求拦截器')
      return res
    },
    (err: any) => err,
  )
  this.instance.interceptors.response.use(
    // 因为我们接口的数据都在res.data下，所以我们直接返回res.data
    (res: AxiosResponse) => {
      console.log('全局响应拦截器')
      return res.data
    },
    (err: any) => err,
  )
}
```

### 实例拦截器

```ts

```