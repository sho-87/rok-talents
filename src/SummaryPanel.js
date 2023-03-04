import React from 'react';
import ReactGA from 'react-ga4';
import { GeneralTooltip } from './Tooltips';
import Commanders from './data/commanders.json';
import './styles/SummaryPanel.css';

/**
 * Summary panel component displaying commander info
 *
 */
const SummaryPanel = props => {
  const getGuides = () => {
    if (Commanders[props.commander].guides) {
      let guides = [];

      for (let guide in Commanders[props.commander].guides) {
        guides.push(
          <GuideIcon key={guide} commander={props.commander} name={guide} />
        );
      }
      return <div id="summary-panel-guides">Guide: {guides}</div>;
    }
  };

  return (
    <div id="summary-panel" className="info-box">
      <h1>{props.commander ? props.commander : 'Summary'}</h1>
      <h3>{props.commander && Commanders[props.commander].title}</h3>
      <h3>{props.commander && getGuides()}</h3>

      <div id="summary-panel-summary">
        <p>Points remaining: {props.calcPointsRemaining()}</p>
        <p>Points spent: {props.calcPointsSpent()}</p>
      </div>
    </div>
  );
};

/**
 * Icon for commander guides
 *
 * @returns {DOMElement} Icon linking to the external commander guide
 */
const GuideIcon = React.memo(props => {
  const clickGuide = () => {
    ReactGA.event({
      category: 'Navigation',
      action: `View guide (${props.name})`,
      label: props.commander
    });
  };

  return (
    <GeneralTooltip tooltip={props.name}>
      <a
        href={Commanders[props.commander].guides[props.name]}
        target="_blank"
        rel="noopener noreferrer"
        onClick={clickGuide}
      >
        <img
          className="summary-panel-guide-icon"
          src={`${process.env.PUBLIC_URL}/images/guides/${props.name}.png`}
          alt={props.name}
        ></img>
      </a>
    </GeneralTooltip>
  );
});

export default SummaryPanel;
