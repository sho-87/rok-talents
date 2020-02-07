import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import Form from 'react-bootstrap/Form';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HelpTooltip } from './Tooltips';

import './styles/NavBarSettings.css';

/**
 * Nav bar component containing drop down menu item for settings
 *
 * @class NavBarSettings
 * @extends {Component}
 */
class NavBarSettings extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.isShownInfoPanel !== nextProps.isShownInfoPanel ||
      this.props.isShownValues !== nextProps.isShownValues ||
      this.props.isShownTotals !== nextProps.isShownTotals ||
      this.props.isSpeedMode !== nextProps.isSpeedMode ||
      this.props.isShownMouseXY !== nextProps.isShownMouseXY ||
      this.props.isShownTalentID !== nextProps.isShownTalentID ||
      this.props.nodeSize !== nextProps.nodeSize
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <Dropdown alignRight as={NavItem} id="select-settings">
        <Dropdown.Toggle as={NavLink} data-testid="select-settings">
          <FontAwesomeIcon icon={faCog} />
          <span className="nav-button-text">Settings</span>
        </Dropdown.Toggle>

        <Dropdown.Menu id="settings-menu" className="nav-menu">
          <Form>
            <Form.Group id="settings-group">
              <Dropdown.Header>Display</Dropdown.Header>
              <Form.Check
                type="switch"
                id="settings-info-panel"
                data-testid="settings-info-panel"
                label="Info panel"
                checked={this.props.isShownInfoPanel}
                onChange={e => this.props.toggleInfoPanel()}
              />
              <Form.Check
                type="switch"
                id="settings-values"
                data-testid="settings-values"
                label="Node values"
                checked={this.props.isShownValues}
                onChange={e => this.props.toggleValueDisplay()}
              />
              <Form.Check
                type="switch"
                id="settings-totals"
                data-testid="settings-totals"
                label="Total spent"
                checked={this.props.isShownTotals}
                onChange={e => this.props.toggleTotalDisplay()}
              />

              <Dropdown.Divider />

              <Dropdown.Header>Node Size</Dropdown.Header>
              <div className="d-flex flex-column">
                <ToggleButtonGroup
                  name="size"
                  size="sm"
                  value={this.props.nodeSize}
                  onChange={val => {
                    this.props.toggleNodeSize(val);
                  }}
                >
                  <ToggleButton
                    type="radio"
                    name="radio"
                    value="S"
                    variant="outline-primary"
                  >
                    S
                  </ToggleButton>
                  <ToggleButton
                    type="radio"
                    name="radio"
                    value="M"
                    variant="outline-primary"
                  >
                    M
                  </ToggleButton>
                  <ToggleButton
                    type="radio"
                    name="radio"
                    value="L"
                    variant="outline-primary"
                  >
                    L
                  </ToggleButton>
                </ToggleButtonGroup>

                <Dropdown.Divider />
                <Dropdown.Header>Expert</Dropdown.Header>
                <div className="help-wrapper">
                  <Form.Check
                    type="switch"
                    id="settings-speed-mode"
                    label="Speed mode"
                    checked={this.props.isSpeedMode}
                    onChange={e => this.props.toggleSpeedMode()}
                  />
                  <HelpTooltip
                    tooltip="No tooltips. Left/right click nodes directly to assign/remove
            points"
                  />
                </div>
              </div>

              {process.env.NODE_ENV === 'development' && (
                <React.Fragment>
                  <Dropdown.Divider />
                  <Dropdown.Header>Dev Mode</Dropdown.Header>
                  <Form.Check
                    type="switch"
                    id="settings-mouse"
                    data-testid="settings-mouse"
                    label="Show mouse XY"
                    checked={this.props.isShownMouseXY}
                    onChange={e => this.props.toggleMouseXY()}
                  />
                  <Form.Check
                    type="switch"
                    id="settings-talentID"
                    label="Show talent ID"
                    checked={this.props.isShownTalentID}
                    onChange={e => this.props.toggleTalentID()}
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
