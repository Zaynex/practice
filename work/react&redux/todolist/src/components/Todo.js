import React, {PropTypes} from 'react'
// import {Component } from 'react-dom'
Todo.propTypes = {
	onClick: PropTypes.func.isRequired,
	completed: PropTypes.bool.isRequired,
	text: PropTypes.string.isRequired
}

const Todo = ({onClick, completed, Text}) => (
	<li 
		onClick={onClick}
		style={{
			textDirection: completed? 'line-through' : 'none'
		}}
	>
	{Text}
	</li>
)

export default Todo

// 首先，通过容器组件传入了一些props给子组件。
//因为 Todo只是展示组件，所以写成function比较方便，当然，如果需要本地state以及生命周期方法，可以采用class的方法

class Todo extends Component{
	constructor(props) {
		super(props);
		this.state={

		}
	}
	render(){
		const {onClick, completed, Text} = this.props
		return (
			<li 
				onClick={onClick}
				style={{
					textDirection: completed? 'line-through' : 'none'
				}}
			>
			{Text}
			</li>
		)
	}
}
