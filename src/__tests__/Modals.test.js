import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
  InvalidBuildModal,
  AnnouncementModal,
  AboutModal,
  ResetModal,
  ShareModal
} from '../Modals';

import { version } from '../../package.json';

describe('Modal', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<InvalidBuildModal />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AnnouncementModal />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('announce displays the current app version', () => {
    const currentVersion = `v${version.split('.')[0]}.${version.split('.')[1]}`;
    const { getByTestId } = render(
      <AnnouncementModal
        isEmbed={false}
        isUpgrade={true}
        isInvalidBuild={false}
      />
    );
    expect(getByTestId('announce-modal')).toHaveTextContent(currentVersion);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AboutModal />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ResetModal />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ShareModal />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
