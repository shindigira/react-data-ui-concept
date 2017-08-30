import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as todoActions from '../actions/TodoActions.js';
import * as userActions from '../actions/UserActions.js';

import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import UserInfo from './UserInfo.js';

import Parent from './Parent.js';

export class App extends React.Component {
    render() {
        // console.log("this.props: ", this.props);
        return (<div>

            <h1>Todo List</h1>
            <Parent />
            <UserInfo userActions={this.props.userActions} user={this.props.userState.user} />
            <TodoInput todoActions={this.props.todoActions} />
            <TodoList todoActions={this.props.todoActions} todos={this.props.todoState.todos} />

        </div>);
    }
}

const mapStateToProps = (state) => {
    // this function can used to get *part of the state* from the store
    // i.e. state.todos
    // const { todos, user } = state;
    // return { todos, user };
    // to get the ENTIRE state from store
    // return state;

    const { todoState, userState } = state;
    return { todoState, userState };

    // App now has the available state as: this.props

}

const mapDispatchToProps = (dispatch) => {
    return {
        todoActions: bindActionCreators(todoActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch)
    };
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppContainer;
