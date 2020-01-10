import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NavBar from '../NavBar';

let props;
beforeEach(() => {
  props = { calcPointsSpent: jest.fn() };
});

afterEach(cleanup);

describe('Nav bar component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NavBar {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
