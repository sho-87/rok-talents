import React from 'react';

// Talent tree container
class HexagonCommander extends React.Component {
  render() {
    return (
      <div>
        <div className="hexagon-talent-wrapper">
          <div className="hexagon-talent-red"></div>
          <div className="hexagon-talent-yellow"></div>
          <div className="hexagon-talent-blue"></div>
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
