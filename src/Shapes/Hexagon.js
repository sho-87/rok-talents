import React, { Component } from 'react';

//FIXME: tree labels in hexagon need to be tied to a div so theyre always centered

/**
 * Component containing the central commander image and skill label hexagon
 *
 * @class Hexagon
 * @extends {Component}
 */
class Hexagon extends Component {
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
              onClick={() => {
                this.props.toggleSelect();
              }}
            ></img>
          </div>
        </div>
      );
    } else {
      return false;
    }
  }
}

export default Hexagon;
