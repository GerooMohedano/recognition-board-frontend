import { connect } from 'react-redux';
import Enterprise from './Enterprise';
import { fetchEnterpriseInfo, modifyAddress,
        deleteTeam, activateTeam, desactivateTeam, getTeamNotes,
        deleteMember, activateMember, desactivateMember, getNotes,
        deleteDefaultValue, deleteAward, modifyEnterprise, updateValue, addValue,
        getHistoricValues, updateUser, addUser, updateTeam, addTeam
       } from './EnterpriseAction';

function mapStateToProps(state) {
  return {
    fetchingEnterpriseInfo: state.enterprise.fetchingEnterpriseInfo,
    updatingUser: state.enterprise.updatingUser,
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
    gettingTeamNotes: state.enterprise.gettingTeamNotes,
    getTeamNotesError: state.enterprise.getTeamNotesError,
    teamNotes: state.enterprise.teamNotes,
    //MEMBER
    memberActivated: state.enterprise.memberActivated,
    memberDesactivated: state.enterprise.memberDesactivated,
    activateMemberError: state.enterprise.activateMemberError,
    desactivateMemberError: state.enterprise.desactivateMemberError,
    activatingMember: state.enterprise.activatingMember,
    desactivatingMember: state.enterprise.desactivatingMember,
    memberDeleted: state.enterprise.memberDeleted,
    deleteMemberError: state.enterprise.deleteMemberError,
    addingUser: state.enterprise.addingUser,
    addUserError: state.enterprise.addUserError,
    userAdded: state.enterprise.userAdded,
    gettingNotes: state.enterprise.gettingNotes,
    getNotesError: state.enterprise.getNotesError,
    notes: state.enterprise.notes,
    userUpdated: state.enterprise.userUpdated,
    teamUpdated: state.enterprise.teamUpdated,
    teamAdded: state.enterprise.teamAdded,
    //DefaultValue
    desactivatingDefaultValue: state.enterprise.desactivatingDefaultValue,
    defaultValueDeleted: state.enterprise.defaultValueDeleted,
    deleteDefaultValueError: state.enterprise.deleteDefaultValueError,
    updatingValue: state.enterprise.updatingValue,
    valueUpdated: state.enterprise.valueUpdated,
    updateValueError: state.enterprise.updateValueError,
    valueAdded: state.enterprise.valueAdded,
    addingValue: state.enterprise.addingValue,
    addValueError: state.enterprise.addValueError,
    //Award
    desactivatingAward: state.enterprise.desactivatingAward,
    awardDeleted: state.enterprise.awardDeleted,
    deleteAwardError: state.enterprise.deleteAwardError,
    valueUpdated: state.enterprise.valueUpdated,
    //Enterprise modify
    modifyingSprint: state.enterprise.modifyingSprint,
    modifySprintError: state.enterprise.modifySprintError,
  };
}

export default connect(mapStateToProps, {
  fetchEnterpriseInfo, modifyAddress,
  activateTeam, desactivateTeam, deleteTeam, getTeamNotes,
  activateMember, desactivateMember, deleteMember, getNotes,
  deleteDefaultValue, getHistoricValues,
  deleteAward, modifyEnterprise, updateValue, addValue,
  updateUser, addUser, updateTeam, addTeam
})(Enterprise);
