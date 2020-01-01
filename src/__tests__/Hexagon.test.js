import React from 'react';
import ReactDOM from 'react-dom';
import Hexagon from '../Hexagon';

describe('Hexagon component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Hexagon />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
