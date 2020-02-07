import React, { Component } from 'react';
import ReactGA from 'react-ga';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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

import { title, author, repository, bugs, version } from '../package.json';
import './styles/Modals.css';

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
          <span>
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              className="modal-icon"
            />
          </span>
          Invalid Talent Build
        </Modal.Header>
        <Modal.Body>
          <p>
            The talent build you're trying to view is invalid. Please make sure
            you've copied and pasted the link correctly.
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

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.modal !== nextState.modal) {
      return true;
    } else {
      return false;
    }
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
          <span>
            <FontAwesomeIcon icon={faInfoCircle} className="modal-icon" />
          </span>
          {title}
        </Modal.Header>

        <Modal.Body>
          <div>
            <img
              id="modal-app-icon"
              src={`${process.env.PUBLIC_URL}/logo192.jpg`}
              alt="RoK Talents Logo"
            ></img>
            Talent builder for Rise of Kingdoms. Best viewed on PC/laptop.
          </div>
          <br />
          <div>
            <span className="about-label">App version:</span>{' '}
            <a
              href={repository.releases}
              target="_blank"
              rel="noopener noreferrer"
            >
              {version}
            </a>
          </div>
          <div>
            <span className="about-label">Creator:</span>{' '}
            <a href={author.url} target="_blank" rel="noopener noreferrer">
              {author.name}
            </a>
          </div>
          <div>
            <span className="about-label">Code:</span>{' '}
            <a href={repository.url} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
          <div>
            <span className="about-label">Report a bug:</span>{' '}
            <a href={bugs.report} target="_blank" rel="noopener noreferrer">
              Report
            </a>
          </div>
          <div>
            <span className="about-label">Support development:</span>{' '}
            <a
              href="https://www.buymeacoffee.com/simonho"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                id="coffee"
                src="https://cdn.buymeacoffee.com/buttons/default-orange.png"
                alt="Buy Me A Coffee"
              ></img>
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

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.modal !== nextState.modal) {
      return true;
    } else {
      return false;
    }
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  copyURL() {
    const input = document.getElementById('url');
    input.readOnly = true;
    input.select();
    document.execCommand('copy');
    document.getElementById('copyButton').innerHTML = '\u2713';
    ReactGA.event({
      category: 'Share',
      action: 'Copy URL'
    });
  }

  render() {
    return (
      <Modal centered show={this.state.modal} onHide={this.toggle}>
        <Modal.Header closeButton>
          <span>
            <FontAwesomeIcon icon={faShareAlt} className="modal-icon" />
          </span>
          Share Talent Build
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

export default { InvalidBuildModal, AboutModal, ShareModal };
