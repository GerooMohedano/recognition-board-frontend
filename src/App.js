import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';
import SignInForm from './pages/SignInForm/SignInForm';
import AppLayout from './layouts/AppLayout';
import Perfil from './pages/Perfil/Perfil';
import NewEnterpriseForm from './pages/NewEnterpriseForm/NewEnterpriseForm';
import NewTeamForm from './pages/NewTeamForm/NewTeamForm';
import NewUserForm from './pages/NewUserForm/NewUserForm';
import Team from './pages/Team/Team';
import Enterprise from './pages/Enterprise/Enterprise';
import RememberPasswordForm from './pages/RememberPasswordForm/RememberPasswordForm';
import PageNotFound from './pages/Errors/PageNotFound';

require('./App.css');

class App extends Component {
  render() {
    const isLoggedIn = true;
    return (
      <Router>
        { (isLoggedIn) ?
        (
          <div>
            <Route path="/" component={AppLayout} />
            <Switch>
              <Route path="/NewEnterpriseForm" component={NewEnterpriseForm} />
              <Route path="/Signin" component={SignInForm} />
              <Route path="/Perfil" component={Perfil} />
              <Route path="/NewTeamForm" component={NewTeamForm} />
              <Route path="/NewUserForm" component={NewUserForm} />
              <Route path="/Team" component={Team} />
              <Route path="/Enterprise" component={Enterprise} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
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
