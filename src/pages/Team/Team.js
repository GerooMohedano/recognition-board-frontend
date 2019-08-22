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
import Yella from '../../images/yella.jpg';
import ChartPolygon from '../../commons/ChartPolygon';
import HistoricDialog from '../../commons/HistoricDialog';

require('../../commons/Team.css');

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
    const { teamInfo, fetchTeams, match } = this.props;
    const { indexPizarra } = this.state;
    if (teamInfo && teamInfo.data && indexPizarra === -1) {
      this.setState({ indexPizarra: teamInfo.data.pizarras.length - 1 });
    }
    if (prevProps.match.params.idTeam !== match.params.idTeam) {
      fetchTeams(match.params.idTeam);
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

  reloadPage = () => {
    window.location.reload();
  }

  render() {
    const {
      match, teamInfo, fetchingTeams, historicValues, gettingHistoricValues,
      gettingNotes, notes, getNotes,
      createNote, deleteNote, modifySprint, createSprint, deleteSprint
    } = this.props;
    const { indexPizarra } = this.state;
    if (fetchingTeams || teamInfo === undefined || indexPizarra === -1)
      return (<div className="circularProgressContainer"><CircularProgress className="circularProgress" /></div>);
    else
      return (
        <div>
          <div className="title">
            <div className="teamName">{teamInfo.data.equipos[0].nombre_equipo}</div>
            <NavLink to={`/TeamConfig/${match.params.idTeam}`}>
              <Tooltip title="Edit this team configuration">
                <IconButton>
                  <Build style={{ color: 'black' }} />
                </IconButton>
              </Tooltip>
            </NavLink>
          </div>
          <div className="teamDescription">
            <Avatar alt="Remy Sharp" src={Yella} className="teamAvatar" />
            <div className="chartContainer">
              <ChartPolygon
                data={teamInfo.data.evaluacion.map(valor => ({
                  id: valor.idValor, subject: valor.nombre_valor, A: valor.Total
                }))}
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
            reloadPage={this.reloadPage}
          />
          <TeamTable
            members={teamInfo.data.usuarios}
            values={teamInfo.data.evaluacion}
            enterpriseValues={teamInfo.data.valoresEmpresa}
            gettingNotes={gettingNotes}
            notes={notes}
            getNotes={getNotes}
            indexPizarra={teamInfo.data.pizarras[indexPizarra].idPizarra}
            endDate={teamInfo.data.pizarras[indexPizarra].fechaFin}
            beginDate={teamInfo.data.pizarras[indexPizarra].fechaInicio}
            createNote={createNote}
            deleteNote={deleteNote}
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
  createNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  modifySprint: PropTypes.func.isRequired,
  createSprint: PropTypes.func.isRequired,
  deleteSprint: PropTypes.func.isRequired,
  fetchError: PropTypes.shape({
    state: PropTypes.bool.isRequired,
    message: PropTypes.object
  }),
  historicValues: PropTypes.shape({}).isRequired,
  teamInfo: PropTypes.shape({}).isRequired,
  notes: PropTypes.shape({}).isRequired
};

export default Team;
