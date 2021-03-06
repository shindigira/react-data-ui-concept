import React, { Component } from 'react';

class UserInfo extends Component {
    handleNewId() {
        this.props.userActions.createNewUserId();
    }
    render() {
        return (
            <div>
                <div>Username: {this.props.user.username}</div>
                <div>Id: {this.props.user.id}</div>
                <button onClick={this.handleNewId.bind(this)}>Update with random ID</button>
            </div>
        );
    }

}

export default UserInfo;
