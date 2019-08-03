import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';
import store from './routeStore';
import SignInForm from './pages/SignInForm/SignInForm';
import AppLayout from './layouts/AppLayout';
import Perfil from './pages/Perfil/PerfilContainer';
import Enterprise from './pages/Enterprise/Enterprise';
import Team from './pages/Team/Team';
import RememberPasswordForm from './pages/RememberPasswordForm/RememberPasswordForm';
import PageNotFound from './pages/Errors/PageNotFound';
import TeamConfig from './pages/TeamConfig/TeamConfig';

require('./App.css');

class App extends Component {
  state = {
    teamClicked: '',
    enterpriseClicked: ''
  }

  updateTeamClicked = newTeamClicked => {
    this.setState({ teamClicked: newTeamClicked });
  }

  updateEnterpriseClicked = newEnterpriseClicked => {
    this.setState({ enterpriseClicked: newEnterpriseClicked });
  }

  render() {
    const isLoggedIn = true;
    const { teamClicked, enterpriseClicked } = this.state;
    return (
      <Provider store={ store }>
        <Router>
          { (isLoggedIn) ?
          (
            <div>
              <Route path="/" render={() => {
                return <AppLayout
                  updateTeamClicked={ this.updateTeamClicked }
                  updateEnterpriseClicked={ this.updateEnterpriseClicked }
                />
              }} />
              <Switch>
                <Route path="/Signin" component={ SignInForm } />
                <Route path="/Perfil/:idUsuario" component={ Perfil } />
                <Route path="/TeamConfig" render={() => {
                  return <TeamConfig
                    team={ teamClicked }
                    changeTeamName={ this.updateTeamClicked }
                    teamLeader={1}
                  />
                }} />
                <Route path="/Enterprise/:idEmpresa" component={ Enterprise } />
                <Route path="/Team/:idTeamClicked" render={() => {
                  return <Team team={ teamClicked } />
                }} />
                <Route component={ PageNotFound } />
              </Switch>
            </div>
          )
          :
          (
            <Route path="/sign-in" component={ SignInForm } />
          )
          }
        </Router>
      </Provider>
    );
  }
}

export default App;
