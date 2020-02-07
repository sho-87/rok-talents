import React, { Component } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles/Tooltips.css';

/**
 * Tooltip showing text with a hoverable 'help' tooltip
 *
 * @class HelpText
 * @extends {Component}
 */
export class HelpText extends Component {
  render() {
    return (
      <div>
        {this.props.text}
        <span> </span>
        <OverlayTrigger
          placement="top"
          flip={true}
          trigger={['hover', 'click']}
          overlay={<Tooltip>{this.props.tooltip}</Tooltip>}
        >
          <FontAwesomeIcon icon={faQuestionCircle} className="help-icon" />
        </OverlayTrigger>
      </div>
    );
  }
}

export default { HelpText };
