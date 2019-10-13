import React from 'react';
import { HexagonCommander, Node } from './Shapes.js';

import Trees from './data/modules.js';
import Commanders from './data/Commanders.json';

// Talent tree container
//TODO: add tree/game/data version to state and data files
class TreePanel extends React.Component {
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
  drawNodes(values, color) {
    let nodes = [];
    const treeName = this.getTreeName(color);

    for (let i = 1; i < values.length + 1; i++) {
      const styles = {
        top: Trees[treeName][i]['pos'][0] + '%',
        left: Trees[treeName][i]['pos'][1] + '%',
        backgroundColor: color
      };

      //TODO: double check replacement value
      let tooltip = Trees[treeName][i]['text'].replace(
        '$',
        Trees[treeName][i]['values'][values[i - 1]]
      );

      nodes.push(
        <Node
          id={treeName + i}
          key={treeName + i}
          styles={styles}
          name={Trees[treeName][i]['name']}
          tooltip={tooltip}
          type={Trees[treeName][i]['type']}
          value={values[i - 1]}
          max={Trees[treeName][i]['values'].length}
        />
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
        <HexagonCommander
          commander={this.props.commander}
          getTreeName={this.getTreeName}
        />
      </div>
    );
  }
}

export default TreePanel;
