# 你知道null和undefined有什么区别么

作者在哦设计js 的时候先都是先设计的 null（为什么设计了null：最初设计js 的时候借鉴了 Java）

null会被隐式的转换成 0，很不容易发现错误

先有null 后有 undefined，出来 undefined  是为了填补之前的坑

具体区别是：

JavaScript的最初被是这样区分的：null是一个表示 “无”的对象（空对象指针），转为数值时为 0，undefined 是表示 一个“无”的原始值，转为数值时为 NaN