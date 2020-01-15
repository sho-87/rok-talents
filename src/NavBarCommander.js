import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
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
   * @returns {Dropdown.Item[]} Array of Dropdown items for all commanders
   * @memberof NavBarCommander
   */
  createSelectItems() {
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
            src={`images/commanders/${c}.png`}
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
      <Dropdown.Item header key="header-legendary">
        Legendary
      </Dropdown.Item>,
      ...legendaryCommanders,
      <Dropdown.Item divider key="div1" />,
      <Dropdown.Item header key="header-epic">
        Epic
      </Dropdown.Item>,
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
        <Dropdown.Toggle data-testid="select-commander" nav caret>
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
        </Dropdown.Toggle>

        <Dropdown.Menu id="select-commander-menu" right>
          {this.createSelectItems()}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default NavBarCommander;
