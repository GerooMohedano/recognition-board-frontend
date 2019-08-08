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

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openHistoricDialog: false
    };
  }

  componentDidMount() {
    const { fetchTeams, match } = this.props;
    fetchTeams(match.params.idTeam);
  }

  changeHistoricDialogState = value => {
    this.setState({ openHistoricDialog: value });
  }

  selectValueForHistoric = value => {
    this.props.getHistoricValues({ idEquipo: this.props.match.params.idTeam, idValor: value })
  }

  render() {
    const { teamInfo, fetchingTeams, historicValues, gettingHistoricValues } = this.props;
    console.log(teamInfo);
    if (fetchingTeams || teamInfo === undefined)
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
          <SprintSelector />
          <TeamTable />
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
  fetchTeams: PropTypes.func.isRequired,
  getHistoricValues: PropTypes.func.isRequired,
  fetchError: PropTypes.shape({
    state: PropTypes.bool.isRequired,
    message: PropTypes.object
  }),
  historicValues: PropTypes.shape({}).isRequired,
  teamInfo: PropTypes.shape({}).isRequired
};

export default Team;
