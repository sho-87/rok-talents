import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from '../NavBar';

it('renders without crashing', () => {
  let props = { calcPointsSpent: jest.fn() };
  const div = document.createElement('div');
  ReactDOM.render(<NavBar {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
