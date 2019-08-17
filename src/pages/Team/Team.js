import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import TeamTable from './TeamTable';
import SprintSelector from './SprintSelector';
import CircularProgress from '@material-ui/core/CircularProgress';
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

  componentDidUpdate() {
    const { teamInfo } = this.props;
    const { indexPizarra } = this.state;
    if (teamInfo && teamInfo.data && indexPizarra === -1) {
      this.setState({ indexPizarra: teamInfo.data.pizarras.length - 1 });
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

  render() {
    const {
      teamInfo, fetchingTeams, historicValues, gettingHistoricValues,
      gettingNotes, notes, getNotes, createNote, deleteNote, modifySprint
    } = this.props;
    const { indexPizarra } = this.state;
    console.log(teamInfo);
    if (fetchingTeams || teamInfo === undefined || indexPizarra === -1)
      return (<div className="circularProgressContainer"><CircularProgress className="circularProgress" /></div>);
    else
      return (
        <div>
          <div className="title">
            <div className="teamName"> IM IN Team {teamInfo.data.equipos[0].nombre_equipo}</div>
            <NavLink to="/TeamConfig">
              <Tooltip title="Edit this team configuration">
                <Button>
                  <Build />
                </Button>
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
            sprints={teamInfo.data.pizarras}
            indexPizarra={indexPizarra}
          />
          <TeamTable
            members={teamInfo.data.usuarios}
            values={teamInfo.data.evaluacion}
            gettingNotes={gettingNotes}
            notes={notes}
            getNotes={getNotes}
            indexPizarra={teamInfo.data.pizarras[indexPizarra].idPizarra}
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
  fetchTeams: PropTypes.func.isRequired,
  getHistoricValues: PropTypes.func.isRequired,
  getNotes: PropTypes.func.isRequired,
  createNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  modifySprint: PropTypes.func.isRequired,
  fetchError: PropTypes.shape({
    state: PropTypes.bool.isRequired,
    message: PropTypes.object
  }),
  historicValues: PropTypes.shape({}).isRequired,
  teamInfo: PropTypes.shape({}).isRequired,
  notes: PropTypes.shape({}).isRequired
};

export default Team;
