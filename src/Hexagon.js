import React from 'react';
import FitText from '@kennethormandy/react-fittext';
import { getTreeName } from './utils';
import './styles/Hexagon.css';

function Hexagon(props) {
  if (props.commander) {
    return (
      <div id="tree-center">
        <div id="hexagon-bg">
          <img
            src={`${process.env.PUBLIC_URL}/images/ui/hexagon.png`}
            alt={'Commander Hexagon'}
          ></img>
        </div>

        <img
          data-testid="hexagon-commander"
          id="hexagon-commander"
          src={`${process.env.PUBLIC_URL}/images/commanders/${props.commander}.png`}
          alt={props.commander}
        ></img>

        <div id="hexagon-label-container">
          <div className="hexagon-label hexagon-label-red">
            <FitText compressor={0.7}>
              <div>
                {props.isShownTotals && (
                  <div
                    className="tree-total"
                    data-testid="tree-total"
                  >{`(${props.calcPointsSpent('red')})`}</div>
                )}
                {getTreeName('red', props.commander)}
              </div>
            </FitText>
          </div>

          <div className="hexagon-label hexagon-label-yellow">
            <FitText compressor={0.7}>
              <div>
                {props.isShownTotals && (
                  <div
                    className="tree-total"
                    data-testid="tree-total"
                  >{`(${props.calcPointsSpent('yellow')})`}</div>
                )}
                {getTreeName('yellow', props.commander)}
              </div>
            </FitText>
          </div>

          <div className="hexagon-label hexagon-label-blue">
            <FitText compressor={0.7}>
              <div>
                {props.isShownTotals && (
                  <div
                    className="tree-total"
                    data-testid="tree-total"
                  >{`(${props.calcPointsSpent('blue')})`}</div>
                )}
                {getTreeName('blue', props.commander)}
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

export default Hexagon;
