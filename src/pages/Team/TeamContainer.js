import { connect } from 'react-redux';
import Team from './Team';
import { fetchTeams, getHistoricValues } from './TeamActions';

function mapStateToProps(state) {
  return {
    fetchingTeams: state.team.fetchingTeams,
    gettingHistoricValues: state.perfil.gettingHistoricValues,
    teamInfo: state.team.teamInfo,
    historicValues: state.perfil.historicValues,
    getHistoricError: state.perfil.getHistoricError,
    fetchError: state.team.fetchError
  };
}

export default connect(mapStateToProps, { fetchTeams, getHistoricValues })(Team);
