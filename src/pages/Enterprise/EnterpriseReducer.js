import generateReducer from '../../shared/helpers/reducerHelpers';
import * as types from './EnterpriseConstants';

const INITIAL_STATE = {
  fetchingEnterpriseInfo: true,
  gettingHistoricValues: true,
  updatingUser: true,
  addingUser: true,
  updatingTeam: true,
  fetchError: {
    state: false,
    message: ''
  },
  updateTeamError: {
    state: false,
    message: ''
  },
  updateUserError: {
    state: false,
    message: ''
  },
  addUserError: {
    state: false,
    message: ''
  },
  getHistoricError: {
    state: false,
    message: ''
  },
  enterpriseInfo: {},
  activateTeamError: {
    state: false,
    message: ''
  },
  userUpdated: {},
  teamUpdated: {},
  userAdded: {},
  historicValues: {},
  //team
  desactivateTeamError: {
    state: false,
    message: ''
  },
  activatingTeam: true,
  desactivatingTeam: true,
  activateTeamError: {
    state: false,
    message: ''
  },
  teamActivated: {},
  teamDesactivated: {},
  deleteTeamError: {
    state: false,
    message: ''
  },
  teamDeleted: {},
  gettingNotes: true,
  getNotesError: {
    state: false,
    message: ''
  },
  notes: {},
  //member
  gettingTeamNotes: true,
  getTeamNotesError: {
    state: false,
    message: ''
  },
  teamNotes: {},
  desactivateMemberError: {
    state: false,
    message: ''
  },
  activatingMember: true,
  desactivatingMember: true,
  activateMemberError: {
    state: false,
    message: ''
  },
  memberActivated: {},
  memberDesactivated: {},
  deleteMemberError: {
    state: false,
    message: ''
  },
  memberDeleted: {},
  //DefaultValue
  delettingDefaultValue: true,
  deleteDefaultValueError: {
    state: false,
    message: ''
  },
  defaultValueDeleted: {},
  updatingValue: true,
  updateValueError: {
    state: false,
    message: ''
  },
  valueUpdated: {},
  addingValue: true,
  valueAdded: {},
  addValueError: {
    state: false,
    message: ''
  },
  //modifyEnterprise
  modifyingEnterprise: true,
  modifyEnterpriseError: {
    state: false,
    message: ''
  },
  teamAdded: {},
  addingTeam: true,
  addTeamError: {
    state: false,
    message: ''
  },
  getValuesNotesError: {
    state: false,
    message: ''
  },
  valuesNotes: {},
  gettingValuesNotes: true,
  gettingConditions: true,
  getConditionsError: {
    state: false,
    message: ''
  },
  conditions: {},
  delettingAward: true,
  deleteAwardError: {
    state: false,
    message: ''
  },
  awardDeleted: {},
  updatingAward: true,
  updateAwardError: {
    state: false,
    message: ''
  },
  awardUpdated: {},
  addingAward: true,
  awardAdded: {},
  addAwardError: {
    state: false,
    message: ''
  },
  delettingCondition: true,
  deleteConditionError: {
    state: false,
    message: ''
  },
  conditionDeleted: {},
};


