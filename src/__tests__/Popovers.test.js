import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TalentTooltip } from '../Popovers';

let props;
beforeEach(() => {
  props = { target: 'body', calcPointsRemaining: jest.fn() };
});

afterEach(cleanup);

describe('Popover', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TalentTooltip {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
