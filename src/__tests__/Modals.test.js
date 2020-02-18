import React from 'react';
import ReactDOM from 'react-dom';
import {
  InvalidBuildModal,
  AboutModal,
  ResetModal,
  ShareModal
} from '../Modals';

describe('Modal', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<InvalidBuildModal />, div);
    ReactDOM.unmountComponentAtNode(div);
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
