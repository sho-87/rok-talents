import React, { Component } from 'react';
import { isMobile } from 'react-device-detect';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import Popover from 'react-bootstrap/Popover';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  faExclamationTriangle,
  faInfoCircle,
  faShareAlt,
  faLink,
  faCopy,
  faPlusSquare,
  faMinusSquare
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  TwitterShareButton,
  WhatsappShareButton,
  RedditShareButton,
  PocketShareButton,
  EmailShareButton,
  TwitterIcon,
  WhatsappIcon,
  RedditIcon,
  PocketIcon,
  EmailIcon
} from 'react-share';

import { title, author, version, dataVersion } from '../package.json';

/**
 * Modal displaying warning about an invalid build retrived from URL
 *
 * @class InvalidBuildModal
 * @extends {Component}
 */
export class InvalidBuildModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <Modal centered show={this.state.modal} onHide={this.toggle}>
        <Modal.Header closeButton>
          <FontAwesomeIcon icon={faExclamationTriangle} /> Invalid Talent Build
        </Modal.Header>
        <Modal.Body>
          <p>
            The talent build you're trying to view is invalid. Please make sure
            you've copied and pasted the correct link.
          </p>
          <p data-testid="invalid-modal-body">
            <b>Reason:</b> {this.props.message}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={this.toggle}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

/**
 * Modal displaying information about the application
 *
 * @class AboutModal
 * @extends {Component}
 */
export class AboutModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <Modal centered show={this.state.modal} onHide={this.toggle}>
        <Modal.Header closeButton>
          <FontAwesomeIcon icon={faInfoCircle} /> {title}
        </Modal.Header>

        <Modal.Body>
          <div>
            <span className="about-label">Application version:</span> {version}
          </div>
          <div>
            <span className="about-label">Game data version:</span>{' '}
            {dataVersion}
          </div>
          <div>
            <span className="about-label">Author:</span>{' '}
            <a
              href={`mailto: ${author.email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {author.name}
            </a>
          </div>
          <div>
            <span className="about-label">Website:</span>{' '}
            <a href={author.url} target="_blank" rel="noopener noreferrer">
              {author.url}
            </a>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button color="success" onClick={this.toggle}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

/**
 * Modal displaying sharing options for talent build
 *
 * @class ShareModal
 * @extends {Component}
 */
export class ShareModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  copyURL() {
    const input = document.getElementById('url');
    input.focus();
    input.select();
    document.execCommand('copy');
    document.getElementById('copyButton').innerHTML = '\u2713';
  }

  render() {
    return (
      <Modal centered show={this.state.modal} onHide={this.toggle}>
        <Modal.Header closeButton>
          <FontAwesomeIcon icon={faShareAlt} /> Share Talent Build
        </Modal.Header>

        <Modal.Body>
          <div className="share-modal-label">
            Copy talent build link to your clipboard:
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faLink} />
              </span>
            </div>
            <input
              id="url"
              type="text"
              className="form-control"
              defaultValue={window.location.href}
            ></input>
            <div className="input-group-append">
              <button
                id="copyButton"
                className="btn btn-success"
                type="button"
                onClick={this.copyURL}
              >
                <FontAwesomeIcon icon={faCopy} />
              </button>
            </div>
          </div>

          <hr />

          <div className="share-modal-label">Share to social media:</div>

          <div id="share-modal-social">
            <EmailShareButton url={window.location.href}>
              <EmailIcon size={32} round />
            </EmailShareButton>
            <RedditShareButton url={window.location.href}>
              <RedditIcon size={32} round />
            </RedditShareButton>
            <TwitterShareButton url={window.location.href}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <WhatsappShareButton url={window.location.href}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <PocketShareButton url={window.location.href}>
              <PocketIcon size={32} round />
            </PocketShareButton>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button color="primary" onClick={this.toggle}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

/**
 * Generic toast component
 *
 * @class ToastMessage
 * @extends {Component}
 */
export class ToastMessage extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };

    // Context bindings
    this.hide = this.hide.bind(this);
  }

  show() {
    this.setState({ open: true });
  }

  hide() {
    this.setState({ open: false });
  }

  render() {
    return (
      <Toast autohide delay={2000} show={this.state.open} onClose={this.hide}>
        <Toast.Header>
          <strong className="mr-auto">{this.props.header}</strong>
        </Toast.Header>
        <Toast.Body>{this.props.body}</Toast.Body>
      </Toast>
    );
  }
}

/**
 * Toast showing warning message about missing talents that need to be
 * completed prior to the select talent.
 *
 * @class PrereqToast
 * @extends {Component}
 */
export class PrereqToast extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };

    // Context bindings
    this.hide = this.hide.bind(this);
  }

  show() {
    this.setState({ open: true });
  }

  hide() {
    this.setState({ open: false });
  }

  render() {
    return (
      <Toast autohide delay={2000} show={this.state.open} onClose={this.hide}>
        <Toast.Header>
          <strong className="mr-auto">Incomplete Talents</strong>
        </Toast.Header>
        <Toast.Body>
          Upgrade talents to the maximum level first:
          {this.props.msg}
        </Toast.Body>
      </Toast>
    );
  }
}

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
    return (
      <Popover
        placement={this.props.placement}
        style={this.props.style}
        outOfBoundaries={this.props.outOfBoundaries}
        arrowProps={this.props.arrowProps}
        className={this.props.className}
      >
        <Popover.Title>
          <span className="node-tooltip-title">{this.props.talentname}</span>
          {!isMobile && (
            <span className="node-tooltip-title-value">
              {this.props.value + '/' + this.props.max}
            </span>
          )}
          <div style={{ clear: 'both' }}></div>
        </Popover.Title>
        <Popover.Content className="node-tooltip-body">
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
                  <span className="node-tooltip-assign-value">
                    {this.props.value + '/' + this.props.max}
                  </span>
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
            <div className="node-tooltip-id">ID: {this.props.talentid}</div>
          )}
        </Popover.Content>
      </Popover>
    );
  }
}

export default {
  InvalidBuildModal,
  AboutModal,
  ShareModal,
  ToastMessage,
  PrereqToast,
  TalentTooltip
};
