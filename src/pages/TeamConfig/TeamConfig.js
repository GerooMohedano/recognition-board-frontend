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
import TeamMembersList from './TeamMembersList';

require('../../commons/Team.css');

const enterpriseMembers = [
  { id: 1, name: 'Magui' },
  { id: 2, name: 'Romy' },
  { id: 3, name: 'Gero' },
  { id: 4, name: 'Pame' },
  { id: 5, name: 'Marcio' },
  { id: 6, name: 'LuisMi' },
  { id: 7, name: 'Tony' },
  { id: 8, name: 'Abel' },
  { id: 9, name: 'Mercedes' },
  { id: 10, name: 'Sole' },
  { id: 11, name: 'Ricki' },
  { id: 12, name: 'Nick' },
  { id: 13, name: 'Shawn' },
  { id: 14, name: 'Lali' },
  { id: 15, name: 'Karina' },
  { id: 16, name: 'Jimena' }
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
      ],
      members: [
        { id: 1, name: 'Magui' },
        { id: 2, name: 'Romy' },
        { id: 3, name: 'Gero' },
        { id: 4, name: 'Pame' },
        { id: 5, name: 'Marcio' },
        { id: 6, name: 'LuisMi' },
        { id: 7, name: 'Tony' }
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
      const valuesList = state.values.filter(value => value.id !== valueId);
      return {
        values: valuesList
      };
    });
  }

  deleteMember = memberId => {
    this.setState(state => {
      const membersList = state.members.filter(member => member.id !== memberId);
      return {
        members: membersList
      };
    });
  }

  addValue = value => {
    const nextId = this.state.values[this.state.values.length];
    this.setState(state => ({ values: [...state.values, { id: nextId, name: value, active: true }]}))
  }

  addNewTeamMember = value => {
    value
    && this.setState(state => ({ members: [...state.members, value] }))
  }

  render() {
    const { classes, team, changeTeamName } = this.props;
    const { newTeamName, newTeamLeader, values, members } = this.state;
    return (
      <div>
        <div>
          <div className="configTitle">
            <div className="configTeamName">
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
                { members.map(teamMember => (<MenuItem value={teamMember.id}>{teamMember.name}</MenuItem>)) }
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
            addNewValue={this.addValue}
          />
          <TeamMembersList
            teamLeader={newTeamLeader}
            members={members}
            deleteMember={this.deleteMember}
            enterpriseMembers={enterpriseMembers}
            addNewTeamMember={this.addNewTeamMember}
          />
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
/*
TeamConfig.propTypes = {
  team: PropTypes.string.isRequired,
  teamLeader: PropTypes.number,
  changeTeamName: PropTypes.func.isRequired
};*/

TeamConfig.propTypes = {
  team: PropTypes.string.isRequired,
  teamLeader: PropTypes.number,
  changeTeamName: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  team: PropTypes.string.isRequired,
  fetchingTeamConfigInfo: PropTypes.bool.isRequired,
  fetchTeamConfigInfo: PropTypes.func.isRequired,
  fetchError: PropTypes.shape({
    state: PropTypes.bool.isRequired,
    message: PropTypes.object
  })
};


export default TeamConfig;
