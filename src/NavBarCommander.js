import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';

import Commanders from './data/commanders.json';
import './styles/NavBarCommander.css';

/**
 * Nav bar component containing commander drop down
 *
 * @class NavBarCommander
 * @extends {Component}
 */
class NavBarCommander extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.commander !== nextProps.commander ||
      this.state.isOpen !== nextState.isOpen
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Toggle open state of the commander select dropdown
   *
   * @memberof NavBarCommander
   */
  toggleSelect = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  /**
   * Create a list of all available commanders (sorted)
   *
   * @returns {Dropdown.Item[]} Array of Dropdown items for all commanders
   * @memberof NavBarCommander
   */
  createSelectItems = () => {
    const commanderList = Object.keys(Commanders).sort();
    let legendaryCommanders = [];
    let epicCommanders = [];

    commanderList.forEach(c => {
      let selectItem = (
        <Dropdown.Item
          data-testid="menu-item"
          key={c}
          onClick={() => {
            this.props.changeCommander(c);
          }}
        >
          <img
            className="select-commander-icon"
            alt={c}
            src={`${process.env.PUBLIC_URL}/images/commanders/${c}.png`}
          ></img>
          {Commanders[c]['shortName'] ? Commanders[c]['shortName'] : c}
        </Dropdown.Item>
      );

      if (Commanders[c].tier === 'Legendary') {
        legendaryCommanders.push(selectItem);
      } else if (Commanders[c].tier === 'Epic') {
        epicCommanders.push(selectItem);
      }
    });
    return [
      <Dropdown.Header key="header-legendary">Legendary</Dropdown.Header>,
      ...legendaryCommanders,
      <Dropdown.Divider key="div1" />,
      <Dropdown.Header key="header-epic">Epic</Dropdown.Header>,
      ...epicCommanders
    ];
  };

  render() {
    return (
      <Dropdown
        id="select-commander"
        alignRight
        as={NavItem}
        show={this.state.isOpen}
        onToggle={this.toggleSelect}
      >
        <Dropdown.Toggle as={NavLink} data-testid="select-commander">
          {this.props.commander ? (
            <img
              data-testid="select-commander-icon"
              className="select-commander-icon select-commander-icon-header"
              alt={this.props.commander}
              src={`${process.env.PUBLIC_URL}/images/commanders/${this.props.commander}.png`}
            ></img>
          ) : (
            <img
              data-testid="select-commander-icon"
              className="select-commander-icon select-commander-icon-header"
              alt="Unknown commander"
              src={`${process.env.PUBLIC_URL}/images/commanders/unknown.png`}
            ></img>
          )}
          <span className="nav-button-text">
            {this.props.commander
              ? Commanders[this.props.commander]['shortName']
                ? Commanders[this.props.commander]['shortName']
                : this.props.commander
              : ' Commander'}
          </span>
        </Dropdown.Toggle>

        <Dropdown.Menu id="select-commander-menu" className="nav-menu">
          {this.createSelectItems()}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default NavBarCommander;
