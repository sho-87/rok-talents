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
  DropdownItem
} from 'reactstrap';
import html2canvas from 'html2canvas';
import { AboutModal, CopyToast } from './Modals.js';

import Commanders from './data/Commanders.json';

//TODO: add sidebar minimize button
//TODO: add undo/redo

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
      copyToastFlag: false,
      navOpen: false,
      selectOpen: this.props.commander ? false : true
    };

    // Context bindings
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
    this.showAbout = this.showAbout.bind(this);
    this.takeScreenshot = this.takeScreenshot.bind(this);
    this.copyURL = this.copyURL.bind(this);
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
   * Control visibility of a toast indicating that the talent build 
   * has been copied/saved. Toast is automatically hidden after a delay
   *
   * @memberof NavBar
   */
  showCopyToast() {
    this.setState({ copyToastFlag: true }, () => {
      window.setTimeout(() => {
        this.setState({ copyToastFlag: false });
      }, 2000);
    });
  }

  /**
   * Create a png screenshot of the tree panel. Offer to download/save the 
   * generated screenshot.
   *
   * @memberof NavBar
   */
  takeScreenshot() {
    html2canvas(document.querySelector('#tree-panel')).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL();
      link.download = `${this.props.commander} talents.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  /**
   * Copy the current application URL to clipboard
   *
   * @memberof NavBar
   */
  copyURL() {
    this.showCopyToast();

    const dummy = document.createElement('input');
    const url = window.location.href;

    document.body.appendChild(dummy);
    dummy.value = url;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  }

  /**
   * Create a list of all available commanders
   *
   * @returns {DropdownItem[]} Array of Dropdown items for all commanders
   * @memberof NavBar
   */
  createSelectItems() {
    let items = [];
    Object.keys(Commanders).forEach(c => {
      items.push(
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
    return items;
  }

  render() {
    return (
      <React.Fragment>
        {this.state.aboutModalFlag && <AboutModal showAbout={this.showAbout} />}

        <CopyToast isOpen={this.state.copyToastFlag} />

        <Navbar color="light" light expand="md">
          <NavbarBrand>
            Rise of Kingdoms Talent Builder{' '}
            <span
              id="about-icon"
              style={{ cursor: 'pointer' }}
              onClick={() => this.showAbout(true)}
            >
              &#x1F6C8;
            </span>
          </NavbarBrand>

          <NavbarToggler onClick={this.toggleNav} />

          <Collapse isOpen={this.state.navOpen} navbar>
            <Nav className="mr-auto" navbar>
              <form className="form-inline">
                <button
                  id="button-screenshot"
                  type="button"
                  className="btn btn-sm btn-primary"
                  disabled={this.props.commander ? false : true}
                  onClick={this.takeScreenshot}
                >
                  Screenshot
                </button>
              </form>
            </Nav>

            <UncontrolledTooltip
              placement="right"
              target="button-screenshot"
              fade={false}
            >
              ! Experimental !
            </UncontrolledTooltip>

            <Nav className="ml-auto" navbar>
              <form className="form-inline">
                <button
                  type="button"
                  disabled={this.props.commander ? false : true}
                  className="btn btn-sm btn-success"
                  onClick={this.copyURL}
                >
                  Copy Talents
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  disabled={this.props.commander ? false : true}
                  onClick={this.props.resetTalents}
                >
                  Reset Talents
                </button>
              </form>

              <Dropdown
                nav
                inNavbar
                id="select-commander"
                isOpen={this.state.selectOpen}
                toggle={this.toggleSelect}
              >
                <DropdownToggle nav caret>
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
