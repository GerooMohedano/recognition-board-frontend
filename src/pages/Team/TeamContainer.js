import { connect } from 'react-redux';
import Team from './Team';
import { fetchTeamInfo } from './TeamActions';

function mapStateToProps(state) {
  return {
    fetchingTeamInfo: state.fetchingTeamInfo,
    teamInfo: state.teamInfo,
    fetchError: state.fetchError
  };
}

export default connect(mapStateToProps, { fetchTeamInfo })(Team);
