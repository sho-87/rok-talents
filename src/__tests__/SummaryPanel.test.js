import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SummaryPanel from '../SummaryPanel';

let props;
beforeEach(() => {
  props = { calcPointsSpent: jest.fn(), calcPointsRemaining: jest.fn() };
});

afterEach(cleanup);

describe('Summary panel component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SummaryPanel {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
