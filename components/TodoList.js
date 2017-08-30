import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem.js';

const listOfTodos = (props) => props.todos.map( (todo) => <TodoItem key={todo.id} todoActions={props.todoActions} todo={todo} /> );

const TodoList = (props) => (

    <ul>
        {
            listOfTodos(props)
        }
    </ul>
);

// TodoList.propTypes = {
//     : PropTypes.
// };

export default TodoList;
