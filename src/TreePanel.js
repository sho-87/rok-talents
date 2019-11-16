import React, { Component } from 'react';
import { HexagonCommander, Node } from './Shapes.js';
import { PrereqToast, PointLimitToast } from './Modals.js';

import Trees from './data/modules.js';
import Commanders from './data/Commanders.json';

//TODO: lazy load large data modules
//TODO: use media queries to set element sizes instead of vw/vh/%
//FIXME: screenshot does not support certain CSS props (e.g. blend mode, filter)
//FIXME: don't use unsupported props to style nodes. use small node images?
class TreePanel extends Component {
  constructor(props) {
    super(props);
    this.getTreeName = this.getTreeName.bind(this);
    this.showPrereqToast = this.showPrereqToast.bind(this);
    this.showPointLimitToast = this.showPointLimitToast.bind(this);
    this.state = {
      pointLimitToastFlag: false,
      prereqToastFlag: false,
      prereqMsg: ''
    };
  }

  getTreeName(color) {
    const commander = Commanders[this.props.commander];
    if (commander) {
      return commander[color];
    }
  }

  showPrereqToast(msg) {
    this.setState({ prereqToastFlag: true, prereqMsg: msg }, () => {
      window.setTimeout(() => {
        this.setState({ prereqToastFlag: false, prereqMsg: '' });
      }, 5000);
    });
  }

  showPointLimitToast() {
    this.setState({ pointLimitToastFlag: true }, () => {
      window.setTimeout(() => {
        this.setState({ pointLimitToastFlag: false });
      }, 2000);
    });
  }

  drawNodes(values, color) {
    let nodes = [];
    const treeName = this.getTreeName(color);

    for (let i = 1; i < values.length + 1; i++) {
      nodes.push(
        <Node
          changeTalentValue={this.props.changeTalentValue}
          calcPointsRemaining={this.props.calcPointsRemaining}
          showPrereqToast={this.showPrereqToast}
          showPointLimitToast={this.showPointLimitToast}
          key={treeName + i}
          id={treeName + i}
          idx={i}
          treeName={treeName}
          talentName={Trees[treeName][i]['name']}
          image={Trees[treeName][i]['image']}
          tooltip={Trees[treeName][i]['text']}
          type={Trees[treeName][i]['type']}
          value={values[i - 1]}
          max={Trees[treeName][i]['values'].length}
          fullTree={this.props[color]}
          top={Trees[treeName][i]['pos'][0] + '%'}
          left={Trees[treeName][i]['pos'][1] + '%'}
          color={color}
        />
      );
    }

    return nodes;
  }

  render() {
    return (
      <div id="tree-panel">
        <PrereqToast
          isOpen={this.state.prereqToastFlag}
          msg={this.state.prereqMsg}
        />
        <PointLimitToast isOpen={this.state.pointLimitToastFlag} />

        <div id="tree-red" className="tree-container">
          {this.drawNodes(this.props.red, 'red')}
        </div>
        <div id="tree-yellow" className="tree-container">
          {this.drawNodes(this.props.yellow, 'yellow')}
        </div>
        <div id="tree-blue" className="tree-container">
          {this.drawNodes(this.props.blue, 'blue')}
        </div>

        <HexagonCommander
          commander={this.props.commander}
          getTreeName={this.getTreeName}
        />
      </div>
    );
  }
}

export default TreePanel;
