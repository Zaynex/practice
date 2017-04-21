## 介绍redux
Redux是为了解决应用状态（State）管理而提出的一种解决方案。那么什么是状态呢？简单来说对于应用开发来讲，UI上显示的数据、控件状态、登陆状态等等全部可以看作状态。


## Redux核心理念
<img src="http://note.youdao.com/yws/api/personal/file/C6857B9A982B483EB0E75EA4ACDF37E0?method=download&shareKey=222e4fd7cd5ccdf5f313ca5d7086a83c" alt="">

### Store
可以把Store想象成一个数据库，Store是一个你应用内的数据（状态）中心。Store在Redux中有一个基本原则：它是一个唯一的、状态不可修改的树，状态的更新只能通过显性定义的Action发送后触发。
Store中一般负责：**保存应用状态、提供访问状态的方法、派发Action的方法以及对于状态订阅者的注册和取消等**。

### Reducer
Reducer是一个纯javascript函数，接收2个参数：第一个是处理之前的状态，第二个是一个可能携带数据的动作（Action）。就是类似下面给出的接口定义，这个是TypeScript的定义，由于JavaScript中没有强类型，所以用TypeScript来理解一下。
```
export interface Reducer<T> {
  (state: T, action: Action): T;
}
```

#### Reducer的使用
<img src="" width="800" height="500">
<img src="" width="800" height="500">

### Action
Store中存储了我们的应用状态，Reducer接收之前的状态并输出新状态，但是我们如何让Reducer和Store之间通信呢？这就是Action的职责所在。在Redux规范中，所有的会引发状态更新的交互行为都必须通过一个显性定义的Action来进行。

<img src="https://cdn-images-1.medium.com/max/800/1*CBfav7WP_SuV_UV87N1_Og.png" alt="">

### Redux三大原则
1. 整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。
2. 惟一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。
3. 为了描述 action 如何改变 state tree ，你需要编写 reducers。

## redux in angular

```
npm install @ngrx/core @ngrx/store --save
```
1. State is a single immutable data structure
2. Actions describe state changes
3. Pure functions called reducers take the previous state and the next action to compute the new state
4. State accessed with the Store, an observable of state and an observer of actions

**These core principles enable building components that can use the OnPush change detection strategy giving you intelligent, performant change detection throughout your application.**

### let's go
In your app's main module, import those reducers and use the `StoreModule.provideStore(reducers)` function to provide them to Angular's injector:
```
StoreModule.provideStore({
      todos: ToDosReducer,
      status: StatusReducer
    }),
```

**注意：在redux里通过createStore(reducer, state) 获得store的。**


## redux探索


## angular4
1. 模板引擎升级，代码量减少，更快
2. 支持ts2.2，提高了ngc的速度，并且有更好的类型检查机制。
3. 模板出现错误，报错能明确提示，模板的Source Maps当模板中的某些内容发生错误时，Angular会生成源映射，从而为原始模板提供有意义的上下文。
4. 动画模块提炼
5. 新的语法 *ngIf等
6. 服务端渲染