import React from 'react';
import ReactDOM from 'react-dom';
import TreePanel from '../TreePanel';

it('renders without crashing', () => {
  let props = { red: [], yellow: [], blue: [] };
  const div = document.createElement('div');
  ReactDOM.render(<TreePanel {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
