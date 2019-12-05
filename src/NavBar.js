import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledTooltip,
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
  faCamera,
  faCopy,
  faTrashAlt,
  faCog,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import html2canvas from 'html2canvas';
import { AboutModal } from './Modals.js';

import Commanders from './data/Commanders.json';

//TODO: add undo/redo
//TODO: disable copy/reset buttons if no talents selected
//TODO: remove button text? add tooltips instead? or use mediaquery?
//TODO: disable nav bar collapse/expand?

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
      navOpen: false,
      settingsOpen: false,
      selectOpen: this.props.commander ? false : true
    };

    // Context bindings
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
    this.showAbout = this.showAbout.bind(this);
    this.takeScreenshot = this.takeScreenshot.bind(this);
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
   * Toggle open state of the settings select dropdown
   *
   * @memberof NavBar
   */
  toggleSettings() {
    this.setState(prevState => ({
      settingsOpen: !prevState.settingsOpen
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
   * Create a png screenshot of the main container. Offer to download/save the
   * generated screenshot.
   *
   * @memberof NavBar
   */
  takeScreenshot() {
    html2canvas(document.querySelector('#main-container')).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL();
      link.download = `${this.props.commander} talents.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
    let selectItems = [];

    commanderList.forEach(c => {
      selectItems.push(
        <DropdownItem
          key={c}
          onClick={() => {
            this.props.changeCommander(c);
          }}
        >
          {c}
        </DropdownItem>
      );
    });
    return selectItems;
  }

  render() {
    return (
      <React.Fragment>
        {this.state.aboutModalFlag && <AboutModal showAbout={this.showAbout} />}

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

          <NavbarBrand>Rise of Kingdoms Talent Builder</NavbarBrand>

          <NavbarToggler onClick={this.toggleNav} />

          <Collapse isOpen={this.state.navOpen} navbar>
            <Nav className="ml-auto" navbar>
              <form className="form-inline">
                <button
                  id="button-copy"
                  type="button"
                  disabled={this.props.commander ? false : true}
                  className="btn btn-sm btn-success"
                  onClick={this.props.copyURL}
                >
                  <FontAwesomeIcon icon={faCopy} /> Copy Talents
                </button>
                <button
                  id="button-reset"
                  type="button"
                  className="btn btn-sm btn-danger"
                  disabled={this.props.commander ? false : true}
                  onClick={this.props.resetTalents}
                >
                  <FontAwesomeIcon icon={faTrashAlt} /> Reset Talents
                </button>
                <button
                  id="button-screenshot"
                  type="button"
                  className="btn btn-sm btn-primary"
                  disabled={this.props.commander ? false : true}
                  onClick={this.takeScreenshot}
                >
                  <FontAwesomeIcon icon={faCamera} /> Screenshot
                </button>
              </form>

              <UncontrolledTooltip
                placement="bottom"
                target="button-screenshot"
                fade={false}
              >
                ! Experimental !
              </UncontrolledTooltip>

              <Dropdown
                nav
                inNavbar
                id="select-settings"
                isOpen={this.state.settingsOpen}
                toggle={this.toggleSettings}
              >
                <DropdownToggle nav caret>
                  <FontAwesomeIcon icon={faCog} /> Settings
                </DropdownToggle>

                <DropdownMenu right>
                  <Form>
                    <FormGroup id="settings-group">
                      <CustomInput
                        type="switch"
                        id="settings-side-panel"
                        label="Show side panel"
                        defaultChecked={true}
                        onChange={e => this.props.toggleSidePanel()}
                      />
                      <CustomInput
                        type="switch"
                        id="settings-values"
                        label="Show values"
                        defaultChecked={true}
                        onChange={e => this.props.toggleValueDisplay()}
                      />
                      <CustomInput
                        type="switch"
                        id="settings-totals"
                        label="Show totals"
                        defaultChecked={true}
                        onChange={e => this.props.toggleTotalDisplay()}
                      />
                    </FormGroup>
                  </Form>
                </DropdownMenu>
              </Dropdown>

              <Dropdown
                nav
                inNavbar
                id="select-commander"
                isOpen={this.state.selectOpen}
                toggle={this.toggleSelect}
              >
                <DropdownToggle nav caret>
                  <FontAwesomeIcon icon={faUser} />{' '}
                  {this.props.commander ? this.props.commander : 'Commander'}
                </DropdownToggle>

                <DropdownMenu right>{this.createSelectItems()}</DropdownMenu>
              </Dropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default NavBar;
