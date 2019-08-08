import { connect } from 'react-redux';
import Team from './Team';
import { fetchTeams } from './TeamActions';

function mapStateToProps(state) {
  return {
    fetchingTeams: state.team.fetchingTeams,
    teamInfo: state.team.teamInfo,
    fetchError: state.team.fetchError
  };
}

export default connect(mapStateToProps, { fetchTeams })(Team);
