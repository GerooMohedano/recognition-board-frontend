import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';
import SignInForm from './pages/SignInForm/SignInForm';
import AppLayout from './layouts/AppLayout';
import Perfil from './pages/Perfil/Perfil';
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
              <Route path="/Enterprise" render={() => {
                return <Enterprise enterprise={ enterpriseClicked } />
              }} />
              <Route path="/Team/:idTeamClicked" render={() => {
                return <Team team={ teamClicked } />
              }} />
              <Route component={ PageNotFound } />
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
              <Route path="/sign-in" component={ SignInForm } />
            </div>
          </div>
        )
        }
      </Router>
    );
  }
}

export default App;
