import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';

require('./Achievement.css');

const styles = theme => ({
  container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
    root:{
      color: green[600],
    },
    checked : {}
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}


  class FilledTextFields extends React.Component {
  state = {
    punctuation: '',
    checkedB: true,
    checkedA: true,
    CheckedC: true,

  };

/*  handleChangePunctuation = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };*/

handleSaveClick = () => {
  console.log("LA CONCHA DE LA LORA");
}

handleChangePunctuation = name => event =>{
  this.setState({
    [name] : event.target.value,
  });
}
handleChangeCheck = name => event => {
  this.setState({ [name]: event.target.checked });
}


    render() {
      const { classes } = this.props;
      const { spacing } = this.state;



        return (
          <div class="app-layout2">
            <div class="box Listado">
            <label className="FormField__Label" htmlFor="name">Lista de Logros</label>

                <div className={classes.root}>
                 <ExpansionPanel>
                   <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                     <Typography className={classes.heading}>Fellowship</Typography>
                   </ExpansionPanelSummary>
                   <ExpansionPanelDetails>
                     <Typography>
                       Felicidades buen compañero! Obtuviste 10 puntos en Be collaborative
                     </Typography>
                   </ExpansionPanelDetails>
                 </ExpansionPanel>
                 <ExpansionPanel>
                   <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                     <Typography className={classes.heading}>Pro Programer</Typography>
                   </ExpansionPanelSummary>
                   <ExpansionPanelDetails>
                     <Typography>
                       Felicidades Programador! Obtuviste 10 puntos en Be proffessional
                     </Typography>
                   </ExpansionPanelDetails>
                 </ExpansionPanel>
                 <ExpansionPanel disabled>
                   <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                     <Typography className={classes.heading}>Miss Simpatia</Typography>
                   </ExpansionPanelSummary>
                 </ExpansionPanel>
                 <ExpansionPanel disabled>
                   <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                     <Typography className={classes.heading}>Pro Lider</Typography>
                   </ExpansionPanelSummary>
                 </ExpansionPanel>
               </div>
            </div>
            <div class="box Admin">
              <label className="FormField__Label" htmlFor="name">Crear Logro</label>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="nombre">Nombre</label>
                <input type="nombre" id="nombre" className="FormField__Input" placeholder="Ingrese el nombre del logro" nombre="nombre" value={this.state.nombre} onChange={this.handleChange} />
              </div>
                <form className={classes.container} noValidate autoComplete="off">
                  <TextField
                    id="standard-number"
                    label="Puntaje"
                    value={this.state.punctuation}
                    onChange={this.handleChangePunctuation('punctuation')}
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"
                  />
               </form>
               <div className="FormField">
               <FormGroup row>
                 <FormControlLabel
                 control={
                   <Switch
                     checked={this.state.checkedA}
                     onChange={this.handleChangeCheck('checkedA')}
                     value="checkedA"
                     color="primary"
                   />
                 }
                 label = "Mayor"
                 />
                 <FormControlLabel
                 control={
                   <Switch
                     checked={this.state.checkedC}
                     onChange={this.handleChangeCheck('checkedC')}
                     value="checkedC"
                     color="primary"
                   />
                 }
                 label = "Menor"
                 />
                 <FormControlLabel
                   control={
                     <Checkbox
                       checked={this.state.checkedB}
                       onChange={this.handleChangeCheck('checkedB')}
                       value="checkedB"
                       color="primary"
                     />
                   }
                   label="Incluir notas de usuarios de otros equipos"
                 />
               </FormGroup>
               </div>
               <div className="FormField">
                   <button className="FormField__Button mr-20" onClick={this.handleSaveClick}>Guardar</button>
                   <button className="FormField__Button mr-20">Cancelar</button>
               </div>
              </div>

          </div>
        );
    }
}

FilledTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilledTextFields);
