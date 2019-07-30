import generateReducer from '../../shared/helpers/reducerHelpers';
import * as types from './TeamConfigConstants';

const INITIAL_STATE = {
  fetchingTeamConfigInfo: true,
  fetchError: {
    state: false,
    message: ''
  },
  teamConfigInfo: {}
};

const behaviors = {
  [types.FETCHING_TEAMCONFIG_INFO](state) {
    return Object.assign({}, state, { fetchingTeamConfigInfo: true, fetchError: { state: false, message: '' } });
  },
  [types.FETCH_TEAMCONFIG_INFO_SUCCESS](state, action) {
    return Object.assign({}, state, { teamConfigInfo: action.teamConfigInfo, fetchingTeamConfigInfo: false, fetchError: { state: false, message: '' } });
  },
  [types.FETCH_TEAMCONFIG_INFO_FAILURE](state, action) {
    return Object.assign({}, state, { fetchingTeamConfigInfo: false, fetchError: { state: true, message: action.payload } });
  }
};

export default generateReducer(INITIAL_STATE, behaviors);
