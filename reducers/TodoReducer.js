import { ADD_TODO, COMPLETE_TODO, DELETE_TODO } from '../actions/TodoActions.js';

const initialState = {
	todos: [{
		id: 0,
		completed: false,
		text: "first todo"
	}]
};

const getId = (todos) => {
    if (todos.length === 0) return 0;

    return todos.reduce( (maxId, todo) => {
        return Math.max(maxId, todo.id) + 1;
    }, -1);
}

const completeTodo = (todos, id) => todos.map( (todo) => {
    return todo.id === id ? Object.assign({}, todo, {completed: !todo.completed}) : todo
    }
)
    // todo.id === id ? Object.assign({}, todo, {completed: !todo.completed}) : todo


const deleteTodo = (todos, id) => todos.filter( (todo) =>
    todo.id !== id
)

export default function todoReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO:
            // Object.assign with {} creates new reference value
            return Object.assign({}, state, {
                todos: [...state.todos,
                    {
                        text: action.text,
                        completed: false,
                        id: getId(state.todos)
                    }]
            });
        case COMPLETE_TODO:
            return Object.assign({}, state, {
                todos: completeTodo(state.todos, action.id)
            });
        case DELETE_TODO:
            return Object.assign({}, state, {
                todos: deleteTodo(state.todos, action.id)
            });
        default:
            return state;
    }
}
