import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import TeamTable from './TeamTable';
import SprintSelector from './SprintSelector';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Build from '@material-ui/icons/Build';
import HistoricChart from '@material-ui/icons/InsertChart';
import ChartPolygon from '../../commons/ChartPolygon';
import HistoricDialog from '../../commons/HistoricDialog';
import TeamPhoto from '../../images/team.png';
import NonPhoto from '../../images/questionMark.png';

require('../../commons/Team.css');

const TIME_FOR_DATE = 'T00:00:00.000Z';

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openHistoricDialog: false,
      indexPizarra: -1
    };
  }

  componentDidMount() {
    const { fetchTeams, match } = this.props;
    fetchTeams(match.params.idTeam);
  }

  componentDidUpdate(prevProps) {
    const {
      teamInfo, fetchTeams, match, sprintCreated, sprintModified,
      notes, noteCreated, awardsChecked, sprintDeleted
    } = this.props;
    const { indexPizarra } = this.state;
    if (teamInfo && teamInfo.data && (indexPizarra === -1 || indexPizarra >= teamInfo.data.pizarras.length)) {
      this.setState({ indexPizarra: teamInfo.data.pizarras.length - 1 });
    }
    if (prevProps.match !== match) {
      fetchTeams(match.params.idTeam);
    }
    if (prevProps.match.params.idTeam !== match.params.idTeam) {
      fetchTeams(match.params.idTeam);
    }
    if (prevProps.sprintCreated !== sprintCreated && sprintCreated && sprintCreated.data.status === 'OK') {
      fetchTeams(match.params.idTeam);
    }
    if (prevProps.sprintDeleted !== sprintDeleted && sprintDeleted && sprintDeleted.data.status === 'OK') {
      fetchTeams(match.params.idTeam);
    }
    if (prevProps.sprintModified !== sprintModified && sprintModified && sprintModified.data.status === 'OK') {
      fetchTeams(match.params.idTeam);
    }
    if (prevProps.noteCreated !== noteCreated && noteCreated && noteCreated.data.logrosNoGanados && noteCreated.data.logrosNoGanados.length !== 0) {
      this.checkForNewAwards();
    }
  }

  checkForNewAwards = () => {
    const { noteCreated, winAward } = this.props;
    const conditionsDone = {};
    noteCreated.data.logrosNoGanados.forEach((condition) => {
      if (conditionsDone[condition.idLogro] === undefined) {
          conditionsDone[condition.idLogro] = true
      }
      if (condition.excluyente) {
        const valueIndex = noteCreated.data.evaluacionExcluyente.findIndex(value => value.idValor === condition.idValor);
        if (valueIndex !== -1) {
          if (condition.modificador && condition.puntuacion <= noteCreated.data.evaluacionExcluyente[valueIndex].Total) {
            conditionsDone[condition.idLogro] = conditionsDone[condition.idLogro] && true;
          } else if (!condition.modificador && condition.puntuacion > noteCreated.data.evaluacionExcluyente[valueIndex].Total) {
            conditionsDone[condition.idLogro] = conditionsDone[condition.idLogro] && true;
          } else {
            conditionsDone[condition.idLogro] = conditionsDone[condition.idLogro] && false;
          }
        } else {
          conditionsDone[condition.idLogro] = conditionsDone[condition.idLogro] && false;
        }
      } else {
        const valueIndex = noteCreated.data.evaluacion.findIndex(value => value.idValor === condition.idValor);
        if (valueIndex !== -1) {
          if (condition.modificador && condition.puntuacion <= noteCreated.data.evaluacion[valueIndex].Total) {
            conditionsDone[condition.idLogro] = conditionsDone[condition.idLogro] && true;
          } else if (!condition.modificador && condition.puntuacion > noteCreated.data.evaluacion[valueIndex].Total) {
            conditionsDone[condition.idLogro] = conditionsDone[condition.idLogro] && true;
          } else {
            conditionsDone[condition.idLogro] = conditionsDone[condition.idLogro] && false;
          }
        } else {
          conditionsDone[condition.idLogro] = conditionsDone[condition.idLogro] && false;
        }
      }
    });
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    for (const attr in conditionsDone) {
      if (conditionsDone[attr]) {
        winAward({
          idLogro: parseInt(attr),
          idUsuario: noteCreated.data.idUsuario,
          fecha: yyyy + '-' + mm + '-' + dd + TIME_FOR_DATE
        })
      }
    }
  }

  changeHistoricDialogState = value => {
    this.setState({ openHistoricDialog: value });
  }

  selectValueForHistoric = value => {
    this.props.getHistoricValues({ idEquipo: this.props.match.params.idTeam, idValor: value })
  }

  shiftIndexPizarra = valueToAdd => {
    this.setState(prevState => ({ indexPizarra: prevState.indexPizarra + valueToAdd }));
  }

  changeIndexPizarra = value => {
    this.setState({ indexPizarra: value });
  }

  isUserTeamAdmin = () => {
    const { loginInfo, teamInfo } = this.props;
    const userIndex = teamInfo.data.usuarios.findIndex(user => user.idUsuario === loginInfo.data.data[0].idUsuario);
    return userIndex === -1 ? false : teamInfo.data.usuarios[userIndex].rol;
  }

  render() {
    const {
      match, teamInfo, fetchingTeams, historicValues, gettingHistoricValues, sprintNotes,
      gettingNotes, notes, getNotes, loginInfo, sprintChecked, checkSprint, checkingSprint,
      createNote, deleteNote, modifySprint, createSprint, deleteSprint, checkAwards, getSprintNotes
    } = this.props;
    const { indexPizarra } = this.state;
    if (fetchingTeams || teamInfo === undefined || indexPizarra === -1 || indexPizarra >= teamInfo.data.pizarras.length)
      return (<div className="circularProgressContainer"><CircularProgress className="circularProgress" /></div>);
    else
      return (
        <div>
          <div className="title">
            <div className="teamName">{teamInfo.data.equipos[0].nombre_equipo}</div>
            {(this.isUserTeamAdmin() || loginInfo.data.data[0].adminGeneral) &&
              <NavLink to={`/TeamConfig/${match.params.idTeam}`}>
              <Tooltip title="Edit this team configuration">
                <IconButton>
                  <Build style={{ color: 'black' }} />
                </IconButton>
              </Tooltip>
            </NavLink>}
          </div>
          <div className="teamDescription">
            <Avatar
              alt="Remy Sharp"
              src={
                TeamPhoto
              }
              className="teamAvatar"
            />
            <div className="chartContainer">
              <ChartPolygon
                data={teamInfo.data.evaluacion.map(valor => ({
                  id: valor.idValor, subject: valor.nombre_valor, A: valor.Total })
                )}
                width={500}
                height={300}
              />
            </div>
            <Button color="secondary" onClick={() => this.changeHistoricDialogState(true)}>
              <HistoricChart />
            </Button>
          </div>
          <SprintSelector
            shiftIndexPizarra={this.shiftIndexPizarra}
            changeIndexPizarra={this.changeIndexPizarra}
            modifySprint={modifySprint}
            createSprint={createSprint}
            deleteSprint={deleteSprint}
            sprints={teamInfo.data.pizarras}
            indexPizarra={indexPizarra}
            idEquipo={match.params.idTeam}
            isUserTeamAdmin={this.isUserTeamAdmin()}
            sprintChecked={sprintChecked}
            checkSprint={checkSprint}
            checkingSprint={checkingSprint}
            adminGeneral={loginInfo.data.data[0].adminGeneral}
            getSprintNotes={getSprintNotes}
            sprintNotes={sprintNotes}
          />
          <TeamTable
            members={teamInfo.data.usuarios}
            values={teamInfo.data.valoresEquipo}
            enterpriseValues={teamInfo.data.valoresEmpresa}
            gettingNotes={gettingNotes}
            notes={notes}
            getNotes={getNotes}
            indexPizarra={teamInfo.data.pizarras[indexPizarra].idPizarra}
            endDate={teamInfo.data.pizarras[indexPizarra].fechaFin}
            beginDate={teamInfo.data.pizarras[indexPizarra].fechaInicio}
            createNote={createNote}
            deleteNote={deleteNote}
            loginInfo={loginInfo}
            checkAwards={checkAwards}
            idTeam={parseInt(this.props.match.params.idTeam)}
            idEmpresa={teamInfo.data.equipos[0].idEmpresa}
          />
          <HistoricDialog
            open={this.state.openHistoricDialog}
            handleClose={() => this.changeHistoricDialogState(false)}
            selectValues={teamInfo.data.evaluacion.map(valor => ({
              id: valor.idValor, name: valor.nombre_valor
            }))}
            historicValues={historicValues}
            getHistoricValues={this.selectValueForHistoric}
            isLoading={gettingHistoricValues}
          />
        </div>
      );
  }
}

