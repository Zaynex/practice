const todos = (state = [], action) => {

}

const testAddTodo = () => {
	const stateBefore = [];
	const action = {
		type: 'ADD_TODO',
		id: 0,
		text； 'laern Redux'
	};

	const stateAfter = [
		{
			id: 0,
			text: 'learn Redux',
			completed: false
		}
	];

	deepFreeze(stateBefore);
	deepFreeze(action);

	
}