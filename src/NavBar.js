import React, { Component } from 'react';
import ReactGA from 'react-ga';
import MediaQuery from 'react-responsive';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavBarButtons from './NavBarButtons';
import NavBarSettings from './NavBarSettings';
import NavBarCommander from './NavBarCommander';
import { GeneralTooltip } from './Tooltips';
import { AboutModal, ResetModal, ShareModal } from './Modals';
import { faInfoCircle, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { title, donate } from '../package.json';
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
    let donateStyles = Array(10).fill('outline-danger');
    donateStyles.push('danger');
    this.donateStyle =
      donateStyles[Math.floor(Math.random() * donateStyles.length)];
  }

  /**
   * Handle donate button click
   *
   * @memberof NavBar
   */
  showDonate = () => {
    ReactGA.event({
      category: 'App',
      action: 'Donate',
    });
  };

  /**
   * Control visibility of the "About" modal
   *
   * @memberof NavBar
   */
  showAbout = () => {
    this.aboutModalRef.toggle();
    ReactGA.event({
      category: 'App',
      action: 'View about modal',
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
      action: 'View share modal',
    });
  };

  render() {
    return (
      <>
        <AboutModal
          ref={(component) => (this.aboutModalRef = component)}
          toggleTour={this.props.toggleTour}
          toggleAnnounce={this.props.toggleAnnounce}
        />
        <ResetModal
          ref={(component) => (this.resetModalRef = component)}
          resetTalents={this.props.resetTalents}
        />
        <ShareModal ref={(component) => (this.shareModalRef = component)} />

        <Navbar
          variant="light"
          className={this.props.isSpeedMode ? 'nav-speed' : 'navbar'}
        >
          <MediaQuery minWidth={350}>
            <Navbar.Brand href="/">
              <img
                id="nav-app-icon"
                src={`${process.env.PUBLIC_URL}/icon.svg`}
                alt="RoK Talents Logo"
              ></img>
            </Navbar.Brand>
          </MediaQuery>

          <MediaQuery minWidth={470}>
            <Navbar.Brand href="/">{title}</Navbar.Brand>
          </MediaQuery>

          <Navbar.Brand id="nav-icon" className="mr-auto">
            <Button
              id="button-info"
              data-testid="button-info"
              variant="outline-dark"
              size="sm"
              onClick={() => this.showAbout(true)}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
            </Button>

            <a href={donate} target="_blank" rel="noopener noreferrer">
              <GeneralTooltip
                tooltip={`Support ${title} with a small donation`}
              >
                <Button
                  id="button-donate"
                  data-testid="button-donate"
                  variant={this.donateStyle}
                  size="sm"
                  onClick={() => this.showDonate()}
                >
                  <FontAwesomeIcon icon={faHeart} />
                  <span className="nav-button-text">Donate</span>
                </Button>
              </GeneralTooltip>
            </a>
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
              toggleAutoFill={this.props.toggleAutoFill}
              toggleMouseXY={this.props.toggleMouseXY}
              toggleTalentID={this.props.toggleTalentID}
              isShownInfoPanel={this.props.isShownInfoPanel}
              isShownValues={this.props.isShownValues}
              isShownTotals={this.props.isShownTotals}
              isScreenshotStats={this.props.isScreenshotStats}
              isSpeedMode={this.props.isSpeedMode}
              isInstantZero={this.props.isInstantZero}
              isInstantMax={this.props.isInstantMax}
              isAutoFill={this.props.isAutoFill}
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
