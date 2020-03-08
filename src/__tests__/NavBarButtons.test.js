import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NavBarButtons from '../NavBarButtons';

afterEach(cleanup);

describe('Buttons', () => {
  it('disabled if no commander selected', () => {
    const calcPointsSpent = jest.fn();
    calcPointsSpent.mockReturnValue(0);

    const { getByTestId } = render(
      <NavBarButtons calcPointsSpent={calcPointsSpent} commander="" />
    );
    expect(getByTestId('button-reset')).toBeDisabled();
    expect(getByTestId('button-screenshot')).toBeDisabled();
    expect(getByTestId('button-share')).toBeDisabled();
  });

  it('disabled if no points spent', () => {
    const calcPointsSpent = jest.fn();
    calcPointsSpent.mockReturnValue(0);

    const { getByTestId } = render(
      <NavBarButtons calcPointsSpent={calcPointsSpent} commander="Richard I" />
    );
    expect(getByTestId('button-reset')).toBeDisabled();
    expect(getByTestId('button-screenshot')).toBeDisabled();
    expect(getByTestId('button-share')).toBeDisabled();
  });

  it('enabled if points have been spent', () => {
    const calcPointsSpent = jest.fn();
    calcPointsSpent.mockReturnValue(1);

    const { getByTestId } = render(
      <NavBarButtons calcPointsSpent={calcPointsSpent} commander="Richard I" />
    );
    expect(getByTestId('button-reset')).toBeEnabled();
    expect(getByTestId('button-screenshot')).toBeEnabled();
    expect(getByTestId('button-share')).toBeEnabled();
  });
});
