## 单向绑定

### data -> view
一般绑定的类型可以是html的attribute，也可以是dom的property
```
{{expression}}


// target可能是@input进来的
[target]="expression"

bind-target = "expression"
```
**注意，模板绑定是通过`Propery`和事件来工作的，而不是`attribute`。
在angular中，HTML的attribute只是初始化元素和指令的状态，当进行数据绑定时，是与元素和指令的property打交道。

不过当元素只有attribue的时候，你只能通过`[attr.xxx]`的方式来绑定
```
<table border=1>
  <!--  expression calculates colspan=2 -->
  <tr><td [attr.colspan]="1 + 1">One-Two</td></tr>

  <!-- ERROR: There is no `colspan` property to set!
    <tr><td colspan="{{1 + 1}}">Three-Four</td></tr>
  -->

  <tr><td>Five</td><td>Six</td></tr>
</table>
```

#### 插值表达式or属性绑定
```
<p><img src="{{heroImageUrl}}"> is the <i>interpolated</i> image.</p>
<p><img [src]="heroImageUrl"> is the <i>property bound</i> image.</p>

<p><span>"{{title}}" is the <i>interpolated</i> title.</span></p>
<p>"<span [innerHTML]="title"></span>" is the <i>property bound</i> title.</p>
```
当传入的属性是字符串时，使用插值表达式更加易懂，实际上，在渲染视图之前，angular把这些插值表达式翻译成了对应的属性绑定。
但数据类型不是字符串时，就必须得使用属性绑定了。

###  view -> data
这种方式就是通过事件将视图的值传递到数据源
```
(target)="statement";
on-target="statement";
```

## 双向绑定
```
[(target)]="expression"
bindon-target="expression"
```


## 如何避免script标签