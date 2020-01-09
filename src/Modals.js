import React, { Component, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import {
  faExclamationTriangle,
  faInfoCircle,
  faShareAlt,
  faLink,
  faCopy
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
      <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}
        unmountOnClose={true}
        centered
      >
        <ModalHeader toggle={this.toggle}>
          <FontAwesomeIcon icon={faExclamationTriangle} /> Invalid Talent Build
        </ModalHeader>
        <ModalBody>
          <p>
            The talent build you're trying to view is invalid. Please make sure
            you've copied and pasted the correct link.
          </p>
          <p data-testid="invalid-modal-body">
            <b>Reason:</b> {this.props.message}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>
            Close
          </Button>
        </ModalFooter>
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
      modal: true
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(
      prevState => ({
        modal: !prevState.modal
      }),
      this.props.showAbout(false)
    );
  }

  render() {
    return (
      <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}
        unmountOnClose={true}
        centered
      >
        <ModalHeader toggle={this.toggle}>
          <FontAwesomeIcon icon={faInfoCircle} /> {title}
        </ModalHeader>
        <ModalBody>
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
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={this.toggle}>
            Close
          </Button>
        </ModalFooter>
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
      modal: true
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(
      prevState => ({
        modal: !prevState.modal
      }),
      this.props.showShare(false)
    );
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
      <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}
        unmountOnClose={true}
        size="md"
        centered
      >
        <ModalHeader toggle={this.toggle}>
          <FontAwesomeIcon icon={faShareAlt} /> Share Talent Build
        </ModalHeader>
        <ModalBody>
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
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>
            Close
          </Button>
        </ModalFooter>
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
  render() {
    return (
      <Toast isOpen={this.props.isOpen}>
        <ToastHeader icon={this.props.icon}>{this.props.header}</ToastHeader>
        <ToastBody>{this.props.body}</ToastBody>
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
  render() {
    return (
      <Toast isOpen={this.props.isOpen}>
        <ToastHeader icon="warning">Incomplete Talents</ToastHeader>
        <ToastBody>
          Please upgrade the following to the maximum skill level first:
          {this.props.msg}
        </ToastBody>
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
  constructor(props) {
    super(props);
    this.state = { popoverOpen: false };

    // Context bindings
    this.togglePopover = this.togglePopover.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.popoverOpen !== nextState.popoverOpen ||
      this.props.value !== nextProps.value
    ) {
      return true;
    } else {
      return false;
    }
  }

  togglePopover() {
    this.setState(prevState => ({
      popoverOpen: !prevState.popoverOpen
    }));
  }

  render() {
    return (
      <Popover
        trigger="hover"
        placement="right-start"
        isOpen={this.state.popoverOpen}
        target={this.props.target}
        toggle={this.togglePopover}
        hideArrow={false}
        delay={{ show: 0, hide: 0 }}
        fade={false}
        offset={'0, 2'}
      >
        <PopoverHeader>
          <span className="node-tooltip-title">{this.props.talentName}</span>
          <span className="node-tooltip-title-value">
            {this.props.value + '/' + this.props.max}
          </span>
          <div style={{ clear: 'both' }}></div>
        </PopoverHeader>
        <PopoverBody className="node-tooltip-body">
          {this.props.value !== this.props.max && (
            <div>
              <b>Next point:</b>
            </div>
          )}
          {this.props.text}
          {process.env.NODE_ENV === 'development' && (
            <div className="node-tooltip-id">ID: {this.props.target}</div>
          )}
        </PopoverBody>
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
