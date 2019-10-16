import React, { Component, Profiler } from 'react';
import { HexagonCommander, Node } from './Shapes.js';
import ErrorBoundary from './Error.js';
import onRenderCallback from './Profiler.js';

import Trees from './data/modules.js';
import Commanders from './data/Commanders.json';

//TODO: lazy load large data modules

// Talent tree container
//TODO: add tree/game/data version to state and data files
class TreePanel extends Component {
  constructor(props) {
    super(props);
    this.getTreeName = this.getTreeName.bind(this);
  }

  getTreeName(color) {
    const commander = Commanders[this.props.commander];
    if (commander) {
      return commander[color];
    }
  }

  //FIXME: will this redraw every node when only 1 has changed?
  // https://stackoverflow.com/questions/33080657/react-update-one-item-in-a-list-without-recreating-all-items
  // https://reactjs.org/docs/lists-and-keys.html#rendering-multiple-components
  drawNodes(values, color) {
    let nodes = [];
    const treeName = this.getTreeName(color);

    for (let i = 1; i < values.length + 1; i++) {
      //TODO: double check replacement value
      let tooltip = Trees[treeName][i]['text'].replace(
        '$',
        Trees[treeName][i]['values'][values[i - 1]]
      );

      // https://reactjs.org/docs/composition-vs-inheritance.html#containment
      nodes.push(
        <Profiler
          key={treeName + i}
          id={treeName + i}
          onRender={onRenderCallback}
        >
          <Node
            id={treeName + i}
            name={Trees[treeName][i]['name']}
            image={Trees[treeName][i]['image']}
            tooltip={tooltip}
            type={Trees[treeName][i]['type']}
            value={values[i - 1]}
            max={Trees[treeName][i]['values'].length}
            top={Trees[treeName][i]['pos'][0] + '%'}
            left={Trees[treeName][i]['pos'][1] + '%'}
            backgroundColor={color}
          />
        </Profiler>
      );
    }

    return nodes;
  }

  render() {
    return (
      <div id="tree-panel">
        <div id="tree-red" className="tree-container">
          {this.drawNodes(this.props.red, 'red')}
        </div>
        <div id="tree-yellow" className="tree-container">
          {this.drawNodes(this.props.yellow, 'yellow')}
        </div>
        <div id="tree-blue" className="tree-container">
          {this.drawNodes(this.props.blue, 'blue')}
        </div>
        <ErrorBoundary>
          <HexagonCommander
            commander={this.props.commander}
            getTreeName={this.getTreeName}
          />
        </ErrorBoundary>
      </div>
    );
  }
}

export default TreePanel;
