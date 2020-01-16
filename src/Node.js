import React, { Component } from 'react';
import { isMobile } from 'react-device-detect';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { jsPlumb } from 'jsplumb';
import { TalentTooltip } from './Modals';
import { replaceTalentText, getMaxTalentCount } from './utils';

//FIXME: fix location of node labels. dont contain in node div

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
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.value !== nextProps.value ||
      this.props.showValues !== nextProps.showValues
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
    let showValues = this.props.showValues && this.props.value !== 0;

    let props, clickProps;
    if (isMobile) {
      props = {
        trigger: 'click',
        rootClose: true,
        rootCloseEvent: 'mousedown'
      };
    } else {
      props = { trigger: 'hover' };
    }

    if (!isMobile) {
      clickProps = {
        onClick: () => this.talentIncrease(),
        onContextMenu: e => {
          e.preventDefault();
          this.talentDecrease();
        }
      };
    } else {
      clickProps = {
        onClick: undefined,
        onContextMenu: e => e.preventDefault()
      };
    }

    return (
      <React.Fragment>
        <OverlayTrigger
          {...props}
          placement="right"
          flip={true}
          delay={{ show: 0, hide: 0 }}
          overlay={
            <TalentTooltip
              calcPointsRemaining={this.props.calcPointsRemaining}
              talentdecrease={this.talentDecrease}
              talentincrease={this.talentIncrease}
              idx={this.props.idx}
              talentid={this.props.treeName + this.props.idx}
              talentname={this.props.talentName}
              value={this.props.value}
              max={this.props.max}
              text={this.setTooltip()}
            />
          }
        >
          <div
            {...clickProps}
            data-testid={this.props.treeName + this.props.idx}
            id={this.props.treeName + this.props.idx}
            className={`node ${this.props.type} ${
              this.props.value === 0 ? 'node-inactive' : ''
            }`}
            style={this.getStyle()}
          >
            {showValues && (
              <div
                className={`node-value ${
                  this.props.type === 'node-small'
                    ? 'node-value-small'
                    : 'node-value-large'
                }`}
              >
                {this.props.value + '/' + this.props.max}
              </div>
            )}
          </div>
        </OverlayTrigger>
      </React.Fragment>
    );
  }
}

export default Node;
