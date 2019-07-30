import generateReducer from '../../shared/helpers/reducerHelpers';
import * as types from './TeamConstants';

const INITIAL_STATE = {
  fetchingTeamInfo: true,
  fetchError: {
    state: false,
    message: ''
  },
  teamInfo: {}
};

const behaviors = {
  [types.FETCHING_TEAM_INFO](state) {
    return Object.assign({}, state, { fetchingTeamInfo: true, fetchError: { state: false, message: '' } });
  },
  [types.FETCH_TEAM_INFO_SUCCESS](state, action) {
    return Object.assign({}, state, { teamInfo: action.teamInfo, fetchingTeamInfo: false, fetchError: { state: false, message: '' } });
  },
  [types.FETCH_TEAM_INFO_FAILURE](state, action) {
    return Object.assign({}, state, { fetchingTeamInfo: false, fetchError: { state: true, message: action.payload } });
  }
};

export default generateReducer(INITIAL_STATE, behaviors);
