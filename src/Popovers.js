import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import FitText from '@kennethormandy/react-fittext';
import Popover from 'react-bootstrap/Popover';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { mobileBreakpoint } from './values';

import './styles/Popovers.css';

//TODO: add text color background

/**
 * Tooltip containing information about each talent node. Displayed when 
 user hovers over a talent
 *
 */
export class TalentTooltip extends Component {
  createPopover(orientation) {
    return (
      <Popover
        placement={this.props.placement}
        style={this.props.style}
        outOfBoundaries={this.props.outOfBoundaries}
        arrowProps={this.props.arrowProps}
        className={this.props.className}
      >
        <FitText compressor={2.1}>
          <div>
            <Popover.Title>
              <div className="node-tooltip-title">{this.props.talentName}</div>
              {this.props.isShownTalentID && (
                <div className="node-tooltip-id">{this.props.talentID}</div>
              )}
              <div style={{ clear: 'both' }}></div>
            </Popover.Title>

            <Popover.Content className="node-tooltip-body">
              <div>
                <div>
                  <b>
                    {this.props.value !== this.props.max ? 'Next level:' : 'Maxed:'}
                  </b>
                </div>

                {this.props.text}

                <Container id="node-tooltip-assign-container">
                  <Row>
                    <Col>
                      {this.props.value > 0 && (
                        <FontAwesomeIcon
                          className="node-tooltip-decrease-button"
                          icon={faMinusSquare}
                          size="2x"
                          onClick={this.props.talentDecrease}
                        />
                      )}
                    </Col>
                    <Col xs={5}>
                      <FitText compressor={0.4}>
                        <span>{this.props.value + '/' + this.props.max}</span>
                      </FitText>
                    </Col>
                    <Col>
                      {this.props.calcPointsRemaining() > 0 &&
                        this.props.value !== this.props.max && (
                          <FontAwesomeIcon
                            className="node-tooltip-increase-button"
                            icon={faPlusSquare}
                            size="2x"
                            onClick={this.props.talentIncrease}
                          />
                        )}
                    </Col>
                  </Row>
                </Container>
              </div>
            </Popover.Content>
          </div>
        </FitText>
      </Popover>
    );
  }

  render() {
    return (
      <>
        <MediaQuery minDeviceWidth={mobileBreakpoint}>
          {this.createPopover('desktop')}
        </MediaQuery>
        <MediaQuery maxDeviceWidth={mobileBreakpoint - 1}>
          {this.createPopover('mobile')}
        </MediaQuery>
      </>
    );
  }
}

export default { TalentTooltip };
