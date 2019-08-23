import generateReducer from '../../shared/helpers/reducerHelpers';
import * as types from './EnterpriseConstants';

const INITIAL_STATE = {
  fetchingEnterpriseInfo: true,
  fetchError: {
    state: false,
    message: ''
  },
  enterpriseInfo: {},
  activateTeamError: {
    state: false,
    message: ''
  },
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

  //member
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
