import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import RadarChart from 'react-svg-radar-chart';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
            <div class="box tweets">Perfil</div>
            <div class="box replies">
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
            <div class="box search">
                <label className="FormField__Label" htmlFor="name">Logros</label>
            </div>
            <div class="box messages">
                                    <RadarChart
                                      captions={{
                                        // columns
                                        friendly: 'Friendly',
                                        collaborative:'Collaborative',
                                        adaptability: 'Adaptability',
                                        creativity: 'Creativity',
                                        punctual: 'Punctual',
                                        intelligent: 'intelligent'
                                      }}
                                      data={[
                                        // data
                                        {
                                          data: {
                                            friendly: 0.7,
                                            collaborative: .8,
                                            adaptability: 0.9,
                                            creativity: 0.67,
                                            punctual: 0.8,
                                            intelligent:0.8
                                          },
                                          meta: { color: '#58FCEC' }
                                        },
                                      ]}
                                      size={250}
                                    >

                                    </RadarChart>

            </div>
          </div>
        );
    }
}
GuttersGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GuttersGrid);
