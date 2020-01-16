import React, { Component } from 'react';
import { jsPlumb } from 'jsplumb';
import panzoom from 'panzoom';
import Tree from './Tree';
import Hexagon from './Hexagon';
import { PrereqToast, ToastMessage } from './Toasts';
import { getTreeName } from './utils';

import { dataVersion } from '../package.json';

//FIXME: remove panzoom bounds so scrolling works better on small mobile devices?
//FIXME: use shouldComponentUpdate

/**
 * Component for the main tree panel. Controls the display of all nodes and
 * node selections
 *
 * @class TreePanel
 * @extends {Component}
 */
class TreePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prereqMsg: '',
      showTotals: this.props.isMobile ? false : true,
      showValues: this.props.isMobile ? false : true,
      showMouse: false
    };
    this.panZoomInstance = null;

    // Context bindings
    this.showPrereqToast = this.showPrereqToast.bind(this);
    this.showPointLimitToast = this.showPointLimitToast.bind(this);
    this.setMousePosition = this.setMousePosition.bind(this);
  }

  /**
   * Add event listeners and setup jsplumb container with initial lines
   *
   * @memberof TreePanel
   */
  componentDidMount() {
    window.addEventListener('resize', this.repaint);

    const this_ = this;

    jsPlumb.ready(function() {
      jsPlumb.setContainer(document.getElementById('tree-square-content'));
      this_.drawLines();
    });

    let panZoomContainer = document.querySelector('#tree-square-container');
    this.panZoomInstance = panzoom(panZoomContainer, {
      minZoom: 0.9,
      maxZoom: 3,
      zoomDoubleClickSpeed: 1,
      bounds: true,
      onTouch: function(e) {
        return false; // tells the library to not preventDefault on touch
      }
    });
  }

  /**
   * Remove event listeners on unmount
   *
   * @memberof TreePanel
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.repaint);
  }

  /**
   * Reset the pan/zoom state of the entire tree panel. Called on commander changes
   * and talent resets
   *
   * @memberof TreePanel
   */
  resetPanZoom() {
    this.panZoomInstance.moveTo(0, 0);
    this.panZoomInstance.zoomAbs(0, 0, 1);
  }

  /**
   * Call for repainting jsplumb lines on window resize
   *
   * @memberof TreePanel
   */
  repaint() {
    jsPlumb.repaintEverything();
  }

  /**
   * Draw lines between nodes
   *
   * @memberof TreePanel
   */
  drawLines() {
    if (this.props.commander) {
      jsPlumb.deleteEveryEndpoint();
      jsPlumb.setSuspendDrawing(true);

      ['red', 'yellow', 'blue'].forEach(color => {
        const treeName = getTreeName(color, this.props.commander);

        Object.keys(this.props.treeData[treeName]).forEach(nodeID => {
          var activateState =
            this.props[color][nodeID - 1] === 0 ? '' : `line-${color}`;

          this.props.treeData[treeName][nodeID].prereq.forEach(prereq => {
            jsPlumb.connect({
              source: document.getElementById(`${treeName}${nodeID}`),
              target: document.getElementById(`${treeName}${prereq}`),
              endpoint: ['Dot', { cssClass: 'line-endpoint', radius: 1 }],
              connector: ['Straight', { cssClass: `line ${activateState}` }],
              anchors: [
                ['Perimeter', { shape: 'Circle' }],
                ['Perimeter', { shape: 'Circle' }]
              ]
            });
          });
        });
      });

      jsPlumb.setSuspendDrawing(false, true);
    }
  }

  /**
   * Toggle event listeners for setting mouse position and display XY
   *
   * @memberof TreePanel
   */
  toggleMousePosition() {
    this.setState(
      prevState => ({
        showMouse: !prevState.showMouse
      }),
      () => {
        if (this.state.showMouse) {
          window.addEventListener('mousemove', this.setMousePosition);
        } else {
          window.removeEventListener('mousemove', this.setMousePosition);
        }
      }
    );
  }

  /**
   * Store mouse position relative to each tree container
   *
   * @param {MouseEvent} e Mouse move event
   * @memberof TreePanel
   */
  setMousePosition(e) {
    const redContainer = document
      .getElementById('tree-red')
      .getBoundingClientRect();

    const yellowContainer = document
      .getElementById('tree-yellow')
      .getBoundingClientRect();

    const blueContainer = document
      .getElementById('tree-blue')
      .getBoundingClientRect();

    setTimeout(
      this.setState({
        redX:
          ((e.clientX - redContainer.left + window.scrollX) /
            redContainer.width) *
          100,
        redY:
          ((e.clientY - redContainer.top + window.scrollY) /
            redContainer.height) *
          100,
        yellowX:
          ((e.clientX - yellowContainer.left + window.scrollX) /
            yellowContainer.width) *
          100,
        yellowY:
          ((e.clientY - yellowContainer.top + window.scrollY) /
            yellowContainer.height) *
          100,
        blueX:
          ((e.clientX - blueContainer.left + window.scrollX) /
            blueContainer.width) *
          100,
        blueY:
          ((e.clientY - blueContainer.top + window.scrollY) /
            blueContainer.height) *
          100
      }),
      2000
    );
  }

  /**
   * Toggle display of node values
   *
   * @memberof TreePanel
   */
  toggleTotalDisplay() {
    this.setState(prevState => ({
      showTotals: !prevState.showTotals
    }));
  }

  /**
   * Toggle display of total number of points spent in each tree
   *
   * @memberof TreePanel
   */
  toggleValueDisplay() {
    this.setState(prevState => ({
      showValues: !prevState.showValues
    }));
  }

  /**
   * Show a toast containing a list of missing prerequisite talents. Toast is
   * hidden automatically after a delay.
   *
   * @memberof TreePanel
   */
  showPrereqToast(msg) {
    this.setState({ prereqMsg: msg }, () => {
      this.prereqToastRef.show();
    });
  }

  /**
   * Show toast warning about reaching the maximum talent point limit. Toast
   * is hidden automatically after a delay.
   *
   * @memberof TreePanel
   */
  showPointLimitToast() {
    this.pointLimitToastRef.show();
  }

  render() {
    const sharedTreeProps = {
      changeTalentValue: this.props.changeTalentValue,
      calcPointsSpent: this.props.calcPointsSpent,
      calcPointsRemaining: this.props.calcPointsRemaining,
      showPrereqToast: this.showPrereqToast,
      showPointLimitToast: this.showPointLimitToast,
      showTotals: this.state.showTotals && this.props.commander,
      showValues: this.state.showValues,
      showMouse: this.state.showMouse,
      treeData: this.props.treeData,
      commander: this.props.commander
    };

    return (
      <div id="tree-panel">
        <PrereqToast
          ref={component => (this.prereqToastRef = component)}
          msg={this.state.prereqMsg}
        />
        <ToastMessage
          ref={component => (this.pointLimitToastRef = component)}
          header="Talent Limit"
          body="You have spent the maximum number of talent points"
        />

        {this.props.dataVersion < dataVersion && (
          <div data-testid="version-warning" id="version-warning">
            (warning: this build uses an old <br /> version of the game data)
          </div>
        )}

        {!this.props.commander && (
          <Instructions isMobile={this.props.isMobile} />
        )}

        <div id="tree-square-container">
          <div id="tree-square-section">
            <div id="tree-square-content">
              <Tree
                {...sharedTreeProps}
                color={'red'}
                treeName={getTreeName('red', this.props.commander)}
                data={this.props.red}
                mouseX={this.state.redX}
                mouseY={this.state.redY}
              />
              <Tree
                {...sharedTreeProps}
                color={'yellow'}
                treeName={getTreeName('yellow', this.props.commander)}
                data={this.props.yellow}
                mouseX={this.state.yellowX}
                mouseY={this.state.yellowY}
              />
              <Tree
                {...sharedTreeProps}
                color={'blue'}
                treeName={getTreeName('blue', this.props.commander)}
                data={this.props.blue}
                mouseX={this.state.blueX}
                mouseY={this.state.blueY}
              />
              <Hexagon
                toggleSelect={this.props.toggleSelect}
                commander={this.props.commander}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function Instructions(props) {
  return (
    <div id="instructions">
      <ol>
        <li>Select commander in the top right</li>
        {!props.isMobile && (
          <div>
            <li>Left click to add talent points</li>
            <li>Right click to remove talent points</li>
          </div>
        )}
        {props.isMobile && (
          <div>
            <li>Add/remove points in the tooltip</li>
          </div>
        )}
        <li>Check your build stats on the left</li>
        <li>Share your build</li>
      </ol>
    </div>
  );
}

export default TreePanel;
