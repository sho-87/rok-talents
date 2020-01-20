import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TreePanel from '../TreePanel';

let props;
beforeEach(() => {
  props = { red: [], yellow: [], blue: [] };
});

afterEach(cleanup);

describe('Tree panel component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TreePanel {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
