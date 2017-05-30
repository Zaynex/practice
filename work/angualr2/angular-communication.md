## 父子组件通信
通过`@input`输入型绑定把数组从父组件传递到子组件。
```
@Component({
  selector: 'hero-child',
  template: `
    <h3>{{hero.name}} says:</h3>
    <p>I, {{hero.name}}, am at your service, {{masterName}}.</p>
  `
})
export class HeroChildComponent {
  @Input() hero: Hero; // 这里的 hero 表示从父组件传递
  @Input('master') masterName: string; // master 是 masterName 的别名
}
```

父组件
```
@Component({
    selector: 'hero-parent',
    template: `
        <h2>{{master}} controls {{heroes.length}} heroes</h2>
        <hero-child *ngFor="let hero of her
        oes"
            [hero] = "hero"
            [master] = "master"
        ></hero-child>
    `
    })
    export class HeroParentComponent {
        heroes = HEROES;
        master: string = 'Master'
    }
```

左侧的`[hero]="hero"`表示将当前组件的hero实例绑定到子组件的hero属性。

