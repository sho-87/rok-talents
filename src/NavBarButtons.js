import React from 'react';
import ReactGA from 'react-ga';
import domtoimage from 'dom-to-image';
import watermark from 'watermarkjs';
import {
  faTrashAlt,
  faCamera,
  faShareAlt
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createSummaryString } from './utils';
import { homepage } from '../package.json';

import './styles/NavBarButtons.css';

/**
 * Nav bar component containing main buttons
 *
 */
function NavBarButtons(props) {
  /**
   * Take a screenshot of the talent tree, add watermark, and download
   *
   * @param {boolean} [addLogo=true] Should a logo be rendered?
   * @param {boolean} [addText=true] Should watermark text be rendered?
   * @memberof NavBarButtons
   */
  function takeScreenshot(addLogo = true, addText = false) {
    ReactGA.event({
      category: 'App',
      action: 'Screenshot',
      label: props.commander
    });

    const node = document.getElementById('tree-panel');
    const dpr = window.devicePixelRatio || 1;

    domtoimage
      .toPng(node, {
        height: node.offsetHeight * dpr,
        width: node.offsetWidth * dpr,
        style: {
          transform: 'scale(' + dpr + ')',
          transformOrigin: 'top left',
          width: node.offsetWidth + 'px',
          height: node.offsetHeight + 'px'
        }
      })
      .then(nodeDataUrl => {
        // add watermark
        watermark([nodeDataUrl, `${process.env.PUBLIC_URL}/banner.svg`])
          .dataUrl((treePanel, logo) => {
            const context = treePanel.getContext('2d', { alpha: false });
            context.scale(dpr, dpr);

            if (addLogo) {
              const logoAspectRatio = logo.width / logo.height;
              const logoResizedHeight = node.offsetHeight * 0.05;
              const logoResizedWidth = logoResizedHeight * logoAspectRatio;

              context.save();
              context.globalAlpha = 1;
              context.drawImage(
                logo,
                5,
                node.offsetHeight - logoResizedHeight - 5,
                logoResizedWidth,
                logoResizedHeight
              );
              context.restore();
            }
            if (addText) {
              context.save();
              context.globalAlpha = 0.15;

              // lower font size until the text fits the canvas
              const text = homepage.split('//')[1];
              let fontsize = 70;
              do {
                fontsize--;
                context.font = fontsize + 'px sans-serif';
              } while (
                context.measureText(text).width >
                document.getElementById('tree-square-content').offsetWidth * 0.3
              );

              context.fillStyle = '#ffffff';
              context.textAlign = 'center';
              context.textBaseline = 'middle';
              context.fillText(
                text,
                node.offsetWidth / 2,
                node.offsetHeight / 2
              );
              context.restore();
            }

            return treePanel;
          })
          .then(dataUrl => {
            // save
            const img = document.createElement('a');
            img.href = dataUrl;
            img.download = `${createSummaryString(
              props.commander,
              props.red,
              props.yellow,
              props.blue,
              '-'
            )}.png`;

            document.body.appendChild(img);
            img.click();
            document.body.removeChild(img);
          });
        watermark.destroy();
      });
  }

  return (
    <form className="form-inline">
      <button
        id="button-reset"
        data-testid="button-reset"
        type="button"
        className="btn btn-sm btn-danger"
        disabled={props.commander | props.calcPointsSpent() ? false : true}
        onClick={() => props.showReset()}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
        <span className="nav-button-text">Reset</span>
      </button>

      <button
        id="button-screenshot"
        data-testid="button-screenshot"
        type="button"
        disabled={props.commander | props.calcPointsSpent() ? false : true}
        className="btn btn-sm btn-primary"
        onClick={() => takeScreenshot()}
      >
        <FontAwesomeIcon icon={faCamera} />
        <span className="nav-button-text">Screenshot</span>
      </button>

      <button
        id="button-share"
        data-testid="button-share"
        type="button"
        disabled={props.commander | props.calcPointsSpent() ? false : true}
        className="btn btn-sm btn-success"
        onClick={() => props.showShare()}
      >
        <FontAwesomeIcon icon={faShareAlt} />
        <span className="nav-button-text">Share</span>
      </button>
    </form>
  );
}

export default NavBarButtons;
