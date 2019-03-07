import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppLayout from './layouts/AppLayout';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AppLayout />, document.getElementById('root'));
registerServiceWorker();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
