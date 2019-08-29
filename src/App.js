import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';
import store from './routeStore';
import { baseUrl } from './shared/jsUtils/Utils';
import request from './shared/jsUtils/request';
import SignInForm from './pages/SignInForm/SignInForm';
import Welcome from './pages/Welcome';
import AppLayout from './layouts/AppLayoutContainer';
import Perfil from './pages/Perfil/PerfilContainer';
import Enterprise from './pages/Enterprise/EnterpriseContainer';
import Team from './pages/Team/TeamContainer';
import TeamConfig from './pages/TeamConfig/TeamConfigContainer';
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
                <Route path="/" exact component={ Welcome } />
                <Route path="/Perfil/:idUsuario" render={(routeProps) => {
                  return <Perfil
                    {...routeProps}
                    loginInfo={userInfo}
                  />
                }} />
                <Route path="/TeamConfig/:idTeam" component={ TeamConfig } />
                <Route path="/Enterprise/:idEmpresa" render={(routeProps) => {
                  return <Enterprise
                    {...routeProps}
                    loginInfo={userInfo}
                  />
                }} />
                <Route path="/Team/:idTeam" render={(routeProps) => {
                  return <Team
                    {...routeProps}
                    loginInfo={userInfo}
                  />
                }} />
                <Route component={ PageNotFound } />
              </Switch>
            </div>
          )
          :
          (
            <Route path="/" render={() => {
              return <SignInForm
                login={this.login}
                loginInfo={userInfo}
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
