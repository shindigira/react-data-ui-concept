import React from 'react';
import PropTypes from 'prop-types';
// import { completeTodo, deleteTodo } from '../actions/TodoActions.js';

class TodoItem extends React.Component {
    handleComplete() {
        this.props.todoActions.completeTodo(this.props.todo.id);
    }
    handleDelete() {
        this.props.todoActions.deleteTodo(this.props.todo.id);
    }
    render() {
        return (
            <li>
                <div>{this.props.todo.text}</div>
                <button onClick={this.handleComplete.bind(this)}>Mark as completed</button>
                <button onClick={this.handleDelete.bind(this)}>Delete todo</button>
            </li>
        );
    }
}

// const TodoItem = (props) => (
//     <li>
//         <div>{props.todo.text}</div>
//         <button onClick={this.handleComplete.bind(this)}>Mark as completed</button>
//         <button onClick={this.handleDelete.bind(this)}>Delete todo</button>
//     </li>
// );

// TodoItem.propTypes = {
//     : PropTypes.
// };

export default TodoItem;
