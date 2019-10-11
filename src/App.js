import React from 'react';
import Tree from './Tree.js';
import Sidebar from './Sidebar.js';
import InvalidBuild from './Modals.js';
import data from './data.json';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Top level talent builder logic
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getEmptyState();
    this.isInvalidBuild = false;
    this.handleCommanderChange = this.handleCommanderChange.bind(this);
  }

  getEmptyState() {
    return {
      commander: '',
      redTree: '',
      yellowTree: '',
      blueTree: ''
    };
  }

  componentDidMount() {
    // Set initial state from query string
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('build')) {
      const build = urlParams.get('build');
      try {
        this.setState(JSON.parse(window.atob(build)));
      } catch (err) {
        // Invalid build
        this.isInvalidBuild = true;
        this.setState(this.getEmptyState(), () => this.updateURL('clear'));
      }
    }
  }

  updateURL(method) {
    const url = new URL(window.location.href);
    switch (method) {
      case 'update':
        url.searchParams.set('build', window.btoa(JSON.stringify(this.state)));
        break;
      case 'clear':
        url.searchParams.delete('build');
        break;
      default:
        console.warn('URL not updated');
    }
    window.history.pushState({ path: url.href }, '', url.href);
  }

  handleCommanderChange(e) {
    try {
      const commander = e.target.value;
      this.setState(
        {
          commander: commander,
          redTree: data.commanders[commander]['red'],
          yellowTree: data.commanders[commander]['yellow'],
          blueTree: data.commanders[commander]['blue']
        },
        () => this.updateURL('update')
      );
    } catch (err) {
      this.setState(this.getEmptyState(), () => this.updateURL('clear'));
    }
  }

  render() {
    return (
      <div id="app">
        {this.isInvalidBuild && <InvalidBuild />}

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
