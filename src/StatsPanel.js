import React from 'react';
import { HelpTooltip } from './Tooltips';

import './styles/StatsPanel.css';

/**
 * Stats panel component displaying stats about the current talent build
 */
const StatsPanel = React.memo(props => {
  /**
   * Get all calculated stats and their values
   *
   * @returns {DOMElement[]} Array of DOM elements containing stats and values
   */
  const getAllStats = () => {
    let allStats = [];
    const keys = Object.keys(props.stats);
    keys.sort();
    for (var i = 0; i < keys.length; i++) {
      allStats.push(
        <p key={keys[i]}>{`${keys[i]}: ${props.stats[keys[i]]}%`}</p>
      );
    }

    return allStats.length > 0 ? allStats : 'None';
  };

  return (
    <div id="stats-panel" className="info-box">
      <h2>
        Stats{' '}
        <HelpTooltip tooltip="Totals only include unconditional and direct stat boosts. For example, does not include stats from rallies/garrison/% chance etc." />
      </h2>
      <div id="stats-panel-stats">{getAllStats()}</div>
    </div>
  );
});

export default StatsPanel;
