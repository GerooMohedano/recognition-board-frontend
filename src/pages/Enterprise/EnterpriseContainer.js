import { connect } from 'react-redux';
import Enterprise from './Enterprise';
import { fetchEnterpriseInfo, modifyAddress,
        deleteTeam, activateTeam, desactivateTeam, getTeamNotes,
        deleteMember, activateMember, desactivateMember, getNotes,
        deleteDefaultValue, deleteAward, modifyEnterprise, updateValue, addValue,
        getHistoricValues
       } from './EnterpriseAction';

function mapStateToProps(state) {
  return {
    fetchingEnterpriseInfo: state.enterprise.fetchingEnterpriseInfo,
    enterpriseInfo: state.enterprise.enterpriseInfo,
    fetchError: state.enterprise.fetchError,
    gettingHistoricValues: state.enterprise.gettingHistoricValues,
    historicValues: state.enterprise.historicValues,
    getHistoricError: state.enterprise.getHistoricError,
    //TEAM
    teamActivated: state.enterprise.teamActivated,
    teamDesactivated: state.enterprise.teamDesactivated,
    activateTeamError: state.enterprise.activateTeamError,
    desactivateTeamError: state.enterprise.desactivateTeamError,
    activatingTeam: state.enterprise.activatingTeam,
    desactivatingTeam: state.enterprise.desactivatingTeam,
    teamDeleted: state.enterprise.teamDeleted,
    deleteTeamError: state.enterprise.deleteTeamError,
    gettingTeamNotes: state.team.gettingTeamNotes,
    getTeamNotesError: state.team.getTeamNotesError,
    teamNotes: state.team.teamNotes,
    //MEMBER
    memberActivated: state.enterprise.memberActivated,
    memberDesactivated: state.enterprise.memberDesactivated,
    activateMemberError: state.enterprise.activateMemberError,
    desactivateMemberError: state.enterprise.desactivateMemberError,
    activatingMember: state.enterprise.activatingMember,
    desactivatingMember: state.enterprise.desactivatingMember,
    memberDeleted: state.enterprise.memberDeleted,
    deleteMemberError: state.enterprise.deleteMemberError,
    gettingNotes: state.team.gettingNotes,
    getNotesError: state.team.getNotesError,
    notes: state.team.notes,
    //DefaultValue
    desactivatingDefaultValue: state.enterprise.desactivatingDefaultValue,
    defaultValueDeleted: state.enterprise.defaultValueDeleted,
    deleteDefaultValueError: state.enterprise.deleteDefaultValueError,
    updatingValue: state.teamConfig.updatingValue,
    valueUpdated: state.teamConfig.valueUpdated,
    updateValueError: state.teamConfig.updateValueError,
    valueAdded: state.teamConfig.valueAdded,
    addingValue: state.teamConfig.addingValue,
    addValueError: state.teamConfig.addValueError,
    //Award
    desactivatingAward: state.enterprise.desactivatingAward,
    awardDeleted: state.enterprise.awardDeleted,
    deleteAwardError: state.enterprise.deleteAwardError,
    valueUpdated: state.teamConfig.valueUpdated,
    //Enterprise modify
    modifyingSprint: state.team.modifyingSprint,
    modifySprintError: state.team.modifySprintError,
  };
}

export default connect(mapStateToProps, {
  fetchEnterpriseInfo, modifyAddress,
  activateTeam, desactivateTeam, deleteTeam, getTeamNotes,
  activateMember, desactivateMember, deleteMember, getNotes,
  deleteDefaultValue, getHistoricValues,
  deleteAward, modifyEnterprise, updateValue, addValue
})(Enterprise);
