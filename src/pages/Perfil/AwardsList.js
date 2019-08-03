import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

require('./Perfil.css');

class AwardsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  convertDate = isoDate => {
    const date = new Date(isoDate);
    return date.toDateString();
  }

  render() {
    const { awards } = this.props;
    return (
      <div className="cardContainerTeams">
        <Card className="cardForTeam">
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Awards
            </Typography>
            <List component="nav">
              {awards.map(award => (
                <ListItem>
                  <ExpansionPanel style={{ width: '100%' }}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <ListItemText
                        inset
                        primary={award.nombre_logro}
                        secondary={`Obtained on ${this.convertDate(award.fecha)}`}
                        className="textOfListTeams"
                      />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Typography>
                        {award.descripcion}
                      </Typography>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </div>
    );
  }
}

AwardsList.propTypes = {
  awards: PropTypes.array.isRequired
};

export default AwardsList;
