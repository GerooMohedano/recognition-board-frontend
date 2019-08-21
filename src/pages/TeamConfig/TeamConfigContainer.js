import { connect } from 'react-redux';
import TeamConfig from './TeamConfig';
import {
  fetchTeamConfig, updateTeamName, updateTeamLeader,
  deleteValue, activateValue, desactivateValue, updateValue, addValue,
  addTeamMember, kickTeamMember
} from './TeamConfigAction';

function mapStateToProps(state) {
  return {
    fetchingTeamConfigInfo: state.teamConfig.fetchingTeamConfigInfo,
    updatingTeamName: state.teamConfig.updatingTeamName,
    updatingTeamLeader: state.teamConfig.updatingTeamLeader,
    delettingValue: state.teamConfig.delettingValue,
    activatingValue: state.teamConfig.activatingValue,
    desactivatingValue: state.teamConfig.desactivatingValue,
    updatingValue: state.teamConfig.updatingValue,
    addingValue: state.teamConfig.addingValue,
    addingTeamMember: state.teamConfig.addingTeamMember,
    kickingTeamMember: state.teamConfig.kickingTeamMember,
    teamConfigInfo: state.teamConfig.teamConfigInfo,
    teamUpdated: state.teamConfig.teamUpdated,
    teamLeaderUpdated: state.teamConfig.teamLeaderUpdated,
    valueDeleted: state.teamConfig.valueDeleted,
    valueActivated: state.teamConfig.valueActivated,
    valueDesactivated: state.teamConfig.valueDesactivated,
    valueUpdated: state.teamConfig.valueUpdated,
    teamMemberAdded: state.teamConfig.teamMemberAdded,
    teamMemberKicked: state.teamConfig.teamMemberKicked,
    addValueError: state.teamConfig.addValueError,
    fetchError: state.teamConfig.fetchError,
    updateNameError: state.teamConfig.updateNameError,
    updateLeaderError: state.teamConfig.updateLeaderError,
    deleteValueError: state.teamConfig.deleteValueError,
    activateValueError: state.teamConfig.activateValueError,
    updateValueError: state.teamConfig.updateValueError,
    valueAdded: state.teamConfig.valueAdded,
    desactivateValueError: state.teamConfig.desactivateValueError,
    addTeamMemberError: state.teamConfig.addTeamMemberError,
    kickTeamMemberError: state.teamConfig.kickTeamMemberError
  };
}

export default connect(mapStateToProps, {
  fetchTeamConfig, updateTeamName, updateTeamLeader,
  deleteValue, activateValue, desactivateValue, updateValue, addValue,
  addTeamMember, kickTeamMember
})(TeamConfig);
