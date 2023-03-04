import React, { useState } from 'react';
import ReactGA from 'react-ga4';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import domtoimage from 'dom-to-image';
import {
  faTrashAlt,
  faCamera,
  faShareAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createSummaryString } from './utils';

import './styles/NavBarButtons.css';

/**
 * Nav bar component containing main buttons
 *
 */
const NavBarButtons = (props) => {
  const [isDownloading, setIsDownloading] = useState(false);

  /**
   * Take a screenshot of the talent tree, add banner, and download
   *
   * @param {boolean} [addBanner=true] Should a logo/banner be rendered?
   * @memberof NavBarButtons
   */
  const takeScreenshot = (elementID, addBanner = true) => {
    ReactGA.event({
      category: 'App',
      action: 'Screenshot',
      label: props.commander,
    });

    setIsDownloading(true);
    const dpr = window.devicePixelRatio || 1;
    const node = document.getElementById(elementID);

    if (addBanner) {
      document.getElementById('banner').style.visibility = 'visible';
    }

    domtoimage
      .toJpeg(node, {
        height: node.offsetHeight * dpr,
        width: node.offsetWidth * dpr,
        style: {
          transform: 'scale(' + dpr + ')',
          transformOrigin: 'top left',
          width: node.offsetWidth + 'px',
          height: node.offsetHeight + 'px',
        },
      })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `${createSummaryString(
          props.commander,
          props.red,
          props.yellow,
          props.blue,
          '-'
        )}.jpeg`;
        link.click();

        document.getElementById('banner').style.visibility = 'hidden';
        setIsDownloading(false);
      });
  };

  return (
    <form className="form-inline">
      <Button
        id="button-reset"
        data-testid="button-reset"
        variant="danger"
        size="sm"
        disabled={props.commander | props.calcPointsSpent() ? false : true}
        onClick={() => props.showReset()}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
        <span className="nav-button-text">Reset</span>
      </Button>

      <Button
        id="button-screenshot"
        data-testid="button-screenshot"
        variant="primary"
        size="sm"
        disabled={props.commander | props.calcPointsSpent() ? false : true}
        onClick={() => {
          const elementID = props.isScreenshotStats
            ? 'main-container'
            : 'tree-panel';
          takeScreenshot(elementID);
        }}
      >
        {isDownloading ? (
          <Spinner size="sm" animation="border" variant="light" />
        ) : (
          <FontAwesomeIcon icon={faCamera} />
        )}
        <span className="nav-button-text">Screenshot</span>
      </Button>

      <Button
        id="button-share"
        data-testid="button-share"
        variant="success"
        size="sm"
        disabled={props.commander | props.calcPointsSpent() ? false : true}
        onClick={() => props.showShare()}
      >
        <FontAwesomeIcon icon={faShareAlt} />
        <span className="nav-button-text">Share</span>
      </Button>
    </form>
  );
};

export default NavBarButtons;
