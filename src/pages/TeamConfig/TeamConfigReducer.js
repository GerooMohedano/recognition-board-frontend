import generateReducer from '../../shared/helpers/reducerHelpers';
import * as types from './TeamConfigConstants';

const INITIAL_STATE = {
  fetchingTeamConfigInfo: true,
  updatingTeamName: true,
  updatingTeamLeader: true,
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
  teamConfigInfo: {},
  teamUpdated: {},
  teamLeaderUpdated: {}
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
  }
};

export default generateReducer(INITIAL_STATE, behaviors);
