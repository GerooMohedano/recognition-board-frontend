import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import SignInForm from './pages/SignInForm';
import AppLayout from './layouts/AppLayout';
import RememberPasswordForm from './pages/RememberPasswordForm';

import './App.css';

class App extends Component {
  render() {
    const isLoggedIn = true;
    return (
      <Router>
        { (isLoggedIn) ?
        (
          <Route path="/" component={AppLayout} />
        )
        :
        (
          <div className="App">
            <div className="App__Aside" />
            <div className="App__Form">
              <div className="FormTitle">
                <NavLink to="/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Ingresar</NavLink>
              </div>
              <Route path="/sign-in" component={SignInForm} />
            </div>
          </div>
        )
        }
      </Router>
    );
  }
}

export default App;
