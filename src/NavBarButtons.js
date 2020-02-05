import React, { Component } from 'react';
import { faTrashAlt, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles/NavBarButtons.css';

/**
 * Nav bar component containing main buttons
 *
 * @class NavBarButtons
 * @extends {Component}
 */
class NavBarButtons extends Component {
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
          onClick={this.props.resetTalents}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
          <span className="nav-button-text">Reset</span>
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
