import React, { Component } from 'react';
import Trees from './data/modules.js';

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
  getStyle() {
    let style = {};

    style.top = this.props.top;
    style.left = this.props.left;

    if (this.props.type === 'node-large') {
      style.backgroundImage = `url(images/talents/${this.props.image}.png)`;
    }

    return style;
  }

  getTooltip() {
    let tooltip = this.props.tooltip;
    let talentValues = Trees[this.props.tree][this.props.num]['values'];

    if (this.props.value === this.props.max) {
      tooltip = tooltip.replace('$', talentValues[this.props.max - 1]);
    } else {
      tooltip = tooltip.replace('$', talentValues[this.props.value]);
    }

    return tooltip;
  }

  render() {
    return (
      <div
        id={this.props.id}
        className={'node ' + this.props.type}
        style={this.getStyle()}
        onClick={() =>
          this.props.talentIncrease(this.props.color, this.props.num)
        }
        onContextMenu={e =>
          this.props.talentDecrease(e, this.props.color, this.props.num)
        }
      >
        <div className="node-tooltip">
          <span className="node-tooltip-title">{this.props.name}</span>
          <br />
          {this.getTooltip()}
        </div>

        <div
          className={`node-value ${
            this.props.type === 'node-small'
              ? 'node-value-small'
              : 'node-value-large'
          }`}
        >
          {this.props.value + '/' + this.props.max}
        </div>
      </div>
    );
  }
}

export default { HexagonCommander, Node };
