import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

require('./SignInForm.css');

class SignInForm extends Component {
  constructor() {
      super();
      this.state = {
          userName: '',
          password: ''
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
    const { userName, password } = this.state;
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
                label="Enter your password"
                defaultValue={password}
                onChange={event => this.handleChange(event.target.value, 'password')}
              />
            </div>
            <div className="FormField">
              <Button
                onClick={() => this.signIn()}
                color="primary"
              >
                Enter
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignInForm;
