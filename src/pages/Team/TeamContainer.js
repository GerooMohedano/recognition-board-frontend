import { connect } from 'react-redux';
import Team from './Team';
import { fetchTeamInfo } from './TeamActions';

function mapStateToProps(state) {
  return {
    fetchingTeamInfo: state.team.fetchingTeamInfo,
    teamInfo: state.team.teamInfo,
    fetchError: state.team.fetchError
  };
}

export default connect(mapStateToProps, { fetchTeamInfo })(Team);
