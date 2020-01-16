import React, { Component } from 'react';
import FitText from '@kennethormandy/react-fittext';
import { getTreeName } from './utils';

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
          <div id="hexagon-bg">
            <img src={`images/ui/hexagon.png`} alt={'Commander Hexagon'}></img>
          </div>

          <img
            data-testid="hexagon-commander"
            id="hexagon-commander"
            src={`images/commanders/${this.props.commander}.png`}
            alt={this.props.commander}
            onClick={() => {
              this.props.toggleSelect();
            }}
          ></img>

          <div id="hexagon-label-container">
            <div className="hexagon-label hexagon-label-red">
              <FitText compressor={0.7}>
                {getTreeName('red', this.props.commander)}
              </FitText>
            </div>
            <div className="hexagon-label hexagon-label-yellow">
              <FitText compressor={0.7}>
                {getTreeName('yellow', this.props.commander)}
              </FitText>
            </div>
            <div className="hexagon-label hexagon-label-blue">
              <FitText compressor={0.7}>
                {getTreeName('blue', this.props.commander)}
              </FitText>
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
