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


依赖注入： 提供给类的新实例的一种方式，还负责处理好类所需的全部依赖。大多数依赖都是服务。
当Angular 创建组件时，会首先为组件所需的服务找一个注入器。（injector)

注入器是维护服务实例的容器，存放着以前创建的实例。如果容器中还没有所请求的服务实例，注入器就会创建一个服务实例，并且添加到容器中，然后把这个服务返回给Angular。当所有的服务都被解析完并返回时，Angular会以这些服务为参数去调用组件的构造函数。

———— 依赖注入。

但是此时组件还没有该服务。需要通过
providers 提供。 (app.module.ts ,全局提供)
也可以在@Component中 providers

把它注入在组件级表示该组件的每一个新实例都会有一个该服务的新实例。

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
