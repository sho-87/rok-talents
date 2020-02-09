import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InfoPanel from '../InfoPanel';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

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

describe('Info panel component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<InfoPanel {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
