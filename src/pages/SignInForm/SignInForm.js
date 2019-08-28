import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';

require('./SignInForm.css');

class SignInForm extends Component {
  constructor() {
      super();
      this.state = {
          userName: '',
          password: '',
          wrongPassword: false
      };
  }

  componentDidUpdate(prevProps) {
    const { loginInfo } = this.props;
    if (prevProps.loginInfo !== loginInfo && loginInfo && loginInfo.data.status === "OK") {
      this.setState({ wrongPassword: true });
    }
  }

  handleChange = (value, field) => {
      this.setState({ [field]: value });
  }

  render() {
    const { login } = this.props;
    const { userName, password, wrongPassword } = this.state;
    return (
      <div className="App">
        <div className="App__Aside" />
        <div className="App__Form">
          <div className="FormCenter">
            <div className="FormField">
              <TextField
                label="Enter your user name"
                defaultValue={userName}
                onChange={event => this.handleChange(event.target.value, 'userName')}
              />
            </div>
            <div className="FormField">
              <TextField
                type="password"
                label="Enter your password"
                defaultValue={password}
                onChange={event => this.handleChange(event.target.value, 'password')}
              />
            </div>
            <div className="FormField">
              <Button
                onClick={() => login({ nombre: userName, contrasenia: password })}
                color="primary"
              >
                Enter
              </Button>
            </div>
          </div>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          variant="error"
          open={wrongPassword}
          autoHideDuration={6000}
          onClose={() => this.setState({ wrongPassword: false})}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Wrong user name or password!</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="secondary"
              onClick={() => this.setState({ wrongPassword: false})}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

SignInForm.propTypes = {
  login: PropTypes.func.isRequired,
  loginInfo: PropTypes.shape({}).isRequired
};

export default SignInForm;
