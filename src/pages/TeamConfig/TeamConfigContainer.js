import { connect } from 'react-redux';
import TeamConfig from './TeamConfig';
import { fetchTeamConfig, updateTeamName, updateTeamLeader } from './TeamConfigAction';

function mapStateToProps(state) {
  return {
    fetchingTeamConfigInfo: state.teamConfig.fetchingTeamConfigInfo,
    updatingTeamName: state.teamConfig.updatingTeamName,
    updatingTeamLeader: state.teamConfig.updatingTeamLeader,
    teamConfigInfo: state.teamConfig.teamConfigInfo,
    teamUpdated: state.teamConfig.teamUpdated,
    teamLeaderUpdated: state.teamConfig.teamLeaderUpdated,
    fetchError: state.teamConfig.fetchError,
    updateNameError: state.teamConfig.updateNameError,
    updateLeaderError: state.teamConfig.updateLeaderError
  };
}

export default connect(mapStateToProps, { fetchTeamConfig, updateTeamName, updateTeamLeader })(TeamConfig);
