import generateReducer from '../../shared/helpers/reducerHelpers';
import * as types from './TeamConstants';

const INITIAL_STATE = {
  fetchingTeams: true,
  fetchError: {
    state: false,
    message: ''
  },
  teamInfo: {}
};

const behaviors = {
  [types.FETCHING_TEAMS](state) {
    return Object.assign({}, state, { fetchingTeams: true, fetchError: { state: false, message: '' } });
  },
  [types.FETCH_TEAMS_SUCCESS](state, action) {
    return Object.assign({}, state, { teamInfo: action.teamInfo, fetchingTeams: false, fetchError: { state: false, message: '' } });
  },
  [types.FETCH_TEAMS_FAILURE](state, action) {
    return Object.assign({}, state, { fetchingTeams: false, fetchError: { state: true, message: action.payload } });
  }
};

export default generateReducer(INITIAL_STATE, behaviors);
