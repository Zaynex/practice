css3 animation 的运用
组件化开发的思路，工厂模式。
生成唯一的id

水平居中：设置是否为true来确保是否可以居中

H5对象，添加若干页面，以动画效果切换，整合fullpage动画效果

H5ComponentBase 基本图文组件

Point
在做散点图的时候主要有些参数时可选或者是0的，所以在判断时尽量用undefined而不是直接将该数放进if里。(0在if语句中会转移为布尔值false)
position:absolute;
top: -50%;
这个百分比是相对于谁的？ 
以相对定位参照元素的高度为100%来计算，相当于移动了那个相对定位参照元素的高度的一半。

css水影效果
其实是叠加的，上面一个不变，底层进行一个放大。


柱状图


//保留整数右移
var width = (100/cfg.data.length) >> 0;