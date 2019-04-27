import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import RadarChart from 'react-svg-radar-chart';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Radar from 'react-d3-radar';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';

import Gero from '../../images/gero.jpg';

require('./Achievement.css');

const styles = theme => ({
  textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}


  class TextFields extends React.Component {
  state = {
    punctuation: '',
  };

  handleChangePunctuation = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };


    render() {
      const { classes } = this.props;
      const { spacing } = this.state;



        return (
          <div class="app-layout">
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
               <div className="FormField">
                   <button className="FormField__Button mr-20">Crear Logro</button>
                   <button className="FormField__Button mr-20">Modificar Logro</button>
               </div>
            </div>
            <div class="box Admin">
              <label className="FormField__Label" htmlFor="name">Crear Logro</label>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="nombre">Nombre</label>
                <input type="nombre" id="nombre" className="FormField__Input" placeholder="Ingrese el nombre del logro" nombre="nombre" value={this.state.nombre} onChange={this.handleChange} />
              </div>
              <TextField
                id="standard-number"
                label="Puntaje"
                value={this.state.punctuation}
                onChange={() => this.handleChangePunctuation('punctuation')}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
            </div>
          </div>
        );
    }
}
TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
