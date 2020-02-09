import React, { Component } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles/Tooltips.css';

/**
 * Tooltip showing a hoverable 'help' tooltip
 *
 * @class HelpTooltip
 * @extends {Component}
 */
export class HelpTooltip extends Component {
  render() {
    return (
      <OverlayTrigger
        placement="top"
        flip={true}
        trigger={['hover', 'click']}
        overlay={<Tooltip className="help-text">{this.props.tooltip}</Tooltip>}
      >
        <FontAwesomeIcon icon={faQuestionCircle} className="help-icon" />
      </OverlayTrigger>
    );
  }
}

export default { HelpTooltip };
