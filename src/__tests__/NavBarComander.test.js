import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NavBarCommander from '../NavBarCommander';

beforeEach(() => {
  global.document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document
    }
  });
});

afterEach(cleanup);

describe('Nav bar commander select component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NavBarCommander />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('displays commander name', () => {
    const { getByTestId } = render(<NavBarCommander commander="Richard I" />);
    expect(getByTestId('select-commander')).toHaveTextContent('Richard I');
  });

  it('displays commander short name instead of full name', () => {
    const { getByTestId } = render(
      <NavBarCommander commander="Alexander the Great" />
    );
    expect(getByTestId('select-commander')).not.toHaveTextContent(
      'Alexander the Great'
    );
    expect(getByTestId('select-commander')).toHaveTextContent('Alexander');
  });

  it('displays "Commander" if no commander selected', () => {
    const { getByTestId } = render(<NavBarCommander commander="" />);
    expect(getByTestId('select-commander')).toHaveTextContent('Commander');
  });

  it('shows the correct commander image', () => {
    const { getByTestId } = render(<NavBarCommander commander="Richard I" />);
    expect(getByTestId('select-commander-icon')).toHaveAttribute(
      'src',
      '/images/commanders/Richard I.png'
    );
  });
});
