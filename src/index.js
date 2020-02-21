import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import * as serviceWorker from './serviceWorker';
import App from './App';

if (window.self === window.top) {
  ReactGA.initialize('UA-114296077-2');
  ReactGA.pageview('/');

  const url = window.location.search;
  ReactDOM.render(<App url={url} />, document.getElementById('root'));

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
} else {
  ReactDOM.render(
    <div>
      Content embedding is disabled. Please visit the original website at{' '}
      <a
        href="https://www.roktalents.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        roktalents.com
      </a>
    </div>,
    document.getElementById('root')
  );
}
