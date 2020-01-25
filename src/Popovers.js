import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import FitText from '@kennethormandy/react-fittext';
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

  createPopover(orientation) {
    let compressor;

    if (orientation === 'portrait') {
      compressor = { large: 2.1, small: 0.8 };
    } else if (orientation === 'landscape') {
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
                <MediaQuery orientation="landscape">
                  <span className="node-tooltip-title-value">
                    {this.props.value + '/' + this.props.max}
                  </span>
                </MediaQuery>
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
                <MediaQuery orientation="portrait">
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
                </MediaQuery>

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

  render() {
    return (
      <>
        <MediaQuery orientation="landscape">
          {this.createPopover('landscape')}
        </MediaQuery>
        <MediaQuery orientation="portrait">
          {this.createPopover('portrait')}
        </MediaQuery>
      </>
    );
  }
}

export default { TalentTooltip };
