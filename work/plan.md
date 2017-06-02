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

2017/3/11
路由文档没看完。
房子租好了。接下来准备做的事：
9.30上班之前看会书，
下班之后去健身房运动会。

2017/3/12
router看得一头雾水，搬家了。真好。
先看router。改写！！！
近期的任务：
1. router项目改写
2. node再学习，真正体验一遍前后端分离


2017/3/29
回头一看就已经好久了。
这几天最大的感触就是：
1. 需求是什么，做什么，不做什么。影响到哪里？
2. 上线时间
3. 上班的时候赶紧把活干完，没事了就好好学东西。

2017/4/8
现在需要明白的是，angular和 react不是一个阵营的。现在公司用的是angular2。需要结合业务你需要学习的是
1. angular2
2. rxjs
3. redux + angular2
4. server Render(Node)

react 可以放到后面，毕竟react只是view库。重在理解Redux!

2017/4/14
angualr4 升级
reudx+angular4新体验


2017/4/25
angular再学习
node.js预热

2017/5/5
我觉得需要给自己定制一个定期写作的目标。每周出一篇文章。针对前端基础入门的同学（其实就是自己），针对性的发一些文章，提高并巩固自己学到的新概念。
可以写的文章如下
1. postcss，包括如何在webpack中配置等等。有很多实用方便的东西
2. class constructor 还有public static都是啥，以及继承对象等等。
3. promise，封装一个ajax的promise，然后学一下fetch。撸一个promise的简易原型出来，这里就涉及到了很多异步的概念，非常值得一说
4. 关于移动端的布局，还有一些坑之类的（唤起app，ios双击问题）。

这些东西够我用一个月时间去完成它了。

2017/5/30
angular权威指南看了一半，对基本的使用算是有所掌握了。
明天继续。不过得把angular route 撸出来。
算是看书之后的小总结吧。

2017/6/02
骑自行车被电瓶车给撞了。电瓶车跑了，Fuck.