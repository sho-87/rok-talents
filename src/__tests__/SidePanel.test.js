import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SidePanel from '../SidePanel';

let props;
beforeEach(() => {
  props = {
    calcPointsRemaining: jest.fn(),
    calcPointsSpent: jest.fn(),
    red: [],
    yellow: [],
    blue: []
  };
});

afterEach(cleanup);

describe('Side panel component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SidePanel {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
