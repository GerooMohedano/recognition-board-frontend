import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
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
import EditIcon from '@material-ui/icons/Create';
import AcceptIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Clear';
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
      newTeamName: '',
      configuring: false,
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

  componentDidMount() {
    const { match, fetchTeamConfig } = this.props;
    fetchTeamConfig(match.params.idTeam);
  }

  componentDidUpdate(prevProps) {
    const { teamUpdated, teamLeaderUpdated, fetchTeamConfig, match } = this.props;
    if (prevProps.teamUpdated !== teamUpdated && teamUpdated && teamUpdated.data.status === 'OK') {
      fetchTeamConfig(match.params.idTeam);
    }
    if (prevProps.teamLeaderUpdated !== teamLeaderUpdated && teamLeaderUpdated && teamLeaderUpdated.data.status === 'OK') {
      fetchTeamConfig(match.params.idTeam);
    }
  }

  changeTeamName = () => event => {
    this.setState({ newTeamName: event.target.value });
  }

  selectTeamLeader = label => {
    const { match, updateTeamLeader, teamConfigInfo } = this.props;
    updateTeamLeader({
      idEquipo: match.params.idTeam,
      idViejoAdmin: teamConfigInfo.data.usuarios.find(user => user.rol).idUsuario,
      idNuevoAdmin: label
    });
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

  changeConfigurationState = value => {
    const { teamConfigInfo } = this.props;
    this.setState({
      newTeamName: value ? teamConfigInfo.data.equipos[0].nombre_equipo : '',
      configuring: value
    });
  }

  saveNameUpdate = () => {
    const { newTeamName } = this.state;
    const { fetchTeamConfig, updateTeamName, match } = this.props;
    updateTeamName({
      idEquipo: match.params.idTeam,
      nombre: newTeamName
    });
    this.changeConfigurationState(false);
  }

  render() {
    const { classes, changeTeamName, teamConfigInfo, fetchingTeamConfigInfo } = this.props;
    const { newTeamName, values, members, configuring } = this.state;
    console.log(teamConfigInfo);
    if (fetchingTeamConfigInfo || teamConfigInfo === undefined)
      return (<div className="circularProgressContainer"><CircularProgress className="circularProgress" /></div>);
    else
      return (
        <div>
          <div>
            <div className="configTitle">
              {configuring
                ? (
                  <div className="title">
                    <InputBase
                      className="editableTeamName"
                      value={newTeamName}
                      onChange={this.changeTeamName()}
                    />
                    <Tooltip title="Save name">
                      <IconButton onClick={() => this.saveNameUpdate()}>
                        <AcceptIcon style={{ color: 'black' }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancel">
                      <IconButton onClick={() => this.changeConfigurationState(false)}>
                        <CancelIcon style={{ color: 'black' }} />
                      </IconButton>
                    </Tooltip>
                  </div>
                ) : (
                  <div className="title">
                    <div className="teamName">
                      {teamConfigInfo.data.equipos[0].nombre_equipo}
                    </div>
                    <Tooltip title="Change team name">
                      <IconButton onClick={() => this.changeConfigurationState(true)}>
                        <EditIcon style={{ color: 'black' }} />
                      </IconButton>
                    </Tooltip>
                  </div>
                )
              }
              <div className="autocompleteTitle">
                Select a team leader
              </div>
              <div className="autocompleteContainer">
                <Select
                  value={teamConfigInfo.data.usuarios.find(user => user.rol).idUsuario}
                  onChange={event => this.selectTeamLeader(event.target.value)}
                  className="selectTeamLeader"
                >
                  {teamConfigInfo.data.usuarios.map(teamMember => (<MenuItem value={teamMember.idUsuario}>{teamMember.nombre_usuario}</MenuItem>))}
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
              values={teamConfigInfo.data.valores}
              changeValueName={this.changeValueName}
              changeValueActive={this.changeValueActive}
              deleteValue={this.deleteValue}
              addNewValue={this.addValue}
            />
            <TeamMembersList
              teamLeader={teamConfigInfo.data.usuarios.find(user => user.rol).idUsuario}
              members={teamConfigInfo.data.usuarios}
              deleteMember={this.deleteMember}
              enterpriseMembers={enterpriseMembers}
              addNewTeamMember={this.addNewTeamMember}
            />
          </div>
        </div>
      );
  }
}

TeamConfig.propTypes = {
  updateTeamName: PropTypes.func.isRequired,
  updateTeamLeader: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  fetchingTeamConfigInfo: PropTypes.bool.isRequired,
  fetchTeamConfig: PropTypes.func.isRequired,
  fetchError: PropTypes.shape({
    state: PropTypes.bool.isRequired,
    message: PropTypes.object
  }),
  teamUpdated: PropTypes.shape({}).isRequired,
  teamLeaderUpdated: PropTypes.shape({}).isRequired,
  teamConfigInfo: PropTypes.shape({}).isRequired
};


export default TeamConfig;
