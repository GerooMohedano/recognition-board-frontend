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

class TeamConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTeamName: '',
      configuring: false
    }
  }

  componentDidMount() {
    const { match, fetchTeamConfig } = this.props;
    fetchTeamConfig(match.params.idTeam);
  }

  componentDidUpdate(prevProps) {
    const {
      teamUpdated, teamLeaderUpdated, fetchTeamConfig,
      valueDeleted, valueActivated, valueDesactivated, valueUpdated, valueAdded,
      teamMemberAdded, teamMemberKicked, match
    } = this.props;
    if (prevProps.teamUpdated !== teamUpdated && teamUpdated && teamUpdated.data.status === 'OK') {
      fetchTeamConfig(match.params.idTeam);
    }
    if (prevProps.teamLeaderUpdated !== teamLeaderUpdated && teamLeaderUpdated && teamLeaderUpdated.data.status === 'OK') {
      fetchTeamConfig(match.params.idTeam);
    }
    if (prevProps.valueDeleted !== valueDeleted && valueDeleted && valueDeleted.data.status === 'OK') {
      fetchTeamConfig(match.params.idTeam);
    }
    if (prevProps.valueActivated !== valueActivated && valueActivated && valueActivated.data.status === 'OK') {
      fetchTeamConfig(match.params.idTeam);
    }
    if (prevProps.valueDesactivated !== valueDesactivated && valueDesactivated && valueDesactivated.data.status === 'OK') {
      fetchTeamConfig(match.params.idTeam);
    }
    if (prevProps.valueUpdated !== valueUpdated && valueUpdated && valueUpdated.data.status === 'OK') {
      fetchTeamConfig(match.params.idTeam);
    }
    if (prevProps.valueAdded !== valueAdded && valueAdded && valueAdded.data.status === 'OK') {
      fetchTeamConfig(match.params.idTeam);
    }
    if (prevProps.teamMemberAdded !== teamMemberAdded && teamMemberAdded && teamMemberAdded.data.status === 'OK') {
      fetchTeamConfig(match.params.idTeam);
    }
    if (prevProps.teamMemberKicked !== teamMemberKicked && teamMemberKicked && teamMemberKicked.data.status === 'OK') {
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
    const {
      classes, match, changeTeamName, teamConfigInfo, fetchingTeamConfigInfo,
      deleteValue, activateValue, desactivateValue, updateValue, addValue,
      addTeamMember, kickTeamMember
    } = this.props;
    const { newTeamName, configuring } = this.state;
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
                  {teamConfigInfo.data.usuarios.map(teamMember => {
                    if (teamMember.estado === 'activo' || (teamMember.estado === 'inactivo' && teamMember.rol))
                    return (<MenuItem value={teamMember.idUsuario}>{teamMember.nombre_usuario}</MenuItem>)
                  })}
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
              idTeam={match.params.idTeam}
              values={teamConfigInfo.data.valores}
              updateValue={updateValue}
              deleteValue={deleteValue}
              activateValue={activateValue}
              desactivateValue={desactivateValue}
              addValue={addValue}
            />
            <TeamMembersList
              idTeam={match.params.idTeam}
              teamLeader={teamConfigInfo.data.usuarios.find(user => user.rol).idUsuario}
              members={teamConfigInfo.data.usuarios}
              deleteMember={kickTeamMember}
              enterpriseMembers={teamConfigInfo.data.usuariosEmpresa}
              addTeamMember={addTeamMember}
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
  deleteValue: PropTypes.func.isRequired,
  activateValue: PropTypes.func.isRequired,
  desactivateValue: PropTypes.func.isRequired,
  updateValue: PropTypes.func.isRequired,
  addTeamMember: PropTypes.func.isRequired,
  kickTeamMember: PropTypes.func.isRequired,
  addValue: PropTypes.func.isRequired,
  fetchError: PropTypes.shape({
    state: PropTypes.bool.isRequired,
    message: PropTypes.object
  }),
  teamUpdated: PropTypes.shape({}).isRequired,
  teamLeaderUpdated: PropTypes.shape({}).isRequired,
  valueDeleted: PropTypes.shape({}).isRequired,
  valueActivated: PropTypes.shape({}).isRequired,
  valueDesactivated: PropTypes.shape({}).isRequired,
  valueUpdated: PropTypes.shape({}).isRequired,
  valueAdded: PropTypes.shape({}).isRequired,
  teamMemberAdded: PropTypes.shape({}).isRequired,
  teamMemberKicked: PropTypes.shape({}).isRequired,
  teamConfigInfo: PropTypes.shape({}).isRequired
};


export default TeamConfig;
