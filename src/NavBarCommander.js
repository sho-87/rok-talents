import React, { Component } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Commanders from './data/Commanders.json';

//FIXME: use shouldComponentUpdate

/**
 * Nav bar component containing commander drop down
 *
 * @class NavBarCommander
 * @extends {Component}
 */
class NavBarCommander extends Component {
  /**
   * Create a list of all available commanders (sorted)
   *
   * @returns {DropdownItem[]} Array of Dropdown items for all commanders
   * @memberof NavBarCommander
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
      <Dropdown
        nav
        inNavbar
        isOpen={this.props.selectOpen}
        toggle={this.props.toggleSelect}
      >
        <DropdownToggle data-testid="select-commander" nav caret>
          {this.props.commander ? (
            <img
              data-testid="select-commander-icon"
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
    );
  }
}

export default NavBarCommander;
