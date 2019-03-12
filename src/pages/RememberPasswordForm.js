import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';

require('./SignInForm.css');

class RememberPasswordForm extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            address: '',
            telephone: '',
            selectedFile: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    fileSelectedHandler = event => {
      this.setState({
        selectedFile: event.target.files[0]
      })
    }
    fileUploadHandler = () => {
      axios.post('')
    }
    handleChange(e) {

        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        let address = target.address;
        let telephone = target.telephone
        this.setState({
          [name]: name,
          [address]:address,
          [telephone]:telephone
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        console.log('The form was submitted with the following data:');
        console.log(this.state);
    }

    render() {
        return (


        <div className="FormCenter">
            <form onSubmit={this.handleSubmit} className="FormFields" onSubmit={this.handleSubmit}>
            <label className="FormTitle__Link" htmlFor="pass">¿Olvidaste la contraseña?</label>
            <label className="FormField__Label2" htmlFor="txt">Si deseas reestablecer tu contraseña, ingresa tu dirección de correo electrónico.</label>
            <div className="FormField">
              <label className="FormField__Label" htmlFor="email">Dirección de E-Mail</label>
              <input type="email" id="email" className="FormField__Input" placeholder="Ingrese su email" name="email" value={this.state.email} onChange={this.handleChange} />
            </div>

            <div className="FormField">
              <label className="FormField__Label" htmlFor="email">Confirmar Dirección de E-Mail</label>
              <input type="email" id="email" className="FormField__Input" placeholder="Confirmar email" name="email" value={this.state.email} onChange={this.handleChange} />
            </div>

              <div className="FormField">
                  <button className="FormField__Button mr-20">Enviar</button>
              </div>

            </form>
          </div>
        );
    }
}

export default RememberPasswordForm;
