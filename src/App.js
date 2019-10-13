import React from 'react';
import Sidebar from './Sidebar.js';
import Tree from './Tree.js';
import { InvalidBuildModal } from './Modals.js';

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
      commander: ''
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

  changeCommander(e) {
    const commander = e.target.value;
    if (commander) {
      this.setState({ commander: commander }, () => this.updateURL('update'));
    } else {
      this.setEmptyState();
    }
  }

  //FIXME: reset button should only reset points, not commander selection
  resetTalents(){
    this.setEmptyState();
  }

  render() {
    return (
      <div id="app">
        {this.invalidModalFlag && <InvalidBuildModal />}

        <Sidebar
          changeCommander={this.changeCommander}
          resetTalents={this.resetTalents}
          {...this.state} //FIXME: does sidebar really need the entire state?
        />

        <Tree commander={this.state.commander} />
      </div>
    );
  }
}

export default App;
