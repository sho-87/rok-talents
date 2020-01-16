import React from 'react';
import ReactDOM from 'react-dom';
import { ToastMessage, PrereqToast } from '../Toasts';

describe('Toast', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ToastMessage />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PrereqToast />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
