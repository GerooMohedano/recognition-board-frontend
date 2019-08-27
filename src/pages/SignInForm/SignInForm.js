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

  handleChange = (value, field) => {
      this.setState({ [field]: value });
  }

  signIn = () => {
      console.log('The form was submitted with the following data:');
      console.log(this.state);
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
            vertical: 'bottom',
            horizontal: 'left',
          }}
          variant="error"
          open={wrongPassword}
          autoHideDuration={6000}
          onClose={() => this.setState({ wrongPassword: false})}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Wrond user name or password!</span>}
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
  login: PropTypes.func.isRequired
};

export default SignInForm;
