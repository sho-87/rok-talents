import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StatsPanel from '../StatsPanel';

let props;
beforeEach(() => {
  props = {
    stats: { stats: { Attack: 0, Defense: 0, Health: 0, 'March Speed': 0 } }
  };
});

afterEach(cleanup);

describe('Stats panel component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<StatsPanel {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
