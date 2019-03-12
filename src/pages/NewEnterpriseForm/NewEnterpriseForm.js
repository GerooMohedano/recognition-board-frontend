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

require('../SignInForm/SignInForm.css');

class NewEnterpriseForm extends Component {
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
      console.log("somthing");
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
            <div className="FormField">
                <label className="FormField__Label" htmlFor="nombre">Nombre</label>
                <input type="nombre" id="nombre" className="FormField__Input" placeholder="Ingrese el nombre de la empresa" nombre="nombre" value={this.state.nombre} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="domicilio">Domicilio</label>
                <input type="domicilio" id="domicilio" className="FormField__Input" placeholder="Ingrese el domicilio de la empresa" address="domicilio" value={this.state.domicilio} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="telefono">Teléfono</label>
                <input type="telefono" id="telefono" className="FormField__Input" placeholder="Ingrese el telefono de la empresa" telephone="telefono" value={this.state.telefono} onChange={this.handleChange} />
              </div>

              <input type="file" onChange={this.fileSelectedHandler}/>
              <button onClick={this.fileUploadHandler}>Subir</button>

              <div className="FormField">
                  <button className="FormField__Button mr-20">Guardar</button>
              </div>
              <div className="FormField">
                  <button className="FormField__Button mr-20">Cancelar</button>
              </div>

            </form>
          </div>
        );
    }
}

export default NewEnterpriseForm;
