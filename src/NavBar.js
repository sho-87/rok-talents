import React, { Component } from 'react';
import ReactGA from 'react-ga';
import MediaQuery from 'react-responsive';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavBarButtons from './NavBarButtons';
import NavBarSettings from './NavBarSettings';
import NavBarCommander from './NavBarCommander';
import { AboutModal, ShareModal } from './Modals';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { title } from '../package.json';
import './styles/NavBar.css';

/**
 * Nav bar component containing main application buttons/controls
 *
 * @class NavBar
 * @extends {Component}
 */
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navOpen: false
    };

    // Context bindings
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
    this.showShare = this.showShare.bind(this);
  }

  /**
   * Toggle visibility of the nav bar collapse/expand menu icon
   *
   * @memberof NavBar
   */
  toggleNav() {
    this.setState(prevState => ({
      navOpen: !prevState.navOpen
    }));
  }

  /**
   * Toggle open state of the commander select dropdown
   *
   * @memberof NavBar
   */
  toggleSelect() {
    this.navBarCommanderRef.toggleSelect();
  }

  /**
   * Control visibility of the "About" modal
   *
   * @memberof NavBar
   */
  showAbout() {
    this.aboutModalRef.toggle();
    ReactGA.event({
      category: 'App',
      action: 'View about modal'
    });
  }

  /**
   * Control visibility of the "Share" modal
   *
   * @memberof NavBar
   */
  showShare() {
    this.shareModalRef.toggle();
    ReactGA.event({
      category: 'App',
      action: 'View share modal'
    });
  }

  render() {
    return (
      <React.Fragment>
        <AboutModal
          ref={component => (this.aboutModalRef = component)}
          toggleTour={this.props.toggleTour}
        />
        <ShareModal ref={component => (this.shareModalRef = component)} />

        <Navbar
          variant="light"
          className={this.props.isSpeedMode ? 'nav-speed' : 'navbar'}
        >
          <Navbar.Brand href="/">
            <img
              id="nav-app-icon"
              src={`${process.env.PUBLIC_URL}/logo192.png`}
              alt="RoK Talents Logo"
            ></img>
          </Navbar.Brand>

          <MediaQuery minDeviceWidth={380}>
            <Navbar.Brand href="/">{title}</Navbar.Brand>
          </MediaQuery>

          <Navbar.Brand
            id="nav-icon"
            className="mr-auto"
            style={{ cursor: 'pointer' }}
            onClick={() => this.showAbout(true)}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
          </Navbar.Brand>

          <Nav className="ml-auto">
            <NavBarButtons
              calcPointsSpent={this.props.calcPointsSpent}
              resetTalents={this.props.resetTalents}
              showShare={this.showShare}
              commander={this.props.commander}
            />

            <NavBarSettings
              toggleInfoPanel={this.props.toggleInfoPanel}
              toggleTotalDisplay={this.props.toggleTotalDisplay}
              toggleValueDisplay={this.props.toggleValueDisplay}
              toggleNodeSize={this.props.toggleNodeSize}
              toggleSpeedMode={this.props.toggleSpeedMode}
              toggleMouseXY={this.props.toggleMouseXY}
              toggleTalentID={this.props.toggleTalentID}
              isShownInfoPanel={this.props.isShownInfoPanel}
              isShownValues={this.props.isShownValues}
              isShownTotals={this.props.isShownTotals}
              isSpeedMode={this.props.isSpeedMode}
              isShownMouseXY={this.props.isShownMouseXY}
              isShownTalentID={this.props.isShownTalentID}
              nodeSize={this.props.nodeSize}
            />

            <NavBarCommander
              ref={component => (this.navBarCommanderRef = component)}
              changeCommander={this.props.changeCommander}
              commander={this.props.commander}
            />
          </Nav>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default NavBar;
