Object.assign 方法只会拷贝源对象自身的并且可枚举的属性到目标对象身上。
每个参数都必须为对象，第一个参数为目标对象，后面的参数为源对象。
存在同名属性时源对象会覆盖目标对象。

```js
class LeftPanel extends Component {
    constructor(props) {
        super(props)

        autoBind(this)
    }
```