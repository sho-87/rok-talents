import React from 'react';
import SidebarPanel from './SidebarPanel.js';
import TreePanel from './TreePanel.js';
import { InvalidBuildModal } from './Modals.js';

import Trees from './data/modules.js';
import Commanders from './data/Commanders.json';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Top level talent builder logic
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getEmptyState();
    this.invalidModalFlag = false;
    this.changeCommander = this.changeCommander.bind(this);
    this.resetTalents = this.resetTalents.bind(this);
  }

  getEmptyState() {
    return {
      commander: '',
      red: [],
      yellow: [],
      blue: []
    };
  }

  setEmptyState() {
    this.setState(this.getEmptyState(), () => {
      this.updateURL('clear');
    });
  }

  //TODO: change encoding method? base64, URI, lz-string
  componentDidMount() {
    // Set initial state from query string
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('build')) {
      const build = urlParams.get('build');
      try {
        this.setState(JSON.parse(window.atob(build)));
      } catch (err) {
        // Invalid build
        this.invalidModalFlag = true;
        this.setEmptyState();
      }
    }
  }

  //FIXME: this should be automatic after any/every state change
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
        break;
    }
    window.history.pushState({ path: url.href }, '', url.href);
  }

  createZeroTalents() {
    const commander = document.getElementById('select-commander').value;
    const numRed = Object.keys(Trees[Commanders[commander]['red']]).length;
    const numYellow = Object.keys(Trees[Commanders[commander]['yellow']])
      .length;
    const numBlue = Object.keys(Trees[Commanders[commander]['blue']]).length;

    const zeroTalents = {
      red: Array(numRed).fill(0),
      yellow: Array(numYellow).fill(0),
      blue: Array(numBlue).fill(0)
    };

    return zeroTalents;
  }

  resetTalents() {
    this.setState(this.createZeroTalents(), () => this.updateURL('update'));
  }

  changeCommander(e) {
    const commander = e.target.value;
    if (commander) {
      const zeroTalents = this.createZeroTalents();
      this.setState({ commander: commander, ...zeroTalents }, () =>
        this.updateURL('update')
      );
    } else {
      this.setEmptyState();
    }
  }

  render() {
    return (
      <div id="app">
        {this.invalidModalFlag && <InvalidBuildModal />}

        <SidebarPanel
          changeCommander={this.changeCommander}
          resetTalents={this.resetTalents}
          {...this.state} //FIXME: does sidebar really need the entire state?
        />

        <TreePanel commander={this.state.commander} />
      </div>
    );
  }
}

export default App;
