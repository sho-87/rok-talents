import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TreePanel from '../TreePanel';

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
  props = { red: [], yellow: [], blue: [] };
});

afterEach(cleanup);

describe('Tree panel component', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<TreePanel {...props} />);
    expect(getByTestId('tree-panel')).toBeTruthy();
  });
});
