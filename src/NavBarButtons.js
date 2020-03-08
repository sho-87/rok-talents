import React, { Component } from 'react';
import domtoimage from 'dom-to-image';
import {
  faTrashAlt,
  faShareAlt,
  faCamera
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createSummaryString } from './utils';

import './styles/NavBarButtons.css';

/**
 * Nav bar component containing main buttons
 *
 * @class NavBarButtons
 * @extends {Component}
 */
class NavBarButtons extends Component {
  takeScreenshot() {
    const node = document.getElementById('tree-panel');
    const watermark = document.getElementById('watermark');
    watermark.style.visibility = 'visible';

    domtoimage.toPng(node).then(dataUrl => {
      watermark.style.visibility = 'hidden';

      const img = document.createElement('a');
      img.href = dataUrl;
      img.download = `${createSummaryString(
        this.props.commander,
        this.props.red,
        this.props.yellow,
        this.props.blue,
        '-'
      )}.png`;

      document.body.appendChild(img);
      img.click();
      document.body.removeChild(img);
    });
  }

  render() {
    return (
      <form className="form-inline">
        <button
          id="button-reset"
          data-testid="button-reset"
          type="button"
          className="btn btn-sm btn-danger"
          disabled={
            this.props.commander | this.props.calcPointsSpent() ? false : true
          }
          onClick={() => this.props.showReset()}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
          <span className="nav-button-text">Reset</span>
        </button>

        <button
          id="button-screenshot"
          data-testid="button-screenshot"
          type="button"
          disabled={
            this.props.commander | this.props.calcPointsSpent() ? false : true
          }
          className="btn btn-sm btn-primary"
          onClick={() => this.takeScreenshot()}
        >
          <FontAwesomeIcon icon={faCamera} />
          <span className="nav-button-text">Screenshot</span>
        </button>

        <button
          id="button-share"
          data-testid="button-share"
          type="button"
          disabled={
            this.props.commander | this.props.calcPointsSpent() ? false : true
          }
          className="btn btn-sm btn-success"
          onClick={() => this.props.showShare()}
        >
          <FontAwesomeIcon icon={faShareAlt} />
          <span className="nav-button-text">Share</span>
        </button>
      </form>
    );
  }
}

export default NavBarButtons;
