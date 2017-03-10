# 记录成为一名前端工程师的历程

在实习初，给自己安排了看似很完美的计划，实际上却根本没有付出实际行动。

2017/1/4
上班的时候一直在调试东西没学到什么东西，不过可喜的是看了会犀牛书。找到了一个非常牛逼的入门教程，感觉自己学了之后要上天了.

todo:
明天早上把下载的源码好好看一遍，深刻体会react+redux全家桶！！！

502 前端的故障 错误的网关

2017/1/10

使用短路逻辑符可以有效的避免因为调用一个不存在的对象的属性时带来丑陋的报错。
每次出问题，感觉被针对，不过这样也好，有压力才有动力。
震哥是个有野心的人，做事讲究效率，有明确的输出，虽然外表雄壮，但依然喜欢在脸上耍表情逗乐大家。

代码这种事，不是别人一行行教你怎么写的，得自己去敲去悟。
虽然是一个很简单的单个选中时设置为高亮效果，却也折磨了我一天。
这里涉及到了组件间的通信，以及props的来源。
另外就是各个组件渲染时间的逻辑稍微清楚了点，还需要看书再深刻得理解下。
什么场景下使用 componentWillReceiveProps。
大概就是这样。


2017/1/11

purecomponent 是纯组件，如果state和props没有变化，那么react就不会触发render方法
省去 Virtual DOM 的生成和比对过程。

2017/1/12
$.deferred
jQuery回调函数解决方案
```
　　$.ajax({
　　　　url: "test.html",
　　　　success: function(){
　　　　　　alert("哈哈，成功了！");
　　　　},
　　　　error:function(){
　　　　　　alert("出错啦！");
　　　　}
　　});
```
$.ajax()操作完成后，如果使用的是低于1.5.0版本的jQuery，返回的是XHR对象，你没法进行链式操作；如果高于1.5.0版本，返回的是deferred对象，可以进行链式操作。
```
　$.ajax("test.html")
　　.done(function(){ alert("哈哈，成功了！"); })
　　.fail(function(){ alert("出错啦！"); });
```

jQuery规定，deferred对象有三种执行状态----未完成，已完成和已失败。如果执行状态是"已完成"（resolved）,deferred对象立刻调用done()方法指定的回调函数；如果执行状态是"已失败"，调用fail()方法指定的回调函数；如果执行状态是"未完成"，则继续等待，或者调用progress()方法指定的回调函数（jQuery1.7版本添加）。


createContainer
```
import {connect} from 'react-redux'

export default function createContainer(mapStateToProps, mapActionCreators, component) {
    const connectComponent = connect(mapStateToProps, mapActionCreators)
    return component ? connectComponect(component) : connectComponent
}
```
如果最后没有传入这个参数，那会怎样？

onEnter就是在跳转相应的路由时可以进行适当的权限验证

2017/2/3
今天遇到的问题。
一个文本框输入时，每次输入都会call api。加上了函数去抖之后，是过一段时间再call多个api。
目前是过一段时间后call的api参数是递增的，不是最后的保留值。

希望达到效果
1. 三秒后call 的 api的值是最后的结果
2. 三秒内只call一次。


2017/02/14
今天电话面试了新加坡NTU的创业公司，虽然感觉公司不是特别靠谱，但是自己的面试表现也不好。
1. 解释事件冒泡机制和应用 （冒泡到哪一层）
2. react的核心
3. 一句话解释 this
4. 一句话解释 == 和 === （区别就是强制类型转换）
5. apply,call,bind的区别
在回答的过程中对某些问题没有深究得特别仔细。



2017/02/26
看完《JS设计模式与开发实践》学习基本的设计模式的思想，看看以后的业务代码中是否可以完善或者看一些框架库的时候有哪些运用。
《You don't know js》中，重新回顾下基础知识，将异步这块的知识好好学习下。
《Node.js》
你应该先学和JS相关的所有东西，让自己至少能在前端上有所稳固，再准备拓展其他新领域的知识。
或者每天花个一小时研究下新东西。
排在后面
- java
- python
- go


2017/3/3
这两天都在看angular2的官方文档。练习一些demo。
明天把设计模式过一下，后天运动加看angular2



2017/3/10
mock，其实就是本地起一个服务器。
todo: 学习路由导航后，尝试改写项目。将task-item改写掉。