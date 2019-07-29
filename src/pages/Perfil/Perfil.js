import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HistoricChart from '@material-ui/icons/InsertChart';
import Gero from '../../images/gero.jpg';
import ChartPolygon from '../../commons/ChartPolygon';
import HistoricDialog from '../../commons/HistoricDialog';
import ProfileInfo from './ProfileInfo';
import AwardsList from './AwardsList';
import TeamsList from './TeamsList';


require('./Perfil.css');

const data = [
  {
    id: 1, subject: 'Be Accountable', A: 120, B: 110, fullMark: 150,
  },
  {
    id: 2, subject: 'Be Professional', A: 98, B: 130, fullMark: 150,
  },
  {
    id: 3, subject: 'Be Proactive', A: 86, B: 130, fullMark: 150,
  },
  {
    id: 4, subject: 'Be Collaborative', A: 99, B: 100, fullMark: 150,
  },
  {
    id: 5, subject: 'Be Hardito', A: 85, B: 90, fullMark: 150,
  }
];

const awards = [
  { id: 1, name: "Muy piola 1", description: "asd caso qw c qjwc qwo", achieved: true },
  { id: 2, name: "Muy piola 2", description: "asd caso qw c qjwc qwo", achieved: true },
  { id: 3, name: "Muy piola 3", description: "asd caso qw c qjwc qwo", achieved: false},
  { id: 4, name: "Muy piola 4", description: "asd caso qw c qjwc qwo", achieved: false },
  { id: 5, name: "Muy piola 5", description: "asd caso qw c qjwc qwo", achieved: true },
  { id: 6, name: "Muy piola 6", description: "asd caso qw c qjwc qwo", achieved: false },
  { id: 7, name: "Muy piola 7", description: "asd caso qw c qjwc qwo", achieved: true }
];

const teams = [
  { id: 1, name: "Octopus" },
  { id: 2, name: "Elephants" }
]

class Perfil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openHistoricDialog: false,
      configuring: false,
      profileInfo: {
        firstName: 'Geronimo',
        lastName: 'Mohedano',
        description: 'Cool guy'
      }
    };
  }

  changeHistoricDialogState = value => {
    this.setState({ openHistoricDialog: value });
  }

  changeConfiguring = value => {
    this.setState({ configuring: value});
  }

  changeInfo = (newFirstName, newLastName, newDescription) => {
    this.setState({
      firstName: newFirstName, lastName: newLastName, description: newDescription
    });
  }

  render() {
    const { openHistoricDialog, configuring, profileInfo } = this.state;
    return (
      <div>
        <div className="profileTitle">
          <div className="profileName">geronimo.mohedano</div>
        </div>
        <div className="profileDescription">
          <div className="profilePhoto">
            <Avatar alt="Remy Sharp" src={Gero} className="profileAvatar" />
            {configuring && (<input type="file" />)}
          </div>
          <ProfileInfo
            configuring={configuring}
            name="geronimo.mohedano"
            info={profileInfo}
            changeInfo={this.changeInfo}
            changeConfiguring={this.changeConfiguring}
          />
          <div className="profileChartContainer">
            <ChartPolygon data={data} width={500} height={300} />
          </div>
          <Button color="secondary" onClick={() => this.changeHistoricDialogState(true)}>
            <HistoricChart />
          </Button>
          <HistoricDialog
            open={openHistoricDialog}
            handleClose={() => this.changeHistoricDialogState(false)}
            selectValues={data.map(value => ({ id: value.id, name: value.subject}))}
          />
        </div>
        <AwardsList
          awards={awards}
        />
        <TeamsList
          teams={teams}
        />
      </div>
    );
  }
}

Perfil.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Perfil;
