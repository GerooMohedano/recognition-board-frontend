import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import SignInForm from './pages/SignInForm';
import NewEnterpriseForm from './pages/NewEnterpriseForm';
import NewTeamForm from './pages/NewTeamForm';
import NewUserForm from './pages/NewUserForm';
import RememberPasswordForm from './pages/RememberPasswordForm';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router basename="/react-auth-ui/">
        <div className="App">
          <div className="App__Aside"></div>
          <div className="App__Form">

              <div className="FormTitle">
                  <NavLink to="/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Ingresar</NavLink>
              </div>

              <Route path="/sign-in" component={SignInForm}>
              </Route>
          </div>

        </div>
      </Router>
    );
  }
}

export default App;
