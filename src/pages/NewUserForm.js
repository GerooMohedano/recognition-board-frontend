import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import classNames from 'classnames';
import ListItemText from '@material-ui/core/ListItemText';


const styles = theme => ({
 root: {
   display: 'flex',
   flexWrap: 'wrap',
 },
 formControl: {
   margin: theme.spacing.unit,
   minWidth: 120,
   maxWidth: 300,
 },
 chips: {
   display: 'flex',
   flexWrap: 'wrap',
 },
 chip: {
   margin: theme.spacing.unit / 4,
 },
 noLabel: {
   marginTop: theme.spacing.unit * 3,
 },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
 PaperProps: {
   style: {
     maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
     width: 250,
   },
 },
};

const names = [
 'Tony Forns',
 'Diego Cruz',
 'Maxi Ibañez',
 'Pame Ruiz',
 'Facundo Ledesma',
];

function getStyles(name, that) {
 return {
   fontWeight:
     that.state.name.indexOf(name) === -1
       ? that.props.theme.typography.fontWeightRegular
       : that.props.theme.typography.fontWeightMedium,
 };
}


class MultipleSelect extends Component {
   constructor() {
       super();

       this.state = {
           adm: '',
           hasAgreed: false,
           name: [],
           user: ''
       };

       this.handleChange = this.handleChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
   }


handleChange = event => {

       this.setState({ [event.target.name]: event.target.value });
       this.setState({ name: event.target.value });
       this.setState({ [event.target.user]: event.target.value });
       console.log(event.target);
       console.log(this.state.adm);
   }

   handleChangeAdm = event => {
           this.setState({ [event.target.name]: event.target.value });
       }

   handleSubmit(e) {
       e.preventDefault();

       console.log('The form was submitted with the following data:');
       console.log(this.state);
   }


   render() {
     const { classes } = this.props;

       return (
       <div className="FormCenter">
           <form onSubmit={this.handleSubmit} className="FormFields">
             <div className="FormField">
               <label className="FormField__Label" htmlFor="name">Nombre y Apellido</label>
               <input type="text" id="user" className="FormField__Input" placeholder="Ingrese el nombre y apellido del Usuario" user="user" value={this.state.user} onChange={this.handleChange} />
             </div>

             <div className="FormField">
               <label className="FormField__Label" htmlFor="email">Dirección de E-Mail</label>
               <input type="email" id="email" className="FormField__Input" placeholder="Ingrese su email" name="email" value={this.state.email} onChange={this.handleChange} />
             </div>

             <div className="FormField">
               <label className="FormField__Label" htmlFor="password">Contraseña</label>
               <input type="password" id="password" className="FormField__Input" placeholder="Ingrese su contraseña" name="password" value={this.state.password} onChange={this.handleChange} />
             </div>
             <div className="FormField">
             <label className="FormField__CheckboxLabel">
                 <input className="FormField__Checkbox" type="checkbox" name="hasAgreed" value={this.state.hasAgreed} onChange={this.handleChange} /><label className="FormField__LabelCheck" htmlFor="password">El usuario deberá cambiar la contraseña en el próximo inicio de sesión</label>
             </label>
           </div>

             <label className="FormField__Label" htmlFor="adm">Rol</label>
             <Select
               value={this.state.adm}
               onChange={this.handleChangeAdm}
               inputProps={{
                 name: 'adm'
               }}
             >
               <MenuItem value="">
               </MenuItem>
               <MenuItem value={1}>Administrador</MenuItem>
               <MenuItem value={2}>Usuario</MenuItem>
             </Select>

             <div className="FormField">
             <input className="FormField__Input mr-20" type="file" onChange={this.fileSelectedHandler}/>
             <button className="FormField__Button__Up" onClick={this.fileUploadHandler}>Subir</button>

             <div className="FormField">
                 <button className="FormField__Button mr-20">Guardar</button>
             </div>
             <div className="FormField">
                 <button className="FormField__Button mr-20">Cancelar</button>
             </div>


             </div>

           </form>

         </div>

       );
   }
}


MultipleSelect.propTypes = {
 classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MultipleSelect);
