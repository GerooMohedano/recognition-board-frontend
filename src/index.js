import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './containers/app/AppContainer';
import store from './routeStore';

ReactDOM.render(<AppContainer store={ store } />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
