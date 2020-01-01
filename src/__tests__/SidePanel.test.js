import React from 'react';
import ReactDOM from 'react-dom';
import SidePanel from '../SidePanel';

describe('Side panel component', () => {
  it('renders without crashing', () => {
    let props = {
      calcPointsRemaining: jest.fn(),
      calcPointsSpent: jest.fn(),
      red: [],
      yellow: [],
      blue: []
    };

    const div = document.createElement('div');
    ReactDOM.render(<SidePanel {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
