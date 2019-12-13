import React, { Component, Fragment } from 'react';
import { jsPlumb } from 'jsplumb';
import { TalentTooltip } from '../Modals';

import Trees from '../data/modules';

//FIXME: nodes/tooltips update all the time. use shouldcomponentupdate?
//FIXME: fix location of node labels. tie to the node div

/**
 * Component for the individual talent nodes
 *
 * @class Node
 * @extends {Component}
 */
class Node extends Component {
  /**
   * Determine styling of the node. CSS style depends on whether the node is
   * a large skill node or a small stat node
   *
   * @returns {object} Object containing the CSS styles
   * (e.g. positioning, background image) for the node
   * @memberof Node
   */
  getStyle() {
    let style = {};

    style.top = this.props.top;
    style.left = this.props.left;

    if (this.props.type === 'node-large') {
      style.backgroundImage = `url(images/talents/${this.props.image}.png)`;
    }

    return style;
  }

  //FIXME: this is so hacky...

  /**
   * Set the CSS class of the node if it is a small node type. Applied
   * classes depend on both the node size, as well as whether
   * the node is currently active/selected
   *
   * @returns {string} String representing the CSS classes of the node
   * @memberof Node
   */
  getSmallColor() {
    if ((this.props.type === 'node-small') & (this.props.value === 0)) {
      return 'node-small-inactive';
    } else if ((this.props.type === 'node-small') & (this.props.value > 0)) {
      return `node-small-${this.props.color}`;
    } else {
      return '';
    }
  }

  /**
   * Set tooltip for the node. Tooltip text is dynamic as it depends on the
   * current level of the node
   *
   * @returns {string} Updated tooltip text reflecting the level of the node
   * @memberof Node
   */
  setTooltip() {
    let tooltip = this.props.tooltip;
    let talentValues = Trees[this.props.treeName][this.props.idx]['values'];

    if (this.props.value === this.props.max) {
      tooltip = tooltip.replace('$', talentValues[this.props.max - 1]);
    } else {
      tooltip = tooltip.replace('$', talentValues[this.props.value]);
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
      const prereqs = Trees[this.props.treeName][this.props.idx].prereq;

      let prereqsOK = true;
      let missingPrereqs = [];

      prereqs.forEach(idx => {
        const prereqValue = this.props.fullTree[idx - 1];
        const prereqMax = Trees[this.props.treeName][idx].values.length;
        if (prereqValue !== prereqMax) {
          prereqsOK = false;
          missingPrereqs.push(
            <li key={idx}>
              <strong>{Trees[this.props.treeName][idx].name}</strong>
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
              target: document.getElementById(
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
    e.preventDefault();

    // Check dependent nodes
    const deps = Trees[this.props.treeName][this.props.idx].dep;

    let depsOK = true;

    deps.forEach(idx => {
      const depValue = this.props.fullTree[idx - 1];
      if (depValue > 0) {
        depsOK = false;
      }
    });

    if (depsOK & (this.props.value > 0)) {
      this.props.changeTalentValue(
        this.props.color,
        this.props.idx,
        'decrease'
      );

      if (this.props.value === 1) {
        jsPlumb
          .select({
            target: document.getElementById(
              `${this.props.treeName + this.props.idx}`
            )
          })
          .removeClass(`line-${this.props.color}`);
      }
    }
  }

  render() {
    let showValues = this.props.showValues && this.props.value !== 0;

    return (
      <Fragment>
        <div
          id={this.props.treeName + this.props.idx}
          className={`node ${this.props.type} ${
            this.props.value === 0 ? 'node-inactive' : ''
          } ${this.getSmallColor()}`}
          style={this.getStyle()}
          onClick={() => this.talentIncrease()}
          onContextMenu={e => this.talentDecrease(e)}
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

        <TalentTooltip
          idx={this.props.idx}
          target={this.props.treeName + this.props.idx}
          talentName={this.props.talentName}
          value={this.props.value}
          max={this.props.max}
          text={this.setTooltip()}
        />
      </Fragment>
    );
  }
}

export default Node;
