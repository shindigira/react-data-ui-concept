import React, { Component } from 'react';

class Child extends Component {

  render() {

    console.log("props: ", this.props);

    return (
      <div {...this.props} className={'bar'}>{this.props.children} Child stuff </div>
    );
  }

}

export default Child;
