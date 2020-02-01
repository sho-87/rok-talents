import React, { Component } from 'react';
import FitText from '@kennethormandy/react-fittext';
import { getTreeName } from './utils';

import './styles/Hexagon.css';

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
                <div>
                  {this.props.isShownTotals && (
                    <div
                      className="tree-total"
                      data-testid="tree-total"
                    >{`(${this.props.calcPointsSpent('red')})`}</div>
                  )}
                  {getTreeName('red', this.props.commander)}
                </div>
              </FitText>
            </div>

            <div className="hexagon-label hexagon-label-yellow">
              <FitText compressor={0.7}>
                <div>
                  {this.props.isShownTotals && (
                    <div
                      className="tree-total"
                      data-testid="tree-total"
                    >{`(${this.props.calcPointsSpent('yellow')})`}</div>
                  )}
                  {getTreeName('yellow', this.props.commander)}
                </div>
              </FitText>
            </div>

            <div className="hexagon-label hexagon-label-blue">
              <FitText compressor={0.7}>
                <div>
                  {this.props.isShownTotals && (
                    <div
                      className="tree-total"
                      data-testid="tree-total"
                    >{`(${this.props.calcPointsSpent('blue')})`}</div>
                  )}
                  {getTreeName('blue', this.props.commander)}
                </div>
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
