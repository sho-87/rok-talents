import React, { Component } from 'react';

export class HexagonCommander extends Component {
  render() {
    if (this.props.commander) {
      return (
        <div id="tree-center">
          <div className="hexagon-talent-wrapper">
            <div className="hexagon-talent-red"></div>
            <div className="hexagon-talent-yellow"></div>
            <div className="hexagon-talent-blue"></div>
          </div>

          <div className="hexagon-label-wrapper">
            <div className="hexagon-label hexagon-label-red">
              {this.props.getTreeName('red')}
            </div>
            <div className="hexagon-label hexagon-label-yellow">
              {this.props.getTreeName('yellow')}
            </div>
            <div className="hexagon-label hexagon-label-blue">
              {this.props.getTreeName('blue')}
            </div>
          </div>

          <div className="hexagon-commander-wrapper">
            <img
              src={`images/commanders/${this.props.commander}.png`}
              alt={this.props.commander}
            ></img>
          </div>
        </div>
      );
    } else {
      return false;
    }
  }
}

// https://reactjs.org/docs/composition-vs-inheritance.html#containment
export class Node extends Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.decrease = this.decrease.bind(this);
  }

  getStyle(element) {
    let style = {};

    switch (element) {
      case 'node':
        style.top = this.props.top;
        style.left = this.props.left;

        if (this.props.type === 'node-small') {
          style.backgroundColor = this.props.backgroundColor;
        } else if (this.props.type === 'node-large') {
          style.backgroundImage = `url(images/talents/${this.props.image}.png)`;
          style.backgroundSize = 'contain';
          style.backgroundRepeat = 'no-repeat';
          style.backgroundPosition = 'center center';
        }
        break;
      case 'value':
        if (this.props.type === 'node-small') {
          style.transform = 'translateY(90%)';
        } else if (this.props.type === 'node-large') {
          style.transform = 'translateY(190%)';
        }
        break;
      default:
        break;
    }
    return style;
  }

  // TODO: pass down method from app.js
  decrease(e) {
    e.preventDefault();
    console.log('decrease');
  }

  render() {
    return (
      <div
        id={this.props.id}
        className={'node ' + this.props.type}
        style={this.getStyle('node')}
        onContextMenu={this.decrease}
      >
        <div className="node-tooltip">
          <span className="node-tooltip-title">{this.props.name}</span>
          <br />
          {this.props.tooltip}
        </div>

        <div className="node-value" style={this.getStyle('value')}>
          {this.props.value + '/' + this.props.max}
        </div>
      </div>
    );
  }
}

export default { HexagonCommander, Node };
