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
    const wrongDate = new Date(isoDate);
    const date = new Date(wrongDate.getTime() + Math.abs(wrongDate.getTimezoneOffset()*60000));
    return date.toDateString();
  }

  getDataOfEarned = idLogro => {
    const { awards } = this.props;
    const awardIndex = awards.findIndex(award => award.idLogro === idLogro);
    return awardIndex === -1 ? "" : `Obtained on ${this.convertDate(awards[awardIndex].fecha)}`;
  }

  getDescriptionOfEarned = idLogro => {
    const { awards } = this.props;
    const awardIndex = awards.findIndex(award => award.idLogro === idLogro);
    return awardIndex === -1 ? "" : awards[awardIndex].descripcion;
  }

  isAwardEarned = idLogro => {
    const { awards } = this.props;
    const awardIndex = awards.findIndex(award => award.idLogro === idLogro);
    return awardIndex === -1 ? false : true;
  }

  render() {
    const { everyAward } = this.props;
    if (everyAward !== undefined)
      return (
        <div className="cardContainerTeams">
          <Card className="cardForTeam">
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Awards
              </Typography>
              <List component="nav">
                {everyAward.map(award => (
                  <ListItem>
                    <ExpansionPanel
                      style={{ width: '100%' }}
                      disabled={!this.isAwardEarned(award.idLogro)}
                    >
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <ListItemText
                          inset
                          primary={award.nombre_logro}
                          secondary={this.getDataOfEarned(award.idLogro)}
                          className="textOfListTeams"
                        />
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography>
                          {this.getDescriptionOfEarned(award.idLogro)}
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
    else {
      return null;
    }
  }
}

AwardsList.propTypes = {
  awards: PropTypes.array.isRequired,
  everyAward: PropTypes.array.isRequired
};

export default AwardsList;
