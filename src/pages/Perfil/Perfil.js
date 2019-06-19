import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
//import RadarChart from 'react-svg-radar-chart';
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
import Gero from '../../images/gero.jpg';
import ChartPolygon from '../../commons/ChartPolygon';

require('./Perfil.css');

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
bigAvatar: {
  margin: 10,
  width: 80,
  height: 80,
},
});
const stylesLogros = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}
class GuttersGrid extends React.Component {
  state = {
    spacing: '16',
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };


    render() {
      const { classes } = this.props;
      const { spacing } = this.state;

      const data = [
        {
           data: {
             friendly: 0.7,
             collaborative: .8,
             adaptability: 0.9,
             creativity: 0.67,
             punctual: 0.8
           },
           meta: { color: 'blue' }
         },
         {
           data: {
             battery: 0.6,
             design: .85,
             useful: 0.5,
             speed: 0.6,
             weight: 0.7
           },
           meta: { color: 'red' }
         }
      ];

      const datachart = [
        {
          subject: 'BeProfessional', A: 120, B: 110, fullMark: 150,
        },
        {
          subject: 'BeCollaborative', A: 98, B: 130, fullMark: 150,
        },
        {
          subject: 'MissSympathy', A: 86, B: 130, fullMark: 150,
        },
        {
          subject: 'Behardito', A: 99, B: 100, fullMark: 150,
        },
        {
          subject: 'BeProblematic', A: 85, B: 90, fullMark: 150,
        },
        {
          subject: 'BePerfect', A: 65, B: 85, fullMark: 150,
        },
      ];
 const captions = {
   // columns
   friendly: 'Friendly',
   collaborative:'Collaborative',
   adaptability: 'Adaptability',
   creativity: 'Creativity',
   punctual: 'Punctual',
   intelligent: 'intelligent'
 };

        return (
          <div class="app-layout">
            <div class="boxes perfil">
              <label className="FormField__Label" htmlFor="name">GERO MOHEDANO</label>
              <Grid container justify="center" alignItems="center">
                   <Avatar alt="Remy Sharp" src={Gero} className={classes.bigAvatar} />
                 </Grid>
              <input className="FormField__Input mr-20" type="file" onChange={this.fileSelectedHandler}/>
            </div>
            <div class="boxes pizarras">
                <label className="FormField__Label" htmlFor="name">Mis pizarras</label>
                <List component="nav">
                  <ListItemLink href="#pizarraactiva">
                    <ListItemText primary="Elephants" />
                  </ListItemLink>
                  <ListItemLink href="#pizarraactiva">
                    <ListItemText primary="Octopus" />
                  </ListItemLink>
                </List>
            </div>
            <div class="boxes logros">
                <label className="FormField__Label" htmlFor="name">Mis Logros</label>

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
            <div class="boxes chart">
              <label className="FormField__Label" htmlFor="name">Histórico</label>

                <ChartPolygon data = {datachart}/>

            </div>
          </div>
        );
    }
}
GuttersGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GuttersGrid);
