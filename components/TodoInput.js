import React from 'react';
import TodoInput from './TodoInput.js'
// import { addTodo } from '../actions/TodoActions.js';

class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: ''
        };
    }
    // deleteLetter() {
    //     let text = this.state.inputText;
    //     let newText = text.slice(0, text.length-1);
    //     this.setState({
    //         inputText: newText
    //     });
    // }
    handleChange(e) {
        this.setState({
            inputText: e.target.value
        })
        // console.log("e", e.target.value);
    }
    handleSubmit(event) {
        event.preventDefault();
        // console.log("button clicked!");
        this.props.todoActions.addTodo(this.state.inputText);
        this.setState({
            inputText: ''
        })
    }
    render() {
        return (<div className="textdisplay">
            {/* <div>This is the TextInput Component</div> */}
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input
                    type="text"
                    placeholder="placeholder text"
                    value={this.state.inputText}
                    onChange={this.handleChange.bind(this)}
                />
                <input type="submit" text="Submit" />
            </form>
        </div>);
    }
}

export default TextInput
