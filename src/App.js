import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';
import store from './routeStore';
import { baseUrl } from './shared/jsUtils/Utils';
import request from './shared/jsUtils/request';
import SignInForm from './pages/SignInForm/SignInForm';
import AppLayout from './layouts/AppLayoutContainer';
import Perfil from './pages/Perfil/PerfilContainer';
import Enterprise from './pages/Enterprise/EnterpriseContainer';
import Team from './pages/Team/TeamContainer';
import TeamConfig from './pages/TeamConfig/TeamConfigContainer';
import RememberPasswordForm from './pages/RememberPasswordForm/RememberPasswordForm';
import PageNotFound from './pages/Errors/PageNotFound';

require('./App.css');

class App extends Component {
  state = {
    isLoggedIn: false,
    userInfo: {},
    error: {}
  }

  login = (loginInfo) => {
    return request.post(`${baseUrl()}/tercerLogin`, loginInfo)
      .then(response => this.setState({ userInfo: response }))
      .catch(error => this.setState({ error: error }));
  }

  logout = () => this.setState({ userInfo: {}, error: {}, isLoggedIn: false })

  componentDidUpdate(prevProps, prevState) {
    const { userInfo, error } = this.state;
    console.log(userInfo);
    if (prevState.userInfo !== userInfo
      && userInfo !== undefined
      && Object.entries(userInfo).length !== 0
      && Object.entries(error).length === 0
      && userInfo.data.data.length !== 0) {
      this.setState({ isLoggedIn: true });
    }
  }

  render() {
    const { isLoggedIn, userInfo } = this.state;
    return (
      <Provider store={ store }>
        <Router>
          { (isLoggedIn) ?
          (
            <div>
              <Route path="/" render={() => {
                return <AppLayout
                  logout={this.logout}
                  loginInfo={userInfo}
                />
              }} />
              <Switch>
                <Route path="/Perfil/:idUsuario" component={ Perfil } />
                <Route path="/TeamConfig/:idTeam" component={ TeamConfig } />
                <Route path="/Enterprise/:idEmpresa" component={ Enterprise } />
                <Route path="/Team/:idTeam" component={ Team } />
                <Route component={ PageNotFound } />
              </Switch>
            </div>
          )
          :
          (
            <Route path="/" render={() => {
              return <SignInForm
                login={this.login}
              />
            }} />
          )
          }
        </Router>
      </Provider>
    );
  }
}

export default App;
