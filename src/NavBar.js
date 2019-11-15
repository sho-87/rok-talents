import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledTooltip,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import html2canvas from 'html2canvas';

//TODO: add sidebar minimize button
//TODO: add undo/redo
//FIXME: screenshot does not support certain CSS props (e.g. blend mode, filter)
//FIXME: don't use unsupported props to style nodes. use small node images?
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.takeScreenshot = this.takeScreenshot.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
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

  render() {
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand>Rise of Kingdoms Talent Builder &#x1F6C8;</NavbarBrand>

        <NavbarToggler onClick={this.toggle} />

        <Collapse isOpen={this.state.isOpen} navbar>
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
                className="btn btn-sm btn-danger"
                disabled={this.props.commander ? false : true}
                onClick={this.props.resetTalents}
              >
                Reset Talents
              </button>
            </form>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Commander
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
