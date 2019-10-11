import React from 'react';
import Tree from './Tree.js';
import Sidebar from './Sidebar.js';
import data from './data.json';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Top level talent builder logic
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleCommanderChange = this.handleCommanderChange.bind(this);
    this.state = {
      commander: '',
      redTree: '',
      yellowTree: '',
      blueTree: ''
    };
  }

  handleCommanderChange(e) {
    const commander = e.target.value;
    this.setState({
      commander: commander,
      redTree: data.commanders[commander]['red'],
      yellowTree: data.commanders[commander]['yellow'],
      blueTree: data.commanders[commander]['blue']
    });
  }

  render() {
    return (
      <div id="app">
        <Sidebar
          handleCommanderChange={this.handleCommanderChange}
          {...this.state} //FIXME: does sidebar really need the entire state?
        />
        <Tree
          commander={this.state.commander}
          redTree={this.state.redTree}
          yellowTree={this.state.yellowTree}
          blueTree={this.state.blueTree}
        />
      </div>
    );
  }
}

export default App;
