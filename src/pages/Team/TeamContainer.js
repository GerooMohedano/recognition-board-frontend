import { connect } from 'react-redux';
import Team from './Team';
import { fetchTeams, getHistoricValues, getNotes } from './TeamActions';

function mapStateToProps(state) {
  return {
    fetchingTeams: state.team.fetchingTeams,
    gettingHistoricValues: state.team.gettingHistoricValues,
    gettingNotes: state.team.gettingNotes,
    teamInfo: state.team.teamInfo,
    notes: state.team.notes,
    historicValues: state.team.historicValues,
    getHistoricError: state.team.getHistoricError,
    getNotesError: state.team.getNotesError,
    fetchError: state.team.fetchError
  };
}

export default connect(mapStateToProps, { fetchTeams, getHistoricValues, getNotes })(Team);
