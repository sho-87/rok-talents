import React, { Component, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import {
  faExclamationTriangle,
  faInfoCircle,
  faShareAlt,
  faCopy
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        centered
      >
        <ModalHeader toggle={this.toggle}>
          <FontAwesomeIcon icon={faShareAlt} /> Share Talent Build
        </ModalHeader>
        <ModalBody>
          Talent build link:
          <div className="input-group">
            <input
              id="url"
              type="text"
              className="form-control"
              defaultValue={window.location.href}
            ></input>
            <span className="input-group-btn">
              <button
                id="copyButton"
                className="btn btn-success"
                type="button"
                onClick={this.copyURL}
              >
                <FontAwesomeIcon icon={faCopy} />
              </button>
            </span>
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
export const TalentTooltip = props => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    <Popover
      container={props.container}
      trigger="hover"
      placement="right-start"
      isOpen={popoverOpen}
      target={props.target}
      toggle={toggle}
      hideArrow={false}
      delay={{ show: 0, hide: 0 }}
      fade={false}
      offset={'0, 2'}
    >
      <PopoverHeader>
        <span className="node-tooltip-title">{props.talentName}</span>
        <span className="node-tooltip-title-value">
          {props.value + '/' + props.max}
        </span>
        <div style={{ clear: 'both' }}></div>
      </PopoverHeader>
      <PopoverBody className="node-tooltip-body">
        {props.text}

        {process.env.NODE_ENV === 'development' && (
          <div className="node-tooltip-id">ID: {props.target}</div>
        )}
      </PopoverBody>
    </Popover>
  );
};

export default {
  InvalidBuildModal,
  AboutModal,
  ShareModal,
  ToastMessage,
  PrereqToast,
  TalentTooltip
};
