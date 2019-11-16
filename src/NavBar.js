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

import Commanders from './data/Commanders.json';

//TODO: add sidebar minimize button
//TODO: add undo/redo
//FIXME: screenshot does not support certain CSS props (e.g. blend mode, filter)
//FIXME: don't use unsupported props to style nodes. use small node images?
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navOpen: false,
      selectOpen: this.props.commander ? false : true
    };

    this.toggleNav = this.toggleNav.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
    this.takeScreenshot = this.takeScreenshot.bind(this);
    this.copyURL = this.copyURL.bind(this);
  }

  toggleNav() {
    this.setState(prevState => ({
      navOpen: !prevState.navOpen
    }));
  }

  toggleSelect() {
    this.setState(prevState => ({
      selectOpen: !prevState.selectOpen
    }));
  }

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

  copyURL() {
    this.props.showCopyToast();

    const dummy = document.createElement('input');
    const url = window.location.href;

    document.body.appendChild(dummy);
    dummy.value = url;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  }

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
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
          Rise of Kingdoms Talent Builder &#x1F6C8;
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
    );
  }
}

export default NavBar;
