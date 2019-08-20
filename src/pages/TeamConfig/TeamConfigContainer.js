import { connect } from 'react-redux';
import TeamConfig from './TeamConfig';
import {
  fetchTeamConfig, updateTeamName, updateTeamLeader,
  deleteValue, activateValue, desactivateValue
} from './TeamConfigAction';

function mapStateToProps(state) {
  return {
    fetchingTeamConfigInfo: state.teamConfig.fetchingTeamConfigInfo,
    updatingTeamName: state.teamConfig.updatingTeamName,
    updatingTeamLeader: state.teamConfig.updatingTeamLeader,
    delettingValue: state.teamConfig.delettingValue,
    activatingValue: state.teamConfig.activatingValue,
    desactivatingValue: state.teamConfig.desactivatingValue,
    teamConfigInfo: state.teamConfig.teamConfigInfo,
    teamUpdated: state.teamConfig.teamUpdated,
    teamLeaderUpdated: state.teamConfig.teamLeaderUpdated,
    valueDeleted: state.teamConfig.valueDeleted,
    valueActivated: state.teamConfig.valueActivated,
    valueDesactivated: state.teamConfig.valueDesactivated,
    fetchError: state.teamConfig.fetchError,
    updateNameError: state.teamConfig.updateNameError,
    updateLeaderError: state.teamConfig.updateLeaderError,
    deleteValueError: state.teamConfig.deleteValueError,
    activateValueError: state.teamConfig.activateValueError,
    desactivateValueError: state.teamConfig.desactivateValueError
  };
}

export default connect(mapStateToProps, {
  fetchTeamConfig, updateTeamName, updateTeamLeader,
  deleteValue, activateValue, desactivateValue
})(TeamConfig);
