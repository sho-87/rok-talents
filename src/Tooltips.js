import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles/Tooltips.css';

/**
 * Tooltip showing a hoverable 'help' tooltip
 *
 * @returns {Tooltip} Tooltip
 */
export const HelpTooltip = props => {
  return (
    <OverlayTrigger
      placement="top"
      flip={true}
      trigger={['hover', 'click']}
      overlay={<Tooltip className="help-text">{props.tooltip}</Tooltip>}
    >
      <FontAwesomeIcon icon={faQuestionCircle} className="help-icon" />
    </OverlayTrigger>
  );
};

/**
 * General tooltip component
 *
 * @returns {Tooltip} Tooltip
 */
export const GeneralTooltip = props => {
  return (
    <OverlayTrigger
      placement="top"
      flip={true}
      trigger={['hover', 'click']}
      overlay={<Tooltip className="help-text">{props.tooltip}</Tooltip>}
    >
      {props.children}
    </OverlayTrigger>
  );
};

export default { HelpTooltip, GeneralTooltip };
