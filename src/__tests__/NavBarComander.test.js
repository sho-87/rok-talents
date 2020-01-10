import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NavBarCommander from '../NavBarCommander';

afterEach(cleanup);

describe('Nav bar commander component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NavBarCommander />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('shows the correct commander image', () => {
    const { getByTestId } = render(<NavBarCommander commander="Richard I" />);
    expect(getByTestId('select-commander-icon')).toHaveAttribute(
      'src',
      'images/commanders/Richard I.png'
    );
  });
});
