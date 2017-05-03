双向数据绑定

[(ngModel)]="hero.name"

ngFor的*前缀表示<li>及其子元素组成了一个主控模板。

<li *ngFor="let hero of heroes"></li>
ngFor指令在AppComponent.heroes属性返回的heroes数组上迭代，并输出此模板的实例。


在@Component 里面写 styles，template,selector

*ngIf="selectedHero" 
表示如果这个属性存在。那么下面的DOM才会被渲染。


@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HeroDetailComponent ],
  bootstrap:    [ AppComponent ]
})

declarations 包含了所有的应用模块的组件、管道和指令。包含了 declarations之后，
appcomponent 就可以使用 其中的selector了。

@Input装饰器向hero属性添加注解。
@Input()
  hero: Hero;
表示hero是一个输入属性。

[hero]="selectedHero"
hero表示子组件的属性， selectedHero是父组件的属性，就是把父组件的属性传递给 子组件。
子组件中根据该hero属性进行相应的操作。

路由处理
a标签的routerlink对应在 NgModule中的 path，渲染对应的组件。

双向绑定的本质：
[ngModel] => 从model到视图单向绑定
(ngModelChange) => 利用事件绑定从视图到model的反向数据绑定
[()] => 双向绑定

```
<input type="text" class="form-control" id="name"
required
[ngModel]="model.name" name="name"
(ngModelChange)="model.name = $event" >
```



*ngIf如果为false时，其实将DOM结构移除，并销毁组件。组件会被垃圾回收并释放内存。
组件通常还会有子组件，当ngIf销毁掉祖先组件时，他们全都会被销毁。

当如果组件需要重复的重建和删除，这种操作时昂贵的。


[] 属性绑定

promise 和 q有什么区别，有了promise之后还需要用q么。


另外，有时候返回的是Observable可观察对象，需要用管道 `async` 来处理。