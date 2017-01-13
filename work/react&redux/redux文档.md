## Action
Action 是把数据从应用传到store的有效载荷，也是sotre数据的唯一来源。
store.dispatch()将action传到 store。

Action必须携带一个type字符串，type就是触发的事件名称，会通过reducer来处理。

Action本质上只是普通的JS对象。
```
{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}
```
而Action创建函数就是生成action的方法。
在 Redux 中的 action 创建函数只是简单的返回一个 action:
```
function addTodo(text){
    return {
        type: ADD_TODO,
        text
    }
}
```

>在flux中调用action创建函数时通常会触发dispatch
>```
>function addTodoWithDispatch(text) {
>  const action = {
>    type: ADD_TODO,
>    text
>  }
> dispatch(action)
>}
>```

在Redux中，只需要把action创建函数传给dispatch()方法就可以发起一次dispatch。
```
dispatch(addTodo(text))
```
或者创建一个被绑定的 action 创建函数 来自动 dispatch：
```
const boundAddTodo = (text) => dispatch(addTodo(text))
```
然后调用它们：
```
boundAddTodo(text)
```

store 里能直接通过 store.dispatch() 调用 dispatch() 方法，但是多数情况下都使用 react-redux 提供的 connect() 帮助器来调用。

### connect的使用
首先，
`<Provider store>` 使组件层级中的 `connect()` 方法都能够获得 Redux store。正常情况下，你的根组件应该嵌套在 `<Provider>`中才能使用 `connect()`方法。

然后，
通过connect链接React组件和Redux Store。
```
connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
```

- mapStateToProps(state, [ownProps]): stateProps: 组件将会监听 Redux store 的变化。任何时候，只要 `Redux store` 发生改变， `mapStateToProps` 函数就会被调用。该回调函数必须返回一个纯对象，这个对象会与组件的 `props` 合并。省略了这个参数，你的组件将不会监听 Redux store。
- mapDispatchToProps(dispatch, [ownProps]): dispatchProps: 如果传递的是一个对象，每个定义在该对象的函数都将被当做action对象，并且这个对象会和Redux Store 绑定在一起，其中所定义的方法名将作为属性名，合并到组件的 props 中。
如果传递的是一个函数，该函数将接受dispatch函数，然后由你决定如何返回一个对象。这个对象通过 `dispatch` 函数与 `action creator` 以某种方式绑定在一起。如果你省略这个 mapDispatchToProps 参数，默认情况下，dispatch 会注入到你的组件 props 中。

`该回调函数中第二个参数 ownProps，该参数的值为传递到组件的 props，而且只要组件接收到新 props，mapDispatchToProps 也会被调用。（例如，当 props 接收到来自父组件一个小小的改动，那么你所使用的 ownProps 参数，mapStateToProps 都会被重新计算）`

根据配置信息，返回一个注入了 state 和 action creator 的 React 组件。（其实就是容器组件）

只注入 dispatch，不监听 store
```
export default connect()(TodoApp)
```

connect()让组件变成容器，后面传入的参数就是将要变成容器的组件。
其实container层主要就是做了state 以及 dispatch 方法的汇总，生成一个总的props，所以也会发现有些代码里没有container层。

### 参考代码
```
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = (state) => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

const mapDispatchToProps =  ({
  onTodoClick: toggleTodo
})

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
```

## Reducer
设计Reducer就是设计state的状态。
当数据比较复杂的时候可以将每个state规范化，最好能把state想象成数据库（json数据吧）

reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。
```
(previousState, action) => newState
```

不能在reducer里做如下操作；
- 修改传入参数
- 执行有副作用的操作，如 API 请求和路由跳转
- 调用非纯函数，如 Date.now() 或 Math.random()

只要传入参数相同，返回计算得到的下一个 `state`就一定相同。没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算。

### Object.assign()
```
Object.assign({}, state, {
        visibilityFilter: action.filter
      })
```
Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
```
Object.assign(target, source1, source2);
```
如果前面的参数中对象有同名属性，那么会以后面的对象属性为准。
```
var target = { a: 1 };

var source1 = { b: 2 };
var source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```
同名属性
```
var target = { a: 1 };

var source1 = { b: 2 };
var source2 = { b: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:3}
```

ES7中有对象展开符，语法如下
```
{ ...state, ...newState }
```
所以也可以修改成
```
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return { ...state, visibilityFilter: action.filter }
    default:
      return state
  }
}
```

开发时可以设定一个主reducer。其中主reducer并不需要设置完整的state。初始化时，如果传入的值为 undefined ,子 reducer 返回它们的默认值。
```
import { combineReducers } from 'redux';

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp;
```

等同于
```
export default function todoApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}
```


## Store
前面介绍使用 action 来描述“发生了什么”，和使用 reducers 来根据 action 更新 state 的用法。

Store 就是把它们联系到一起的对象。
- 维持应用的 state；
- 提供 getState() 方法获取 state；
- 提供 dispatch(action) 方法更新 state；
- 通过 subscribe(listener) 注册监听器;
- 通过 subscribe(listener) 返回的函数注销监听器。

前面利用combineReducer将reducer生成了一个，现在就要导入。
```
import { createStore } from 'redux'
import todoApp from './reducers'
let store = createStore(todoApp)
```
createStore() 的第二个参数是可选的, 用于设置 state 初始状态。这对开发同构应用时非常有用，服务器端 redux 应用的 state 结构可以与客户端保持一致, 那么客户端可以将从网络接收到的服务端 state 直接用于本地数据初始化。
```
let store = createStore(todoApp, window.STATE_FROM_SERVER)
```


### bindActionCreators(actionCreators, dispatch)
使用 `bindActionCreators` 的场景是当你需要把 `action creator` 往下传到一个组件上，却不想让这个组件觉察到 `Redux` 的存在，而且不希望把 Redux store 或 `dispatch` 传给它。

参数
1. actionCreators (Function or Object): 一个 action creator，或者键值是 action creators 的对象。
2. dispatch (Function): 一个 dispatch 函数，由 Store 实例提供。

返回值
一个与原对象类似的对象，只不过这个对象中的的每个函数值都可以直接 dispatch action。如果传入的是一个函数，返回的也是一个函数。

action.js
```
export function addTodo(text) {
  return {
    type: 'ADD_TODO',
    text
  };
}

export function removeTodo(id) {
  return {
    type: 'REMOVE_TODO',
    id
  };
}
```

SomeComponent.js
```js
import * as TodoActionCreators from './TodoActionCreators';
class TodoListContainer extends Component {
  componentDidMount() {
    let {dispatch} = this.props

    //如下是行不通的
    //TodoListContainer.addTodo('use Redux')
    // 因为只是创建了action方法而已，还没有触发所以还需要dispatch
  
    //如下是可行的
    let action = TodoAactionCreators.addTodo('use Redux')
    dispatch(action)
  }
  render() {
    let {todos, dispatch} = this.props

    let boundActionCreators = boundActionCreators(TodoActionCreators, dispatch)
    console.log(boundActionCreators)
    // {
    //   addTodo: Function,
    //   removeTodo: Function
    // }

    return (
      <TodoList todos={todos}
                {...boundActionCreators} //>
    )
  // 一种可以替换 bindActionCreators 的做法是直接把 dispatch 函数
    // 和 action creators 当作 props 
    // 传递给子组件
    // return <TodoList todos={todos} dispatch={dispatch} />;
  }
}
export default connect(
  state => ({ todos: state.todos })
)(TodoListContainer)
```

看完了文档的介绍发现其实就是把action函数做了层dispatch处理，这样传进去的action 就可以被调用了。