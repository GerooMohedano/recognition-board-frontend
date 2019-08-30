import generateReducer from '../../shared/helpers/reducerHelpers';
import * as types from './TeamConfigConstants';

const INITIAL_STATE = {
  fetchingTeamConfigInfo: true,
  updatingTeamName: true,
  updatingTeamLeader: true,
  delettingValue: true,
  activatingValue: true,
  desactivatingValue: true,
  updatingValue: true,
  addingValue: true,
  addingTeamMember: true,
  kickingTeamMember: true,
  gettingValuesNotes: true,
  fetchError: {
    state: false,
    message: ''
  },
  updateNameError: {
    state: false,
    message: ''
  },
  updateLeaderError: {
    state: false,
    message: ''
  },
  deleteValueError: {
    state: false,
    message: ''
  },
  activateValueError: {
    state: false,
    message: ''
  },
  desactivateValueError: {
    state: false,
    message: ''
  },
  updateValueError: {
    state: false,
    message: ''
  },
  addValueError: {
    state: false,
    message: ''
  },
  addTeamMemberError: {
    state: false,
    message: ''
  },
  kickTeamMemberError: {
    state: false,
    message: ''
  },
  getValuesNotesError: {
    state: false,
    message: ''
  },
  teamConfigInfo: {},
  teamUpdated: {},
  teamLeaderUpdated: {},
  valueDeleted: {},
  valueActivated: {},
  valueDesactivated: {},
  valueUpdated: {},
  valueAdded: {},
  teamMemberAdded: {},
  teamMemberKicked: {},
  valuesNotes: {}
};

const behaviors = {
  [types.FETCHING_TEAMCONFIG](state) {
    return Object.assign({}, state, { fetchingTeamConfigInfo: true, fetchError: { state: false, message: '' } });
  },
  [types.FETCH_TEAMCONFIG_SUCCESS](state, action) {
    return Object.assign({}, state, { teamConfigInfo: action.teamConfigInfo, fetchingTeamConfigInfo: false, fetchError: { state: false, message: '' } });
  },
  [types.FETCH_TEAMCONFIG_FAILURE](state, action) {
    return Object.assign({}, state, { fetchingTeamConfigInfo: false, fetchError: { state: true, message: action.payload } });
  },
  [types.UPDATING_TEAM_NAME](state) {
    return Object.assign({}, state, { updatingTeamName: true, updateNameError: { state: false, message: '' } });
  },
  [types.UPDATE_TEAM_NAME_SUCCESS](state, action) {
    return Object.assign({}, state, { teamUpdated: action.teamUpdated, updatingTeamName: false, updateNameError: { state: false, message: '' } });
  },
  [types.UPDATE_TEAM_NAME_FAILURE](state, action) {
    return Object.assign({}, state, { updatingTeamName: false, updateNameError: { state: true, message: action.payload } });
  },
  [types.UPDATING_TEAM_LEADER](state) {
    return Object.assign({}, state, { updatingTeamLeader: true, updateLeaderError: { state: false, message: '' } });
  },
  [types.UPDATE_TEAM_LEADER_SUCCESS](state, action) {
    return Object.assign({}, state, { teamLeaderUpdated: action.teamLeaderUpdated, updatingTeamLeader: false, updateLeaderError: { state: false, message: '' } });
  },
  [types.UPDATE_TEAM_LEADER_FAILURE](state, action) {
    return Object.assign({}, state, { updatingTeamLeader: false, updateLeaderError: { state: true, message: action.payload } });
  },
  [types.DELETTING_VALUE](state) {
    return Object.assign({}, state, { delettingValue: true, deleteValueError: { state: false, message: '' } });
  },
  [types.DELETE_VALUE_SUCCESS](state, action) {
    return Object.assign({}, state, { valueDeleted: action.valueDeleted, delettingValue: false, deleteValueError: { state: false, message: '' } });
  },
  [types.DELETE_VALUE_FAILURE](state, action) {
    return Object.assign({}, state, { delettingValue: false, deleteValueError: { state: true, message: action.payload } });
  },
  [types.ACTIVATING_VALUE](state) {
    return Object.assign({}, state, { activatingValue: true, activateValueError: { state: false, message: '' } });
  },
  [types.ACTIVATE_VALUE_SUCCESS](state, action) {
    return Object.assign({}, state, { valueActivated: action.valueActivated, activatingValue: false, activateValueError: { state: false, message: '' } });
  },
  [types.ACTIVATE_VALUE_FAILURE](state, action) {
    return Object.assign({}, state, { activatingValue: false, activateValueError: { state: true, message: action.payload } });
  },
  [types.DESACTIVATING_VALUE](state) {
    return Object.assign({}, state, { desactivatingValue: true, desactivateValueError: { state: false, message: '' } });
  },
  [types.DESACTIVATE_VALUE_SUCCESS](state, action) {
    return Object.assign({}, state, { valueDesactivated: action.valueDesactivated, desactivatingValue: false, desactivateValueError: { state: false, message: '' } });
  },
  [types.DESACTIVATE_VALUE_FAILURE](state, action) {
    return Object.assign({}, state, { desactivatingValue: false, desactivateValueError: { state: true, message: action.payload } });
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
  [types.ADDING_TEAM_MEMBER](state) {
    return Object.assign({}, state, { addingTeamMember: true, addTeamMemberError: { state: false, message: '' } });
  },
  [types.ADD_TEAM_MEMBER_SUCCESS](state, action) {
    return Object.assign({}, state, { teamMemberAdded: action.teamMemberAdded, addingTeamMember: false, addTeamMemberError: { state: false, message: '' } });
  },
  [types.ADD_TEAM_MEMBER_FAILURE](state, action) {
    return Object.assign({}, state, { addingTeamMember: false, addTeamMemberError: { state: true, message: action.payload } });
  },
  [types.KICKING_TEAM_MEMBER](state) {
    return Object.assign({}, state, { kickingTeamMember: true, kickTeamMemberError: { state: false, message: '' } });
  },
  [types.KICK_TEAM_MEMBER_SUCCESS](state, action) {
    return Object.assign({}, state, { teamMemberKicked: action.teamMemberKicked, kickingTeamMember: false, kickTeamMemberError: { state: false, message: '' } });
  },
  [types.KICK_TEAM_MEMBER_FAILURE](state, action) {
    return Object.assign({}, state, { kickingTeamMember: false, kickTeamMemberError: { state: true, message: action.payload } });
  },
  [types.GETTING_VALUES_NOTES](state) {
    return Object.assign({}, state, { gettingValuesNotes: true, getValuesNotesError: { state: false, message: '' } });
  },
  [types.GET_VALUES_NOTES_SUCCESS](state, action) {
    return Object.assign({}, state, { valuesNotes: action.valuesNotes, gettingValuesNotes: false, getValuesNotesError: { state: false, message: '' } });
  },
  [types.GET_VALUES_NOTES_FAILURE](state, action) {
    return Object.assign({}, state, { gettingValuesNotes: false, getValuesNotesError: { state: true, message: action.payload } });
  }
};

export default generateReducer(INITIAL_STATE, behaviors);
