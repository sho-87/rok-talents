import React, { Component } from 'react';
import Popover from 'react-bootstrap/Popover';
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles/Popovers.css';

/**
 * Tooltip containing information about each talent node. Displayed when 
 user hovers over a talent
 *
 */
export class TalentTooltip extends Component {
  render() {
    return (
      <Popover
        placement={this.props.placement}
        style={this.props.style}
        outOfBoundaries={this.props.outOfBoundaries}
        arrowProps={this.props.arrowProps}
        className={this.props.className}
      >
        <Popover.Title>
          <div className="node-tooltip-title">{this.props.talentName}</div>
          {this.props.isShownTalentID && (
            <div className="node-tooltip-id">{this.props.talentID}</div>
          )}
          <div style={{ clear: 'both' }}></div>
        </Popover.Title>

        <Popover.Content className="node-tooltip-body">
          <div
            className={`node-tooltip-bg node-tooltip-bg${
              this.props.value === this.props.max ? '-max' : '-next'
            }`}
          >
            <div>
              <b>
                {this.props.value !== this.props.max ? 'Next level:' : 'Maxed:'}
              </b>
            </div>

            {this.props.text}
          </div>
          {!this.props.isEmbed && (
            <div id="node-tooltip-assign-container">
              <FontAwesomeIcon
                className="node-tooltip-decrease"
                icon={faMinusSquare}
                size="2x"
                onClick={this.props.decreaseTalent}
              />

              <span className="node-tooltip-value">
                {this.props.value + '/' + this.props.max}
              </span>

              <FontAwesomeIcon
                className="node-tooltip-increase"
                icon={faPlusSquare}
                size="2x"
                onClick={this.props.increaseTalent}
              />
            </div>
          )}
        </Popover.Content>
      </Popover>
    );
  }
}

export default { TalentTooltip };
