import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppLayout from '../appLayout/AppLayoutContainer';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#b2e0f3',
      main: '#3F5A72',
      dark: '#123147',
      contrastText: '#fff'
    },
    secondary: {
      light: '#6BEBFF',
      main: '#14B9F1',
      dark: '#0089BE',
      contrastText: '#000'
    }
  },
  typography: {
    useNextVariants: true,
  }
});

class AppContainer extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { store } = this.props;

    return (
      <Provider store={ store }>
        <BrowserRouter>
          <div>
            <MuiThemeProvider theme={ theme } >
              <AppLayout />
            </MuiThemeProvider>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

AppContainer.propTypes = {
  store: PropTypes.shape({})
};

export default AppContainer;
