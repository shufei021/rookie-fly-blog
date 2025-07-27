# Webpack插件开发指南
以下是Webpack插件（Plugin）开发的核心结构示例、关键开发要点及官方文档资源，结合最佳实践与官方资料整理而成：

## 一、插件基本结构
一个Webpack插件是一个包含 apply 方法的类，通过compiler对象访问Webpack的钩子（hooks）：

```js
class MyPlugin {
    constructor(options) {
        this.options = options; // 接收配置参数
     }

    apply(compiler) {
        // 注册钩子
    compiler.hooks.emit.tapAsync('MyPlugin', (compilation, callback) => {
      // 编译完成后执行逻辑
      compilation.assets['new-file.txt'] = {
        source: () =>'Hello from MyPlugin',
        size: () =>20
      };
      callback(); // 异步钩子需调用callback
    });
  }
}
module.exports = MyPlugin;
```

+ 构造函数：接收插件配置选项。
+ apply方法：compiler 参数提供Webpack环境的所有钩子。
+ 钩子类型：tap（同步）、tapAsync（异步）、tapPromise（Promise异步）。

## 二、核心开发要点

1. 钩子选择与使用
   + 常用钩子：
     + emit：生成资源前修改输出（异步）。
     + compile：编译开始时触发（同步）。
     + afterCompile：编译完成后触发（异步）
   + 注册示例：
     ```js
    compiler.hooks.beforeRun.tap('MyPlugin', (compiler) => {
      console.log('构建启动');
    });
     ```
 