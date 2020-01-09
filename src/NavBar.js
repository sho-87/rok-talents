import React, { Component } from 'react';
import NavBarSettings from './NavBarSettings';
import { AboutModal, ShareModal } from './Modals';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup,
  CustomInput
} from 'reactstrap';
import {
  faHome,
  faInfoCircle,
  faTrashAlt,
  faShareAlt,
  faCog,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { title } from '../package.json';
import Commanders from './data/Commanders.json';

//TODO: remove button text? add tooltips instead? or use mediaquery?
//TODO: disable nav bar collapse/expand?
//FIXME: use shouldComponentUpdate

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
      aboutModalFlag: false,
      shareModalFlag: false,
      navOpen: false,
      settingsOpen: false,
      selectOpen: this.props.commander ? false : true
    };

    // Context bindings
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
    this.showAbout = this.showAbout.bind(this);
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
    this.setState(prevState => ({
      selectOpen: !prevState.selectOpen
    }));
  }

  /**
   * Control visibility of the "About" modal
   *
   * @memberof NavBar
   */
  showAbout(state) {
    this.setState({
      aboutModalFlag: state
    });
  }

  /**
   * Control visibility of the "Share" modal
   *
   * @memberof NavBar
   */
  showShare(state) {
    this.setState({
      shareModalFlag: state
    });
  }

  /**
   * Create a list of all available commanders (sorted)
   *
   * @returns {DropdownItem[]} Array of Dropdown items for all commanders
   * @memberof NavBar
   */
  createSelectItems() {
    const commanderList = Object.keys(Commanders).sort();
    let legendaryCommanders = [];
    let epicCommanders = [];

    commanderList.forEach(c => {
      let selectItem = (
        <DropdownItem
          data-testid="menu-item"
          key={c}
          onClick={() => {
            this.props.changeCommander(c);
          }}
        >
          <img
            className="select-commander-icon"
            alt={c}
            src={`images/commanders/${c}.png`}
          ></img>
          {Commanders[c]['shortName'] ? Commanders[c]['shortName'] : c}
        </DropdownItem>
      );

      if (Commanders[c].tier === 'Legendary') {
        legendaryCommanders.push(selectItem);
      } else if (Commanders[c].tier === 'Epic') {
        epicCommanders.push(selectItem);
      }
    });
    return [
      <DropdownItem header key="header-legendary">
        Legendary
      </DropdownItem>,
      ...legendaryCommanders,
      <DropdownItem divider key="div1" />,
      <DropdownItem header key="header-epic">
        Epic
      </DropdownItem>,
      ...epicCommanders
    ];
  }

  render() {
    return (
      <React.Fragment>
        {this.state.aboutModalFlag && <AboutModal showAbout={this.showAbout} />}
        {this.state.shareModalFlag && <ShareModal showShare={this.showShare} />}

        <Navbar color="light" light expand="lg">
          <NavbarBrand id="nav-icon" style={{ cursor: 'pointer' }} href="/">
            <FontAwesomeIcon icon={faHome} />
          </NavbarBrand>

          <NavbarBrand
            id="nav-icon"
            style={{ cursor: 'pointer' }}
            onClick={() => this.showAbout(true)}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
          </NavbarBrand>

          <NavbarBrand>{title}</NavbarBrand>

          <NavbarToggler onClick={this.toggleNav} />

          <Collapse isOpen={this.state.navOpen} navbar>
            <Nav className="ml-auto" navbar>
              <form className="form-inline">
                <button
                  id="button-reset"
                  data-testid="button-reset"
                  type="button"
                  className="btn btn-sm btn-danger"
                  disabled={
                    this.props.commander | this.props.calcPointsSpent()
                      ? false
                      : true
                  }
                  onClick={this.props.resetTalents}
                >
                  <FontAwesomeIcon icon={faTrashAlt} /> Reset
                </button>

                <button
                  id="button-share"
                  data-testid="button-share"
                  type="button"
                  disabled={
                    this.props.commander | this.props.calcPointsSpent()
                      ? false
                      : true
                  }
                  className="btn btn-sm btn-primary"
                  onClick={() => this.showShare(true)}
                >
                  <FontAwesomeIcon icon={faShareAlt} /> Share
                </button>
              </form>

              <NavBarSettings
                toggleSidePanel={this.props.toggleSidePanel}
                toggleTotalDisplay={this.props.toggleTotalDisplay}
                toggleValueDisplay={this.props.toggleValueDisplay}
                toggleMousePosition={this.props.toggleMousePosition}
              />

              <Dropdown
                nav
                inNavbar
                isOpen={this.state.selectOpen}
                toggle={this.toggleSelect}
              >
                <DropdownToggle data-testid="select-commander" nav caret>
                  {this.props.commander ? (
                    <img
                      className="select-commander-icon"
                      alt={this.props.commander}
                      src={`images/commanders/${this.props.commander}.png`}
                    ></img>
                  ) : (
                    <FontAwesomeIcon icon={faUser} />
                  )}
                  {this.props.commander
                    ? Commanders[this.props.commander]['shortName']
                      ? Commanders[this.props.commander]['shortName']
                      : this.props.commander
                    : ' Commander'}
                </DropdownToggle>

                <DropdownMenu id="select-commander-menu" right>
                  {this.createSelectItems()}
                </DropdownMenu>
              </Dropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default NavBar;
