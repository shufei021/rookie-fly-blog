# vue 修饰符

**在 vue 中修饰符可以分为 3 类：**

+ 事件修饰符
+ 按键修饰符
+ 表单修饰符

**事件修饰符**

> 在事件处理程序中调用 event.preventDefault 或 event.stopPropagation 方法是非常常见的需求。尽管可以在 methods 中轻松实现这点，但更好的方式是：methods 只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。
为了解决这个问题，vue 为 v-on 提供了事件修饰符。通过由点 . 表示的指令后缀来调用修饰符。

常见的事件修饰符如下：

+ .stop：阻止冒泡。
+ .prevent：阻止默认事件。
+ .capture：使用事件捕获模式。
+ .self：只在当前元素本身触发。
+ .once：只触发一次。
+ .passive：默认行为将会立即触发。

**按键修饰符**

除了事件修饰符以外，在 vue 中还提供了有鼠标修饰符，键值修饰符，系统修饰符等功能。

+ .left：左键
+ .right：右键
+ .middle：滚轮
+ .enter：回车
+ .tab：制表键
+ .delete：捕获 “删除” 和 “退格” 键
+ .esc：返回
+ .space：空格
+ .up：上
+ .down：下
+ .left：左
+ .right：右
+ .ctrl：ctrl 键
+ .alt：alt 键
+ .shift：shift 键
+ .meta：meta 键

**表单修饰符**

> vue 同样也为表单控件也提供了修饰符，常见的有 .lazy、 .number 和 .trim。

+ .lazy：在文本框失去焦点时才会渲染
+ .number：将文本框中所输入的内容转换为number类型
+ .trim：可以自动过滤输入首尾的空格

