import React from 'react';
import ReactGA from 'react-ga';
import { GeneralTooltip } from './Tooltips';
import Commanders from './data/commanders.json';
import './styles/SummaryPanel.css';

/**
 * Summary panel component displaying commander info
 *
 */
function SummaryPanel(props) {
  function getHeader() {
    return (
      <>
        <span>{props.commander}</span>
        {Commanders[props.commander].guide && (
          <GuideIcon commander={props.commander} />
        )}
      </>
    );
  }

  return (
    <div id="summary-panel" className="info-box">
      <h1>{props.commander ? getHeader() : 'Summary'}</h1>
      <h3>{props.commander && Commanders[props.commander].title}</h3>

      <div id="summary-panel-summary">
        <p>Points remaining: {props.calcPointsRemaining()}</p>
        <p>Points spent: {props.calcPointsSpent()}</p>
      </div>
    </div>
  );
}

/**
 * Icon for commander guides
 *
 * @returns {DOMElement} Icon linking to the external commander guide
 */
function GuideIcon(props) {
  function clickGuide() {
    ReactGA.event({
      category: 'Navigation',
      action: 'View guide',
      label: props.commander
    });
  }

  return (
    <GeneralTooltip tooltip="rok.guide">
      <a
        href={Commanders[props.commander].guide}
        target="_blank"
        rel="noopener noreferrer"
        onClick={clickGuide}
      >
        <img
          className="summary-panel-guide-icon"
          src={`${process.env.PUBLIC_URL}/images/guide-icon.png`}
          alt={`${props.commander} guide`}
        ></img>
      </a>
    </GeneralTooltip>
  );
}

export default SummaryPanel;
