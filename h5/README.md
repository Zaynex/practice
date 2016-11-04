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


折线图
因为我们要求数据是在坐标轴的中心点上。所以要画的线的条数是 数据长度+2
。
画完之后发现其实整体的坐标还需要往右移一个单位。
```js
var row_w = (w / (cfg.data.length + 1));
    for(i in cfg.data){
      var item = cfg.data[i];
      // x = (w / cfg.data.length) * i;
      x = row_w * i + row_w;
      y = h - (item[1] * h * per);
      ctx.moveTo(x, y);
      ctx.arc(x, y, 5, 0, 2*Math.PI);
    }
```
从代码中我们可以看出，首先是分成了（数据长度+1）宽度，
这样每个起始点再加一个单位宽度就刚好位置都对齐了。

```js
ctx.fillText(num, x, y);//num数值， （x,y）坐标
```

雷达图
计算一个圆周上的坐标（计算多边形的顶点坐标）
已知：圆心坐标(a,b)、半径 r；角度deg。
rad = ( 2*Math.PI / 360 ) * ( 360 / step ) * i
x = a + Math.sin( rad ) * r;
y = b + Math.cos( rad ) * r;

```js
var cns = document.createElement("canvas");
  var ctx = cns.getContext("2d");
  cns.width = ctx.width = w;
  cns.height = ctx.height = h;
  component.append(cns);

  var r = w /2;
  ctx.beginPath();
  ctx.arc(r, r, 5, 0, 2*Math.PI);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(r, r, r-5, 0 ,2*Math.PI);
  ctx.stroke();

  var step = cfg.data.length;
  //伞骨图
  ctx.beginPath();
  for(var s = 0; s < step; s++){
    var rad = (2*Math.PI / 360) * (360 / step) * s;
    var x = r + Math.sin(rad) * r;
    var y = r + Math.cos(rad) * r;

    // ctx.moveTo(r, r);
    ctx.lineTo(x, y);
    // ctx.arc(x, y, 5, 0, 2*Math.PI);
  }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    //内雷达图
    ctx.beginPath();
   for(var s = 0; s < step; s++){
    var rad = (2*Math.PI / 360) * (360 / step) * s;
    var x = r + Math.sin(rad) * r * 0.5;
    var y = r + Math.cos(rad) * r * 0.5;

    // ctx.moveTo(r, r);
    ctx.lineTo(x, y);
    // ctx.arc(x, y, 5, 0, 2*Math.PI);
  }
    ctx.fillStyle = '#f00';
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
```

```js
for(var i = 0; i < step; i++){
    var  rad = ( 2*Math.PI / 360 ) * ( 360 / step ) * i;

    var x = r + Math.sin( rad ) * r ;
    var y = r + Math.cos( rad ) * r ;
    ctx.moveTo(r,r);
    ctx.lineTo(x,y);
  }
  ctx.strokeStyle = "#e0e0e0";
  ctx.stroke();

  ```

  饼图
  3层结构