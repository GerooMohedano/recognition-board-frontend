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
           team: ''
       };

       this.handleChange = this.handleChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
   }


handleChange = event => {

       this.setState({ [event.target.name]: event.target.value });
       this.setState({ name: event.target.value });
       this.setState({ [event.target.team]: event.target.value });
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
               <label className="FormField__Label" htmlFor="name">Nombre</label>
               <input type="text" id="team" className="FormField__Input" placeholder="Ingrese el nombre del equipo" team="team" value={this.state.team} onChange={this.handleChange} />
             </div>

             <label className="FormField__Label" htmlFor="adm">Adminstrador</label>
             <Select
               value={this.state.adm}
               onChange={this.handleChangeAdm}
               inputProps={{
                 name: 'adm'
               }}
             >
               <MenuItem value="">
                 <em>None</em>
               </MenuItem>
               <MenuItem value={10}>Magui</MenuItem>
               <MenuItem value={20}>Marcio</MenuItem>
               <MenuItem value={30}>Franco</MenuItem>
             </Select>

             <label className="FormField__Label" htmlFor="Users">Usuarios</label>

             <FormControl className={classes.formControl}>
                 <InputLabel htmlFor="select-multiple-checkbox">Usuarios</InputLabel>
                 <Select
                   multiple
                   value={this.state.name}
                   onChange={this.handleChange}
                   input={<Input id="select-multiple-checkbox" />}
                   renderValue={selected => selected.join(', ')}
                   MenuProps={MenuProps}
                 >
                   {names.map(name => (
                     <MenuItem key={name} value={name}>
                       <Checkbox checked={this.state.name.indexOf(name) > -1} />
                       <ListItemText primary={name} />
                     </MenuItem>
                   ))}
                 </Select>
             </FormControl>
             <div className="FormField">
             <input className="FormField__Input mr-20" type="file" onChange={this.fileSelectedHandler}/>
             <button className="FormField__Button__Up" onClick={this.fileUploadHandler}>Subir</button>

             <div className="FormField">
                 <button className="FormField__Button mr-20">Aceptar</button>
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
