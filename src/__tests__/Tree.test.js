import React from 'react';
import ReactDOM from 'react-dom';
import Tree from '../Tree';

describe('Tree component', () => {
  it('renders without crashing', () => {
    let props = { data: [] };

    const div = document.createElement('div');
    ReactDOM.render(<Tree {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
