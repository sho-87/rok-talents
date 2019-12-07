import React, { Component } from 'react';

/**
 * Component for the lines connecting talent nodes
 *
 * @class Line
 * @extends {Component}
 */
class Line extends Component {
  render() {
    //https://github.com/ctrlplusb/react-sizeme
    // get x,y,w,h of node on resize, update state of treepanel with these values

    return (
      <line
        x1={this.props.sx}
        y1={this.props.sy}
        x2={this.props.tx}
        y2={this.props.ty}
        style={{ stroke: `rgb(255,0,0)`, strokeWidth: 2 }}
      />
    );
  }
}

export default Line;
