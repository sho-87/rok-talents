import React from 'react';

// Talent tree container
class Tree extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="tree">
        <div className="container">
          <div className="row align-items-center sub-tree">
            <div id="tree-red" className="col sub-tree-col">
              {this.props.redTree}
            </div>
          </div>

          <div className="row align-items-center">
            <div id="tree-commander" className="col">
              <img
                src={`images/commanders/${this.props.commander}.png`}
                alt={this.props.commander}
              ></img>
              <div id="commander-name">{this.props.commander}</div>
            </div>
          </div>

          <div className="row align-items-center sub-tree">
            <div id="tree-yellow" className="col sub-tree-col">
              {this.props.yellowTree}
            </div>
            <div id="tree-blue" className="col sub-tree-col">
              {this.props.blueTree}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Tree;
