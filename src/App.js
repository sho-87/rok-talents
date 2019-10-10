import React from 'react';
import './App.css';
import Tree from './Tree.js';
import Info from './Info.js';

// Top level talent builder logic
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleCommanderChange = this.handleCommanderChange.bind(this);
    this.state = {
      commander: ''
    };
  }

  handleCommanderChange(e) {
    this.setState({ commander: e.target.value });
  }

  render() {
    return (
      <div className="App">
        <Tree commander={this.state.commander} />
        <Info
          handleCommanderChange={this.handleCommanderChange}
          commander={this.state.commander}
        />
      </div>
    );
  }
}

export default App;
