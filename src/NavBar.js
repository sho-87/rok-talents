import React, { Component } from 'react';
import ReactGA from 'react-ga';
import MediaQuery from 'react-responsive';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavBarButtons from './NavBarButtons';
import NavBarSettings from './NavBarSettings';
import NavBarCommander from './NavBarCommander';
import { AboutModal, ResetModal, ShareModal } from './Modals';
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
  /**
   * Control visibility of the "About" modal
   *
   * @memberof NavBar
   */
  showAbout = () => {
    this.aboutModalRef.toggle();
    ReactGA.event({
      category: 'App',
      action: 'View about modal'
    });
  };

  /**
   * Control visibility of the "Reset" modal
   *
   * @memberof NavBar
   */
  showReset = () => {
    this.resetModalRef.toggle();
  };

  /**
   * Control visibility of the "Share" modal
   *
   * @memberof NavBar
   */
  showShare = () => {
    this.shareModalRef.toggle();
    ReactGA.event({
      category: 'Share',
      action: 'View share modal'
    });
  };

  render() {
    return (
      <>
        <AboutModal
          ref={component => (this.aboutModalRef = component)}
          toggleTour={this.props.toggleTour}
          toggleAnnounce={this.props.toggleAnnounce}
        />
        <ResetModal
          ref={component => (this.resetModalRef = component)}
          resetTalents={this.props.resetTalents}
        />
        <ShareModal ref={component => (this.shareModalRef = component)} />

        <Navbar
          variant="light"
          className={this.props.isSpeedMode ? 'nav-speed' : 'navbar'}
        >
          <Navbar.Brand href="/">
            <img
              id="nav-app-icon"
              src={`${process.env.PUBLIC_URL}/icon.svg`}
              alt="RoK Talents Logo"
            ></img>
          </Navbar.Brand>

          <MediaQuery minDeviceWidth={450}>
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
              isScreenshotStats={this.props.isScreenshotStats}
              calcPointsSpent={this.props.calcPointsSpent}
              showReset={this.showReset}
              showShare={this.showShare}
              commander={this.props.commander}
              red={this.props.red}
              yellow={this.props.yellow}
              blue={this.props.blue}
            />

            <NavBarSettings
              toggleInfoPanel={this.props.toggleInfoPanel}
              toggleTotalDisplay={this.props.toggleTotalDisplay}
              toggleValueDisplay={this.props.toggleValueDisplay}
              toggleNodeSize={this.props.toggleNodeSize}
              toggleScreenshotStats={this.props.toggleScreenshotStats}
              toggleSpeedMode={this.props.toggleSpeedMode}
              toggleInstantZero={this.props.toggleInstantZero}
              toggleInstantMax={this.props.toggleInstantMax}
              toggleMouseXY={this.props.toggleMouseXY}
              toggleTalentID={this.props.toggleTalentID}
              isShownInfoPanel={this.props.isShownInfoPanel}
              isShownValues={this.props.isShownValues}
              isShownTotals={this.props.isShownTotals}
              isScreenshotStats={this.props.isScreenshotStats}
              isSpeedMode={this.props.isSpeedMode}
              isInstantZero={this.props.isInstantZero}
              isInstantMax={this.props.isInstantMax}
              isShownMouseXY={this.props.isShownMouseXY}
              isShownTalentID={this.props.isShownTalentID}
              nodeSize={this.props.nodeSize}
            />

            <NavBarCommander
              changeCommander={this.props.changeCommander}
              commander={this.props.commander}
            />
          </Nav>
        </Navbar>
      </>
    );
  }
}

export default NavBar;
