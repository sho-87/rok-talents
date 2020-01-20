import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import Form from 'react-bootstrap/Form';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Nav bar component containing drop down menu item for settings
 *
 * @class NavBarSettings
 * @extends {Component}
 */
class NavBarSettings extends Component {
  render() {
    return (
      <Dropdown alignRight as={NavItem} id="select-settings">
        <Dropdown.Toggle as={NavLink} data-testid="select-settings">
          <FontAwesomeIcon icon={faCog} />
          <span className="nav-button-text">Settings</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Form>
            <Form.Group id="settings-group">
              <Form.Check
                type="switch"
                id="settings-side-panel"
                data-testid="settings-side-panel"
                label="Show side panel"
                defaultChecked={this.props.isMobile ? false : true}
                onChange={e => this.props.toggleSidePanel()}
              />
              <Form.Check
                type="switch"
                id="settings-values"
                data-testid="settings-values"
                label="Show points"
                defaultChecked={this.props.isMobile ? false : true}
                onChange={e => this.props.toggleValueDisplay()}
              />
              <Form.Check
                type="switch"
                id="settings-totals"
                data-testid="settings-totals"
                label="Show totals"
                defaultChecked={this.props.isMobile ? false : true}
                onChange={e => this.props.toggleTotalDisplay()}
              />

              {process.env.NODE_ENV === 'development' && (
                <React.Fragment>
                  <Dropdown.Divider />
                  <Dropdown.Header>Dev Mode</Dropdown.Header>
                  <Form.Check
                    type="switch"
                    id="settings-mouse"
                    data-testid="settings-mouse"
                    label="Show mouse XY"
                    defaultChecked={false}
                    onChange={e => this.props.toggleMousePosition()}
                  />
                </React.Fragment>
              )}
            </Form.Group>
          </Form>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default NavBarSettings;
