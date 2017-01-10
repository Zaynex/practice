export const ADD_TODO= 'ADD_TODO'
export const COMPLETE_TODO = 'COMPLETE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export const VisibilityFilters = {
	SHOW_ALL: 'SHOW_ALL',
	SHOW_COMPLTED: 'SHOW_COMPLTED',
	SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export function addTodo(text) {
	return {type: ADD_TODO, text}
}

export function completedTodo(index) {
	return {type: COMPLETE_TODO, index}
}

export function SET_VISIBILITY_FILTER(filter){
	return {type: SET_VISIBILITY_FILTER,filter}
}