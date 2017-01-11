componentWillMount() 在 render()之前执行
componentDidMount() 在 render()之后执行
分别代表渲染前和渲染后。

在componentWillMount中执行setState方法和初始化时的state中的 this.state = {} 一样，所以没必要在那里componentWillMount

    但是在 componentDidMount 中执行setState方法会让组件再次更新。有时候我们计算组件的宽高位置时，就不得不先让组件渲染，通过更新信息后再次渲染。

componentWillUnmount 卸载组件状态。比如清除定时器和事件

如果组件更新了，那么会依次执行
shouldComponentUpdate, componentWillUpdate, render, componentDidUpdate.
无状态的组件是没有生命周期的，没有shouldComponentUpdate 方法。

如果是由父组件更新props更新的，那么在 shouldComponentUpdate之前会执行 componentWillReceiveProps，作为在props传入后，渲染前 setState的机会。
在此方法中调用setState是不会二次渲染的。

所以如果想要 setState 只允许出现在如下情况中：
1. componentWillMount()
2. componentDidMount()
3. componentWillReceiveProps()
4. componentDidUpdate() ---- 很少用到
