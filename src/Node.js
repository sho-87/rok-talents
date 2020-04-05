import React, { Component } from 'react';
import FitText from '@kennethormandy/react-fittext';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { TalentTooltip } from './Popovers';
import { replaceTalentText, getIncompletePrereqs } from './utils';

import './styles/Node.css';

/**
 * Component for the individual talent nodes
 *
 * @class Node
 * @extends {Component}
 */
class Node extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.value !== nextProps.value ||
      this.props.nodeSize !== nextProps.nodeSize ||
      this.props.isShownValues !== nextProps.isShownValues ||
      this.props.isShownTalentID !== nextProps.isShownTalentID ||
      this.props.isSpeedMode !== nextProps.isSpeedMode
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
  getStyle = () => {
    let style = {};

    style.top = this.props.y;
    style.left = this.props.x;

    if (this.props.type === 'node-large') {
      style.backgroundImage = `url(${process.env.PUBLIC_URL}/images/talents/${this.props.image}.png)`;
    } else {
      style.backgroundImage = `url(${process.env.PUBLIC_URL}/images/talents/${this.props.color}GenericSmall.png)`;
    }

    return style;
  };

  /**
   * Set tooltip for the node. Tooltip text is dynamic as it depends on the
   * current level of the node
   *
   * @returns {string} Updated tooltip text reflecting the level of the node
   * @memberof Node
   */
  setTooltip = () => {
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
  };

  /**
   * Increase the value of the clicked node. Controls whether the node can
   * be increased (e.g. max level reached, max talent points spent), as well
   * as the display of associated toasts and missing prerequisite talents
   *
   * @memberof Node
   */
  increaseTalent = () => {
    // Get all incomplete prereqs
    let directPrereqsOK = true;
    let directInfo = [];
    let incompletePrereqs = [];
    getIncompletePrereqs(
      this.props.idx,
      this.props.fullTree,
      this.props.treeData[this.props.treeName],
      incompletePrereqs
    );
    incompletePrereqs = Array.from(new Set(incompletePrereqs.reverse()));

    // Handle autofill mode (incomplete nodes only)
    if (this.props.isAutoFill) {
      incompletePrereqs.forEach((prereq) => {
        const prereqValue = this.props.fullTree[prereq - 1];
        const prereqMax = this.props.treeData[this.props.treeName][prereq]
          .values.length;
        const pointsRemaining = this.props.calcPointsRemaining();

        let numberAssignable = prereqMax - prereqValue;
        if (numberAssignable > pointsRemaining) {
          directPrereqsOK = false;
          numberAssignable = pointsRemaining;
          this.props.showPointLimitToast();
        }

        if (numberAssignable !== 0) {
          this.props.changeTalentValue(
            this.props.treeName,
            this.props.color,
            prereq,
            'increase',
            numberAssignable
          );
        }
      });
    } else {
      // No autofill. Check direct prereqs for this node
      const directPrereqs = this.props.treeData[this.props.treeName][
        this.props.idx
      ].prereq;

      directPrereqs.forEach((idx) => {
        if (incompletePrereqs.includes(idx)) {
          directPrereqsOK = false;
          directInfo.push(
            <li key={idx}>
              <strong>
                {this.props.treeData[this.props.treeName][idx].name}
              </strong>
            </li>
          );
        }
      });
    }

    // Set value for selected node
    if (directPrereqsOK) {
      if (this.props.value < this.props.max) {
        const pointsRemaining = this.props.calcPointsRemaining();
        const pointDifference = this.props.max - this.props.value;
        let numberAssignable;

        if (this.props.isInstantMax) {
          if (pointDifference > pointsRemaining) {
            numberAssignable = pointsRemaining;
            this.props.showPointLimitToast();
          } else {
            numberAssignable = pointDifference;
          }
        } else {
          if (pointsRemaining === 0) {
            numberAssignable = 0;
            this.props.showPointLimitToast();
          } else {
            numberAssignable = 1;
          }
        }

        if (numberAssignable !== 0) {
          this.props.changeTalentValue(
            this.props.treeName,
            this.props.color,
            this.props.idx,
            'increase',
            numberAssignable
          );
        }
      }
    } else if (!this.props.isAutoFill) {
      this.props.showPrereqToast(directInfo);
    }
  };

  /**
   * Decrease value of the clicked node and update `this.state` to reflect
   * the new value. Checks whether the node can be decreased in the event of
   * having dependent nodes. Context menu is disabled
   *
   * @param {MouseEvent} e Mouse context event
   * @memberof Node
   */
  decreaseTalent = (e) => {
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
      let numberRemovable;

      if (this.props.isInstantZero) {
        numberRemovable = this.props.value;
      } else {
        numberRemovable = 1;
      }

      this.props.changeTalentValue(
        this.props.treeName,
        this.props.color,
        this.props.idx,
        'decrease',
        numberRemovable
      );
    }
  };

  render() {
    let compressor = this.props.type === 'node-large' ? 0.31 : 0.21;
    let isShownValues = this.props.isShownValues && this.props.value !== 0;

    if (this.props.isSpeedMode) {
      return (
        <NodeContent
          talentID={this.props.treeName + this.props.idx}
          getStyle={this.getStyle}
          isShownValues={isShownValues}
          nodeSize={this.props.nodeSize}
          type={this.props.type}
          compressor={compressor}
          value={this.props.value}
          max={this.props.max}
          onClick={this.increaseTalent}
          onContextMenu={(e) => {
            e.preventDefault();
            this.decreaseTalent();
          }}
        />
      );
    } else {
      return (
        <NodeOverlay
          {...this.props}
          increaseTalent={this.increaseTalent}
          decreaseTalent={this.decreaseTalent}
          setTooltip={this.setTooltip}
          getStyle={this.getStyle}
          compressor={compressor}
          nodeSize={this.props.nodeSize}
          isShownValues={isShownValues}
          isEmbed={this.props.isEmbed}
        />
      );
    }
  }
}

const NodeOverlay = (props) => {
  return (
    <OverlayTrigger
      trigger="click"
      placement="right"
      rootClose={true}
      flip={true}
      delay={{ show: 0, hide: 0 }}
      overlay={
        <TalentTooltip
          calcPointsRemaining={props.calcPointsRemaining}
          increaseTalent={props.increaseTalent}
          decreaseTalent={props.decreaseTalent}
          isShownTalentID={props.isShownTalentID}
          isEmbed={props.isEmbed}
          idx={props.idx}
          talentID={props.treeName + props.idx}
          talentName={props.talentName}
          value={props.value}
          max={props.max}
          text={props.setTooltip()}
        />
      }
    >
      <NodeContent
        talentID={props.treeName + props.idx}
        getStyle={props.getStyle}
        isShownValues={props.isShownValues}
        nodeSize={props.nodeSize}
        type={props.type}
        compressor={props.compressor}
        value={props.value}
        max={props.max}
        onContextMenu={(e) => e.preventDefault()}
      />
    </OverlayTrigger>
  );
};

const NodeContent = (props) => {
  return (
    <div
      data-testid={props.talentID}
      id={props.talentID}
      className={`node ${props.type}-${props.nodeSize} ${
        props.value === 0 ? 'node-inactive' : ''
      }`}
      style={props.getStyle()}
      onClick={props.onClick}
      onContextMenu={props.onContextMenu}
    >
      {props.isShownValues && (
        <FitText compressor={props.compressor}>
          <div className="node-value" data-testid="node-value">
            {props.value + '/' + props.max}
          </div>
        </FitText>
      )}
    </div>
  );
};

export default Node;
