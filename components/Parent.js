import React, { Component } from 'react';
import Child from './Child.js';

class Parent extends Component {

  render() {
    return (
      <div>
        <Child className={'foo'} onClick={()=>{console.log("foo")}}>
          asdfasdf
        </Child>
      </div>
    );
  }

}

export default Parent;
