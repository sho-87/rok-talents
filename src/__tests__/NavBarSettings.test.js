import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NavBarSettings from '../NavBarSettings';

afterEach(cleanup);

describe('Nav bar settings component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NavBarSettings />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
