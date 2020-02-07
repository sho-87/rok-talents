import React from 'react';
import ReactDOM from 'react-dom';
import { HelpText } from '../Tooltips';

describe('Tooltips', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HelpText />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
