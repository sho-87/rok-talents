import React, { Component } from 'react';
import FitText from '@kennethormandy/react-fittext';
import { isMobile } from 'react-device-detect';
import Popover from 'react-bootstrap/Popover';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Tooltip containing information about each talent node. Displayed when 
 user hovers over a talent
 *
 */
export class TalentTooltip extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { popoverOpen: false };

  //   // Context bindings
  //   this.togglePopover = this.togglePopover.bind(this);
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (
  //     this.state.popoverOpen !== nextState.popoverOpen ||
  //     this.props.value !== nextProps.value
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // togglePopover() {
  //   this.setState(prevState => ({
  //     popoverOpen: !prevState.popoverOpen
  //   }));
  // }

  render() {
    let compressor;

    if (isMobile) {
      compressor = { large: 2.1, small: 0.8 };
    } else {
      compressor = { large: 1.6, small: undefined };
    }

    return (
      <Popover
        placement={this.props.placement}
        style={this.props.style}
        outOfBoundaries={this.props.outOfBoundaries}
        arrowProps={this.props.arrowProps}
        className={this.props.className}
      >
        <FitText compressor={compressor.large}>
          <div>
            <Popover.Title>
              <div>
                <span className="node-tooltip-title">
                  {this.props.talentname}
                </span>
                {!isMobile && (
                  <span className="node-tooltip-title-value">
                    {this.props.value + '/' + this.props.max}
                  </span>
                )}
                <div style={{ clear: 'both' }}></div>
              </div>
            </Popover.Title>

            <Popover.Content className="node-tooltip-body">
              <div>
                {this.props.value !== this.props.max && (
                  <div>
                    <b>Next point:</b>
                  </div>
                )}

                {this.props.text}

                {isMobile && (
                  <Container id="node-tooltip-assign-container">
                    <Row>
                      <Col>
                        {this.props.value > 0 && (
                          <FontAwesomeIcon
                            className="node-tooltip-decrease-button"
                            icon={faMinusSquare}
                            size="2x"
                            onClick={this.props.talentdecrease}
                          />
                        )}
                      </Col>
                      <Col xs={5}>
                        <FitText compressor={compressor.small}>
                          <span className="node-tooltip-assign-value">
                            {this.props.value + '/' + this.props.max}
                          </span>
                        </FitText>
                      </Col>
                      <Col>
                        {this.props.calcPointsRemaining() > 0 &&
                          this.props.value !== this.props.max && (
                            <FontAwesomeIcon
                              className="node-tooltip-increase-button"
                              icon={faPlusSquare}
                              size="2x"
                              onClick={this.props.talentincrease}
                            />
                          )}
                      </Col>
                    </Row>
                  </Container>
                )}

                {process.env.NODE_ENV === 'development' && (
                  <div className="node-tooltip-id">
                    ID: {this.props.talentid}
                  </div>
                )}
              </div>
            </Popover.Content>
          </div>
        </FitText>
      </Popover>
    );
  }
}

export default { TalentTooltip };
