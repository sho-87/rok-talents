import React from 'react';
import ReactDOM from 'react-dom';
import {
  InvalidBuildModal,
  AboutModal,
  CopyToast,
  PrereqToast,
  PointLimitToast,
  TalentTooltip
} from '../Modals';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<InvalidBuildModal />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AboutModal />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CopyToast />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PrereqToast />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PointLimitToast />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  let props = { target: 'body' };

  const div = document.createElement('div');
  ReactDOM.render(<TalentTooltip {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
