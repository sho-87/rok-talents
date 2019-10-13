import React from 'react';

// Talent tree container
//TODO: add blank image when no commander is selected
class HexagonCommander extends React.Component {
  render() {
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
  }
}

export default HexagonCommander;
