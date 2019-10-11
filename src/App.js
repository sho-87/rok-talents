import React from 'react';
import Tree from './Tree.js';
import Sidebar from './Sidebar.js';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <div id="app">
        <Sidebar
          handleCommanderChange={this.handleCommanderChange}
          commander={this.state.commander}
        />
        <Tree
          commander={this.state.commander}
        />
      </div>
    );
  }
}

export default App;
