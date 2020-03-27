import React, { Component } from 'react';
import ReactGA from 'react-ga';
import Collapse from 'react-bootstrap/Collapse';
import { HelpTooltip } from './Tooltips';
import './styles/StatsTalentsPanel.css';

/**
 * Stats talents panel component containing selected main talents
 *
 * @class StatsTalentsPanel
 * @extends {Component}
 */
class StatsTalentsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShownStatsTalents: false
    };
  }

  /**
   * Toggles visibility of the main talents descriptions
   *
   * @memberof StatsTalentsPanel
   */
  toggleStatsTalents = () => {
    this.setState(prevState => ({
      isShownStatsTalents: !prevState.isShownStatsTalents
    }));

    ReactGA.event({
      category: 'App',
      action: 'Toggle stats talents'
    });
  };

  /**
   * Get all main talents and their values/text
   *
   * @returns {DOMElement[]} Array of DOM elements containing main talents and values
   * @memberof StatsTalentsPanel
   */
  getAllMainTalents = () => {
    let allMainTalents = [];

    for (let talent of this.props.mainTalents) {
      allMainTalents.push(
        <MainTalent
          isShownStatsTalents={this.state.isShownStatsTalents}
          key={talent.name}
          name={talent.name}
          color={talent.color}
          points={talent.points}
          maxPoints={talent.maxPoints}
          text={talent.text}
        />
      );
    }

    return allMainTalents.length > 0 ? allMainTalents : 'None';
  };

  render() {
    return (
      <div
        id="stats-talents"
        className="info-box"
        onClick={this.toggleStatsTalents}
      >
        <h2 id="stats-talents-title">
          Main Talents{' '}
          <HelpTooltip tooltip="Expandable list of all selected main talents" />
        </h2>
        <div data-testid="stats-talents">{this.getAllMainTalents()}</div>
      </div>
    );
  }
}

function MainTalent(props) {
  return (
    <div className={`stats-talents-main`}>
      <div className="stats-talents-title">
        <span className={`bullet bg-${props.color}`}></span>

        {`${props.name} (${props.points}/${props.maxPoints})`}
      </div>

      <Collapse in={props.isShownStatsTalents}>
        <div className="stats-talents-text">{props.text}</div>
      </Collapse>
    </div>
  );
}

export default StatsTalentsPanel;
