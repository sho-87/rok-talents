import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './styles/index.css';

const url = window.location.search;

ReactDOM.render(<App url={url} />, document.getElementById('root'));
ReactGA.initialize('UA-114296077-2');
ReactGA.pageview('/');

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
