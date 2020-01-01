import React from 'react';
import ReactDOM from 'react-dom';
import TreePanel from '../TreePanel';

describe('Tree panel component', () => {
  it('renders without crashing', () => {
    let props = { red: [], yellow: [], blue: [] };
    const div = document.createElement('div');
    ReactDOM.render(<TreePanel {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
