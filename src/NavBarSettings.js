import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//FIXME: use shouldComponentUpdate

/**
 * Nav bar component containing drop down menu item for settings
 *
 * @class NavBarSettings
 * @extends {Component}
 */
class NavBarSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsOpen: false
    };

    // Context bindings
    this.toggleSettings = this.toggleSettings.bind(this);
  }

  /**
   * Toggle open state of the settings select dropdown
   *
   * @memberof NavBarSettings
   */
  toggleSettings() {
    this.setState(prevState => ({
      settingsOpen: !prevState.settingsOpen
    }));
  }

  render() {
    return (
      <Dropdown
        nav
        inNavbar
        id="select-settings"
        isOpen={this.state.settingsOpen}
        toggle={this.toggleSettings}
      >
        <Dropdown.Toggle nav caret>
          <FontAwesomeIcon icon={faCog} /> Settings
        </Dropdown.Toggle>

        <Dropdown.Menu right>
          <Form>
            <Form.Group id="settings-group">
              <Form.Check
                type="switch"
                id="settings-side-panel"
                label="Show side panel"
                defaultChecked={true}
                onChange={e => this.props.toggleSidePanel()}
              />
              <Form.Check
                type="switch"
                id="settings-values"
                label="Show values"
                defaultChecked={true}
                onChange={e => this.props.toggleValueDisplay()}
              />
              <Form.Check
                type="switch"
                id="settings-totals"
                label="Show totals"
                defaultChecked={true}
                onChange={e => this.props.toggleTotalDisplay()}
              />

              {process.env.NODE_ENV === 'development' && (
                <React.Fragment>
                  <Dropdown.Item divider />
                  <Dropdown.Item header>Dev Mode</Dropdown.Item>
                  <Form.Check
                    type="switch"
                    id="settings-mouse"
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
