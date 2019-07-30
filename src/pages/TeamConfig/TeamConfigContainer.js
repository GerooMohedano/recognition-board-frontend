import { connect } from 'react-redux';
import TeamConfig from './TeamConfig';
import { fetchTeamConfigInfo } from './TeamConfigAction';

function mapStateToProps(state) {
  return {
    fetchingTeamConfigInfo: state.fetchingTeamConfigInfo,
    teamConfigInfo: state.teamConfigInfo,
    fetchError: state.fetchError
  };
}

export default connect(mapStateToProps, { fetchTeamConfigInfo })(TeamConfig);
