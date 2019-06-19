import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import InputBase from '@material-ui/core/InputBase';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Yella from '../../images/yella.jpg';
import ValuesList from './ValuesList';

require('../../commons/Team.css');

const data = [
  { id: 1, name: 'Magui' },
  { id: 2, name: 'Romy' },
  { id: 3, name: 'Gero' },
  { id: 4, name: 'Pame' },
  { id: 5, name: 'Marcio' },
  { id: 6, name: 'LuisMi' },
  { id: 7, name: 'Tony' }
]

class TeamConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTeamName: this.props.team,
      newTeamLeader: this.props.teamLeader ? this.props.teamLeader : '',
      values: [
        { id: 1, name: 'Be Professional', active: true },
        { id: 2, name: 'Be Proactive', active: true },
        { id: 3, name: 'Be Collaborative', active: true },
        { id: 4, name: 'Be Accountable', active: true },
        { id: 5, name: 'Be Adaptable', active: true }
      ]
    }
  }

  changeTeamName = () => event => {
    this.setState({ newTeamName: event.target.value });
  }

  selectTeamLeader = label => {
    this.setState({ newTeamLeader: label });
  }

  changeValueName = (valueId, newName) => {
    this.setState(state => {
      const valueList = state.values.map(value => {
        if (value.id === valueId) {
          return { ...value, name: newName };
        } else {
          return value;
        }
      });
      return {
        values: valueList
      };
    });
  }

  changeValueActive = (valueId, activeState) => {
    this.setState(state => {
      const valueList = state.values.map(value => {
        if (value.id === valueId) {

          return { ...value, active: activeState };
        } else {
          return value;
        }
      });
      return {
        values: valueList
      };
    });
  }

  deleteValue = valueId => {
    this.setState(state => {
      const valueList = state.values.filter(value => value.id !== valueId);
      return {
        values: valueList
      };
    });
  }

  render() {
    const { classes, team, changeTeamName } = this.props;
    const { newTeamName, newTeamLeader, values } = this.state;
    return (
      <div>
        <div>
          <div className="title">
            <div className="teamName">
              IM IN Team
              <InputBase
                className="editableTeamName"
                value={newTeamName}
                onChange={this.changeTeamName()}
              />
            </div>
            <div className="autocompleteTitle">
              Select a team leader
            </div>
            <div className="autocompleteContainer">
              <Select
                value={newTeamLeader}
                onChange={event => this.selectTeamLeader(event.target.value)}
                className="selectTeamLeader"
              >
                { data.map(teamMember => (<MenuItem value={teamMember.id}>{teamMember.name}</MenuItem>)) }
              </Select>
            </div>
          </div>
          <div className="teamPhoto">
            <Avatar alt="Remy Sharp" src={Yella} className="teamAvatar" />
            <input type="file" />
          </div>
        </div>
        <div className="cardsContainer">
          <ValuesList
            values={values}
            changeValueName={this.changeValueName}
            changeValueActive={this.changeValueActive}
            deleteValue={this.deleteValue}
          />
          <div className="cardContainer">
            <Card className="eachCard">
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Team Members
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="buttonContainers">
          <NavLink to="/Team">
            <Button>
              Back
            </Button>
          </NavLink>
          <NavLink to="/Team">
            <Button>
              Save
            </Button>
          </NavLink>
        </div>
      </div>
    );
  }
}

TeamConfig.propTypes = {
  team: PropTypes.string.isRequired,
  teamLeader: PropTypes.string,
  changeTeamName: PropTypes.func.isRequired
};

export default TeamConfig;
