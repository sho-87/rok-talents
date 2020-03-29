import React from 'react';
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

const NavBarSettings = props => {
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
              checked={props.isShownInfoPanel}
              onChange={e => props.toggleInfoPanel()}
            />
            <Form.Check
              type="switch"
              id="settings-values"
              data-testid="settings-values"
              label="Node values"
              checked={props.isShownValues}
              onChange={e => props.toggleValueDisplay()}
            />
            <Form.Check
              type="switch"
              id="settings-totals"
              data-testid="settings-totals"
              label="Total spent"
              checked={props.isShownTotals}
              onChange={e => props.toggleTotalDisplay()}
            />

            <Dropdown.Divider />

            <Dropdown.Header>Node Size</Dropdown.Header>
            <div className="d-flex flex-column">
              <ToggleButtonGroup
                name="size"
                size="sm"
                value={props.nodeSize}
                onChange={val => {
                  props.toggleNodeSize(val);
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
              <Dropdown.Header>Screenshot</Dropdown.Header>
              <Form.Check
                type="switch"
                id="settings-screenshot-stats"
                label="Include stats"
                checked={props.isScreenshotStats}
                onChange={e => props.toggleScreenshotStats()}
              />

              <Dropdown.Divider />
              <Dropdown.Header>Expert</Dropdown.Header>
              <div className="help-wrapper">
                <Form.Check
                  type="switch"
                  id="settings-speed-mode"
                  label="Speed mode"
                  checked={props.isSpeedMode}
                  onChange={e => props.toggleSpeedMode()}
                />
                <HelpTooltip
                  tooltip="No tooltips. Left/right click nodes directly to assign/remove
            points"
                />
              </div>
              <div className="help-wrapper">
                <Form.Check
                  type="switch"
                  id="settings-instant-zero"
                  label="Instant zero"
                  checked={props.isInstantZero}
                  onChange={e => props.toggleInstantZero()}
                />
                <HelpTooltip tooltip="Set talent to zero with a single click" />
              </div>
              <div className="help-wrapper">
                <Form.Check
                  type="switch"
                  id="settings-instant-max"
                  label="Instant max"
                  checked={props.isInstantMax}
                  onChange={e => props.toggleInstantMax()}
                />
                <HelpTooltip tooltip="Max talent with a single click" />
              </div>
              <div className="help-wrapper">
                <Form.Check
                  type="switch"
                  id="settings-auto-fill"
                  label="Auto fill"
                  checked={props.isAutoFill}
                  onChange={e => props.toggleAutoFill()}
                />
                <HelpTooltip tooltip="Automatically fill all prerequisite talents" />
              </div>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <>
                <Dropdown.Divider />
                <Dropdown.Header>Dev Mode</Dropdown.Header>
                <Form.Check
                  type="switch"
                  id="settings-mouse"
                  data-testid="settings-mouse"
                  label="Show mouse XY"
                  checked={props.isShownMouseXY}
                  onChange={e => props.toggleMouseXY()}
                />
                <Form.Check
                  type="switch"
                  id="settings-talentID"
                  label="Show talent ID"
                  checked={props.isShownTalentID}
                  onChange={e => props.toggleTalentID()}
                />
              </>
            )}
          </Form.Group>
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavBarSettings;
