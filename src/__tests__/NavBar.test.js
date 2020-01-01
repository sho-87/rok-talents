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

  describe('Commander select', () => {
    it('displays commander name', () => {
      const { getByTestId } = render(
        <NavBar {...props} commander="Richard I" />
      );
      expect(getByTestId('select-commander')).toHaveTextContent('Richard I');
    });

    it('displays "Commander" if no commander selected', () => {
      const { getByTestId } = render(<NavBar {...props} commander="" />);
      expect(getByTestId('select-commander')).toHaveTextContent('Commander');
    });
  });

  describe('Buttons', () => {
    it('disabled if no commander selected', () => {
      const calcPointsSpent = jest.fn();
      calcPointsSpent.mockReturnValue(0);

      const { getByTestId } = render(
        <NavBar calcPointsSpent={calcPointsSpent} commander="" />
      );
      expect(getByTestId('button-copy')).toBeDisabled();
      expect(getByTestId('button-reset')).toBeDisabled();
    });

    it('disabled if no points spent', () => {
      const calcPointsSpent = jest.fn();
      calcPointsSpent.mockReturnValue(0);

      const { getByTestId } = render(
        <NavBar calcPointsSpent={calcPointsSpent} commander="Richard I" />
      );
      expect(getByTestId('button-copy')).toBeDisabled();
      expect(getByTestId('button-reset')).toBeDisabled();
    });

    it('enabled if points have been spent', () => {
      const calcPointsSpent = jest.fn();
      calcPointsSpent.mockReturnValue(1);

      const { getByTestId } = render(
        <NavBar calcPointsSpent={calcPointsSpent} commander="Richard I" />
      );
      expect(getByTestId('button-copy')).toBeEnabled();
      expect(getByTestId('button-reset')).toBeEnabled();
    });
  });
});
