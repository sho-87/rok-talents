import React, { Component } from 'react';
import Joyride from 'react-joyride';

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
      steps: [
        {
          content: 'Select your commander using this dropdown',
          target: '#select-commander',
          placement: 'auto',
          disableBeacon: true
        },
        {
          content: 'Check the number of points you have left to spend',
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

  render() {
    return (
      <Joyride
        run={this.props.isShownTour}
        steps={this.state.steps}
        continuous={true}
        showProgress={true}
        showSkipButton={false}
        disableOverlayClose={true}
        styles={{
          options: {
            primaryColor: 'var(--color-highlight)'
          }
        }}
      />
    );
  }
}

export default GuidedTour;
