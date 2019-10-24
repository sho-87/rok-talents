import React, { Component, Fragment } from 'react';
import { TalentTooltip } from './Modals.js';
import Trees from './data/modules.js';

export class HexagonCommander extends Component {
  render() {
    if (this.props.commander) {
      return (
        <div id="tree-center">
          <div className="hexagon-talent-wrapper">
            <div className="hexagon-talent-red"></div>
            <div className="hexagon-talent-yellow"></div>
            <div className="hexagon-talent-blue"></div>
          </div>

          <div className="hexagon-label-wrapper">
            <div className="hexagon-label hexagon-label-red">
              {this.props.getTreeName('red')}
            </div>
            <div className="hexagon-label hexagon-label-yellow">
              {this.props.getTreeName('yellow')}
            </div>
            <div className="hexagon-label hexagon-label-blue">
              {this.props.getTreeName('blue')}
            </div>
          </div>

          <div className="hexagon-commander-wrapper">
            <img
              src={`images/commanders/${this.props.commander}.png`}
              alt={this.props.commander}
            ></img>
          </div>
        </div>
      );
    } else {
      return false;
    }
  }
}

// https://reactjs.org/docs/composition-vs-inheritance.html#containment
export class Node extends Component {
  getStyle() {
    let style = {};

    style.top = this.props.top;
    style.left = this.props.left;

    if (this.props.type === 'node-large') {
      style.backgroundImage = `url(images/talents/${this.props.image}.png)`;
    }

    return style;
  }

  getSmallColor() {
    //FIXME: this is so hacky...
    if ((this.props.type === 'node-small') & (this.props.value === 0)) {
      return 'node-small-inactive';
    } else if ((this.props.type === 'node-small') & (this.props.value > 0)) {
      return `node-small-${this.props.color}`;
    } else {
      return '';
    }
  }

  getTooltip() {
    let tooltip = this.props.tooltip;
    let talentValues = Trees[this.props.treeName][this.props.idx]['values'];

    if (this.props.value === this.props.max) {
      tooltip = tooltip.replace('$', talentValues[this.props.max - 1]);
    } else {
      tooltip = tooltip.replace('$', talentValues[this.props.value]);
    }

    return tooltip;
  }

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
        }
      } else {
        this.props.showPrereqToast(missingPrereqs);
      }
    } else {
      this.props.showPointLimitToast();
    }
  }

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
    }
  }

  render() {
    return (
      <Fragment>
        <div
          id={this.props.id}
          className={`node ${this.props.type} ${
            this.props.value === 0 ? 'node-inactive' : ''
          } ${this.getSmallColor()}`}
          style={this.getStyle()}
          onClick={() => this.talentIncrease()}
          onContextMenu={e => this.talentDecrease(e)}
        >
          <div
            className={`node-value ${
              this.props.type === 'node-small'
                ? 'node-value-small'
                : 'node-value-large'
            }`}
          >
            {this.props.value + '/' + this.props.max}
          </div>
        </div>

        <TalentTooltip
          target={this.props.id}
          talentName={this.props.talentName}
          value={this.props.value}
          max={this.props.max}
          text={this.getTooltip()}
        />
      </Fragment>
    );
  }
}

export default { HexagonCommander, Node };
