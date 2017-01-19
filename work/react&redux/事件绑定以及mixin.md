在 react 组件中， 每个方法的上下文都会指向该组件的实例，即自动绑定 this为当前组件。

但是 使用ES6 class 或者纯函数时，自动绑定就不存在了。需要手动绑定
方式
1. bind方法

```
class App extends Component {
    handleClick(e, arg) {
        console.log(e, arg)
    }
    render() {
        return <button onClick={this.handleClick.bind(this, 'test')}>Test</button>
    }
}
ReactDOM.render(<App/>, document.getElementById("root"))
```

如果方法只绑定，不传参可以使用 stage0 里双冒号语法
```
return <button onClick={::this.handleClick}>Test</button>
```

2. 构造器内声明

在组件的构造器内完成this绑定，好处在于只需要一次绑定，而不需要每次监听事件时都去执行绑定操作
```
constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
}
    handleClick(e, arg) {
        console.log(e, arg)
    }
return <button onClick={this.handleClick}>Test</button>
```

3. 箭头函数
因为其自动绑定定义此函数作用域的this
```
const handleClick = (e) => {
        console.log(e)
    }
    render() {
        return <button onClick={this.handleClick}>Test</button>
    }
```
或者
```
handleClick(e) {
    console.log(e)
}
render() {
        return <button onClick={() => this.handleClick())}>Test</button>
    }
```


MIXIN

作用
1. 工具方法： 共享一些工具类方法，可以定义它们，然后在各个组件中使用
2. 生命周期继承：合并props和 state 。
