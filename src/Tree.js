// Talent Tree
import React from 'react';

class Tree extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Tree">
        <div id="tree-commander">
          <img
            src={`images/commanders/${this.props.commander}.png`}
            alt={this.props.commander}
          ></img>
          {this.props.commander}
        </div>
      </div>
    );
  }
}

export default Tree;