const behaviors = {
  [types.FETCHING_ENTERPRISE_INFO](state) {
    return Object.assign({}, state, { fetchingEnterpriseInfo: true, fetchError: { state: false, message: '' } });
  },
  [types.FETCH_ENTERPRISE_INFO_SUCCESS](state, action) {
    return Object.assign({}, state, { enterpriseInfo: action.enterpriseInfo, fetchingEnterpriseInfo: false, fetchError: { state: false, message: '' } });
  },
  [types.FETCH_ENTERPRISE_INFO_FAILURE](state, action) {
    return Object.assign({}, state, { fetchingEnterpriseInfo: false, fetchError: { state: true, message: action.payload } });
  },
  [types.UPDATING_USER](state) {
    return Object.assign({}, state, { updatingUser: true, updateUserError: { state: false, message: '' } });
  },
  [types.UPDATE_USER_SUCCESS](state, action) {
    return Object.assign({}, state, { userUpdated: action.userUpdated, updatingUser: false, updateUserError: { state: false, message: '' } });
  },
  [types.UPDATE_USER_FAILURE](state, action) {
    return Object.assign({}, state, { updatingUser: false, updateUserError: { state: true, message: action.payload } });
  },
  [types.UPDATING_TEAM](state) {
    return Object.assign({}, state, { updatingTeam: true, updateTeamError: { state: false, message: '' } });
  },
  [types.UPDATE_TEAM_SUCCESS](state, action) {
    return Object.assign({}, state, { teamUpdated: action.teamUpdated, updatingTeam: false, updateTeamError: { state: false, message: '' } });
  },
  [types.UPDATE_TEAM_FAILURE](state, action) {
    return Object.assign({}, state, { updatingTeam: false, updateTeamError: { state: true, message: action.payload } });
  },
  [types.ADDING_USER](state) {
    return Object.assign({}, state, { addingUser: true, addUserError: { state: false, message: '' } });
  },
  [types.ADD_USER_SUCCESS](state, action) {
    return Object.assign({}, state, { userAdded: action.userAdded, addingUser: false, addUserError: { state: false, message: '' } });
  },
  [types.ADD_USER_FAILURE](state, action) {
    return Object.assign({}, state, { addingUser: false, addUserError: { state: true, message: action.payload } });
  },

  [types.ADDING_TEAM](state) {
    return Object.assign({}, state, { addingTeam: true, addTeamError: { state: false, message: '' } });
  },
  [types.ADD_TEAM_SUCCESS](state, action) {
    return Object.assign({}, state, { teamAdded: action.teamAdded, addingTeam: false, addTeamError: { state: false, message: '' } });
  },
  [types.ADD_TEAM_FAILURE](state, action) {
    return Object.assign({}, state, { addingTeam: false, addTeamError: { state: true, message: action.payload } });
  },
  [types.GETTING_HISTORIC_VALUES](state) {
    return Object.assign({}, state, { gettingHistoricValues: true, getHistoricError: { state: false, message: '' } });
  },
  [types.GET_HISTORIC_VALUES_SUCCESS](state, action) {
    return Object.assign({}, state, { historicValues: action.historicValues, gettingHistoricValues: false, getHistoricError: { state: false, message: '' } });
  },
  [types.GET_HISTORIC_VALUES_FAILURE](state, action) {
    return Object.assign({}, state, { gettingHistoricValues: false, getHistoricError: { state: true, message: action.payload } });
  },
  ///////////////teams!!
  [types.ACTIVATING_TEAM](state) {
    return Object.assign({}, state, { activatingTeam: true, activateTeamError: { state: false, message: '' } });
  },
  [types.ACTIVATE_TEAM_SUCCESS](state, action) {
    return Object.assign({}, state, { teamActivated: action.teamActivated, activatingTeam: false, activateTeamError: { state: false, message: '' } });
  },
  [types.ACTIVATE_TEAM_FAILURE](state, action) {
    return Object.assign({}, state, { activatingTeam: false, activateTeamError: { state: true, message: action.payload } });
  },
  [types.DESACTIVATING_TEAM](state) {
    return Object.assign({}, state, { desactivatingTeam: true, desactivateTeamError: { state: false, message: '' } });
  },
  [types.DESACTIVATE_TEAM_SUCCESS](state, action) {
    return Object.assign({}, state, { teamDesactivated: action.teamDesactivated, desactivatingTeam: false, desactivateTeamError: { state: false, message: '' } });
  },
  [types.DESACTIVATE_TEAM_FAILURE](state, action) {
    return Object.assign({}, state, { desactivatingTeam: false, desactivateTeamError: { state: true, message: action.payload } });
  },
  [types.DELETTING_TEAM](state) {
    return Object.assign({}, state, { delettingTeam: true, deleteTeamError: { state: false, message: '' } });
  },
  [types.DELETE_TEAM_SUCCESS](state, action) {
    return Object.assign({}, state, { teamDeleted: action.teamDeleted, delettingTeam: false, deleteTeamError: { state: false, message: '' } });
  },
  [types.DELETE_TEAM_FAILURE](state, action) {
    return Object.assign({}, state, { delettingTeam: false, deleteTeamError: { state: true, message: action.payload } });
  },
  [types.GETTING_TEAM_NOTES](state) {
    return Object.assign({}, state, { gettingTeamNotes: true, getTeamNotesError: { state: false, message: '' } });
  },
  [types.GET_TEAM_NOTES_SUCCESS](state, action) {
    return Object.assign({}, state, { teamNotes: action.teamNotes, gettingTeamNotes: false, getTeamNotesError: { state: false, message: '' } });
  },
  [types.GET_TEAM_NOTES_FAILURE](state, action) {
    return Object.assign({}, state, { gettingTeamNotes: false, getTeamNotesError: { state: true, message: action.payload } });
  },
  [types.GETTING_VALUES_NOTES](state) {
    return Object.assign({}, state, { gettingValuesNotes: true, getValuesNotesError: { state: false, message: '' } });
  },
  [types.GET_VALUES_NOTES_SUCCESS](state, action) {
    return Object.assign({}, state, { valuesNotes: action.valuesNotes, gettingValuesNotes: false, getValuesNotesError: { state: false, message: '' } });
  },
  [types.GET_VALUES_NOTES_FAILURE](state, action) {
    return Object.assign({}, state, { gettingValuesNotes: false, getValuesNotesError: { state: true, message: action.payload } });
  },
  ///////////////members!!
  [types.ACTIVATING_MEMBER](state) {
    return Object.assign({}, state, { activatingMember: true, activateMemberError: { state: false, message: '' } });
  },
  [types.ACTIVATE_MEMBER_SUCCESS](state, action) {
    return Object.assign({}, state, { memberActivated: action.memberActivated, activatingMember: false, activateMemberError: { state: false, message: '' } });
  },
  [types.ACTIVATE_MEMBER_FAILURE](state, action) {
    return Object.assign({}, state, { activatingMember: false, activateMemberError: { state: true, message: action.payload } });
  },
  [types.DESACTIVATING_MEMBER](state) {
    return Object.assign({}, state, { desactivatingMember: true, desactivateMemberError: { state: false, message: '' } });
  },
  [types.DESACTIVATE_MEMBER_SUCCESS](state, action) {
    return Object.assign({}, state, { memberDesactivated: action.memberDesactivated, desactivatingMember: false, desactivateMemberError: { state: false, message: '' } });
  },
  [types.DESACTIVATE_MEMBER_FAILURE](state, action) {
    return Object.assign({}, state, { desactivatingMember: false, desactivateMemberError: { state: true, message: action.payload } });
  },
  [types.DELETTING_MEMBER](state) {
    return Object.assign({}, state, { delettingMember: true, deleteMemberError: { state: false, message: '' } });
  },
  [types.DELETE_MEMBER_SUCCESS](state, action) {
    return Object.assign({}, state, { memberDeleted: action.memberDeleted, delettingMember: false, deleteMemberError: { state: false, message: '' } });
  },
  [types.DELETE_MEMBER_FAILURE](state, action) {
    return Object.assign({}, state, { delettingMember: false, deleteMemberError: { state: true, message: action.payload } });
  },
  [types.GETTING_NOTES](state) {
    return Object.assign({}, state, { gettingNotes: true, getNotesError: { state: false, message: '' } });
  },
  [types.GET_NOTES_SUCCESS](state, action) {
    return Object.assign({}, state, { notes: action.notes, gettingNotes: false, getNotesError: { state: false, message: '' } });
  },
  [types.GET_NOTES_FAILURE](state, action) {
    return Object.assign({}, state, { gettingNotes: false, getNotesError: { state: true, message: action.payload } });
  },
  ///////////////DefaultValues!!
  [types.DELETTING_DEFAULTVALUE](state) {
    return Object.assign({}, state, { delettingDefaultValue: true, deleteDefaultValueError: { state: false, message: '' } });
  },
  [types.DELETE_DEFAULTVALUE_SUCCESS](state, action) {
    return Object.assign({}, state, { defaultValueDeleted: action.defaultValueDeleted, delettingDefaultValue: false, deleteDefaultValueError: { state: false, message: '' } });
  },
  [types.DELETE_DEFAULTVALUE_FAILURE](state, action) {
    return Object.assign({}, state, { delettingDefaultValue: false, deleteDefaultValueError: { state: true, message: action.payload } });
  },
  [types.UPDATING_VALUE](state) {
    return Object.assign({}, state, { updatingValue: true, updateValueError: { state: false, message: '' } });
  },
  [types.UPDATE_VALUE_SUCCESS](state, action) {
    return Object.assign({}, state, { valueUpdated: action.valueUpdated, updatingValue: false, updateValueError: { state: false, message: '' } });
  },
  [types.UPDATE_VALUE_FAILURE](state, action) {
    return Object.assign({}, state, { updatingValue: false, updateValueError: { state: true, message: action.payload } });
  },
  [types.ADDING_VALUE](state) {
    return Object.assign({}, state, { addingValue: true, addValueError: { state: false, message: '' } });
  },
  [types.ADD_VALUE_SUCCESS](state, action) {
    return Object.assign({}, state, { valueAdded: action.valueAdded, addingValue: false, addValueError: { state: false, message: '' } });
  },
  [types.ADD_VALUE_FAILURE](state, action) {
    return Object.assign({}, state, { addingValue: false, addValueError: { state: true, message: action.payload } });
  },
  ///////////////Awards!!
  [types.DELETTING_AWARD](state) {
    return Object.assign({}, state, { delettingAward: true, deleteAwardError: { state: false, message: '' } });
  },
  [types.DELETE_AWARD_SUCCESS](state, action) {
    return Object.assign({}, state, { awardDeleted: action.awardDeleted, delettingAward: false, deleteAwardError: { state: false, message: '' } });
  },
  [types.DELETE_AWARD_FAILURE](state, action) {
    return Object.assign({}, state, { delettingAward: false, deleteAwardError: { state: true, message: action.payload } });
  },
  [types.GETTING_CONDITIONS](state) {
    return Object.assign({}, state, { gettingConditions: true, getConditionsError: { state: false, message: '' } });
  },
  [types.GET_CONDITIONS_SUCCESS](state, action) {
    return Object.assign({}, state, { conditions: action.conditions, gettingConditions: false, getConditionsError: { state: false, message: '' } });
  },
  [types.GET_CONDITIONS_FAILURE](state, action) {
    return Object.assign({}, state, { gettingConditions: false, getConditionsError: { state: true, message: action.payload } });
  },
  [types.UPDATING_AWARD](state) {
    return Object.assign({}, state, { updatingAward: true, updateAwardError: { state: false, message: '' } });
  },
  [types.UPDATE_AWARD_SUCCESS](state, action) {
    return Object.assign({}, state, { awardUpdated: action.awardUpdated, updatingAward: false, updateAwardError: { state: false, message: '' } });
  },
  [types.UPDATE_AWARD_FAILURE](state, action) {
    return Object.assign({}, state, { updatingAward: false, updateAwardError: { state: true, message: action.payload } });
  },
  [types.ADDING_AWARD](state) {
    return Object.assign({}, state, { addingAward: true, addAwardError: { state: false, message: '' } });
  },
  [types.ADD_AWARD_SUCCESS](state, action) {
    return Object.assign({}, state, { awardAdded: action.awardAdded, addingAward: false, addAwardError: { state: false, message: '' } });
  },
  [types.ADD_AWARD_FAILURE](state, action) {
    return Object.assign({}, state, { addingAward: false, addAwardError: { state: true, message: action.payload } });
  },
  [types.ADDING_CONDITION](state) {
    return Object.assign({}, state, { addingCondition: true, addConditionError: { state: false, message: '' } });
  },
  [types.ADD_CONDITION_SUCCESS](state, action) {
    return Object.assign({}, state, { conditionAdded: action.conditionAdded, addingCondition: false, addConditionError: { state: false, message: '' } });
  },
  [types.ADD_CONDITION_FAILURE](state, action) {
    return Object.assign({}, state, { addingCondition: false, addConditionError: { state: true, message: action.payload } });
  },
  [types.DELETTING_CONDITION](state) {
    return Object.assign({}, state, { delettingCondition: true, deleteConditionError: { state: false, message: '' } });
  },
  [types.DELETE_CONDITION_SUCCESS](state, action) {
    return Object.assign({}, state, { conditionDeleted: action.conditionDeleted, delettingCondition: false, deleteConditionError: { state: false, message: '' } });
  },
  [types.DELETE_CONDITION_FAILURE](state, action) {
    return Object.assign({}, state, { delettingCondition: false, deleteConditionError: { state: true, message: action.payload } });
  },
  /////////////EnterpriseModify
  [types.MODIFYING_ENTERPRISE](state) {
    return Object.assign({}, state, { modifyingEnterprise: true, modifyEnterpriseError: { state: false, message: '' } });
  },
  [types.MODIFY_ENTERPRISE_SUCCESS](state, action) {
    return Object.assign({}, state, { modifyingEnterprise: false, modifyEnterpriseError: { state: false, message: '' } });
  },
  [types.MODIFY_ENTERPRISE_FAILURE](state, action) {
    return Object.assign({}, state, { modifyingEnterprise: false, modifyEnterpriseError: { state: true, message: action.payload } });
  },
};

export default generateReducer(INITIAL_STATE, behaviors);
