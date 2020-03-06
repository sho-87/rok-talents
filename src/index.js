import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { isEmbed } from './utils';
import { homepage } from '../package.json';
import * as serviceWorker from './serviceWorker';
import App from './App';

const embed = isEmbed(window.location.pathname);

if (window.self === window.top || embed) {
  ReactGA.initialize('UA-114296077-2');
  ReactGA.pageview('/');

  const url = window.location.search;
  ReactDOM.render(
    <App url={url} isEmbed={embed} />,
    document.getElementById('root')
  );

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
} else {
  ReactDOM.render(
    <div>
      Please visit the full website at{' '}
      <a href={homepage} target="_blank" rel="noopener noreferrer">
        {homepage.split('//')[1]}
      </a>
    </div>,
    document.getElementById('root')
  );
}
