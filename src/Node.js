import React, { Component } from 'react';
import FitText from '@kennethormandy/react-fittext';
import { useMediaQuery } from 'react-responsive';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { jsPlumb } from 'jsplumb';
import { TalentTooltip } from './Popovers';
import { replaceTalentText, getMaxTalentCount } from './utils';
import { mobileBreakpoint } from './values';

import './styles/Node.css';

/**
 * Component for the individual talent nodes
 *
 * @class Node
 * @extends {Component}
 */
class Node extends Component {
  constructor(props) {
    super(props);

    // Context bindings
    this.talentIncrease = this.talentIncrease.bind(this);
    this.talentDecrease = this.talentDecrease.bind(this);
    this.setTooltip = this.setTooltip.bind(this);
    this.getStyle = this.getStyle.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.value !== nextProps.value ||
      this.props.nodeSize !== nextProps.nodeSize ||
      this.props.isShownValues !== nextProps.isShownValues ||
      this.props.isShownTalentID !== nextProps.isShownTalentID
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Determine styling of the node. Image depends on whether the node is
   * a large skill node or a small stat node
   *
   * @returns {object} Object containing the CSS styles
   * (e.g. positioning, background image) for the node
   * @memberof Node
   */
  getStyle() {
    let style = {};

    style.top = this.props.y;
    style.left = this.props.x;

    if (this.props.type === 'node-large') {
      style.backgroundImage = `url(images/talents/${this.props.image}.png)`;
    } else {
      style.backgroundImage = `url(images/talents/${this.props.color}GenericSmall.png)`;
    }

    return style;
  }

  /**
   * Set tooltip for the node. Tooltip text is dynamic as it depends on the
   * current level of the node
   *
   * @returns {string} Updated tooltip text reflecting the level of the node
   * @memberof Node
   */
  setTooltip() {
    let tooltip;
    let talentValues = this.props.treeData[this.props.treeName][this.props.idx][
      'values'
    ];

    if (this.props.value === this.props.max) {
      tooltip = replaceTalentText(
        this.props.tooltip,
        talentValues,
        this.props.max - 1
      );
    } else {
      tooltip = replaceTalentText(
        this.props.tooltip,
        talentValues,
        this.props.value
      );
    }

    return tooltip;
  }

  /**
   * Increase the value of the clicked node. Controls whether the node can
   * be increased (e.g. max level reached, max talent points spent), as well
   * as the display of associated toasts and missing prerequisite talents
   *
   * Additionally, `this.state` is updated to reflect current node value
   *
   * @memberof Node
   */
  talentIncrease() {
    if (this.props.calcPointsRemaining() > 0) {
      // Check prerequisites
      const prereqs = this.props.treeData[this.props.treeName][this.props.idx]
        .prereq;

      let prereqsOK = true;
      let missingPrereqs = [];

      prereqs.forEach(idx => {
        const prereqValue = this.props.fullTree[idx - 1];
        const prereqMax = getMaxTalentCount(
          this.props.treeData[this.props.treeName][idx].values
        );
        if (prereqValue !== prereqMax) {
          prereqsOK = false;
          missingPrereqs.push(
            <li key={idx}>
              <strong>
                {this.props.treeData[this.props.treeName][idx].name}
              </strong>
            </li>
          );
        }
      });

      if (prereqsOK) {
        if (this.props.value < this.props.max) {
          this.props.changeTalentValue(
            this.props.color,
            this.props.idx,
            'increase'
          );
          jsPlumb
            .select({
              source: document.getElementById(
                `${this.props.treeName + this.props.idx}`
              )
            })
            .addClass(`line-${this.props.color}`);
        }
      } else {
        this.props.showPrereqToast(missingPrereqs);
      }
    } else {
      this.props.showPointLimitToast();
    }
  }

  /**
   * Decrease value of the clicked node and update `this.state` to reflect
   * the new value. Checks whether the node can be decreased in the event of
   * having dependent nodes. Context menu is disabled
   *
   * @param {MouseEvent} e Mouse context event
   * @memberof Node
   */
  talentDecrease(e) {
    // Check dependent nodes
    const deps = this.props.treeData[this.props.treeName][this.props.idx].dep;

    let depsOK = true;

    for (let idx of deps) {
      const depValue = this.props.fullTree[idx - 1];
      if (depValue > 0) {
        depsOK = false;
        break;
      }
    }

    if (depsOK & (this.props.value > 0)) {
      this.props.changeTalentValue(
        this.props.color,
        this.props.idx,
        'decrease'
      );

      if (this.props.value === 1) {
        jsPlumb
          .select({
            source: document.getElementById(
              `${this.props.treeName + this.props.idx}`
            )
          })
          .removeClass(`line-${this.props.color}`);
      }
    }
  }

  render() {
    let compressor = this.props.type === 'node-large' ? 0.3 : 0.25;

    return (
      <NodeOverlay
        {...this.props}
        talentIncrease={this.talentIncrease}
        talentDecrease={this.talentDecrease}
        setTooltip={this.setTooltip}
        getStyle={this.getStyle}
        compressor={compressor}
        nodeSize={this.props.nodeSize}
        isShownValues={this.props.isShownValues && this.props.value !== 0}
      />
    );
  }
}

const NodeOverlay = props => {
  const isMobile = useMediaQuery({
    query: `(max-width: ${mobileBreakpoint}px)`
  });
  let triggerProps, clickProps;

  if (isMobile) {
    triggerProps = { trigger: 'click' };
    clickProps = {
      onClick: undefined,
      onContextMenu: e => e.preventDefault()
    };
  } else {
    triggerProps = { trigger: 'hover' };
    clickProps = {
      onClick: () => props.talentIncrease(),
      onContextMenu: e => {
        e.preventDefault();
        props.talentDecrease();
      }
    };
  }

  return (
    <OverlayTrigger
      {...triggerProps}
      placement="right"
      rootClose={true}
      flip={true}
      delay={{ show: 0, hide: 0 }}
      overlay={
        <TalentTooltip
          calcPointsRemaining={props.calcPointsRemaining}
          talentdecrease={props.talentDecrease}
          talentincrease={props.talentIncrease}
          isShownTalentID={props.isShownTalentID}
          idx={props.idx}
          talentid={props.treeName + props.idx}
          talentname={props.talentName}
          value={props.value}
          max={props.max}
          text={props.setTooltip()}
        />
      }
    >
      <div
        {...clickProps}
        data-testid={props.treeName + props.idx}
        id={props.treeName + props.idx}
        className={`node ${props.type}-${props.nodeSize} ${
          props.value === 0 ? 'node-inactive' : ''
        }`}
        style={props.getStyle()}
      >
        {props.isShownValues && (
          <FitText compressor={props.compressor}>
            <div className="node-value" data-testid="node-value">
              {props.value + '/' + props.max}
            </div>
          </FitText>
        )}
      </div>
    </OverlayTrigger>
  );
};

export default Node;
