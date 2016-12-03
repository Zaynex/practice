Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。

import {createStore} from 'redux'
const store = createStore(fn);
//接受另外一个函数作为参数，生成新的store对象


Store对象包含所有数据。如果想得到某个时点的数据，就要对 Store 生成快照。
这种时点的数据集合，就叫做 State。

const state = store.getState();

Redux 规定， 一个 State 对应一个 View。

Action 描述当前发生的事情。改变 State 的唯一办法，就是使用 Action。它会运送数据到 Store。
const action = {
	type: 'ADD_TODO',
	payload: 'Learn Redux'
}

Action Creator


const ADD_TODO = '添加 TODO';

function addTodo(text){
	return {
		type: ADD_TODO,
		text
	}
}

// addTodo函数就是一个 Action Creator。
const action = addTodo('Learn Redux');


// store.dispatch()是 View 发出 Action 的唯一方法。
import { createStore } from 'redux';
const store = createStore(fn);
store.dispath({
	type: 'ADD_TODO',
	payload: 'Learn Redux'
});
// 上面代码中，store.dispatch接受一个 Action 对象作为参数，将它发送出去。


store.dispath(addTodo('ean'))


function reducer(state, action){
	return Object.assign({}, state, {thingTochange});
}

function reducer(state, action){
	return [...state, newItem];
}


let unsubscribe = store.subscribe(() => {console.log(store.getState())});

unsubscribe();


var initState = {
	counter: 0,
	todos: []
}

function reducer(state, action){
	if(!state) state = initState;
	switch(action.type) {
		case 'ADD_TODO':
			var nextState = _.cloneDeep(state)
			nextState.todos.push(action.payload)
			return nextState

		deg
	}
}

const counter = (state = 0, action) => {
	switch(action.type){
		case "INCREMENT":
			return state + 1;
		case "DECREMENT":
			return state - 1;
		default: 
			return state; 
	}
}

const {createStore} = Redux;
const store = createStore(counter);


store.subscribe(() => {
	document.body.innerText = store.getState();
})

