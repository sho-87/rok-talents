import React, { Component } from 'react';
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import { isNewUser } from './utils';

/**
 * Component containing the guided tour for app onboarding
 *
 * @class GuidedTour
 * @extends {Component}
 */
class GuidedTour extends Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      run: isNewUser() ? true : false,
      stepIndex: 0,
      steps: [
        {
          content: 'Select your commander using this dropdown',
          target: '#select-commander',
          placement: 'auto',
          disableBeacon: true
        },
        {
          content:
            'View guides for the selected commander and check the number of points you have left to spend',
          target: '#summary-panel',
          placement: 'auto'
        },
        {
          content: 'Check various stats given by your talent build',
          target: '#stats-panel',
          placement: 'auto'
        },
        {
          content:
            'Reset your talent build. This will delete all assigned talent points',
          target: '#button-reset',
          placement: 'auto'
        },
        {
          content:
            'Save a screenshot of your current talent build. No need to settle for those blurry in-game screenshots anymore!',
          target: '#button-screenshot',
          placement: 'auto'
        },
        {
          content:
            'Talent builds can be shared with a link. Click this to get your shareable link, or simply copy your current URL',
          target: '#button-share',
          placement: 'auto'
        },
        {
          content:
            'Change display settings, or activate additional functionality like Speed Mode',
          target: '#select-settings'
        },
        {
          content:
            'Get additional info about the app. You can also restart the guided tour here',
          target: '#nav-icon',
          locale: { last: 'Finish' }
        }
      ]
    };
  }

  /**
   * Restart the guided tour by resetting the current tour step
   *
   * @memberof GuidedTour
   */
  restartTour = () => {
    this.setState({
      run: true,
      stepIndex: 0
    });
  };

  /**
   * Handle tour events (next step, tour close etc)
   *
   * @memberof GuidedTour
   */
  handleJoyrideCallback = data => {
    const { action, index, status, type } = data;

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      this.setState({ run: false, stepIndex: 0 });
    } else if (action === ACTIONS.CLOSE) {
      this.setState({ run: false, stepIndex: 0 });
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      // Update state to advance the tour
      this.setState({ stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) });
    }
  };

  render() {
    return (
      <Joyride
        run={this.state.run}
        callback={this.handleJoyrideCallback}
        stepIndex={this.state.stepIndex}
        steps={this.state.steps}
        continuous={true}
        showProgress={true}
        showSkipButton={false}
        disableOverlayClose={true}
        styles={{
          options: {
            primaryColor: 'var(--color-highlight)',
            overlayColor: 'rgba(0, 0, 0, 0.6)'
          }
        }}
      />
    );
  }
}

export default GuidedTour;
