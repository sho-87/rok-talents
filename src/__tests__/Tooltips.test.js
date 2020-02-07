import React from 'react';
import ReactDOM from 'react-dom';
import { HelpTooltip } from '../Tooltips';

describe('Tooltips', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HelpTooltip />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
