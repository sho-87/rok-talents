import React, { Component } from 'react';

//FIXME: tree labels in hexagon need to be tied to a div so theyre always centered. use image for hex?

/**
 * Component containing the central commander image and skill label hexagon
 *
 * @class Hexagon
 * @extends {Component}
 */
class Hexagon extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.commander !== nextProps.commander) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    if (this.props.commander) {
      return (
        <div id="tree-center">
          <img
            id="hexagon-talent"
            src={`images/ui/hexagon.png`}
            alt={'Commander Hexagon'}
          ></img>

          <img
            data-testid="hexagon-commander-icon"
            id="hexagon-commander-image"
            src={`images/commanders/${this.props.commander}.png`}
            alt={this.props.commander}
            onClick={() => {
              this.props.toggleSelect();
            }}
          ></img>

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
        </div>
      );
    } else {
      return false;
    }
  }
}

export default Hexagon;
