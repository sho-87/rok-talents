import React from 'react';
import ReactDOM from 'react-dom';
import { TalentTooltip } from '../Popovers';

describe('Popover', () => {
  it('renders without crashing', () => {
    let props = { target: 'body' };

    const div = document.createElement('div');
    ReactDOM.render(<TalentTooltip {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