Team.propTypes = {
  classes: PropTypes.object.isRequired,
  team: PropTypes.string.isRequired,
  fetchingTeams: PropTypes.bool.isRequired,
  gettingHistoricValues: PropTypes.bool.isRequired,
  gettingNotes: PropTypes.bool.isRequired,
  creattingNote: PropTypes.bool.isRequired,
  delettingNote: PropTypes.bool.isRequired,
  modifyingSprint: PropTypes.bool.isRequired,
  creattingSprint: PropTypes.bool.isRequired,
  deleteSprintError: PropTypes.bool.isRequired,
  fetchTeams: PropTypes.func.isRequired,
  getHistoricValues: PropTypes.func.isRequired,
  getNotes: PropTypes.func.isRequired,
  getSprintNotes: PropTypes.func.isRequired,
  createNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  modifySprint: PropTypes.func.isRequired,
  createSprint: PropTypes.func.isRequired,
  deleteSprint: PropTypes.func.isRequired,
  checkSprint: PropTypes.func.isRequired,
  checkAwards: PropTypes.func.isRequired,
  winAward: PropTypes.func.isRequired,
  fetchError: PropTypes.shape({
    state: PropTypes.bool.isRequired,
    message: PropTypes.object
  }),
  historicValues: PropTypes.shape({}).isRequired,
  teamInfo: PropTypes.shape({}).isRequired,
  notes: PropTypes.shape({}).isRequired,
  sprintNotes: PropTypes.shape({}).isRequired,
  sprintDeleted: PropTypes.shape({}).isRequired,
  loginInfo: PropTypes.shape({}).isRequired,
  checkingSprint: PropTypes.bool.isRequired,
  sprintChecked: PropTypes.shape({}).isRequired,
  sprintCreated: PropTypes.shape({}).isRequired,
  sprintModified: PropTypes.shape({}).isRequired,
  noteCreated: PropTypes.shape({}).isRequired,
  awardsChecked: PropTypes.shape({}).isRequired
};

export default Team;
